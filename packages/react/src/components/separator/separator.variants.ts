import { pv } from '@prism-ui/core';

export const separatorVariants = pv({
  base: 'shrink-0 bg-(--prism-border-subtle)',
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px self-stretch',
    },
    /** A labelled rule is a flex row of two lines with the label between them. */
    labelled: {
      true: 'flex items-center gap-3 bg-transparent text-(--prism-fg-subtle) text-xs',
      false: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', labelled: true, class: 'h-auto w-full' },
    { orientation: 'vertical', labelled: true, class: 'w-auto flex-col' },
  ],
  defaultVariants: { orientation: 'horizontal', labelled: false },
});

/** The hairlines either side of a label. `flex-1` splits the remaining width. */
export const separatorLineVariants = pv({
  base: 'flex-1 bg-(--prism-border-subtle)',
  variants: {
    orientation: {
      horizontal: 'h-px',
      vertical: 'w-px',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});
