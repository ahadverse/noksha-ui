import type { Oklab, Oklch, Srgb } from './types.js';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Gamma-encoded sRGB channel → linear-light. */
export function gammaToLinear(channel: number): number {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/** Linear-light channel → gamma-encoded sRGB. */
export function linearToGamma(channel: number): number {
  return channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055;
}

/**
 * Linear sRGB → OKLab, using Björn Ottosson's matrices.
 * @see https://bottosson.github.io/posts/oklab/
 */
export function linearSrgbToOklab({ r, g, b, alpha }: Srgb): Oklab {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.629978763 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    l: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
    ...(alpha === undefined ? {} : { alpha }),
  };
}

/** OKLab → linear sRGB. Channels may fall outside 0–1 when the color is out of gamut. */
export function oklabToLinearSrgb({ l, a, b, alpha }: Oklab): Srgb {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const lc = l_ * l_ * l_;
  const mc = m_ * m_ * m_;
  const sc = s_ * s_ * s_;

  return {
    r: 4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc,
    g: -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc,
    b: -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc,
    ...(alpha === undefined ? {} : { alpha }),
  };
}

export function oklabToOklch({ l, a, b, alpha }: Oklab): Oklch {
  const c = Math.sqrt(a * a + b * b);
  // Below this chroma the hue angle is numerical noise; pin it to 0 so neutrals
  // round-trip to a stable value instead of a random direction.
  const h = c < 1e-6 ? 0 : ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
  return { l, c, h, ...(alpha === undefined ? {} : { alpha }) };
}

export function oklchToOklab({ l, c, h, alpha }: Oklch): Oklab {
  const rad = (h * Math.PI) / 180;
  return {
    l,
    a: c * Math.cos(rad),
    b: c * Math.sin(rad),
    ...(alpha === undefined ? {} : { alpha }),
  };
}

/** Gamma-encoded sRGB → OKLCH. */
export function srgbToOklch({ r, g, b, alpha }: Srgb): Oklch {
  return oklabToOklch(
    linearSrgbToOklab({
      r: gammaToLinear(r),
      g: gammaToLinear(g),
      b: gammaToLinear(b),
      ...(alpha === undefined ? {} : { alpha }),
    }),
  );
}

/**
 * OKLCH → gamma-encoded sRGB. Channels are returned unclamped so callers can
 * test for gamut membership; use {@link clampSrgb} once that check is done.
 */
export function oklchToSrgb(color: Oklch): Srgb {
  const linear = oklabToLinearSrgb(oklchToOklab(color));
  return {
    r: linearToGamma(linear.r),
    g: linearToGamma(linear.g),
    b: linearToGamma(linear.b),
    ...(linear.alpha === undefined ? {} : { alpha: linear.alpha }),
  };
}

export function clampSrgb({ r, g, b, alpha }: Srgb): Srgb {
  return {
    r: clamp(r, 0, 1),
    g: clamp(g, 0, 1),
    b: clamp(b, 0, 1),
    ...(alpha === undefined ? {} : { alpha: clamp(alpha, 0, 1) }),
  };
}
