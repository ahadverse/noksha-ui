import { pv } from '@prism-ui/core';
import { toneVariants } from '../../internal/tone.js';

export const radioGroupVariants = pv({
  base: 'flex',
  variants: {
    orientation: {
      vertical: 'flex-col gap-2',
      horizontal: 'flex-row flex-wrap items-center gap-4',
    },
  },
  defaultVariants: { orientation: 'vertical' },
});

export const radioRootVariants = pv({
  base: 'relative inline-flex shrink-0 items-center justify-center',
  variants: {
    tone: toneVariants('rd'),
    size: {
      sm: 'size-4',
      md: 'size-[1.125rem]',
      lg: 'size-5',
    },
  },
  defaultVariants: { tone: 'accent', size: 'md' },
});

export const radioInputVariants = pv({
  base: 'peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed',
});

export const radioCircleVariants = pv({
  base: [
    'pointer-events-none absolute inset-0 rounded-full border-2',
    'border-(--prism-border-strong) bg-(--prism-bg-surface)',
    'transition-[border-color,background-color] duration-(--prism-duration-fast) ease-out',

    'peer-hover:border-(--rd-solid)',
    'peer-checked:border-(--rd-solid)',

    'peer-focus-visible:outline-(length:--prism-ring-width)',
    'peer-focus-visible:outline-offset-(--prism-ring-offset) peer-focus-visible:outline-(--prism-ring)',

    'peer-disabled:bg-(--prism-bg-subtle) peer-disabled:opacity-60',
    'peer-aria-invalid:border-(--prism-danger-solid)',
  ].join(' '),
});

/**
 * The dot scales in from zero rather than fading. A radio that fades reads as a
 * loading state at small sizes; the scale reads as a selection.
 */
export const radioDotVariants = pv({
  base: [
    'pointer-events-none absolute size-[45%] rounded-full bg-(--rd-solid)',
    'scale-0 transition-transform duration-(--prism-duration-fast) ease-(--prism-ease-spring)',
    'motion-reduce:transition-none',
    'peer-checked:scale-100',
    'peer-disabled:bg-(--prism-fg-disabled)',
  ].join(' '),
});
