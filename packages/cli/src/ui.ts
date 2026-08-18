import { createInterface } from 'node:readline/promises';

/**
 * Colour, honouring the conventions a terminal user expects: `NO_COLOR` off,
 * `FORCE_COLOR` on, and otherwise only when stdout is a TTY. Written out rather
 * than taken from a package because it is sixteen lines and the CLI ships with
 * no dependencies — see `tsup.config.ts`.
 */
const enabled =
  process.env.FORCE_COLOR !== undefined && process.env.FORCE_COLOR !== '0'
    ? true
    : process.env.NO_COLOR === undefined && process.stdout.isTTY === true;

const wrap =
  (open: number, close: number) =>
  (text: string): string =>
    enabled ? `\u001B[${open}m${text}\u001B[${close}m` : text;

export const color = {
  bold: wrap(1, 22),
  dim: wrap(2, 22),
  red: wrap(31, 39),
  green: wrap(32, 39),
  yellow: wrap(33, 39),
  blue: wrap(34, 39),
  magenta: wrap(35, 39),
  cyan: wrap(36, 39),
};

/** ASCII fallbacks: Windows terminals outside Windows Terminal still mangle these. */
const unicode = process.platform !== 'win32' || process.env.WT_SESSION !== undefined;

export const symbol = {
  tick: unicode ? '✔' : 'v',
  cross: unicode ? '✖' : 'x',
  warn: unicode ? '⚠' : '!',
  dot: unicode ? '•' : '-',
  arrow: unicode ? '→' : '->',
};

export const log = {
  plain: (message = '') => console.log(message),
  step: (message: string) => console.log(`${color.dim(symbol.dot)} ${message}`),
  success: (message: string) => console.log(`${color.green(symbol.tick)} ${message}`),
  warn: (message: string) => console.log(`${color.yellow(symbol.warn)} ${message}`),
  error: (message: string) => console.error(`${color.red(symbol.cross)} ${message}`),
  /** Written to stderr so `noksha list | grep` stays parseable. */
  info: (message: string) => console.error(color.dim(message)),
};

/** Whether we can ask the user anything at all — a CI run cannot answer. */
export const interactive = (): boolean =>
  process.stdin.isTTY === true && process.stdout.isTTY === true;

async function ask(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    return (await rl.question(question)).trim();
  } finally {
    rl.close();
  }
}

/** A free-text prompt with a default the user can accept by pressing enter. */
export async function prompt(question: string, fallback: string): Promise<string> {
  const answer = await ask(`${color.cyan('?')} ${question} ${color.dim(`(${fallback})`)} `);
  return answer === '' ? fallback : answer;
}

export async function confirm(question: string, fallback: boolean): Promise<boolean> {
  const hint = fallback ? 'Y/n' : 'y/N';
  const answer = (
    await ask(`${color.cyan('?')} ${question} ${color.dim(`(${hint})`)} `)
  ).toLowerCase();

  if (answer === '') return fallback;
  return answer === 'y' || answer === 'yes';
}

/** Pads a column of labels so the descriptions beside them line up. */
export function columns(rows: [string, string][], gap = 2): string[] {
  const width = rows.reduce((max, [label]) => Math.max(max, stripAnsi(label).length), 0);

  return rows.map(
    ([label, value]) => `${label}${' '.repeat(width - stripAnsi(label).length + gap)}${value}`,
  );
}

// biome-ignore lint/suspicious/noControlCharactersInRegex: measuring the visible width of a styled string is exactly what this is for.
const ANSI = /\u001B\[\d+m/g;

const stripAnsi = (text: string): string => text.replace(ANSI, '');
