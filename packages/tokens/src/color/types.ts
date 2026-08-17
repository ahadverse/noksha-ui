/** A color in the OKLCH cylindrical space. */
export interface Oklch {
  /** Perceived lightness, 0 (black) → 1 (white). */
  l: number;
  /** Chroma — unbounded in theory, ~0.37 max inside sRGB. */
  c: number;
  /** Hue angle in degrees, 0–360. */
  h: number;
  /** Alpha, 0–1. Defaults to 1 when omitted. */
  alpha?: number;
}

/** A color in the OKLab cartesian space. */
export interface Oklab {
  l: number;
  a: number;
  b: number;
  alpha?: number;
}

/** Gamma-encoded sRGB, each channel 0–1. */
export interface Srgb {
  r: number;
  g: number;
  b: number;
  alpha?: number;
}

/** The eleven steps every generated scale carries. */
export const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export type ScaleStep = (typeof SCALE_STEPS)[number];

/** A generated scale: every step mapped to a CSS `oklch()` string. */
export type ColorScale = Record<ScaleStep, string>;
