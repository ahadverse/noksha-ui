import { pv } from '@prism-ui/core';
import { controlBase, controlVariantClasses } from '../../internal/control.js';

export const textareaVariants = pv({
  base: [
    controlBase,
    // The control height scale is for single-line controls; a textarea sizes
    // from its rows instead, so only the padding and type scale carry over.
    'block leading-(--prism-leading-normal)',
  ].join(' '),

  variants: {
    variant: controlVariantClasses,

    size: {
      xs: 'px-(--prism-control-px-xs) py-1 text-xs rounded-(--prism-radius-sm)',
      sm: 'px-(--prism-control-px-sm) py-1.5 text-sm',
      md: 'px-(--prism-control-px-md) py-2 text-sm',
      lg: 'px-(--prism-control-px-lg) py-2.5 text-base',
      xl: 'px-(--prism-control-px-xl) py-3 text-lg rounded-(--prism-radius-lg)',
    },

    resize: {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    },
  },

  defaultVariants: { variant: 'outline', size: 'md', resize: 'vertical' },
});
