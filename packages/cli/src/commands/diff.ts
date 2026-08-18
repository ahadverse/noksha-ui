import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import { type Config, readConfig, writeConfig } from '../config.js';
import {
  compareFile,
  type FileComparison,
  hash,
  isInteresting,
  STATUS_LABEL,
  unifiedDiff,
} from '../diff.js';
import { CliError } from '../errors.js';
import { display } from '../project.js';
import { Registry } from '../registry.js';
import { transform } from '../transform.js';
import { color, columns, confirm, interactive, log, symbol } from '../ui.js';

export interface DiffOptions {
  root: string;
  names: string[];
  /** Print the changed lines, not just the per-file verdict. */
  verbose: boolean;
  /** Overwrite the files upstream has moved on. */
  apply: boolean;
  yes: boolean;
}

/**
 * The command a copy-paste library is usually missing.
 *
 * Once a component is in your tree it stops being connected to anything, and
 * upstream fixes — an aria attribute, a focus bug — arrive nowhere. This reads
 * the same registry `add` wrote from, compares it against both your files and
 * the record of what you were given, and separates "you changed this" from
 * "upstream changed this".
 */
export async function diff(options: DiffOptions): Promise<void> {
  const { root, verbose, apply } = options;

  const config = await readConfig(root);
  const registry = new Registry(config.registry);
  const installed = Object.keys(config.installed);

  if (installed.length === 0) {
    throw new CliError(
      'No components have been added yet.',
      'Run `noksha add button` first — there is nothing to compare until then.',
    );
  }

  const names = options.names.length > 0 ? options.names : installed;

  for (const name of names) {
    if (config.installed[name] === undefined) {
      throw new CliError(`"${name}" is not installed here.`, `Installed: ${installed.join(', ')}`);
    }
  }

  const results = new Map<string, FileComparison[]>();

  for (const name of names.sort()) {
    const item = await registry.item(name);
    const record = config.installed[name];

    /**
     * `add` copies only the shared helpers a component actually reaches, so the
     * `internal` item upstream is a superset of what is on disk by design.
     * Comparing against all of it would report helpers this project never
     * wanted as missing. Components are compared whole, where a file that is
     * new upstream genuinely is news.
     */
    const files =
      item.type === 'lib' && record !== undefined
        ? item.files.filter((file) => record.files[file.path] !== undefined)
        : item.files;

    const comparisons: FileComparison[] = [];

    for (const file of files) {
      const upstream = transform(file.path, file.content, { alias: config.alias });
      const local = await readOptional(join(root, config.components, file.path));

      comparisons.push(compareFile(file.path, upstream, local, record?.files[file.path]));
    }
    results.set(name, comparisons);
  }

  const changed = report(root, config, results, verbose);

  if (changed === 0) {
    log.plain();
    log.success('Everything matches the registry.');
    return;
  }

  if (apply) await applyUpdates(root, config, results, options);
  else hint(results);
}

function report(
  root: string,
  config: Config,
  results: Map<string, FileComparison[]>,
  verbose: boolean,
): number {
  let changed = 0;

  for (const [name, comparisons] of results) {
    const interesting = comparisons.filter((file) => isInteresting(file.status));

    log.plain();
    if (interesting.length === 0) {
      log.plain(`${color.green(symbol.tick)} ${color.bold(name)} ${color.dim('up to date')}`);
      continue;
    }

    changed += interesting.length;
    log.plain(color.bold(name));
    log.plain(
      columns(
        interesting.map((file) => [
          `  ${display(root, join(root, config.components, file.path))}`,
          STATUS_LABEL[file.status],
        ]),
      ).join('\n'),
    );

    if (!verbose) continue;

    for (const file of interesting) {
      if (file.local === null) continue;

      const body = unifiedDiff(file.local, file.upstream);
      if (body === '') continue;

      log.plain();
      log.plain(color.dim(`  ── ${file.path} ${color.dim('(yours → registry)')}`));
      log.plain(body.replace(/^/gm, '  '));
    }
  }
  return changed;
}

/**
 * Only `outdated` files are safe to overwrite without asking twice: they match
 * what was copied, so nothing local is lost. A conflict has edits on both
 * sides, and merging them is a judgement call this cannot make.
 */
async function applyUpdates(
  root: string,
  config: Config,
  results: Map<string, FileComparison[]>,
  options: DiffOptions,
): Promise<void> {
  const safe: { name: string; file: FileComparison }[] = [];
  const conflicts: FileComparison[] = [];

  for (const [name, comparisons] of results) {
    for (const file of comparisons) {
      if (file.status === 'outdated' || file.status === 'missing') safe.push({ name, file });
      else if (file.status === 'conflict') conflicts.push(file);
    }
  }

  if (conflicts.length > 0) {
    log.plain();
    log.warn(
      `${conflicts.length} ${conflicts.length === 1 ? 'file has' : 'files have'} changes on both sides and will be left alone:`,
    );
    for (const file of conflicts) log.plain(`  ${color.dim(file.path)}`);
    log.plain(color.dim('  Merge those by hand — `--verbose` prints what moved upstream.'));
  }

  if (safe.length === 0) {
    log.plain();
    log.info('Nothing to apply.');
    return;
  }

  log.plain();
  if (!options.yes) {
    if (!interactive()) {
      throw new CliError(
        `${safe.length} files can be updated.`,
        'Pass --yes to write them in a non-interactive shell.',
      );
    }
    const proceed = await confirm(
      `Update ${safe.length} unmodified files from the registry?`,
      true,
    );
    if (!proceed) {
      log.info('Nothing written.');
      return;
    }
  }

  for (const { name, file } of safe) {
    const absolute = join(root, config.components, file.path);
    await mkdir(dirname(absolute), { recursive: true });
    await writeFile(absolute, file.upstream, 'utf8');

    const record = config.installed[name];
    if (record !== undefined) record.files[file.path] = hash(file.upstream);
  }

  // The whole-component hash only becomes true again once every file of it is
  // current, so it is recomputed from the files rather than copied from upstream.
  for (const [name, comparisons] of results) {
    const record = config.installed[name];
    if (record === undefined) continue;

    const allCurrent = comparisons.every((file) => record.files[file.path] === hash(file.upstream));
    if (allCurrent) record.hash = hash(comparisons.map((file) => hash(file.upstream)).join(''));
  }

  await writeConfig(root, config);

  log.plain();
  log.success(`Updated ${safe.length} ${safe.length === 1 ? 'file' : 'files'}`);
}

function hint(results: Map<string, FileComparison[]>): void {
  const statuses = new Set([...results.values()].flat().map((file) => file.status));

  log.plain();
  if (statuses.has('outdated') || statuses.has('missing')) {
    log.plain(
      `${color.dim(symbol.arrow)} ${color.cyan('noksha diff --apply')} updates the files you have not touched.`,
    );
  }
  if (statuses.has('conflict')) {
    log.plain(
      `${color.dim(symbol.arrow)} ${color.cyan('noksha diff --verbose')} shows what moved upstream in the conflicts.`,
    );
  }
}

async function readOptional(path: string): Promise<string | null> {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return null;
  }
}
