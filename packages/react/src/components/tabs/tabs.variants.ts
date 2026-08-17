import { pv } from '@prism-ui/core';

export const tabsVariants = pv({
  base: 'flex',
  variants: {
    orientation: {
      horizontal: 'flex-col gap-3',
      vertical: 'flex-row gap-4',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const tabsListVariants = pv({
  base: 'relative flex shrink-0',
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col items-stretch',
    },
    variant: {
      /** A rule under the whole strip, with the active tab overlapping it. */
      line: 'gap-1',
      solid: 'gap-1 rounded-(--prism-radius-md) bg-(--prism-bg-subtle) p-1',
      pill: 'gap-1.5',
    },
    fitted: {
      true: 'w-full [&>*]:flex-1',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'line',
      orientation: 'horizontal',
      class: 'border-(--prism-border-subtle) border-b',
    },
    { variant: 'line', orientation: 'vertical', class: 'border-(--prism-border-subtle) border-e' },
  ],
  defaultVariants: { orientation: 'horizontal', variant: 'line', fitted: false },
});

export const tabsTriggerVariants = pv({
  base: [
    'relative inline-flex shrink-0 items-center justify-center gap-2',
    'whitespace-nowrap font-medium',
    'text-(--prism-fg-muted)',
    'transition-[color,background-color,border-color,box-shadow] duration-(--prism-duration-fast) ease-out',

    'outline-none',
    'focus-visible:outline-(length:--prism-ring-width) focus-visible:outline-offset-(--prism-ring-offset)',
    'focus-visible:outline-(--prism-ring)',

    'disabled:pointer-events-none disabled:opacity-50',
    'hover:text-(--prism-fg-default)',
    'data-[state=active]:text-(--prism-fg-default)',
    '[&_svg]:size-4 [&_svg]:shrink-0',
  ].join(' '),

  variants: {
    variant: {
      /**
       * The indicator is drawn with a border on the trigger itself rather than
       * a sliding element. There is nothing to keep in sync, nothing to
       * measure, and it survives the strip being resized or scrolled.
       */
      line: [
        'border-transparent',
        'data-[state=active]:border-(--prism-accent-solid)',
        'data-[state=active]:text-(--prism-accent-fg)',
      ].join(' '),
      solid: [
        'rounded-(--prism-radius-sm)',
        'data-[state=active]:bg-(--prism-bg-surface) data-[state=active]:shadow-(--prism-shadow-xs)',
      ].join(' '),
      pill: [
        'rounded-(--prism-radius-full)',
        'data-[state=active]:bg-(--prism-accent-solid) data-[state=active]:text-(--prism-accent-on-solid)',
      ].join(' '),
    },

    size: {
      sm: 'h-8 px-2.5 text-xs',
      md: 'h-9 px-3 text-sm',
      lg: 'h-11 px-4 text-base',
    },

    orientation: {
      horizontal: '',
      vertical: '',
    },
  },

  compoundVariants: [
    // The active tab's border sits on the edge shared with the list's rule,
    // pulled out by a pixel so the two overlap instead of stacking.
    { variant: 'line', orientation: 'horizontal', class: '-mb-px border-b-2' },
    { variant: 'line', orientation: 'vertical', class: '-me-px justify-start border-e-2' },
    { variant: 'solid', orientation: 'vertical', class: 'justify-start' },
    { variant: 'pill', orientation: 'vertical', class: 'justify-start' },
  ],

  defaultVariants: { variant: 'line', size: 'md', orientation: 'horizontal' },
});

export const tabsContentVariants = pv({
  base: [
    'min-w-0 flex-1 outline-none',
    'focus-visible:outline-(length:--prism-ring-width) focus-visible:outline-offset-(--prism-ring-offset)',
    'focus-visible:outline-(--prism-ring)',
  ].join(' '),
});
