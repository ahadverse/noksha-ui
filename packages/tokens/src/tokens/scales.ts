/**
 * Layer 3 inputs — the non-color scales. Every one of these is driven by a
 * single variable so a consumer can retune the whole library without touching
 * a component. See ARCHITECTURE.md §3.3.
 */

export type TokenMap = Record<string, string>;

/**
 * Radius. All values derive from `--prism-radius-base`, so `0` gives a sharp
 * system and `0.75rem` gives a soft one, from one declaration.
 */
export const radiusTokens: TokenMap = {
  'radius-base': '0.5rem',
  'radius-none': '0px',
  'radius-xs': 'calc(var(--prism-radius-base) * 0.25)',
  'radius-sm': 'calc(var(--prism-radius-base) * 0.5)',
  'radius-md': 'var(--prism-radius-base)',
  'radius-lg': 'calc(var(--prism-radius-base) * 1.5)',
  'radius-xl': 'calc(var(--prism-radius-base) * 2)',
  'radius-2xl': 'calc(var(--prism-radius-base) * 3)',
  'radius-full': '9999px',
};

/**
 * Density. `--prism-density` scales every control height and horizontal pad at
 * once: 0.875 compact · 1 default · 1.125 comfortable.
 */
export const densityTokens: TokenMap = {
  density: '1',

  'control-h-xs': 'calc(1.5rem * var(--prism-density))',
  'control-h-sm': 'calc(2rem * var(--prism-density))',
  'control-h-md': 'calc(2.5rem * var(--prism-density))',
  'control-h-lg': 'calc(3rem * var(--prism-density))',
  'control-h-xl': 'calc(3.5rem * var(--prism-density))',

  'control-px-xs': 'calc(0.5rem * var(--prism-density))',
  'control-px-sm': 'calc(0.75rem * var(--prism-density))',
  'control-px-md': 'calc(1rem * var(--prism-density))',
  'control-px-lg': 'calc(1.25rem * var(--prism-density))',
  'control-px-xl': 'calc(1.5rem * var(--prism-density))',

  'control-gap-xs': 'calc(0.25rem * var(--prism-density))',
  'control-gap-sm': 'calc(0.375rem * var(--prism-density))',
  'control-gap-md': 'calc(0.5rem * var(--prism-density))',
  'control-gap-lg': 'calc(0.5rem * var(--prism-density))',
  'control-gap-xl': 'calc(0.625rem * var(--prism-density))',
};

/** Typography. Body steps are fixed; display steps are fluid via `clamp()`. */
export const typographyTokens: TokenMap = {
  'font-sans':
    "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  'font-mono':
    "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",

  'text-xs': '0.75rem',
  'text-sm': '0.875rem',
  'text-md': '1rem',
  'text-lg': '1.125rem',
  'text-xl': 'clamp(1.25rem, 1.18rem + 0.35vw, 1.5rem)',
  'text-2xl': 'clamp(1.5rem, 1.35rem + 0.75vw, 2rem)',
  'text-3xl': 'clamp(1.875rem, 1.6rem + 1.4vw, 2.75rem)',
  'text-4xl': 'clamp(2.25rem, 1.8rem + 2.25vw, 3.75rem)',

  'leading-tight': '1.2',
  'leading-snug': '1.35',
  'leading-normal': '1.5',
  'leading-relaxed': '1.65',

  'tracking-tight': '-0.015em',
  'tracking-normal': '0em',
  'tracking-wide': '0.025em',

  'weight-normal': '400',
  'weight-medium': '500',
  'weight-semibold': '600',
  'weight-bold': '700',
};

/**
 * Motion. Every animation in the library reads these, which is what lets
 * `prefers-reduced-motion` zero the whole system from one block (see
 * {@link reducedMotionTokens}) instead of per-component media queries.
 */
export const motionTokens: TokenMap = {
  'duration-instant': '50ms',
  'duration-fast': '120ms',
  'duration-normal': '200ms',
  'duration-slow': '320ms',
  'duration-slower': '480ms',

  'ease-linear': 'linear',
  'ease-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'ease-in': 'cubic-bezier(0.64, 0, 0.78, 0)',
  'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

/** Applied inside `@media (prefers-reduced-motion: reduce)`. */
export const reducedMotionTokens: TokenMap = {
  'duration-instant': '0ms',
  'duration-fast': '0ms',
  'duration-normal': '0ms',
  'duration-slow': '0ms',
  'duration-slower': '0ms',
};

/** One ladder for the entire overlay stack — no component invents its own. */
export const zIndexTokens: TokenMap = {
  'z-base': '0',
  'z-docked': '10',
  'z-dropdown': '1000',
  'z-sticky': '1100',
  'z-banner': '1200',
  'z-overlay': '1300',
  'z-modal': '1400',
  'z-popover': '1500',
  'z-toast': '1600',
  'z-tooltip': '1700',
};

/** Spacing is Tailwind's scale; we only add the few the components need by name. */
export const focusTokens: TokenMap = {
  'ring-width': '2px',
  'ring-offset': '2px',
};

/** Every non-color token, in emission order. */
export const scaleTokens: TokenMap = {
  ...radiusTokens,
  ...densityTokens,
  ...typographyTokens,
  ...motionTokens,
  ...zIndexTokens,
  ...focusTokens,
};
