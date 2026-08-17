import { formatOklch } from './format.js';
import { gamutMap } from './gamut.js';
import { parseColorOrThrow } from './parse.js';
import { type ColorScale, type Oklch, SCALE_STEPS, type ScaleStep } from './types.js';

/**
 * The lightness ramp. Identical for every hue — that is the whole reason the
 * engine works in OKLCH. In HSL this table would need retuning per hue because
 * `L` there does not track perceived brightness.
 */
const LIGHTNESS: Record<ScaleStep, number> = {
  50: 0.971,
  100: 0.936,
  200: 0.885,
  300: 0.811,
  // biome-ignore lint/suspicious/noApproximativeNumericConstant: a lightness step, not 1/√2
  400: 0.707,
  500: 0.606,
  600: 0.541,
  700: 0.491,
  800: 0.432,
  900: 0.379,
  950: 0.283,
};

/**
 * Chroma multipliers relative to the seed's own chroma. Peaks just past the
 * middle and falls off at both ends, so the light steps read as tints rather
 * than washed-out mid-tones and the dark steps do not turn to mud.
 *
 * Scaling by the *seed's* chroma is what keeps a muted brand muted: a desaturated
 * seed produces a desaturated scale instead of being normalised to full vividness.
 */
const CHROMA: Record<ScaleStep, number> = {
  50: 0.07,
  100: 0.14,
  200: 0.26,
  300: 0.44,
  400: 0.72,
  500: 1,
  600: 1.02,
  700: 0.95,
  800: 0.82,
  900: 0.7,
  950: 0.5,
};

export interface GenerateScaleOptions {
  /**
   * Rotates hue linearly across the ramp, in degrees end-to-end. `-6` warms the
   * light end and cools the dark end. Off by default: it makes output harder for
   * consumers to predict, and predictability is worth more than the flourish.
   */
  hueShift?: number;
  /**
   * Multiplies the whole chroma curve. `0.15` yields a tinted neutral that still
   * belongs to the brand hue; `0` yields pure gray.
   */
  chroma?: number;
  /**
   * Overrides the chroma the curve is scaled by. Defaults to the seed's own
   * chroma, which is what makes a muted seed produce a muted scale.
   */
  baseChroma?: number;
}

/** Generates the eleven OKLCH steps of a scale, unformatted. */
export function generateScaleColors(
  seed: string | Oklch,
  options: GenerateScaleOptions = {},
): Record<ScaleStep, Oklch> {
  const { hueShift = 0, chroma = 1, baseChroma } = options;
  const parsed = typeof seed === 'string' ? parseColorOrThrow(seed) : seed;

  const reference = baseChroma ?? parsed.c;
  const steps = {} as Record<ScaleStep, Oklch>;

  SCALE_STEPS.forEach((step, index) => {
    // -0.5 → +0.5 across the ramp, so a hueShift of N spans N degrees total.
    const position = index / (SCALE_STEPS.length - 1) - 0.5;

    steps[step] = gamutMap({
      l: LIGHTNESS[step],
      c: Math.max(0, reference * CHROMA[step] * chroma),
      h: (((parsed.h + hueShift * position) % 360) + 360) % 360,
    });
  });

  return steps;
}

/**
 * Generates a perceptually uniform 11-step scale from a single seed color.
 *
 * ```ts
 * generateScale('#6D4AFF');
 * // → { 50: 'oklch(0.971 0.0139 285.1)', … 500: 'oklch(0.606 0.1983 285.1)', … }
 * ```
 *
 * Every step is gamut-mapped into sRGB by lowering chroma only, so the lightness
 * ramp holds exactly regardless of hue.
 */
export function generateScale(
  seed: string | Oklch,
  options: GenerateScaleOptions = {},
): ColorScale {
  const colors = generateScaleColors(seed, options);
  const scale = {} as ColorScale;

  for (const step of SCALE_STEPS) {
    scale[step] = formatOklch(colors[step]);
  }
  return scale;
}

/**
 * Generates the neutral ramp. Neutrals carry a trace of the brand hue rather
 * than being pure gray — it is what makes surfaces feel part of the same system
 * instead of a UI kit with a brand color dropped on top.
 */
export function generateNeutralScale(
  seed: string | Oklch,
  options: Omit<GenerateScaleOptions, 'chroma' | 'baseChroma'> & { tint?: number } = {},
): ColorScale {
  const { tint = 0.012, ...rest } = options;
  return generateScale(seed, { ...rest, baseChroma: tint, chroma: 1 });
}
