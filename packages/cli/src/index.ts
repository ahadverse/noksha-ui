import { parseArgs } from 'node:util';

import { add } from './commands/add.js';
import { diff } from './commands/diff.js';
import { init } from './commands/init.js';
import { list } from './commands/list.js';
import { CliError } from './errors.js';
import { findRoot } from './project.js';
import { color, columns, log, symbol } from './ui.js';

const VERSION = '0.1.0';

const COMMANDS = ['init', 'add', 'diff', 'list'] as const;
type Command = (typeof COMMANDS)[number];

/**
 * Flags for every command in one table.
 *
 * `parseArgs` is given the whole set rather than a per-command subset, so a flag
 * typed against the wrong command reports "unknown option" for that command
 * instead of failing to parse — a better error, and one place to read the
 * surface from.
 */
const OPTIONS = {
  help: { type: 'boolean', short: 'h' },
  version: { type: 'boolean', short: 'v' },
  cwd: { type: 'string' },
  yes: { type: 'boolean', short: 'y' },
  force: { type: 'boolean' },
  overwrite: { type: 'boolean' },
  all: { type: 'boolean' },
  'dry-run': { type: 'boolean' },
  verbose: { type: 'boolean' },
  apply: { type: 'boolean' },
  installed: { type: 'boolean' },
  brand: { type: 'string' },
  css: { type: 'string' },
  dir: { type: 'string' },
  alias: { type: 'string' },
  registry: { type: 'string' },
} as const;

/** Which flags each command accepts, so the rest can be rejected by name. */
const ACCEPTS: Record<Command, string[]> = {
  init: ['cwd', 'yes', 'force', 'brand', 'css', 'dir', 'alias', 'registry'],
  add: ['cwd', 'yes', 'all', 'overwrite', 'dry-run'],
  diff: ['cwd', 'yes', 'verbose', 'apply'],
  list: ['cwd', 'registry', 'installed'],
};

const HELP = `${color.bold('noksha')} ${color.dim(`v${VERSION}`)} — components you own the source of

${color.bold('Usage')}
  npx @noksha-ui/cli <command> [options]

${color.bold('Commands')}
${columns([
  ['  init', 'write the theme stylesheet and wire up Tailwind'],
  ['  add <name...>', 'copy components into your project'],
  ['  diff [name...]', 'show what moved upstream since you copied'],
  ['  list', 'the catalogue'],
]).join('\n')}

${color.bold('init')}
${columns([
  ['  --brand <color>', 'seed the palette from a hex, rgb() or oklch() value'],
  ['  --css <path>', 'the stylesheet Tailwind compiles'],
  ['  --dir <path>', 'where components should go'],
  ['  --alias <prefix>', 'import prefix for copied files, e.g. @/components/ui'],
  ['  --registry <url>', 'read from somewhere other than nokshaui.com'],
  ['  --force', 'rewrite an existing noksha.json'],
]).join('\n')}

${color.bold('add')}
${columns([
  ['  --all', 'every component in the registry'],
  ['  --overwrite', 'replace files that differ, without asking'],
  ['  --dry-run', 'list what would be written'],
]).join('\n')}

${color.bold('diff')}
${columns([
  ['  --verbose', 'print the changed lines, not just a verdict per file'],
  ['  --apply', 'update the files you have not edited'],
]).join('\n')}

${color.bold('Everywhere')}
${columns([
  ['  --cwd <path>', 'run against a project other than this directory'],
  ['  -y, --yes', 'take the defaults; never prompt'],
  ['  -h, --help', 'this'],
  ['  -v, --version', VERSION],
]).join('\n')}

${color.dim('Docs: https://nokshaui.com/docs/cli')}
`;

async function main(argv: string[]): Promise<void> {
  let parsed: ReturnType<typeof parseArgs<{ options: typeof OPTIONS; allowPositionals: true }>>;

  try {
    parsed = parseArgs({ args: argv, options: OPTIONS, allowPositionals: true, strict: true });
  } catch (cause) {
    throw new CliError(
      cause instanceof Error ? cause.message.replace(/\.$/, '') : 'Could not read those arguments',
      'Run `noksha --help` for the full list.',
    );
  }

  const { values, positionals } = parsed;
  const [name, ...rest] = positionals;

  if (values.version === true) {
    console.log(VERSION);
    return;
  }

  if (name === undefined || values.help === true) {
    // Asking for help is a success; being unable to guess what you meant is not.
    console.log(HELP);
    if (name === undefined && values.help !== true) process.exitCode = 1;
    return;
  }

  if (!isCommand(name)) {
    throw new CliError(`There is no "${name}" command.`, `Try one of: ${COMMANDS.join(', ')}.`);
  }

  rejectForeignFlags(name, values);

  const root = await findRoot(values.cwd ?? process.cwd());
  const yes = values.yes === true;

  switch (name) {
    case 'init':
      return init({
        root,
        yes,
        force: values.force === true,
        brand: values.brand,
        css: values.css,
        dir: values.dir,
        alias: values.alias,
        registry: values.registry,
      });

    case 'add':
      return add({
        root,
        names: rest,
        yes,
        all: values.all === true,
        overwrite: values.overwrite === true,
        dryRun: values['dry-run'] === true,
      });

    case 'diff':
      return diff({
        root,
        names: rest,
        yes,
        verbose: values.verbose === true,
        apply: values.apply === true,
      });

    case 'list':
      return list({ root, registry: values.registry, installed: values.installed === true });
  }
}

const isCommand = (value: string): value is Command =>
  (COMMANDS as readonly string[]).includes(value);

/**
 * `noksha add --brand red` parses cleanly and would then be ignored, which is
 * the kind of silence that costs someone an afternoon. It is an error instead.
 */
function rejectForeignFlags(command: Command, values: Record<string, unknown>): void {
  const allowed = new Set([...(ACCEPTS[command] ?? []), 'help', 'version']);

  for (const [flag, value] of Object.entries(values)) {
    if (value === undefined || value === false || allowed.has(flag)) continue;

    throw new CliError(
      `\`${command}\` does not take --${flag}.`,
      `It accepts: ${(ACCEPTS[command] ?? []).map((f) => `--${f}`).join(', ')}.`,
    );
  }
}

try {
  await main(process.argv.slice(2));
} catch (error) {
  process.exitCode = 1;

  if (error instanceof CliError) {
    log.plain();
    log.error(error.message);
    if (error.hint !== undefined) log.plain(`  ${color.dim(error.hint)}`);
    log.plain();
  } else {
    log.plain();
    log.error('Something went wrong that should not have.');
    log.plain(
      color.dim(
        `  ${symbol.arrow} https://github.com/ahadverse/noksha-ui/issues with the trace below.`,
      ),
    );
    log.plain();
    console.error(error);
  }
}
