/**
 * The `tone` prop, expressed as local CSS variables.
 *
 * Every semantic tone exposes the same seven slots (ARCHITECTURE.md §3.2), so a
 * component can declare its colours once against local variables and let `tone`
 * repoint those variables. That is what keeps `tone` a single class instead of a
 * `variant × tone` compound for all 30 combinations — and it is why adding a
 * seventh tone later costs one line here and nothing in any component.
 *
 * The seven declarations are **not** Tailwind utilities. They were, once:
 * `toneVars` returned `[--btn-solid:var(--prism-accent-solid)]` and six more
 * like it. Tailwind finds classes by scanning source text for literal strings,
 * and those were built by interpolating `prefix` and `tone` — so the scanner saw
 * nothing, generated nothing, and every toned component rendered with undefined
 * variables and no colour at all. It only shows up in a real consuming app,
 * because a unit test asserting the class is on the element still passes.
 *
 * So the class is now a plain, static name, and `scripts/build-styles.mjs`
 * emits its rule into the shipped stylesheet from the token engine. Nothing has
 * to be scanned, the markup carries one class instead of seven, and the rules
 * cannot drift from the tokens they are generated from.
 */

export const TONES = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'] as const;
export type Tone = (typeof TONES)[number];

/**
 * The class that fills one component's seven slots for one tone.
 *
 * `prefix` namespaces the variables so a Badge inside a Button does not inherit
 * the button's colours. Keep it in sync with `tone-prefixes.mjs` — the rule this
 * name refers to does not exist until that list says to emit it, and
 * `tone.test.ts` enforces the match.
 */
export function toneVars(prefix: string, tone: Tone): string {
  return `prism-tone-${prefix}-${tone}`;
}

/** Ready to drop in as a `pv()` variant: `{ tone: toneVariants('badge') }`. */
export function toneVariants(prefix: string): Record<Tone, string> {
  return {
    accent: toneVars(prefix, 'accent'),
    neutral: toneVars(prefix, 'neutral'),
    danger: toneVars(prefix, 'danger'),
    success: toneVars(prefix, 'success'),
    warning: toneVars(prefix, 'warning'),
    info: toneVars(prefix, 'info'),
  };
}
