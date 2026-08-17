import { themeMap } from './theme-map.js';

export {
  colorMap,
  motionMap,
  radiusMap,
  shadowMap,
  spacingMap,
  type ThemeMap,
  themeMap,
  typographyMap,
} from './theme-map.js';

/**
 * The Tailwind v4 `@theme inline` block.
 *
 * `inline` matters: it makes the generated utilities resolve to the Prism
 * variable itself rather than to a snapshot of its value, so `.dark` swapping a
 * semantic token instantly repaints every utility built from it. Without
 * `inline`, dark mode would need a second set of utilities.
 */
export function emitTailwindTheme(): string {
  const lines = Object.entries(themeMap).map(([key, value]) => `  ${key}: ${value};`);
  return `@theme inline {\n${lines.join('\n')}\n}\n`;
}

/**
 * A Tailwind v3 preset, for consumers who have not migrated to v4.
 *
 * ```js
 * // tailwind.config.js
 * module.exports = { presets: [require('@prism-ui/tailwind').preset] };
 * ```
 */
export const preset = {
  theme: {
    extend: {
      colors: {
        canvas: 'var(--prism-bg-canvas)',
        surface: 'var(--prism-bg-surface)',
        subtle: 'var(--prism-bg-subtle)',
        muted: 'var(--prism-bg-muted)',
        inverse: 'var(--prism-bg-inverse)',

        fg: {
          DEFAULT: 'var(--prism-fg-default)',
          muted: 'var(--prism-fg-muted)',
          subtle: 'var(--prism-fg-subtle)',
          disabled: 'var(--prism-fg-disabled)',
          inverse: 'var(--prism-fg-inverse)',
        },
        line: {
          DEFAULT: 'var(--prism-border-default)',
          subtle: 'var(--prism-border-subtle)',
          strong: 'var(--prism-border-strong)',
          focus: 'var(--prism-border-focus)',
        },
        ring: 'var(--prism-ring)',

        ...Object.fromEntries(
          (['accent', 'danger', 'success', 'warning', 'info'] as const).map((tone) => [
            tone,
            {
              DEFAULT: `var(--prism-${tone}-solid)`,
              hover: `var(--prism-${tone}-solid-hover)`,
              active: `var(--prism-${tone}-solid-active)`,
              subtle: `var(--prism-${tone}-subtle)`,
              'subtle-hover': `var(--prism-${tone}-subtle-hover)`,
              fg: `var(--prism-${tone}-fg)`,
              ink: `var(--prism-${tone}-on-solid)`,
            },
          ]),
        ),
      },
      borderRadius: {
        xs: 'var(--prism-radius-xs)',
        sm: 'var(--prism-radius-sm)',
        md: 'var(--prism-radius-md)',
        lg: 'var(--prism-radius-lg)',
        xl: 'var(--prism-radius-xl)',
        '2xl': 'var(--prism-radius-2xl)',
      },
      fontFamily: {
        sans: 'var(--prism-font-sans)',
        mono: 'var(--prism-font-mono)',
      },
      boxShadow: {
        xs: 'var(--prism-shadow-xs)',
        sm: 'var(--prism-shadow-sm)',
        md: 'var(--prism-shadow-md)',
        lg: 'var(--prism-shadow-lg)',
        xl: 'var(--prism-shadow-xl)',
      },
      spacing: Object.fromEntries(
        ['xs', 'sm', 'md', 'lg', 'xl'].flatMap((size) => [
          [`control-${size}`, `var(--prism-control-h-${size})`],
          [`control-px-${size}`, `var(--prism-control-px-${size})`],
          [`control-gap-${size}`, `var(--prism-control-gap-${size})`],
        ]),
      ),
      transitionTimingFunction: {
        out: 'var(--prism-ease-out)',
        in: 'var(--prism-ease-in)',
        'in-out': 'var(--prism-ease-in-out)',
        spring: 'var(--prism-ease-spring)',
      },
      /**
       * The v4 build ships these as `@utility prism-in` / `prism-out` in the
       * generated stylesheet. v3 has no `@utility`, so the same pair is
       * registered here — otherwise every overlay in the library would appear
       * and vanish instantly for v3 consumers.
       */
      keyframes: {
        'prism-in': {
          from: {
            opacity: '0',
            transform:
              'translate3d(var(--prism-enter-x, 0), var(--prism-enter-y, 0), 0) scale(var(--prism-enter-scale, 1))',
          },
        },
        'prism-out': {
          to: {
            opacity: '0',
            transform:
              'translate3d(var(--prism-exit-x, 0), var(--prism-exit-y, 0), 0) scale(var(--prism-exit-scale, 1))',
          },
        },
        'prism-collapse-in': {
          from: { gridTemplateRows: '0fr', opacity: '0' },
          to: { gridTemplateRows: '1fr', opacity: '1' },
        },
        'prism-collapse-out': {
          from: { gridTemplateRows: '1fr', opacity: '1' },
          to: { gridTemplateRows: '0fr', opacity: '0' },
        },
      },
      animation: {
        'prism-in': 'prism-in var(--prism-duration-normal) var(--prism-ease-out)',
        'prism-out': 'prism-out var(--prism-duration-fast) var(--prism-ease-in) forwards',
        'prism-collapse-in': 'prism-collapse-in var(--prism-duration-normal) var(--prism-ease-out)',
        'prism-collapse-out':
          'prism-collapse-out var(--prism-duration-fast) var(--prism-ease-in) forwards',
      },
    },
  },
} as const;
