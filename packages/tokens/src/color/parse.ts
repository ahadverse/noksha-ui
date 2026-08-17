import { srgbToOklch } from './convert.js';
import type { Oklch, Srgb } from './types.js';

const HEX = /^#?([0-9a-f]{3,8})$/i;
const RGB = /^rgba?\(\s*([^)]+)\)$/i;
const OKLCH = /^oklch\(\s*([^)]+)\)$/i;

/** Splits `a b c / d` or `a, b, c, d` into its components. */
function splitArgs(body: string): string[] {
  return body
    .replace(/\//g, ' ')
    .split(/[\s,]+/)
    .filter(Boolean);
}

/** Resolves `50%` → 0.5 and `0.5` → 0.5, relative to `full`. */
function toRatio(token: string, full: number): number {
  if (token.endsWith('%')) return Number.parseFloat(token) / 100;
  const n = Number.parseFloat(token);
  return Number.isNaN(n) ? Number.NaN : n / full;
}

function parseHex(hex: string): Srgb | null {
  const match = HEX.exec(hex.trim());
  if (!match?.[1]) return null;

  let digits = match[1];
  if (digits.length === 3 || digits.length === 4) {
    digits = digits
      .split('')
      .map((d) => d + d)
      .join('');
  }
  if (digits.length !== 6 && digits.length !== 8) return null;

  const int = Number.parseInt(digits, 16);
  if (Number.isNaN(int)) return null;

  if (digits.length === 6) {
    return { r: ((int >> 16) & 255) / 255, g: ((int >> 8) & 255) / 255, b: (int & 255) / 255 };
  }
  return {
    r: ((int >>> 24) & 255) / 255,
    g: ((int >>> 16) & 255) / 255,
    b: ((int >>> 8) & 255) / 255,
    alpha: (int & 255) / 255,
  };
}

function parseRgb(input: string): Srgb | null {
  const match = RGB.exec(input.trim());
  if (!match?.[1]) return null;

  const parts = splitArgs(match[1]);
  if (parts.length < 3) return null;

  const [r, g, b, a] = parts;
  const color: Srgb = {
    r: toRatio(r as string, 255),
    g: toRatio(g as string, 255),
    b: toRatio(b as string, 255),
  };
  if (a !== undefined) color.alpha = toRatio(a, 1);

  return Number.isNaN(color.r) || Number.isNaN(color.g) || Number.isNaN(color.b) ? null : color;
}

function parseOklch(input: string): Oklch | null {
  const match = OKLCH.exec(input.trim());
  if (!match?.[1]) return null;

  const parts = splitArgs(match[1]);
  if (parts.length < 3) return null;

  const [l, c, h, a] = parts;
  // Chroma is expressed as a percentage of 0.4 in CSS Color 4.
  const color: Oklch = {
    l: toRatio(l as string, 1),
    c: (c as string).endsWith('%')
      ? (Number.parseFloat(c as string) / 100) * 0.4
      : Number.parseFloat(c as string),
    h: Number.parseFloat((h as string).replace(/deg$/i, '')),
    ...(a === undefined ? {} : { alpha: toRatio(a, 1) }),
  };

  return Number.isNaN(color.l) || Number.isNaN(color.c) || Number.isNaN(color.h) ? null : color;
}

/**
 * Parses a CSS color string into OKLCH. Accepts `#rgb`, `#rrggbb`, `#rrggbbaa`,
 * `rgb()` / `rgba()`, and `oklch()`.
 *
 * @returns `null` when the input is not a supported format.
 */
export function parseColor(input: string): Oklch | null {
  const value = input.trim();

  const oklch = parseOklch(value);
  if (oklch) return oklch;

  const rgb = parseRgb(value) ?? parseHex(value);
  return rgb ? srgbToOklch(rgb) : null;
}

/** Like {@link parseColor}, but throws instead of returning `null`. */
export function parseColorOrThrow(input: string): Oklch {
  const parsed = parseColor(input);
  if (!parsed) {
    throw new TypeError(
      `[@prism-ui/tokens] Could not parse "${input}". Expected a hex, rgb() or oklch() color.`,
    );
  }
  return parsed;
}
