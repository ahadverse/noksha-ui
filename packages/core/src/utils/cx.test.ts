import { describe, expect, it } from 'vitest';
import { cx } from './cx.js';

describe('cx', () => {
  it('joins strings, arrays and conditional objects', () => {
    expect(cx('a', ['b', 'c'], { d: true, e: false })).toBe('a b c d');
  });

  it('skips falsy values', () => {
    expect(cx('a', null, undefined, false, '', 'b')).toBe('a b');
  });

  it('resolves conflicting Tailwind utilities in favour of the last', () => {
    expect(cx('px-2', 'px-4')).toBe('px-4');
    expect(cx('text-sm text-fg-muted', 'text-lg')).toBe('text-fg-muted text-lg');
  });

  it('keeps non-conflicting utilities from both sides', () => {
    expect(cx('rounded-md bg-red-500', 'shadow-sm')).toBe('rounded-md bg-red-500 shadow-sm');
  });

  it('respects variant prefixes as separate groups', () => {
    expect(cx('hover:px-2', 'px-4')).toBe('hover:px-2 px-4');
  });

  it('returns an empty string for no input', () => {
    expect(cx()).toBe('');
  });
});
