import { describe, expect, it } from 'vitest';
import { contrastRatio, readableOn, relativeLuminance } from './contrast.js';
import { oklchToSrgb, srgbToOklch } from './convert.js';
import { formatHex, formatOklch } from './format.js';
import { gamutMap, inSrgbGamut, maxChroma } from './gamut.js';
import { parseColor, parseColorOrThrow } from './parse.js';
import { generateNeutralScale, generateScale, generateScaleColors } from './scale.js';
import { SCALE_STEPS } from './types.js';

describe('conversion', () => {
  // Reference values from Björn Ottosson's OKLab reference implementation.
  it.each([
    ['white', { r: 1, g: 1, b: 1 }, 1],
    ['black', { r: 0, g: 0, b: 0 }, 0],
    ['mid gray', { r: 0.5, g: 0.5, b: 0.5 }, 0.5981],
  ])('maps %s to the expected lightness', (_label, srgb, expectedL) => {
    expect(srgbToOklch(srgb).l).toBeCloseTo(expectedL, 3);
  });

  it('leaves achromatic colors at zero chroma', () => {
    const gray = srgbToOklch({ r: 0.5, g: 0.5, b: 0.5 });
    expect(gray.c).toBeLessThan(1e-6);
    // Hue is meaningless at zero chroma; it must be pinned, not left as noise.
    expect(gray.h).toBe(0);
  });

  it('round-trips sRGB through OKLCH', () => {
    for (const channel of [
      { r: 0.427, g: 0.29, b: 1 },
      { r: 0.9, g: 0.28, b: 0.3 },
      { r: 0.05, g: 0.64, b: 0.42 },
    ]) {
      const back = oklchToSrgb(srgbToOklch(channel));
      expect(back.r).toBeCloseTo(channel.r, 6);
      expect(back.g).toBeCloseTo(channel.g, 6);
      expect(back.b).toBeCloseTo(channel.b, 6);
    }
  });

  it('preserves alpha through a round trip', () => {
    expect(srgbToOklch({ r: 0.2, g: 0.4, b: 0.6, alpha: 0.5 }).alpha).toBe(0.5);
  });
});

describe('parseColor', () => {
  it('parses every supported notation to the same color', () => {
    const fromHex = parseColorOrThrow('#6D4AFF');
    const fromShort = parseColorOrThrow('#63f');
    const fromRgb = parseColorOrThrow('rgb(109, 74, 255)');
    const fromOklch = parseColorOrThrow(formatOklch(fromHex));

    expect(fromRgb.l).toBeCloseTo(fromHex.l, 6);
    expect(fromRgb.h).toBeCloseTo(fromHex.h, 4);
    // #63f expands to #6633ff, a different color — only the notation is shorthand.
    expect(fromShort.h).toBeCloseTo(parseColorOrThrow('#6633ff').h, 6);
    expect(fromOklch.l).toBeCloseTo(fromHex.l, 3);
  });

  it('handles a missing leading hash and mixed case', () => {
    expect(parseColor('6d4aff')).not.toBeNull();
    expect(parseColor('#6D4AFF')).not.toBeNull();
  });

  it('reads alpha from #rrggbbaa and rgba()', () => {
    expect(parseColorOrThrow('#6D4AFF80').alpha).toBeCloseTo(128 / 255, 4);
    expect(parseColorOrThrow('rgba(109, 74, 255, 0.5)').alpha).toBeCloseTo(0.5, 6);
  });

  it('reads the modern slash syntax and percentage chroma', () => {
    expect(parseColorOrThrow('oklch(0.6 0.2 285 / 0.4)').alpha).toBeCloseTo(0.4, 6);
    // CSS Color 4 defines 100% chroma as 0.4.
    expect(parseColorOrThrow('oklch(0.6 50% 285)').c).toBeCloseTo(0.2, 6);
  });

  it('returns null rather than a wrong color for junk', () => {
    for (const junk of ['', 'not-a-color', '#12345', 'rgb(1, 2)', 'hsl(200 50% 50%)']) {
      expect(parseColor(junk)).toBeNull();
    }
  });

  it('throws with the offending input in the message', () => {
    expect(() => parseColorOrThrow('nope')).toThrow(/nope/);
  });
});

