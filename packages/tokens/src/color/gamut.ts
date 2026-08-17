import { oklchToSrgb } from './convert.js';
import type { Oklch } from './types.js';

/** Half a 16-bit step — below this, rounding to 8-bit output hides the excursion. */
const EPSILON = 1 / 512;

/** Whether every channel of `color` lands inside sRGB. */
export function inSrgbGamut(color: Oklch): boolean {
  const { r, g, b } = oklchToSrgb(color);
  return (
    r >= -EPSILON &&
    r <= 1 + EPSILON &&
    g >= -EPSILON &&
    g <= 1 + EPSILON &&
    b >= -EPSILON &&
    b <= 1 + EPSILON
  );
}

/**
 * Reduces chroma until `color` is representable in sRGB, preserving lightness
 * and hue exactly. This is the CSS Color 4 approach minus the ΔE early-exit —
 * holding L constant matters more here than the last fraction of chroma, because
 * the whole scale depends on a predictable lightness ramp.
 *
 * Returns the input untouched when it is already in gamut.
 */
export function gamutMap(color: Oklch): Oklch {
  if (inSrgbGamut(color)) return color;

  // Pure black and white are in gamut at zero chroma; anything outside that
  // lightness range cannot be rescued by dropping chroma.
  if (color.l <= 0) return { ...color, l: 0, c: 0 };
  if (color.l >= 1) return { ...color, l: 1, c: 0 };

  let low = 0;
  let high = color.c;

  // 20 iterations resolves chroma to ~4e-7 — far below display precision.
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    if (inSrgbGamut({ ...color, c: mid })) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return { ...color, c: low };
}

/** The largest in-gamut chroma for a given lightness and hue. */
export function maxChroma(l: number, h: number): number {
  return gamutMap({ l, c: 0.4, h }).c;
}
