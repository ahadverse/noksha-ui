import { pv } from '@prism-ui/core';
import { overlayMotion } from '../../internal/overlay.js';

/**
 * A drawer is pinned to an edge, so it needs no centring layer and no transform
 * of its own — which leaves `transform` entirely free for the slide.
 *
 * The travel is `100%` rather than a pixel distance, so a drawer sized by its
 * content still starts fully off-screen. The same enter/exit keyframes as every
 * other overlay are reused; only these four variables change.
 */
export const drawerContentVariants = pv({
  base: [
    'fixed z-(--prism-z-modal) flex flex-col',
    'border-(--prism-border-subtle)',
    'bg-(--prism-bg-surface) text-(--prism-fg-default) shadow-(--prism-shadow-xl)',
    'outline-none',
    overlayMotion,
    '[--prism-enter-scale:1] [--prism-exit-scale:1]',
  ].join(' '),

  variants: {
    side: {
      right: [
        'inset-y-0 end-0 h-full border-s',
        'rounded-s-(--prism-radius-xl)',
        '[--prism-enter-x:100%] [--prism-exit-x:100%]',
        'rtl:[--prism-enter-x:-100%] rtl:[--prism-exit-x:-100%]',
      ].join(' '),
      left: [
        'inset-y-0 start-0 h-full border-e',
        'rounded-e-(--prism-radius-xl)',
        '[--prism-enter-x:-100%] [--prism-exit-x:-100%]',
        'rtl:[--prism-enter-x:100%] rtl:[--prism-exit-x:100%]',
      ].join(' '),
      top: [
        'inset-x-0 top-0 w-full border-b',
        'rounded-b-(--prism-radius-xl)',
        '[--prism-enter-y:-100%] [--prism-exit-y:-100%]',
      ].join(' '),
      bottom: [
        'inset-x-0 bottom-0 w-full border-t',
        'rounded-t-(--prism-radius-xl)',
        '[--prism-enter-y:100%] [--prism-exit-y:100%]',
      ].join(' '),
    },

    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
      full: '',
    },
  },

  // Size means width on a side drawer and height on a top or bottom one, so it
  // cannot be one shared scale.
  compoundVariants: [
    { side: ['left', 'right'], size: 'sm', class: 'w-full max-w-xs' },
    { side: ['left', 'right'], size: 'md', class: 'w-full max-w-sm' },
    { side: ['left', 'right'], size: 'lg', class: 'w-full max-w-md' },
    { side: ['left', 'right'], size: 'xl', class: 'w-full max-w-2xl' },
    { side: ['left', 'right'], size: 'full', class: 'w-full max-w-none rounded-none border-none' },

    { side: ['top', 'bottom'], size: 'sm', class: 'max-h-[25dvh]' },
    { side: ['top', 'bottom'], size: 'md', class: 'max-h-[40dvh]' },
    { side: ['top', 'bottom'], size: 'lg', class: 'max-h-[60dvh]' },
    { side: ['top', 'bottom'], size: 'xl', class: 'max-h-[80dvh]' },
    { side: ['top', 'bottom'], size: 'full', class: 'h-dvh max-h-none rounded-none border-none' },
  ],

  defaultVariants: { side: 'right', size: 'md' },
});
