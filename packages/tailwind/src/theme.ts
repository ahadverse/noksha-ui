import { themeMap } from './theme-map.js';

/**
 * The Tailwind v4 `@theme inline` block.
 *
 * `inline` matters: it makes the generated utilities resolve to the Noksha
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
 * module.exports = { presets: [require('@noksha-ui/tailwind').preset] };
 * ```
 */
export const preset = {
  theme: {
    extend: {
      colors: {
        canvas: 'var(--noksha-bg-canvas)',
        surface: 'var(--noksha-bg-surface)',
        subtle: 'var(--noksha-bg-subtle)',
        muted: 'var(--noksha-bg-muted)',
        inverse: 'var(--noksha-bg-inverse)',

        fg: {
          DEFAULT: 'var(--noksha-fg-default)',
          muted: 'var(--noksha-fg-muted)',
          subtle: 'var(--noksha-fg-subtle)',
          disabled: 'var(--noksha-fg-disabled)',
          inverse: 'var(--noksha-fg-inverse)',
        },
        line: {
          DEFAULT: 'var(--noksha-border-default)',
          subtle: 'var(--noksha-border-subtle)',
          strong: 'var(--noksha-border-strong)',
          focus: 'var(--noksha-border-focus)',
        },
        ring: 'var(--noksha-ring)',

        ...Object.fromEntries(
          (['accent', 'danger', 'success', 'warning', 'info'] as const).map((tone) => [
            tone,
            {
              DEFAULT: `var(--noksha-${tone}-solid)`,
              hover: `var(--noksha-${tone}-solid-hover)`,
              active: `var(--noksha-${tone}-solid-active)`,
              subtle: `var(--noksha-${tone}-subtle)`,
              'subtle-hover': `var(--noksha-${tone}-subtle-hover)`,
              fg: `var(--noksha-${tone}-fg)`,
              ink: `var(--noksha-${tone}-on-solid)`,
            },
          ]),
        ),
      },
      borderRadius: {
        xs: 'var(--noksha-radius-xs)',
        sm: 'var(--noksha-radius-sm)',
        md: 'var(--noksha-radius-md)',
        lg: 'var(--noksha-radius-lg)',
        xl: 'var(--noksha-radius-xl)',
        '2xl': 'var(--noksha-radius-2xl)',
      },
      fontFamily: {
        sans: 'var(--noksha-font-sans)',
        mono: 'var(--noksha-font-mono)',
      },
      boxShadow: {
        xs: 'var(--noksha-shadow-xs)',
        sm: 'var(--noksha-shadow-sm)',
        md: 'var(--noksha-shadow-md)',
        lg: 'var(--noksha-shadow-lg)',
        xl: 'var(--noksha-shadow-xl)',
      },
      spacing: Object.fromEntries(
        ['xs', 'sm', 'md', 'lg', 'xl'].flatMap((size) => [
          [`control-${size}`, `var(--noksha-control-h-${size})`],
          [`control-px-${size}`, `var(--noksha-control-px-${size})`],
          [`control-gap-${size}`, `var(--noksha-control-gap-${size})`],
        ]),
      ),
      transitionTimingFunction: {
        out: 'var(--noksha-ease-out)',
        in: 'var(--noksha-ease-in)',
        'in-out': 'var(--noksha-ease-in-out)',
        spring: 'var(--noksha-ease-spring)',
      },
      /**
       * The v4 build ships these as `@utility noksha-in` / `noksha-out` in the
       * generated stylesheet. v3 has no `@utility`, so the same pair is
       * registered here — otherwise every overlay in the library would appear
       * and vanish instantly for v3 consumers.
       */
      keyframes: {
        'noksha-in': {
          from: {
            opacity: '0',
            transform:
              'translate3d(var(--noksha-enter-x, 0), var(--noksha-enter-y, 0), 0) scale(var(--noksha-enter-scale, 1))',
          },
        },
        'noksha-out': {
          to: {
            opacity: '0',
            transform:
              'translate3d(var(--noksha-exit-x, 0), var(--noksha-exit-y, 0), 0) scale(var(--noksha-exit-scale, 1))',
          },
        },
        'noksha-collapse-in': {
          from: { gridTemplateRows: '0fr', opacity: '0' },
          to: { gridTemplateRows: '1fr', opacity: '1' },
        },
        'noksha-collapse-out': {
          from: { gridTemplateRows: '1fr', opacity: '1' },
          to: { gridTemplateRows: '0fr', opacity: '0' },
        },
        'noksha-pulse': {
          '0%': { opacity: '0.55', transform: 'scale(1)' },
          '70%': { opacity: '0', transform: 'scale(1.14)' },
          '100%': { opacity: '0', transform: 'scale(1.14)' },
        },
      },
      animation: {
        'noksha-in': 'noksha-in var(--noksha-duration-normal) var(--noksha-ease-out)',
        'noksha-out': 'noksha-out var(--noksha-duration-fast) var(--noksha-ease-in) forwards',
        'noksha-collapse-in':
          'noksha-collapse-in var(--noksha-duration-normal) var(--noksha-ease-out)',
        'noksha-collapse-out':
          'noksha-collapse-out var(--noksha-duration-fast) var(--noksha-ease-in) forwards',
        'noksha-pulse': 'noksha-pulse 1.8s var(--noksha-ease-out) infinite',
      },
    },
  },
} as const;