describe('gamut mapping', () => {
  it('leaves in-gamut colors untouched', () => {
    const inside = { l: 0.6, c: 0.05, h: 285 };
    expect(gamutMap(inside)).toEqual(inside);
  });

  it('pulls impossible chroma back into sRGB', () => {
    const impossible = { l: 0.6, c: 0.4, h: 285 };
    const mapped = gamutMap(impossible);

    expect(mapped.c).toBeLessThan(impossible.c);
    expect(inSrgbGamut(mapped)).toBe(true);
  });

  it('holds lightness and hue exactly while mapping', () => {
    const mapped = gamutMap({ l: 0.42, c: 0.39, h: 142 });
    expect(mapped.l).toBe(0.42);
    expect(mapped.h).toBe(142);
  });

  it('collapses chroma at the extremes of lightness', () => {
    expect(gamutMap({ l: 0, c: 0.3, h: 285 }).c).toBe(0);
    expect(gamutMap({ l: 1, c: 0.3, h: 285 }).c).toBe(0);
  });

  it('reports a positive max chroma for every hue', () => {
    for (let h = 0; h < 360; h += 15) {
      expect(maxChroma(0.6, h)).toBeGreaterThan(0);
    }
  });
});

describe('contrast', () => {
  const white = { l: 1, c: 0, h: 0 };
  const black = { l: 0, c: 0, h: 0 };

  it('matches the WCAG anchor values', () => {
    expect(relativeLuminance(white)).toBeCloseTo(1, 6);
    expect(relativeLuminance(black)).toBeCloseTo(0, 6);
    expect(contrastRatio(white, black)).toBeCloseTo(21, 4);
  });

  it('is symmetric', () => {
    const violet = parseColorOrThrow('#6D4AFF');
    expect(contrastRatio(violet, white)).toBeCloseTo(contrastRatio(white, violet), 10);
  });

  it('picks white ink on a dark surface and dark ink on a light one', () => {
    expect(readableOn(parseColorOrThrow('#1a1a2e')).color.l).toBeGreaterThan(0.9);
    expect(readableOn(parseColorOrThrow('#FFE066')).color.l).toBeLessThan(0.2);
  });

  it('always finds a readable ink when the candidates are pure white and black', () => {
    // No gray defeats both extremes — which is why the theme builder pins its
    // dark ink near black rather than at a softer l: 0.17.
    for (let l = 0; l <= 1; l += 0.01) {
      expect(readableOn({ l, c: 0, h: 0 }).passes, `l=${l.toFixed(2)}`).toBe(true);
    }
  });

  it('flags the failure and returns the best candidate rather than a wrong one', () => {
    const result = readableOn(
      { l: 0.55, c: 0, h: 0 },
      {
        candidates: [
          { l: 0.5, c: 0, h: 0 },
          { l: 0.62, c: 0, h: 0 },
        ],
      },
    );

    expect(result.passes).toBe(false);
    // Neither clears AA, so it falls back to the highest ratio rather than the
    // first candidate — luminance rises faster than lightness, so 0.62 wins.
    expect(result.color.l).toBe(0.62);
    expect(result.ratio).toBeGreaterThan(1);
  });

  it('honours a stricter level', () => {
    // ~5.5:1 against white: clears AA, misses AAA.
    const dimGray = { l: 0.52, c: 0, h: 0 };
    expect(readableOn(dimGray, { candidates: [{ l: 1, c: 0, h: 0 }], level: 'AA' }).passes).toBe(
      true,
    );
    expect(readableOn(dimGray, { candidates: [{ l: 1, c: 0, h: 0 }], level: 'AAA' }).passes).toBe(
      false,
    );
  });

  it('rejects an empty candidate list instead of returning nothing', () => {
    expect(() => readableOn(white, { candidates: [] })).toThrow(/at least one candidate/);
  });
});

