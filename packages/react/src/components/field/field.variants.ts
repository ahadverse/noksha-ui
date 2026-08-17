import { pv } from '@noksha-ui/core';

export const fieldVariants = pv({
  base: 'group/field flex w-full min-w-0',
  variants: {
    orientation: {
      vertical: 'flex-col gap-1.5',
      /**
       * `items-start` rather than `items-center`: a checkbox beside a label
       * that wraps to two lines must sit against the first line, not float to
       * the middle of the block.
       */
      horizontal: 'flex-row items-start gap-2.5',
    },
    disabled: {
      true: 'opacity-60',
      false: '',
    },
  },
  defaultVariants: { orientation: 'vertical', disabled: false },
});

export const fieldLabelVariants = pv({
  base: [
    'inline-flex select-none items-center gap-1',
    'font-medium text-(--noksha-fg-default) leading-(--noksha-leading-snug)',
    // The label follows the control it belongs to, so a disabled control does
    // not leave a fully black label floating above a greyed-out box.
    'group-data-disabled/field:cursor-not-allowed',
  ].join(' '),
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-base',
    },
  },
  defaultVariants: { size: 'md' },
});

export const fieldDescriptionVariants = pv({
  base: 'text-(--noksha-fg-muted) leading-(--noksha-leading-normal)',
  variants: {
    size: {
      xs: 'text-[0.6875rem]',
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-sm',
    },
  },
  defaultVariants: { size: 'md' },
});

export const fieldErrorVariants = pv({
  base: 'flex items-center gap-1 text-(--noksha-danger-fg) leading-(--noksha-leading-normal)',
  variants: {
    size: {
      xs: 'text-[0.6875rem]',
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-sm',
    },
  },
  defaultVariants: { size: 'md' },
});

/** The asterisk. Decorative — the accessible name comes from `aria-required`. */
export const fieldRequiredVariants = pv({
  base: 'text-(--noksha-danger-fg) leading-none',
});
