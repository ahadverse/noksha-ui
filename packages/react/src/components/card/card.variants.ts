import { pv } from '@noksha-ui/core';

/**
 * Padding is published as `--card-p` on the root and consumed by the parts,
 * rather than passed down through context or repeated as a prop.
 *
 * That is what lets a consumer drop a custom section between `Card.Header` and
 * `Card.Footer` and have it line up: the value is on the element, so anything
 * inside can read it — including CSS the library never wrote.
 */
export const cardVariants = pv({
  base: [
    'relative flex flex-col',
    'rounded-(--noksha-radius-lg)',
    'bg-(--noksha-bg-surface) text-(--noksha-fg-default)',
    'transition-[background-color,border-color,box-shadow,transform]',
    'duration-(--noksha-duration-fast) ease-out',
  ].join(' '),

  variants: {
    variant: {
      elevated: 'border border-(--noksha-border-subtle) shadow-(--noksha-shadow-md)',
      outline: 'border border-(--noksha-border-default)',
      subtle: 'border border-transparent bg-(--noksha-bg-subtle)',
      ghost: 'border border-transparent bg-transparent',
    },

    padding: {
      none: '[--card-p:0px] [--card-gap:0px]',
      sm: '[--card-p:0.75rem] [--card-gap:0.5rem]',
      md: '[--card-p:1.25rem] [--card-gap:0.75rem]',
      lg: '[--card-p:1.75rem] [--card-gap:1rem]',
    },

    interactive: {
      true: [
        'cursor-pointer',
        'hover:border-(--noksha-border-strong) hover:shadow-(--noksha-shadow-lg)',
        'active:scale-[0.995] motion-reduce:active:scale-100 motion-reduce:transition-none',
        'focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset)',
        'focus-visible:outline-(--noksha-ring)',
      ].join(' '),
      false: '',
    },
  },

  defaultVariants: { variant: 'elevated', padding: 'md', interactive: false },
});

export const cardHeaderVariants = pv({
  base: 'flex flex-col gap-(--card-gap) p-(--card-p) pb-0',
});

export const cardTitleVariants = pv({
  base: 'font-semibold text-(length:--noksha-text-lg) leading-(--noksha-leading-snug) tracking-(--noksha-tracking-tight)',
});

export const cardDescriptionVariants = pv({
  base: 'text-(length:--noksha-text-sm) text-(--noksha-fg-muted) leading-(--noksha-leading-normal)',
});

export const cardContentVariants = pv({
  base: 'flex-1 p-(--card-p)',
});

export const cardFooterVariants = pv({
  base: 'flex items-center gap-2 p-(--card-p) pt-0',
});