describe('generateScale', () => {
  const scale = generateScale('#6D4AFF');
  const colors = generateScaleColors('#6D4AFF');

  it('returns all eleven steps as oklch() strings', () => {
    expect(Object.keys(scale).map(Number)).toEqual([...SCALE_STEPS]);
    for (const step of SCALE_STEPS) {
      expect(scale[step]).toMatch(/^oklch\(/);
    }
  });

  it('descends in lightness monotonically', () => {
    const lightness = SCALE_STEPS.map((step) => colors[step].l);
    for (let i = 1; i < lightness.length; i++) {
      expect(lightness[i]).toBeLessThan(lightness[i - 1] as number);
    }
  });

  it('peaks chroma in the middle of the ramp', () => {
    const chroma = SCALE_STEPS.map((step) => colors[step].c);
    const peak = chroma.indexOf(Math.max(...chroma));
    // Steps 500 and 600 are indices 5 and 6.
    expect(peak).toBeGreaterThanOrEqual(5);
    expect(peak).toBeLessThanOrEqual(6);
  });

  it('keeps every step inside sRGB', () => {
    for (const step of SCALE_STEPS) {
      expect(inSrgbGamut(colors[step])).toBe(true);
    }
  });

  it('holds one lightness ramp across every hue — the reason for OKLCH', () => {
    const reference = SCALE_STEPS.map((step) => generateScaleColors('#6D4AFF')[step].l);

    for (const seed of ['#E5484D', '#30A46C', '#F5A524', '#0091FF']) {
      const other = generateScaleColors(seed);
      SCALE_STEPS.forEach((step, i) => {
        expect(other[step].l).toBeCloseTo(reference[i] as number, 10);
      });
    }
  });

  it('keeps a muted seed muted', () => {
    const vivid = generateScaleColors('oklch(0.606 0.198 285)');
    const muted = generateScaleColors('oklch(0.606 0.04 285)');
    expect(muted[500].c).toBeLessThan(vivid[500].c / 3);
  });

  it('leaves hue fixed by default and rotates it only when asked', () => {
    const flat = generateScaleColors('#6D4AFF');
    expect(flat[50].h).toBeCloseTo(flat[950].h, 6);

    // hueShift is the total rotation from the light end to the dark end.
    const shifted = generateScaleColors('#6D4AFF', { hueShift: -12 });
    expect(shifted[950].h - shifted[50].h).toBeCloseTo(-12, 4);
    expect(shifted[500].h).toBeCloseTo(flat[500].h, 1);
  });

  it('produces near-gray neutrals that still carry the brand hue', () => {
    const neutral = generateNeutralScale('#6D4AFF');
    const parsed = parseColorOrThrow(neutral[500]);
    expect(parsed.c).toBeLessThan(0.02);
    expect(parsed.h).toBeCloseTo(parseColorOrThrow('#6D4AFF').h, 1);
  });

  it('accepts an already-parsed color as the seed', () => {
    expect(generateScale(parseColorOrThrow('#6D4AFF'))).toEqual(scale);
  });
});

describe('formatting', () => {
  it('omits alpha when opaque and includes it when not', () => {
    expect(formatOklch({ l: 0.6, c: 0.2, h: 285 })).toBe('oklch(0.6 0.2 285)');
    expect(formatOklch({ l: 0.6, c: 0.2, h: 285, alpha: 1 })).toBe('oklch(0.6 0.2 285)');
    expect(formatOklch({ l: 0.6, c: 0.2, h: 285, alpha: 0.5 })).toBe('oklch(0.6 0.2 285 / 0.5)');
  });

  it('never emits negative zero', () => {
    expect(formatOklch({ l: 0, c: 0, h: -0 })).toBe('oklch(0 0 0)');
  });

  it('round-trips a hex seed back to itself', () => {
    expect(formatHex(parseColorOrThrow('#6d4aff'))).toBe('#6d4aff');
  });
});
