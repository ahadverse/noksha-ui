import { pv } from '@prism-ui/core';
import { overlayMotion } from '../../internal/overlay.js';

export const dialogOverlayVariants = pv({
  base: [
    'fixed inset-0 z-(--prism-z-overlay)',
    'bg-(--prism-bg-inverse)/40 backdrop-blur-[2px]',
    overlayMotion,
    // The backdrop only fades; scaling it would betray that it is an element
    // rather than the page dimming.
    '[--prism-enter-scale:1] [--prism-exit-scale:1]',
  ].join(' '),
});

/**
 * The centring layer.
 *
 * Centring with `top-1/2 left-1/2 -translate-1/2` is the usual approach and it
 * cannot be animated: the keyframes set `transform` too, so the panel would
 * snap to the top-left corner for the length of every open and close. Flexbox
 * centres without touching `transform`, which leaves the whole property free
 * for the animation.
 *
 * It ignores the pointer so a click on the empty space around the panel reaches
 * the backdrop underneath, where the dismiss logic lives.
 */
export const dialogPositionerVariants = pv({
  base: 'pointer-events-none fixed inset-0 z-(--prism-z-modal) flex items-center justify-center overflow-y-auto p-4',
});

export const dialogContentVariants = pv({
  base: [
    'pointer-events-auto relative flex max-h-full w-full flex-col',
    'rounded-(--prism-radius-xl) border border-(--prism-border-subtle)',
    'bg-(--prism-bg-surface) text-(--prism-fg-default) shadow-(--prism-shadow-xl)',
    'outline-none',
    overlayMotion,
    '[--prism-enter-scale:0.97] [--prism-exit-scale:0.97]',
    '[--prism-enter-y:-0.5rem] [--prism-exit-y:-0.5rem]',
  ].join(' '),

  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'h-full max-w-none',
    },
  },

  defaultVariants: { size: 'md' },
});

export const dialogHeaderVariants = pv({
  base: 'flex flex-col gap-1.5 p-6 pb-0',
});

export const dialogTitleVariants = pv({
  base: 'font-semibold text-(length:--prism-text-lg) leading-(--prism-leading-snug) tracking-(--prism-tracking-tight)',
});

export const dialogDescriptionVariants = pv({
  base: 'text-(length:--prism-text-sm) text-(--prism-fg-muted) leading-(--prism-leading-normal)',
});

/** The only scrolling region, so the header and footer stay put. */
export const dialogBodyVariants = pv({
  base: 'min-h-0 flex-1 overflow-y-auto p-6',
});

export const dialogFooterVariants = pv({
  base: 'flex flex-col-reverse gap-2 p-6 pt-0 sm:flex-row sm:justify-end',
});

export const dialogCloseVariants = pv({
  base: [
    'absolute end-3 top-3 inline-flex size-8 items-center justify-center',
    'rounded-(--prism-radius-sm) text-(--prism-fg-muted)',
    'transition-colors duration-(--prism-duration-fast)',
    'hover:bg-(--prism-bg-subtle) hover:text-(--prism-fg-default)',
    'focus-visible:outline-(length:--prism-ring-width) focus-visible:outline-offset-(--prism-ring-offset)',
    'focus-visible:outline-(--prism-ring)',
    '[&_svg]:size-4',
  ].join(' '),
});
