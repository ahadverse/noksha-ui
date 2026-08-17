import { pv } from '@prism-ui/core';
import { toneVariants } from '../../internal/tone.js';

/**
 * The control is a real `<input type="checkbox">` laid transparently over a
 * styled box, not a `<div role="checkbox">`.
 *
 * That buys the whole native contract — form participation, `FormData`, label
 * clicks, the `:indeterminate` pseudo-class, Space to toggle, the platform's own
 * focus behaviour — while every visual state is still expressed in CSS through
 * `peer-*`. No JavaScript observes the state (ADR-004).
 *
 * The box and both marks are *siblings* of the input rather than its
 * descendants, because `peer-*` compiles to a sibling combinator: nest them and
 * every state style silently stops matching.
 */
export const checkboxRootVariants = pv({
  base: 'relative inline-flex shrink-0 items-center justify-center',
  variants: {
    tone: toneVariants('cb'),
    size: {
      sm: 'size-4',
      md: 'size-[1.125rem]',
      lg: 'size-5',
    },
  },
  defaultVariants: { tone: 'accent', size: 'md' },
});

export const checkboxInputVariants = pv({
  base: 'peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed',
});

export const checkboxBoxVariants = pv({
  base: [
    'pointer-events-none absolute inset-0 rounded-(--prism-radius-xs) border-2',
    'border-(--prism-border-strong) bg-(--prism-bg-surface)',
    'transition-[background-color,border-color] duration-(--prism-duration-fast) ease-out',

    'peer-hover:border-(--cb-solid)',

    'peer-checked:border-(--cb-solid) peer-checked:bg-(--cb-solid)',
    'peer-indeterminate:border-(--cb-solid) peer-indeterminate:bg-(--cb-solid)',

    'peer-focus-visible:outline-(length:--prism-ring-width)',
    'peer-focus-visible:outline-offset-(--prism-ring-offset) peer-focus-visible:outline-(--prism-ring)',

    'peer-disabled:bg-(--prism-bg-subtle) peer-disabled:opacity-60',

    // Driven off aria rather than a class, so a control the Field marks invalid
    // turns red with nothing else wired up.
    'peer-aria-invalid:border-(--prism-danger-solid)',
  ].join(' '),
});

/**
 * Both marks stay mounted and cross-fade. Swapping them on state change means
 * unmounting mid-transition, which browsers render as a flicker.
 */
export const checkboxMarkVariants = pv({
  base: [
    'pointer-events-none absolute size-[65%] text-(--cb-ink)',
    'opacity-0 transition-opacity duration-(--prism-duration-instant)',
    'peer-disabled:text-(--prism-fg-disabled)',
  ].join(' '),
  variants: {
    mark: {
      check: 'peer-checked:opacity-100 peer-indeterminate:opacity-0',
      dash: 'peer-indeterminate:opacity-100',
    },
  },
  defaultVariants: { mark: 'check' },
});
