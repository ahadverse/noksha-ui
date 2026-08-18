import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { TONE_NAMES, TONE_PREFIXES, TONE_SLOTS, toneSlotValue } from '@noksha-ui/tailwind';
import { describe, expect, it } from 'vitest';
import { TONES, toneVariants, toneVars } from './tone.js';

const componentsDir = join(import.meta.dirname, '..', 'components');

describe('toneVars', () => {
  it('returns a static class name, not an interpolated utility', () => {
    expect(toneVars('btn', 'accent')).toBe('noksha-tone-btn-accent');
  });

  it('gives every tone its own class', () => {
    const classes = Object.values(toneVariants('btn'));
    expect(new Set(classes).size).toBe(TONES.length);
  });
});

describe('the tone table in @noksha-ui/tailwind', () => {
  /**
   * The guard that matters.
   *
   * `toneVars` formats a class name whether or not a rule exists for it, so a
   * component added with a new prefix would render with every colour variable
   * undefined — transparent, and passing every unit test that only asserts the
   * class is present. This is what makes that a build failure instead.
   */
  it('lists every prefix the components actually use', async () => {
    const entries = await readdir(componentsDir, { withFileTypes: true });
    const used = new Set<string>();

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const files = await readdir(join(componentsDir, entry.name));
      for (const file of files) {
        const source = await readFile(join(componentsDir, entry.name, file), 'utf8');
        for (const match of source.matchAll(/tone(?:Variants|Vars)\(\s*'([a-z-]+)'/g)) {
          if (match[1]) used.add(match[1]);
        }
      }
    }

    // Widened because the point is to test a runtime string against the table,
    // which is exactly the check the literal type would compile away.
    const known: readonly string[] = TONE_PREFIXES;

    expect(used.size).toBeGreaterThan(0);
    expect([...used].sort()).toEqual([...used].sort().filter((prefix) => known.includes(prefix)));
  });

  it('covers the same tones the component layer exposes', () => {
    expect([...TONE_NAMES].sort()).toEqual([...TONES].sort());
  });

  it('resolves every slot for every tone to a token reference', () => {
    for (const tone of TONE_NAMES) {
      for (const slot of TONE_SLOTS) {
        expect(toneSlotValue(tone, slot), `${tone}/${slot}`).toMatch(/^var\(--noksha-[a-z-]+\)$/);
      }
    }
  });
});
