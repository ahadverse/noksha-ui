import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import { type Config, readConfig, writeConfig } from '../config.js';
import { hash } from '../diff.js';
import { CliError } from '../errors.js';
import { detectPackageManager, display, installCommand, missingDependencies } from '../project.js';
import { Registry, type RegistryItem } from '../registry.js';
import { transform } from '../transform.js';
import { color, columns, confirm, interactive, log, symbol } from '../ui.js';

export interface AddOptions {
  root: string;
  names: string[];
  all: boolean;
  overwrite: boolean;
  yes: boolean;
  dryRun: boolean;
}

/** One file, already transformed, ready to be written. */
interface Planned {
  /** Path relative to the components directory — also the key in `installed`. */
  path: string;
  absolute: string;
  content: string;
  /** Hash of the transformed content, which is what `diff` will compare against. */
  hash: string;
  exists: boolean;
  unchanged: boolean;
}

export async function add(options: AddOptions): Promise<void> {
  const { root, all, dryRun } = options;

  const config = await readConfig(root);
  const registry = new Registry(config.registry);

  const names = all ? (await registry.index()).components.map((c) => c.name) : options.names;

  if (names.length === 0) {
    throw new CliError(
      'Name at least one component.',
      'For example `noksha add button dialog`, or --all. `noksha list` shows what there is.',
    );
  }

  const items = await registry.resolve(names);
  const extra = items.filter((item) => !names.includes(item.name));

  if (extra.length > 0) {
    log.step(
      `Bringing along ${extra.map((item) => color.bold(item.name)).join(', ')} ${color.dim('— the requested components import them')}`,
    );
  }

  const planned = await plan(root, config, items);
  const clashes = planned.filter((file) => file.exists && !file.unchanged);

  // A dry run answers a question; it never refuses and never asks one back.
  if (dryRun) {
    preview(root, planned);
    return;
  }

  if (clashes.length > 0 && !options.overwrite) {
    const proceed = await resolveClashes(root, clashes, options);
    if (!proceed) {
      log.plain();
      log.info('Nothing written.');
      return;
    }
  }

  await writeAll(planned);
  record(config, items, planned);
  await writeConfig(root, config);

  report(root, items, planned);
  await reportDependencies(root, items);
}

/**
 * Turns registry items into the files that would land on disk.
 *
 * Everything is resolved before anything is written, so a name that turns out
 * not to exist, or a directory that cannot be created, fails with the project
 * untouched rather than half-copied.
 */
async function plan(root: string, config: Config, items: RegistryItem[]): Promise<Planned[]> {
  const base = join(root, config.components);
  const files: Planned[] = [];

  for (const item of items) {
    for (const file of item.files) {
      const content = transform(file.path, file.content, { alias: config.alias });
      const absolute = join(base, file.path);
      const current = await readOptional(absolute);

      files.push({
        path: file.path,
        absolute,
        content,
        hash: hash(content),
        exists: current !== null,
        unchanged: current === content,
      });
    }
  }
  return files;
}

/**
 * What a real run would do, said plainly enough that the difference between
 * "new file" and "your file, replaced" is visible before anything happens.
 */
function preview(root: string, planned: Planned[]): void {
  log.plain();

  for (const file of planned) {
    const path = display(root, file.absolute);

    if (!file.exists) log.plain(`  ${color.green('new')}       ${color.dim(path)}`);
    else if (file.unchanged) log.plain(`  ${color.dim('unchanged')} ${color.dim(path)}`);
    else log.plain(`  ${color.yellow('overwrite')} ${color.dim(path)}`);
  }

  const overwrites = planned.filter((file) => file.exists && !file.unchanged).length;

  log.plain();
  log.info(
    overwrites === 0
      ? `Dry run — ${planned.length} files, none of them yours.`
      : `Dry run — ${planned.length} files, ${overwrites} of which would replace what is there.`,
  );
}

/**
 * Asks before overwriting work someone may have done.
 *
 * The whole promise of this library's ownership path is that a copied component
 * is yours; silently replacing an edited file would break that in the one place
 * it matters most. A non-interactive run refuses instead of guessing.
 */
async function resolveClashes(
  root: string,
  clashes: Planned[],
  options: AddOptions,
): Promise<boolean> {
  log.plain();
  log.warn(
    `${clashes.length} ${clashes.length === 1 ? 'file differs' : 'files differ'} from what would be written:`,
  );
  for (const file of clashes) log.plain(`  ${color.dim(display(root, file.absolute))}`);
  log.plain();

  if (options.yes) return true;

  if (!interactive()) {
    throw new CliError(
      'Those files would be overwritten.',
      'Run `noksha diff` to see what changed, then pass --overwrite to replace them.',
    );
  }

  return confirm('Overwrite them?', false);
}

async function writeAll(files: Planned[]): Promise<void> {
  const directories = new Set(files.map((file) => dirname(file.absolute)));

  for (const directory of directories) await mkdir(directory, { recursive: true });
  await Promise.all(files.map((file) => writeFile(file.absolute, file.content, 'utf8')));
}

/**
 * Records what was installed and from which upstream revision.
 *
 * This is what `diff` reads, and the reason it can tell a local edit apart from
 * an upstream change instead of only reporting that the two differ.
 */
function record(config: Config, items: RegistryItem[], planned: Planned[]): void {
  const byPath = new Map(planned.map((file) => [file.path, file.hash]));

  for (const item of items) {
    const files: Record<string, string> = {};

    for (const file of item.files) {
      const written = byPath.get(file.path);
      if (written !== undefined) files[file.path] = written;
    }

    config.installed[item.name] = {
      hash: hash(item.files.map((file) => file.hash).join('')),
      files,
    };
  }
}

function report(root: string, items: RegistryItem[], planned: Planned[]): void {
  log.plain();
  for (const file of planned) {
    log.plain(`  ${color.green(symbol.tick)} ${color.dim(display(root, file.absolute))}`);
  }

  log.plain();
  const names = items.map((item) => color.bold(item.name)).join(', ');
  log.success(`Added ${names}`);
}

async function reportDependencies(root: string, items: RegistryItem[]): Promise<void> {
  const required = [...new Set(items.flatMap((item) => item.dependencies))].sort();
  const missing = await missingDependencies(root, required);

  if (missing.length === 0) return;

  const manager = await detectPackageManager(root);
  log.plain();
  log.warn('These are imported but not in your package.json:');
  log.plain(
    columns(missing.map((name) => [`  ${color.bold(name)}`, '']))
      .join('\n')
      .trimEnd(),
  );
  log.plain();
  log.plain(`  ${color.cyan(installCommand(manager, missing))}`);
}

async function readOptional(path: string): Promise<string | null> {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return null;
  }
}
