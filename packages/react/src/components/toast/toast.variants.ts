import { pv } from '@prism-ui/core';
import { overlayMotion, overlaySurface } from '../../internal/overlay.js';
import { toneVariants } from '../../internal/tone.js';

/**
 * The viewport ignores the pointer; each toast takes it back.
 *
 * Without that, a fixed region pinned to a corner swallows every click in that
 * corner of the page even when it is empty — which on a bottom-right viewport
 * means the support widget half the web puts there.
 */
export const toastViewportVariants = pv({
  base: [
    'pointer-events-none fixed z-(--prism-z-toast) flex w-full max-w-sm flex-col gap-2 p-4',
    'max-h-dvh overflow-hidden',
  ].join(' '),

  variants: {
    position: {
      'top-left': 'top-0 left-0',
      'top-center': 'top-0 left-1/2 -translate-x-1/2',
      'top-right': 'top-0 right-0',
      'bottom-left': 'bottom-0 left-0 flex-col-reverse',
      'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse',
      'bottom-right': 'bottom-0 right-0 flex-col-reverse',
    },
  },

  defaultVariants: { position: 'bottom-right' },
});

export const toastVariants = pv({
  base: [
    overlaySurface,
    overlayMotion,
    'pointer-events-auto grid grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-1',
    'w-full p-4',
    'text-(length:--prism-text-sm)',
    '[&_svg]:size-5 [&_svg]:shrink-0',
    '[--prism-enter-scale:0.98] [--prism-exit-scale:0.96]',
  ].join(' '),

  variants: {
    tone: toneVariants('toast'),

    /** Toasts slide in from the edge they are pinned to. */
    position: {
      'top-left': '[--prism-enter-x:-0.75rem] [--prism-exit-x:-0.75rem]',
      'top-center': '[--prism-enter-y:-0.75rem] [--prism-exit-y:-0.75rem]',
      'top-right': '[--prism-enter-x:0.75rem] [--prism-exit-x:0.75rem]',
      'bottom-left': '[--prism-enter-x:-0.75rem] [--prism-exit-x:-0.75rem]',
      'bottom-center': '[--prism-enter-y:0.75rem] [--prism-exit-y:0.75rem]',
      'bottom-right': '[--prism-enter-x:0.75rem] [--prism-exit-x:0.75rem]',
    },
  },

  defaultVariants: { tone: 'neutral', position: 'bottom-right' },
});

export const toastIconVariants = pv({
  base: 'row-span-2 text-(--toast-fg)',
});

export const toastTitleVariants = pv({
  base: 'col-start-2 font-semibold leading-(--prism-leading-snug)',
});

export const toastDescriptionVariants = pv({
  base: 'col-start-2 text-(--prism-fg-muted)',
});

export const toastActionVariants = pv({
  base: 'col-start-2 mt-2 flex items-center gap-2',
});

export const toastCloseVariants = pv({
  base: [
    'col-start-3 row-start-1 inline-flex size-6 items-center justify-center',
    'rounded-(--prism-radius-sm) text-(--prism-fg-muted)',
    'transition-colors duration-(--prism-duration-fast)',
    'hover:bg-(--prism-bg-subtle) hover:text-(--prism-fg-default)',
    'focus-visible:outline-(length:--prism-ring-width) focus-visible:outline-offset-(--prism-ring-offset)',
    'focus-visible:outline-(--prism-ring)',
    '[&_svg]:size-3.5',
  ].join(' '),
});
