/**
 * Every namespace `toneVariants()` is called with.
 *
 * The stylesheet generator needs this list to emit one rule per prefix × tone.
 * It lives in its own `.mjs` because a build script has to read it and the
 * component source has to stay free of it — `toneVars()` only formats a name
 * and never needs to know the whole set.
 *
 * `tone.test.ts` fails if a component ever calls `toneVariants()` with a prefix
 * that is missing here, which is what stops a new component from shipping with
 * silently colourless tones.
 */
export const TONE_PREFIXES = ['alert', 'badge', 'btn', 'cb', 'rd', 'sl', 'sw', 'toast'];

export const TONE_NAMES = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'];

/** The seven slots every tone fills, in the order they are emitted. */
export const TONE_SLOTS = [
  'solid',
  'solid-hover',
  'solid-active',
  'subtle',
  'subtle-hover',
  'fg',
  'ink',
];

/**
 * What each slot resolves to for a given tone.
 *
 * Neutral is the one tone with no status ramp behind it, so it is built from
 * the surface and foreground tokens instead — while still filling the same
 * seven slots, which is the only reason components can treat it like any other.
 */
export function toneSlotValue(tone, slot) {
  if (tone === 'neutral') {
    return {
      solid: 'var(--prism-bg-inverse)',
      'solid-hover': 'var(--prism-fg-default)',
      'solid-active': 'var(--prism-fg-default)',
      subtle: 'var(--prism-bg-subtle)',
      'subtle-hover': 'var(--prism-bg-muted)',
      fg: 'var(--prism-fg-default)',
      ink: 'var(--prism-bg-surface)',
    }[slot];
  }

  // `ink` is the token's `on-solid`; the rest map by name.
  const token = slot === 'ink' ? 'on-solid' : slot;
  return `var(--prism-${tone}-${token})`;
}
