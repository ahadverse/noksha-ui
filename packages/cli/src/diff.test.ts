import { describe, expect, it } from 'vitest';

import { compareFile, hash, unifiedDiff } from './diff.js';

const YOURS = 'export const a = 1;\n';
const UPSTREAM = 'export const a = 2;\n';

describe('compareFile', () => {
  it('reports a file that matches the registry', () => {
    expect(compareFile('a.ts', YOURS, YOURS, hash(YOURS)).status).toBe('current');
  });

  it('reports a file that is not there', () => {
    expect(compareFile('a.ts', YOURS, null, hash(YOURS)).status).toBe('missing');
  });

  /**
   * The three cases below are the reason an install is recorded at all. Against
   * upstream alone they are indistinguishable — each is simply "differs" — and a
   * tool that cannot separate them can only ever tell you to look for yourself.
   */
  it('separates an upstream change from a local edit', () => {
    const installed = hash(YOURS);

    // Untouched locally, moved upstream: safe to overwrite.
    expect(compareFile('a.ts', UPSTREAM, YOURS, installed).status).toBe('outdated');

    // Edited locally, unchanged upstream: yours, and nothing to merge.
    expect(compareFile('a.ts', YOURS, 'export const a = 3;\n', installed).status).toBe('modified');

    // Both moved: overwriting would lose the local edit.
    expect(compareFile('a.ts', UPSTREAM, 'export const a = 3;\n', installed).status).toBe(
      'conflict',
    );
  });

  it('falls back to untracked when there is no record', () => {
    expect(compareFile('a.ts', UPSTREAM, YOURS, undefined).status).toBe('unknown');
  });

  /** A file matching upstream is current whatever the record says about it. */
  it('prefers the evidence over the record', () => {
    expect(compareFile('a.ts', YOURS, YOURS, 'stale-hash').status).toBe('current');
  });
});

describe('unifiedDiff', () => {
  it('is empty for identical input', () => {
    expect(unifiedDiff('a\nb\nc', 'a\nb\nc')).toBe('');
  });

  it('marks the removed and added lines', () => {
    const out = unifiedDiff('a\nb\nc', 'a\nB\nc');

    expect(out).toContain('-b');
    expect(out).toContain('+B');
    expect(out).toContain(' a');
    expect(out).toContain(' c');
  });

  it('numbers the hunk against the original file', () => {
    const before = Array.from({ length: 20 }, (_, i) => `line ${i + 1}`).join('\n');
    const after = before.replace('line 12', 'changed');

    expect(unifiedDiff(before, after)).toContain('@@ line 9 @@');
  });

  it('keeps a bounded window of context around a change', () => {
    const before = Array.from({ length: 40 }, (_, i) => `line ${i + 1}`).join('\n');
    const after = before.replace('line 20', 'changed');
    const lines = unifiedDiff(before, after).split('\n');

    // One header, three lines of context each side, and the -/+ pair.
    expect(lines).toHaveLength(1 + 3 + 2 + 3);
  });

  it('merges nearby changes into one hunk', () => {
    const before = Array.from({ length: 40 }, (_, i) => `line ${i + 1}`).join('\n');
    const after = before.replace('line 20', 'x').replace('line 22', 'y');
    const headers = unifiedDiff(after, before)
      .split('\n')
      .filter((l) => l.includes('@@'));

    expect(headers).toHaveLength(1);
  });

  it('splits distant changes into separate hunks', () => {
    const before = Array.from({ length: 60 }, (_, i) => `line ${i + 1}`).join('\n');
    const after = before.replace('line 5', 'x').replace('line 50', 'y');
    const headers = unifiedDiff(before, after)
      .split('\n')
      .filter((l) => l.includes('@@'));

    expect(headers).toHaveLength(2);
  });

  it('handles a pure insertion and a pure deletion', () => {
    expect(unifiedDiff('a\nc', 'a\nb\nc')).toContain('+b');
    expect(unifiedDiff('a\nb\nc', 'a\nc')).toContain('-b');
  });
});

describe('hash', () => {
  it('matches the registry: sha256, truncated to 16 characters', () => {
    expect(hash('')).toHaveLength(16);
    expect(hash('a')).not.toBe(hash('b'));
    expect(hash('a')).toBe(hash('a'));
  });
});
