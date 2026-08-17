import { pv } from '@noksha-ui/core';
import { toneVariants } from '../../internal/tone.js';

/**
 * Same construction as the Checkbox — a transparent native input over a styled
 * track, with the visuals as siblings so `peer-*` can reach them.
 *
 * The track dimensions are published as `--sw-w`, `--sw-h` and `--sw-gap`, so
 * the thumb's travel is computed (`width − height`) rather than hand-tuned per
 * size. Adding a fourth size costs one line, not a translate value someone has
 * to get right by eye and that drifts the moment the track changes.
 */
export const switchRootVariants = pv({
  base: 'relative inline-flex shrink-0 items-center',
  variants: {
    tone: toneVariants('sw'),
    size: {
      sm: 'h-4 w-7 [--sw-w:1.75rem] [--sw-h:1rem] [--sw-gap:0.125rem]',
      md: 'h-5 w-9 [--sw-w:2.25rem] [--sw-h:1.25rem] [--sw-gap:0.125rem]',
      lg: 'h-6 w-11 [--sw-w:2.75rem] [--sw-h:1.5rem] [--sw-gap:0.1875rem]',
    },
  },
  defaultVariants: { tone: 'accent', size: 'md' },
});

export const switchInputVariants = pv({
  base: 'peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed',
});

export const switchTrackVariants = pv({
  base: [
    'pointer-events-none absolute inset-0 rounded-full',
    'bg-(--noksha-bg-muted)',
    'transition-colors duration-(--noksha-duration-normal) ease-out',
    'motion-reduce:transition-none',

    'peer-checked:bg-(--sw-solid)',
    'peer-focus-visible:outline-(length:--noksha-ring-width)',
    'peer-focus-visible:outline-offset-(--noksha-ring-offset) peer-focus-visible:outline-(--noksha-ring)',
    'peer-disabled:opacity-60',
    'peer-aria-invalid:ring-2 peer-aria-invalid:ring-(--noksha-danger-solid)',
  ].join(' '),
});

/**
 * Travel is `100% of the track − thumb − both gaps`, computed in CSS. Sliding
 * the thumb rather than cross-fading two states is what makes the control read
 * as a physical toggle; `prefers-reduced-motion` drops it to a jump.
 */
export const switchThumbVariants = pv({
  base: [
    'pointer-events-none absolute start-(--sw-gap)',
    'size-[calc(var(--sw-h)-2*var(--sw-gap))] rounded-full',
    'bg-(--noksha-bg-surface) shadow-(--noksha-shadow-sm)',
    'transition-transform duration-(--noksha-duration-normal) ease-(--noksha-ease-spring)',
    'motion-reduce:transition-none',
    'peer-checked:translate-x-[calc(var(--sw-w)-var(--sw-h))]',
    'rtl:peer-checked:-translate-x-[calc(var(--sw-w)-var(--sw-h))]',
    'peer-disabled:shadow-none',
  ].join(' '),
});
