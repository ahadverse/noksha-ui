import { TONES } from '@noksha-ui/tokens';

/**
 * Maps Noksha semantic tokens onto Tailwind theme keys.
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
    map[`--color-${tone}`] = `var(--noksha-${tone}-solid)`;
    map[`--color-${tone}-hover`] = `var(--noksha-${tone}-solid-hover)`;
    map[`--color-${tone}-active`] = `var(--noksha-${tone}-solid-active)`;
    map[`--color-${tone}-subtle`] = `var(--noksha-${tone}-subtle)`;
    map[`--color-${tone}-subtle-hover`] = `var(--noksha-${tone}-subtle-hover)`;
    map[`--color-${tone}-fg`] = `var(--noksha-${tone}-fg)`;
    map[`--color-${tone}-ink`] = `var(--noksha-${tone}-on-solid)`;
  }
  return map;
}

export const colorMap: ThemeMap = {
  '--color-canvas': 'var(--noksha-bg-canvas)',
  '--color-surface': 'var(--noksha-bg-surface)',
  '--color-subtle': 'var(--noksha-bg-subtle)',
  '--color-muted': 'var(--noksha-bg-muted)',
  '--color-inverse': 'var(--noksha-bg-inverse)',

  '--color-fg': 'var(--noksha-fg-default)',
  '--color-fg-muted': 'var(--noksha-fg-muted)',
  '--color-fg-subtle': 'var(--noksha-fg-subtle)',
  '--color-fg-disabled': 'var(--noksha-fg-disabled)',
  '--color-fg-inverse': 'var(--noksha-fg-inverse)',

  '--color-line': 'var(--noksha-border-default)',
  '--color-line-subtle': 'var(--noksha-border-subtle)',
  '--color-line-strong': 'var(--noksha-border-strong)',
  '--color-line-focus': 'var(--noksha-border-focus)',

  '--color-ring': 'var(--noksha-ring)',

  ...toneEntries(),
};

export const radiusMap: ThemeMap = {
  '--radius-xs': 'var(--noksha-radius-xs)',
  '--radius-sm': 'var(--noksha-radius-sm)',
  '--radius-md': 'var(--noksha-radius-md)',
  '--radius-lg': 'var(--noksha-radius-lg)',
  '--radius-xl': 'var(--noksha-radius-xl)',
  '--radius-2xl': 'var(--noksha-radius-2xl)',
};

export const typographyMap: ThemeMap = {
  '--font-sans': 'var(--noksha-font-sans)',
  '--font-mono': 'var(--noksha-font-mono)',

  '--text-xs': 'var(--noksha-text-xs)',
  '--text-sm': 'var(--noksha-text-sm)',
  '--text-base': 'var(--noksha-text-md)',
  '--text-lg': 'var(--noksha-text-lg)',
  '--text-xl': 'var(--noksha-text-xl)',
  '--text-2xl': 'var(--noksha-text-2xl)',
  '--text-3xl': 'var(--noksha-text-3xl)',
  '--text-4xl': 'var(--noksha-text-4xl)',
};

export const shadowMap: ThemeMap = {
  '--shadow-xs': 'var(--noksha-shadow-xs)',
  '--shadow-sm': 'var(--noksha-shadow-sm)',
  '--shadow-md': 'var(--noksha-shadow-md)',
  '--shadow-lg': 'var(--noksha-shadow-lg)',
  '--shadow-xl': 'var(--noksha-shadow-xl)',
};

export const motionMap: ThemeMap = {
  '--ease-out': 'var(--noksha-ease-out)',
  '--ease-in': 'var(--noksha-ease-in)',
  '--ease-in-out': 'var(--noksha-ease-in-out)',
  '--ease-spring': 'var(--noksha-ease-spring)',
};

/** Control heights and pads, exposed as `h-control-md`, `px-control-md`, … */
export const spacingMap: ThemeMap = Object.fromEntries(
  ['xs', 'sm', 'md', 'lg', 'xl'].flatMap((size) => [
    [`--spacing-control-${size}`, `var(--noksha-control-h-${size})`],
    [`--spacing-control-px-${size}`, `var(--noksha-control-px-${size})`],
    [`--spacing-control-gap-${size}`, `var(--noksha-control-gap-${size})`],
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
