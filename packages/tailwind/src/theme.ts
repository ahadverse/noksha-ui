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
        // The eight loops Spinner's eighteen designs are composed from.
        'noksha-spinner-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'noksha-spinner-dash': {
          '0%': { strokeDasharray: '1 60', strokeDashoffset: '0' },
          '50%': { strokeDasharray: '42 60', strokeDashoffset: '-14' },
          '100%': { strokeDasharray: '42 60', strokeDashoffset: '-56' },
        },
        'noksha-spinner-fade': {
          '0%, 100%': { opacity: '0.15' },
          '40%': { opacity: '1' },
        },
        'noksha-spinner-bounce': {
          '0%, 100%': { transform: 'translateY(35%)' },
          '50%': { transform: 'translateY(-35%)' },
        },
        'noksha-spinner-beat': {
          '0%, 100%': { transform: 'scale(0.4)', opacity: '0.35' },
          '50%': { transform: 'scale(1)', opacity: '1' },
        },
        'noksha-spinner-stretch': {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'noksha-spinner-ripple': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '15%': { opacity: '0.85' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        'noksha-spinner-flip': {
          '0%': { transform: 'rotateY(0) rotateX(0)' },
          '50%': { transform: 'rotateY(180deg) rotateX(0)' },
          '100%': { transform: 'rotateY(180deg) rotateX(180deg)' },
        },
        // The eight loops Skeleton's eighteen treatments are composed from.
        'noksha-skeleton-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        'noksha-skeleton-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0.4' },
        },
        'noksha-skeleton-breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.97)', opacity: '0.6' },
        },
        'noksha-skeleton-sweep': {
          '0%': { transform: 'translateX(-130%)' },
          '100%': { transform: 'translateX(130%)' },
        },
        'noksha-skeleton-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'noksha-skeleton-drift': {
          to: { backgroundPosition: '28px 28px' },
        },
        'noksha-skeleton-ripple': {
          '0%': { transform: 'scale(0.4)', opacity: '0.9' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'noksha-skeleton-grow': {
          '0%, 100%': { transform: 'scaleX(0.12)' },
          '55%': { transform: 'scaleX(1)' },
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
        'noksha-spinner-spin': 'noksha-spinner-spin 700ms linear infinite',
        'noksha-spinner-dash': 'noksha-spinner-dash 1.5s var(--noksha-ease-in-out) infinite',
        'noksha-spinner-fade': 'noksha-spinner-fade 1.2s linear infinite',
        'noksha-spinner-bounce': 'noksha-spinner-bounce 1s var(--noksha-ease-in-out) infinite',
        'noksha-spinner-beat': 'noksha-spinner-beat 1.2s var(--noksha-ease-in-out) infinite',
        'noksha-spinner-stretch': 'noksha-spinner-stretch 1.1s var(--noksha-ease-in-out) infinite',
        'noksha-spinner-ripple': 'noksha-spinner-ripple 1.4s var(--noksha-ease-out) infinite',
        'noksha-spinner-flip': 'noksha-spinner-flip 1.6s var(--noksha-ease-in-out) infinite',
        'noksha-skeleton-pulse': 'noksha-skeleton-pulse 1.6s var(--noksha-ease-in-out) infinite',
        'noksha-skeleton-blink': 'noksha-skeleton-blink 1.4s var(--noksha-ease-in-out) infinite',
        'noksha-skeleton-breathe':
          'noksha-skeleton-breathe 1.8s var(--noksha-ease-in-out) infinite',
        'noksha-skeleton-sweep': 'noksha-skeleton-sweep 1.6s var(--noksha-ease-in-out) infinite',
        'noksha-skeleton-shift': 'noksha-skeleton-shift 1.8s linear infinite',
        'noksha-skeleton-drift': 'noksha-skeleton-drift 2.4s linear infinite',
        'noksha-skeleton-ripple': 'noksha-skeleton-ripple 1.8s var(--noksha-ease-out) infinite',
        'noksha-skeleton-grow': 'noksha-skeleton-grow 1.6s var(--noksha-ease-in-out) infinite',
      },
    },
  },
} as const;
