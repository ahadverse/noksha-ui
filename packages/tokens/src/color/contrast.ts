import { clampSrgb, gammaToLinear, oklchToSrgb } from './convert.js';
import type { Oklch } from './types.js';

/** WCAG 2.1 relative luminance of an OKLCH color. */
export function relativeLuminance(color: Oklch): number {
  const { r, g, b } = clampSrgb(oklchToSrgb(color));
  return 0.2126 * gammaToLinear(r) + 0.7152 * gammaToLinear(g) + 0.0722 * gammaToLinear(b);
}

/** WCAG 2.1 contrast ratio between two colors, 1–21. Order does not matter. */
export function contrastRatio(a: Oklch, b: Oklch): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
  return ((lighter as number) + 0.05) / ((darker as number) + 0.05);
}

export type ContrastLevel = 'AA' | 'AA-large' | 'AAA';

/** WCAG 2.1 minimum ratios. */
export const CONTRAST_THRESHOLDS: Record<ContrastLevel, number> = {
  AA: 4.5,
  'AA-large': 3,
  AAA: 7,
};

export function meetsContrast(a: Oklch, b: Oklch, level: ContrastLevel = 'AA'): boolean {
  return contrastRatio(a, b) >= CONTRAST_THRESHOLDS[level];
}

const WHITE: Oklch = { l: 1, c: 0, h: 0 };
const BLACK: Oklch = { l: 0, c: 0, h: 0 };

export interface ReadableOnOptions {
  /** Candidate foregrounds, best-first. Defaults to white then black. */
  candidates?: readonly Oklch[];
  level?: ContrastLevel;
}

export interface ReadableOnResult {
  color: Oklch;
  ratio: number;
  /** `false` when no candidate cleared `level` and the best available was used. */
  passes: boolean;
}

/**
 * Picks the foreground that reads best on `background`.
 *
 * Returns the first candidate that clears `level`; if none do, returns the
 * highest-contrast candidate with `passes: false` so the build step can fail
 * loudly rather than shipping an unreadable pair.
 */
export function readableOn(background: Oklch, options: ReadableOnOptions = {}): ReadableOnResult {
  const { candidates = [WHITE, BLACK], level = 'AA' } = options;

  let best: ReadableOnResult | null = null;

  for (const candidate of candidates) {
    const ratio = contrastRatio(background, candidate);
    if (ratio >= CONTRAST_THRESHOLDS[level]) return { color: candidate, ratio, passes: true };
    if (!best || ratio > best.ratio) best = { color: candidate, ratio, passes: false };
  }

  if (!best) {
    throw new TypeError('[@noksha-ui/tokens] readableOn() needs at least one candidate color.');
  }
  return best;
}
