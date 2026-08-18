import { describe, expect, it } from 'vitest';
import { contrastRatio, parseColorOrThrow } from '../color/index.js';
import { cssVar, emitThemeCss, emitThemeOverride, varName } from './css.js';
import { scaleTokens } from './scales.js';
import { buildTheme, DEFAULT_BRAND, TONES } from './semantic.js';

const theme = buildTheme({ brand: DEFAULT_BRAND });

describe('buildTheme', () => {
  it('gives light and dark the identical token set', () => {
    expect(Object.keys(theme.light).sort()).toEqual(Object.keys(theme.dark).sort());
  });

  it('gives every tone the same seven-slot shape', () => {
    const slots = [
      'solid',
      'solid-hover',
      'solid-active',
      'subtle',
      'subtle-hover',
      'fg',
      'on-solid',
    ];

    for (const tone of TONES) {
      for (const slot of slots) {
        expect(theme.light).toHaveProperty(`${tone}-${slot}`);
        expect(theme.dark).toHaveProperty(`${tone}-${slot}`);
      }
    }
  });

  it('keeps on-solid readable against its own solid in both modes', () => {
    for (const tone of TONES) {
      for (const mode of ['light', 'dark'] as const) {
        const solid = parseColorOrThrow(theme[mode][`${tone}-solid`] as string);
        const ink = parseColorOrThrow(theme[mode][`${tone}-on-solid`] as string);

        expect(
          contrastRatio(solid, ink),
          `${tone}-on-solid in ${mode} must clear WCAG AA`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it('keeps body text readable against the canvas in both modes', () => {
    for (const mode of ['light', 'dark'] as const) {
      const canvas = parseColorOrThrow(theme[mode]['bg-canvas'] as string);

      expect(
        contrastRatio(canvas, parseColorOrThrow(theme[mode]['fg-default'] as string)),
      ).toBeGreaterThanOrEqual(7);
      expect(
        contrastRatio(canvas, parseColorOrThrow(theme[mode]['fg-muted'] as string)),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('inverts surface ordering between light and dark', () => {
    const l = (mode: 'light' | 'dark', token: string) =>
      parseColorOrThrow(theme[mode][token] as string).l;

    expect(l('light', 'bg-canvas')).toBeGreaterThan(l('light', 'bg-muted'));
    expect(l('dark', 'bg-canvas')).toBeLessThan(l('dark', 'bg-muted'));
  });

  it('tints neutrals with the brand hue instead of using pure gray', () => {
    const brandHue = parseColorOrThrow(DEFAULT_BRAND).h;
    const surface = parseColorOrThrow(theme.light['bg-subtle'] as string);

    expect(surface.c).toBeGreaterThan(0);
    expect(surface.c).toBeLessThan(0.03);
    expect(surface.h).toBeCloseTo(brandHue, 1);
  });

  it('drops the tint entirely at neutralTint: 0', () => {
    const gray = buildTheme({ brand: DEFAULT_BRAND, neutralTint: 0 });
    expect(parseColorOrThrow(gray.light['bg-subtle'] as string).c).toBe(0);
  });

  it('follows the brand seed — rebranding is one declaration', () => {
    const sky = buildTheme({ brand: '#0EA5E9' });
    const skyHue = parseColorOrThrow('#0EA5E9').h;

    expect(parseColorOrThrow(sky.light['accent-solid'] as string).h).toBeCloseTo(skyHue, 1);
    // Status tones are independent of the brand and must not drift with it.
    expect(sky.light['danger-solid']).toBe(theme.light['danger-solid']);
  });

  it('lets a status tone be overridden on its own', () => {
    const custom = buildTheme({ brand: DEFAULT_BRAND, danger: '#B91C1C' });
    expect(custom.light['danger-solid']).not.toBe(theme.light['danger-solid']);
    expect(custom.light['accent-solid']).toBe(theme.light['accent-solid']);
  });

  it('derives ring and focus border from the accent', () => {
    expect(theme.light.ring).toBe(theme.light['accent-solid']);
    expect(theme.light['border-focus']).toBe(theme.light['accent-solid']);
  });

  it('exposes primitives for every tone and the neutral ramp', () => {
    for (const tone of [...TONES, 'neutral']) {
      expect(theme.primitives[`${tone}-500`]).toMatch(/^oklch\(/);
    }
  });

  it('clears AA for real brand colors right around the hue wheel', () => {
    const brands = [
      '#6D4AFF', // violet
      '#635BFF', // indigo
      '#0EA5E9', // sky
      '#1DB954', // green
      '#F24E1E', // orange
      '#FF00AA', // magenta
      '#FF0000', // pure red
      '#FFFF00', // pure yellow
      '#00FFFF', // pure cyan
      '#000000', // achromatic
    ];

    for (const brand of brands) {
      expect(() => buildTheme({ brand, strictContrast: true }), brand).not.toThrow();
    }
  });

  it('throws under strictContrast when the bar cannot be met', () => {
    // AAA (7:1) is unreachable for a mid-ramp solid whatever the hue, so this
    // exercises the guard without depending on a knife-edge seed color.
    expect(() =>
      buildTheme({ brand: DEFAULT_BRAND, strictContrast: true, contrastLevel: 'AAA' }),
    ).toThrow(/WCAG AAA needs 7:1/);
  });

  it('still returns a theme when strictContrast is off', () => {
    const loose = buildTheme({ brand: DEFAULT_BRAND, contrastLevel: 'AAA' });
    expect(loose.light['accent-on-solid']).toMatch(/^oklch\(/);
  });
});

describe('emitThemeCss', () => {
  const css = emitThemeCss({ brand: DEFAULT_BRAND });

  it('writes light at :root', () => {
    expect(css).toContain(':root {');
    expect(css).toContain('--noksha-bg-canvas:');
  });

  it('covers all three dark selectors', () => {
    expect(css).toContain(':root.dark');
    expect(css).toContain("[data-theme='dark']");
    expect(css).toContain('@media (prefers-color-scheme: dark)');
  });

  it('lets an explicit light choice beat the OS preference', () => {
    expect(css).toContain(":root:not(.light):not([data-theme='light'])");
  });

  it('scopes the markers to any element, not only :root', () => {
    // An app that puts the class on <body> or on a layout wrapper is normal;
    // a rule written only against :root would leave every one of them light.
    expect(css).toMatch(/^\.dark,$/m);
    expect(css).toMatch(/^\.light,$/m);
  });

  it('re-asserts light after dark, so a light island wins', () => {
    const dark = css.indexOf(':root.dark');
    const light = css.indexOf(':root.light');
    expect(dark).toBeGreaterThan(-1);
    expect(light).toBeGreaterThan(dark);
  });

  it('gives the scoped light block the same tokens as :root', () => {
    const scoped = css.slice(css.indexOf(':root.light'));
    const block = scoped.slice(0, scoped.indexOf('}'));
    expect(block).toContain('--noksha-bg-canvas:');
    expect(block).toContain('--noksha-shadow-md:');
  });

  it('includes the scale tokens and the reduced-motion override', () => {
    expect(css).toContain('--noksha-radius-base:');
    expect(css).toContain('--noksha-density:');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toMatch(/--noksha-duration-normal:\s*0ms/);
  });

  it('omits Layer 1 unless asked — components never read it', () => {
    expect(css).not.toContain('--noksha-accent-500:');
    expect(emitThemeCss({ brand: DEFAULT_BRAND, includePrimitives: true })).toContain(
      '--noksha-accent-500:',
    );
  });

  it('emits a scoped override with both modes', () => {
    const override = emitThemeOverride('.theme-sky', { brand: '#0EA5E9' });
    expect(override).toContain('.theme-sky {');
    expect(override).toContain(".theme-sky.dark, .theme-sky[data-theme='dark']");
  });

  it('produces balanced braces', () => {
    expect(css.split('{').length).toBe(css.split('}').length);
  });

  it('checks contrast strictly by default — a bad seed stops the build', () => {
    expect(() => emitThemeCss({ brand: DEFAULT_BRAND, contrastLevel: 'AAA' })).toThrow(/WCAG AAA/);
    expect(() =>
      emitThemeCss({ brand: DEFAULT_BRAND, contrastLevel: 'AAA', strictContrast: false }),
    ).not.toThrow();
  });
});

describe('token naming', () => {
  it('prefixes every variable', () => {
    expect(varName('bg-canvas')).toBe('--noksha-bg-canvas');
    expect(cssVar('bg-canvas')).toBe('var(--noksha-bg-canvas)');
    expect(cssVar('bg-canvas', 'white')).toBe('var(--noksha-bg-canvas, white)');
  });

  it('drives every control size off --noksha-density', () => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      expect(scaleTokens[`control-h-${size}`]).toContain('var(--noksha-density)');
      expect(scaleTokens[`control-px-${size}`]).toContain('var(--noksha-density)');
    }
  });

  it('drives every radius off --noksha-radius-base', () => {
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
      expect(scaleTokens[`radius-${size}`]).toContain('var(--noksha-radius-base)');
    }
  });
});
