import { createHash } from 'node:crypto';

import { color } from './ui.js';

/** The registry's hash function, so a local file can be compared to a published one. */
export const hash = (content: string): string =>
  createHash('sha256').update(content).digest('hex').slice(0, 16);

/**
 * What happened to one copied file since it was copied.
 *
 * The three-way comparison is the whole point of recording an install. Against
 * upstream alone, a file you edited and a file that moved upstream look
 * identical — both "differ" — which is why copy-paste libraries without a
 * record can only tell you that something changed, never who changed it.
 */
export type FileStatus =
  /** Not on disk. Deleted, or never written. */
  | 'missing'
  /** Matches the registry exactly. */
  | 'current'
  /** Untouched locally, and the registry has moved on. Safe to overwrite. */
  | 'outdated'
  /** Edited locally; upstream has not moved. Yours, and nothing to merge. */
  | 'modified'
  /** Edited locally *and* moved upstream. Overwriting would lose your edits. */
  | 'conflict'
  /** No record of what was installed — added before the record existed. */
  | 'unknown';

export interface FileComparison {
  path: string;
  status: FileStatus;
  /** The registry's current content, for printing the upstream change. */
  upstream: string;
  /** What is on disk, or `null` when the file is missing. */
  local: string | null;
}

export function compareFile(
  path: string,
  upstream: string,
  local: string | null,
  installedHash: string | undefined,
): FileComparison {
  const base = { path, upstream, local };

  if (local === null) return { ...base, status: 'missing' };

  const upstreamHash = hash(upstream);
  const localHash = hash(local);

  // The comparison is against the *transformed* content the CLI would write, so
  // an import rewritten on the way in never reads as a local edit.
  if (localHash === upstreamHash) return { ...base, status: 'current' };
  if (installedHash === undefined) return { ...base, status: 'unknown' };

  const movedUpstream = installedHash !== upstreamHash;
  const editedLocally = installedHash !== localHash;

  if (movedUpstream && editedLocally) return { ...base, status: 'conflict' };
  if (movedUpstream) return { ...base, status: 'outdated' };
  return { ...base, status: 'modified' };
}

export const STATUS_LABEL: Record<FileStatus, string> = {
  missing: color.red('missing'),
  current: color.dim('up to date'),
  outdated: color.yellow('update available'),
  modified: color.blue('yours'),
  conflict: color.magenta('conflict'),
  unknown: color.dim('untracked'),
};

/** Whether a comparison is worth printing at all. */
export const isInteresting = (status: FileStatus): boolean => status !== 'current';

/**
 * A unified diff.
 *
 * Written here rather than shelled out to `git diff`, because `diff` has to
 * work in a project that is not a git repository and on a machine where git is
 * not installed — and because the two sides being compared are a local file and
 * an HTTP response, only one of which is on disk.
 */
export function unifiedDiff(before: string, after: string, context = 3): string {
  const edits = lcs(before.split('\n'), after.split('\n'));

  // Line numbers on the "before" side, so a reported line matches the file the
  // reader has open. An inserted line reports the line it lands after.
  let line = 0;
  const numbered = edits.map(([kind, text]) => {
    if (kind !== '+') line += 1;
    return { kind, text, line };
  });

  const changed = numbered
    .map((edit, index) => (edit.kind === ' ' ? -1 : index))
    .filter((index) => index >= 0);

  if (changed.length === 0) return '';

  // Group changes that sit within 2×context of each other into one hunk, so
  // adjacent edits do not print the same context lines twice.
  const groups: number[][] = [];
  for (const index of changed) {
    const last = groups.at(-1);
    if (last !== undefined && index - (last.at(-1) as number) <= context * 2) last.push(index);
    else groups.push([index]);
  }

  const lines: string[] = [];

  for (const group of groups) {
    const from = Math.max(0, (group[0] as number) - context);
    const to = Math.min(numbered.length - 1, (group.at(-1) as number) + context);
    const anchor = numbered[from] as { line: number };

    lines.push(color.cyan(`@@ line ${Math.max(1, anchor.line)} @@`));

    for (let i = from; i <= to; i += 1) {
      const { kind, text } = numbered[i] as { kind: string; text: string };
      const row = `${kind}${text}`;

      if (kind === '+') lines.push(color.green(row));
      else if (kind === '-') lines.push(color.red(row));
      else lines.push(color.dim(row));
    }
  }

  return lines.join('\n');
}

type Edit = [' ' | '-' | '+', string];

/**
 * Longest common subsequence, the textbook dynamic program.
 *
 * Quadratic, which for two revisions of a component file — hundreds of lines —
 * is instant. A Myers implementation would be the right call if this ever had
 * to diff something large, and would not change the output.
 */
function lcs(a: string[], b: string[]): Edit[] {
  const rows = a.length;
  const cols = b.length;
  const table: number[][] = Array.from({ length: rows + 1 }, () =>
    new Array<number>(cols + 1).fill(0),
  );

  for (let i = rows - 1; i >= 0; i -= 1) {
    for (let j = cols - 1; j >= 0; j -= 1) {
      const row = table[i] as number[];
      const next = table[i + 1] as number[];
      row[j] =
        a[i] === b[j]
          ? (next[j + 1] as number) + 1
          : Math.max(next[j] as number, row[j + 1] as number);
    }
  }

  const edits: Edit[] = [];
  let i = 0;
  let j = 0;

  while (i < rows && j < cols) {
    if (a[i] === b[j]) {
      edits.push([' ', a[i] as string]);
      i += 1;
      j += 1;
    } else if ((table[i + 1]?.[j] ?? 0) >= (table[i]?.[j + 1] ?? 0)) {
      edits.push(['-', a[i] as string]);
      i += 1;
    } else {
      edits.push(['+', b[j] as string]);
      j += 1;
    }
  }

  while (i < rows) {
    edits.push(['-', a[i] as string]);
    i += 1;
  }
  while (j < cols) {
    edits.push(['+', b[j] as string]);
    j += 1;
  }

  return edits;
}
