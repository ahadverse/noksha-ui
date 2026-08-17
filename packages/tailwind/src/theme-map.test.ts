import { emitThemeCss, TONES } from '@prism-ui/tokens';
import { describe, expect, it } from 'vitest';
import { emitTailwindTheme, preset } from './index.js';
import {
  colorMap,
  radiusMap,
  shadowMap,
  spacingMap,
  themeMap,
  typographyMap,
} from './theme-map.js';

/**
 * The theme map is a bridge: every value it emits has to name a token the engine
 * actually produces. A typo here is invisible at build time — Tailwind happily
 * generates `bg-canvas` pointing at a variable nobody defines, and the consumer
 * gets a transparent background. So the contract is tested against the real CSS.
 */
const emitted = emitThemeCss({ brand: '#6D4AFF' });

/** Every `--prism-*` custom property the generated stylesheet declares. */
const declared = new Set(
  Array.from(emitted.matchAll(/(--prism-[\w-]+)\s*:/g), (match) => match[1] as string),
);

function referencedTokens(map: Record<string, string>): string[] {
  return Object.values(map).flatMap((value) =>
    Array.from(value.matchAll(/var\((--prism-[\w-]+)\)/g), (match) => match[1] as string),
  );
}

describe('themeMap', () => {
  it('only references tokens the engine emits', () => {
    const missing = referencedTokens(themeMap).filter((token) => !declared.has(token));
    expect(missing).toEqual([]);
  });

  it('maps every Tailwind key to a prism variable, never to a literal', () => {
    for (const [key, value] of Object.entries(themeMap)) {
      expect(key, `${key} must be a CSS custom property`).toMatch(/^--/);
      expect(value, `${key} must indirect through a prism token`).toMatch(
        /^var\(--prism-[\w-]+\)$/,
      );
    }
  });

  it('gives every tone the full seven-slot surface', () => {
    for (const tone of TONES) {
      for (const slot of ['', '-hover', '-active', '-subtle', '-subtle-hover', '-fg', '-ink']) {
        expect(colorMap).toHaveProperty(`--color-${tone}${slot}`);
      }
    }
  });

  it('composes without a key from one group shadowing another', () => {
    const groups = [colorMap, radiusMap, typographyMap, shadowMap, spacingMap];
    const total = groups.reduce((sum, group) => sum + Object.keys(group).length, 0);

    // motionMap is the sixth group; counted separately so the failure message
    // points at which pair collided rather than at an off-by-one.
    expect(Object.keys(themeMap).length).toBeGreaterThanOrEqual(total);
  });
});

describe('emitTailwindTheme', () => {
  it('emits an inline @theme block', () => {
    const css = emitTailwindTheme();

    // `inline` is what makes .dark repaint every utility — see the doc comment
    // on emitTailwindTheme. Without it dark mode needs a second utility set.
    expect(css.startsWith('@theme inline {')).toBe(true);
    expect(css.trimEnd().endsWith('}')).toBe(true);
  });

  it('emits one declaration per theme key', () => {
    const declarations = emitTailwindTheme().match(/^\s+--[\w-]+:/gm) ?? [];
    expect(declarations).toHaveLength(Object.keys(themeMap).length);
  });
});

describe('preset (Tailwind v3)', () => {
  it('exposes the same semantic surface as the v4 theme', () => {
    const colors = preset.theme.extend.colors as Record<string, unknown>;

    expect(Object.keys(colors)).toEqual(
      expect.arrayContaining(['canvas', 'surface', 'fg', 'line', 'ring', ...TONES]),
    );
  });

  it('only references tokens the engine emits', () => {
    const values: string[] = [];
    const walk = (node: unknown) => {
      if (typeof node === 'string') values.push(node);
      else if (node && typeof node === 'object') Object.values(node).forEach(walk);
    };
    walk(preset.theme.extend);

    const missing = Array.from(
      new Set(
        values.flatMap((v) =>
          Array.from(v.matchAll(/var\((--prism-[\w-]+)\)/g), (m) => m[1] as string),
        ),
      ),
    ).filter((token) => !declared.has(token));

    expect(missing).toEqual([]);
  });
});
