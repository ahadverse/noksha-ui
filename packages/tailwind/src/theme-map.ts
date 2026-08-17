import { TONES } from '@prism-ui/tokens';

/**
 * Maps Prism semantic tokens onto Tailwind theme keys.
 *
 * The utility name is deliberately shorter than the token name — `bg-canvas`
 * rather than `bg-bg-canvas`, `text-fg-muted` rather than `text-foreground-muted`.
 * Components are read far more often than this table is.
 *
 * `on-solid` becomes `ink`, so the foreground that sits on a solid fill reads as
 * `text-accent-ink` — one word, and it does not collide with `accent-fg`, which
 * is the tone's text color on the canvas.
 */
export type ThemeMap = Record<string, string>;

function toneEntries(): ThemeMap {
  const map: ThemeMap = {};

  for (const tone of TONES) {
    map[`--color-${tone}`] = `var(--prism-${tone}-solid)`;
    map[`--color-${tone}-hover`] = `var(--prism-${tone}-solid-hover)`;
    map[`--color-${tone}-active`] = `var(--prism-${tone}-solid-active)`;
    map[`--color-${tone}-subtle`] = `var(--prism-${tone}-subtle)`;
    map[`--color-${tone}-subtle-hover`] = `var(--prism-${tone}-subtle-hover)`;
    map[`--color-${tone}-fg`] = `var(--prism-${tone}-fg)`;
    map[`--color-${tone}-ink`] = `var(--prism-${tone}-on-solid)`;
  }
  return map;
}

export const colorMap: ThemeMap = {
  '--color-canvas': 'var(--prism-bg-canvas)',
  '--color-surface': 'var(--prism-bg-surface)',
  '--color-subtle': 'var(--prism-bg-subtle)',
  '--color-muted': 'var(--prism-bg-muted)',
  '--color-inverse': 'var(--prism-bg-inverse)',

  '--color-fg': 'var(--prism-fg-default)',
  '--color-fg-muted': 'var(--prism-fg-muted)',
  '--color-fg-subtle': 'var(--prism-fg-subtle)',
  '--color-fg-disabled': 'var(--prism-fg-disabled)',
  '--color-fg-inverse': 'var(--prism-fg-inverse)',

  '--color-line': 'var(--prism-border-default)',
  '--color-line-subtle': 'var(--prism-border-subtle)',
  '--color-line-strong': 'var(--prism-border-strong)',
  '--color-line-focus': 'var(--prism-border-focus)',

  '--color-ring': 'var(--prism-ring)',

  ...toneEntries(),
};

export const radiusMap: ThemeMap = {
  '--radius-xs': 'var(--prism-radius-xs)',
  '--radius-sm': 'var(--prism-radius-sm)',
  '--radius-md': 'var(--prism-radius-md)',
  '--radius-lg': 'var(--prism-radius-lg)',
  '--radius-xl': 'var(--prism-radius-xl)',
  '--radius-2xl': 'var(--prism-radius-2xl)',
};

export const typographyMap: ThemeMap = {
  '--font-sans': 'var(--prism-font-sans)',
  '--font-mono': 'var(--prism-font-mono)',

  '--text-xs': 'var(--prism-text-xs)',
  '--text-sm': 'var(--prism-text-sm)',
  '--text-base': 'var(--prism-text-md)',
  '--text-lg': 'var(--prism-text-lg)',
  '--text-xl': 'var(--prism-text-xl)',
  '--text-2xl': 'var(--prism-text-2xl)',
  '--text-3xl': 'var(--prism-text-3xl)',
  '--text-4xl': 'var(--prism-text-4xl)',
};

export const shadowMap: ThemeMap = {
  '--shadow-xs': 'var(--prism-shadow-xs)',
  '--shadow-sm': 'var(--prism-shadow-sm)',
  '--shadow-md': 'var(--prism-shadow-md)',
  '--shadow-lg': 'var(--prism-shadow-lg)',
  '--shadow-xl': 'var(--prism-shadow-xl)',
};

export const motionMap: ThemeMap = {
  '--ease-out': 'var(--prism-ease-out)',
  '--ease-in': 'var(--prism-ease-in)',
  '--ease-in-out': 'var(--prism-ease-in-out)',
  '--ease-spring': 'var(--prism-ease-spring)',
};

/** Control heights and pads, exposed as `h-control-md`, `px-control-md`, … */
export const spacingMap: ThemeMap = Object.fromEntries(
  ['xs', 'sm', 'md', 'lg', 'xl'].flatMap((size) => [
    [`--spacing-control-${size}`, `var(--prism-control-h-${size})`],
    [`--spacing-control-px-${size}`, `var(--prism-control-px-${size})`],
    [`--spacing-control-gap-${size}`, `var(--prism-control-gap-${size})`],
  ]),
);

export const themeMap: ThemeMap = {
  ...colorMap,
  ...radiusMap,
  ...typographyMap,
  ...shadowMap,
  ...motionMap,
  ...spacingMap,
};
