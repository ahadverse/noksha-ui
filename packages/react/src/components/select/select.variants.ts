import { pv } from '@noksha-ui/core';
import { controlBase, controlSizeClasses, controlVariantClasses } from '../../internal/control.js';
import { overlayMotion, overlaySideMotion, overlaySurface } from '../../internal/overlay.js';

/**
 * The trigger wears the same shell as Input and Textarea, from the same source,
 * so a Select stacked above a text field lines up to the pixel.
 */
export const selectTriggerVariants = pv({
  base: [
    controlBase,
    'flex cursor-default items-center justify-between gap-2 text-start',
    'data-[placeholder]:text-(--noksha-fg-subtle)',
    '[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-(--noksha-fg-muted)',
  ].join(' '),
  variants: {
    variant: controlVariantClasses,
    size: controlSizeClasses,
  },
  defaultVariants: { variant: 'outline', size: 'md' },
});

export const selectContentVariants = pv({
  base: [
    overlaySurface,
    overlayMotion,
    overlaySideMotion,
    'z-(--noksha-z-dropdown) overflow-hidden p-1',
    'outline-none',
    // Published by the size middleware — the list never grows past the space
    // that is actually available below the trigger.
    'max-h-[min(var(--noksha-available-height,24rem),24rem)] overflow-y-auto',
  ].join(' '),
  variants: {
    matchTriggerWidth: {
      true: 'w-(--noksha-anchor-width) min-w-(--noksha-anchor-width)',
      false: 'min-w-(--noksha-anchor-width)',
    },
  },
  defaultVariants: { matchTriggerWidth: false },
});

export const selectItemVariants = pv({
  base: [
    'relative flex cursor-default select-none items-center gap-2',
    'rounded-(--noksha-radius-sm) py-1.5 pe-8 ps-2',
    'text-(length:--noksha-text-sm) outline-none',
    'transition-colors duration-(--noksha-duration-instant)',

    // Focus, not hover, drives the highlight. Keyboard and pointer then agree
    // on which row is active — hover-only highlighting leaves a keyboard user
    // guessing when the pointer happens to rest somewhere else.
    'focus:bg-(--noksha-accent-subtle) focus:text-(--noksha-accent-fg)',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    '[&_svg]:size-4 [&_svg]:shrink-0',
  ].join(' '),
});

export const selectIndicatorVariants = pv({
  base: 'absolute end-2 flex items-center text-(--noksha-accent-fg)',
});

export const selectGroupLabelVariants = pv({
  base: 'px-2 py-1.5 font-medium text-(--noksha-fg-muted) text-xs',
});
