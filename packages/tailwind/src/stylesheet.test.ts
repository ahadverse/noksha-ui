import { DEFAULT_BRAND } from '@noksha-ui/tokens';
import { describe, expect, it } from 'vitest';

import { emitStylesheet } from './stylesheet.js';
import { emitToneLayer, TONE_NAMES, TONE_PREFIXES, TONE_SLOTS, toneSlotValue } from './tone.js';

describe('toneSlotValue', () => {
  it('resolves every slot of every tone to a single token reference', () => {
    for (const tone of TONE_NAMES) {
      for (const slot of TONE_SLOTS) {
        expect(toneSlotValue(tone, slot), `${tone}/${slot}`).toMatch(/^var\(--noksha-[a-z-]+\)$/);
      }
    }
  });

  it("maps `ink` to the token's on-solid pair", () => {
    expect(toneSlotValue('danger', 'ink')).toBe('var(--noksha-danger-on-solid)');
  });

  /**
   * Neutral has no status ramp behind it, so it is the one tone that could
   * silently come back undefined if it were derived rather than tabulated.
   */
  it('fills neutral from the surface tokens rather than a ramp', () => {
    expect(toneSlotValue('neutral', 'solid')).toBe('var(--noksha-bg-inverse)');
    expect(toneSlotValue('neutral', 'solid')).not.toContain('neutral-');
  });
});

describe('emitToneLayer', () => {
  const layer = emitToneLayer();

  it('emits one rule per namespace × tone', () => {
    const rules = layer.match(/\.noksha-tone-[a-z-]+ \{/g) ?? [];
    expect(rules).toHaveLength(TONE_PREFIXES.length * TONE_NAMES.length);
  });

  it('declares all seven slots in each rule', () => {
    const rule = layer.slice(layer.indexOf('.noksha-tone-btn-accent'));
    const body = rule.slice(0, rule.indexOf('}'));

    for (const slot of TONE_SLOTS) expect(body).toContain(`--btn-${slot}:`);
  });

  /** The layer is what keeps a caller's own `bg-*` utility winning without `!important`. */
  it('stays inside the components layer', () => {
    expect(layer.startsWith('@layer components {')).toBe(true);
  });
});

describe('emitStylesheet', () => {
  const css = emitStylesheet();

  it('carries every part a consumer needs in one file', () => {
    expect(css).toContain(':root {');
    expect(css).toContain('@theme inline {');
    expect(css).toContain('@keyframes noksha-in');
    expect(css).toContain('.noksha-tone-btn-accent');
    expect(css).toContain('@layer base {');
  });

  it('omits the @source directive when no paths are given', () => {
    expect(css).not.toContain('@source');
    expect(emitStylesheet({ sources: ['./'] })).toContain('@source "./";');
  });

  it('registers each source path on its own line', () => {
    const withSources = emitStylesheet({ sources: ['../components/ui', './app'] });
    expect(withSources).toContain('@source "../components/ui";\n@source "./app";');
  });

  it('takes a custom banner', () => {
    expect(emitStylesheet({ banner: '/* mine */' }).startsWith('/* mine */')).toBe(true);
  });

  /**
   * The reason the emitter is shared at all: `@noksha-ui/cli init` re-runs it
   * with the consumer's seed, and only the token block may differ. If a brand
   * leaked into the tone rules or the base layer, a second brand would cost a
   * fork of the stylesheet rather than one `:root` block.
   */
  it('confines the brand to the token block', () => {
    const mine = emitStylesheet({ brand: '#0EA5E9' });
    const theirs = emitStylesheet({ brand: DEFAULT_BRAND });
    // Not named `after`: Biome reads that as the test hook of the same name.
    const beyondTokens = (css: string) => css.slice(css.indexOf('@theme inline {'));

    expect(mine).not.toBe(theirs);
    expect(beyondTokens(mine)).toBe(beyondTokens(theirs));
  });

  it('defaults to the library brand', () => {
    expect(emitStylesheet()).toBe(emitStylesheet({ brand: DEFAULT_BRAND }));
  });
});
