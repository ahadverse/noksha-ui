import { clampSrgb, oklchToSrgb } from './convert.js';
import type { Oklch } from './types.js';

function round(value: number, places: number): number {
  const factor = 10 ** places;
  // `+ 0` collapses -0 to 0 so formatted output never reads "-0".
  return Math.round(value * factor) / factor + 0;
}

/** Formats an OKLCH color as a CSS `oklch()` string. */
export function formatOklch({ l, c, h, alpha }: Oklch): string {
  const base = `${round(l, 3)} ${round(c, 4)} ${round(h, 2)}`;
  return alpha === undefined || alpha >= 1
    ? `oklch(${base})`
    : `oklch(${base} / ${round(alpha, 3)})`;
}

/**
 * Formats an OKLCH color as a hex string, clamping into sRGB first.
 * Used for the docs site's copy-to-clipboard and for tooling that predates
 * `oklch()` support — never for the emitted tokens themselves.
 */
export function formatHex(color: Oklch): string {
  const { r, g, b, alpha } = clampSrgb(oklchToSrgb(color));
  const hex = (channel: number) =>
    Math.round(channel * 255)
      .toString(16)
      .padStart(2, '0');

  const rgb = `#${hex(r)}${hex(g)}${hex(b)}`;
  return alpha === undefined || alpha >= 1 ? rgb : `${rgb}${hex(alpha)}`;
}
