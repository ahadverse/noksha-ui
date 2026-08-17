import { pv } from '@prism-ui/core';

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
    'rounded-(--prism-radius-lg)',
    'bg-(--prism-bg-surface) text-(--prism-fg-default)',
    'transition-[background-color,border-color,box-shadow,transform]',
    'duration-(--prism-duration-fast) ease-out',
  ].join(' '),

  variants: {
    variant: {
      elevated: 'border border-(--prism-border-subtle) shadow-(--prism-shadow-md)',
      outline: 'border border-(--prism-border-default)',
      subtle: 'border border-transparent bg-(--prism-bg-subtle)',
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
        'hover:border-(--prism-border-strong) hover:shadow-(--prism-shadow-lg)',
        'active:scale-[0.995] motion-reduce:active:scale-100 motion-reduce:transition-none',
        'focus-visible:outline-(length:--prism-ring-width) focus-visible:outline-offset-(--prism-ring-offset)',
        'focus-visible:outline-(--prism-ring)',
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
  base: 'font-semibold text-(length:--prism-text-lg) leading-(--prism-leading-snug) tracking-(--prism-tracking-tight)',
});

export const cardDescriptionVariants = pv({
  base: 'text-(length:--prism-text-sm) text-(--prism-fg-muted) leading-(--prism-leading-normal)',
});

export const cardContentVariants = pv({
  base: 'flex-1 p-(--card-p)',
});

export const cardFooterVariants = pv({
  base: 'flex items-center gap-2 p-(--card-p) pt-0',
});
