/**
 * The `tone` prop's colour table, expressed as data.
 *
 * A component reaches a tone through a single static class — `noksha-tone-btn-danger`
 * — and the rule behind that class is generated, not written. This module is the
 * generator's input: the namespaces to emit for, the tones, the seven slots, and
 * what each slot resolves to.
 *
 * It lives in `@noksha-ui/tailwind` rather than in `@noksha-ui/react` because two
 * things need it and neither may drift from the other: the package build, which
 * bakes these rules into `dist/styles.css`, and `@noksha-ui/cli init`, which
 * writes the same rules into a consumer's own stylesheet. See ARCHITECTURE.md §3.2.
 */

/**
 * Every namespace `toneVariants()` is called with in `@noksha-ui/react`.
 *
 * `tone.test.ts` in that package fails if a component ever calls
 * `toneVariants()` with a prefix missing here — which is what stops a new
 * component from shipping with silently colourless tones. The class name is
 * formatted whether or not a rule exists for it, so an omission renders
 * transparent while passing every unit test that merely asserts the class.
 */
export const TONE_PREFIXES = ['alert', 'badge', 'btn', 'cb', 'rd', 'sl', 'sw', 'toast'] as const;

export const TONE_NAMES = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'] as const;

/** The seven slots every tone fills, in the order they are emitted. */
export const TONE_SLOTS = [
  'solid',
  'solid-hover',
  'solid-active',
  'subtle',
  'subtle-hover',
  'fg',
  'ink',
] as const;

export type TonePrefix = (typeof TONE_PREFIXES)[number];
export type ToneName = (typeof TONE_NAMES)[number];
export type ToneSlot = (typeof TONE_SLOTS)[number];

/**
 * Neutral is the one tone with no status ramp behind it, so it is built from
 * the surface and foreground tokens instead — while still filling the same
 * seven slots, which is the only reason components can treat it like any other.
 */
const NEUTRAL: Record<ToneSlot, string> = {
  solid: 'var(--noksha-bg-inverse)',
  'solid-hover': 'var(--noksha-fg-default)',
  'solid-active': 'var(--noksha-fg-default)',
  subtle: 'var(--noksha-bg-subtle)',
  'subtle-hover': 'var(--noksha-bg-muted)',
  fg: 'var(--noksha-fg-default)',
  ink: 'var(--noksha-bg-surface)',
};

/** What one slot resolves to for one tone. */
export function toneSlotValue(tone: string, slot: string): string {
  if (tone === 'neutral') return NEUTRAL[slot as ToneSlot];

  // `ink` is the token's `on-solid`; the rest map by name.
  const token = slot === 'ink' ? 'on-solid' : slot;
  return `var(--noksha-${tone}-${token})`;
}

/**
 * The `@layer components` block holding one rule per namespace × tone.
 *
 * The rules go in the `components` layer so a caller's own `bg-*` utility still
 * wins — the layer order is what keeps "className always wins" (ARCHITECTURE.md
 * §5, rule 3) true here without an `!important`.
 */
export function emitToneLayer(): string {
  const rules = TONE_PREFIXES.flatMap((prefix) =>
    TONE_NAMES.map((tone) => {
      const declarations = TONE_SLOTS.map(
        (slot) => `    --${prefix}-${slot}: ${toneSlotValue(tone, slot)};`,
      ).join('\n');

      return `  .noksha-tone-${prefix}-${tone} {\n${declarations}\n  }`;
    }),
  );

  return `@layer components {\n${rules.join('\n\n')}\n}`;
}
