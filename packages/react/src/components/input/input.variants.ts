import { pv } from '@noksha-ui/core';
import {
  controlAffixClasses,
  controlBase,
  controlSizeClasses,
  controlVariantClasses,
} from '../../internal/control.js';

export const inputVariants = pv({
  base: controlBase,
  variants: {
    variant: controlVariantClasses,
    size: controlSizeClasses,
    /** Padding for the icon to sit in. Logical properties, so RTL flips for free. */
    withStartIcon: {
      true: '',
      false: '',
    },
    withEndIcon: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    ...(['xs', 'sm', 'md', 'lg', 'xl'] as const).flatMap((size) => [
      { size, withStartIcon: true, class: controlAffixClasses[size].start },
      { size, withEndIcon: true, class: controlAffixClasses[size].end },
    ]),
  ],
  defaultVariants: { variant: 'outline', size: 'md', withStartIcon: false, withEndIcon: false },
});

export const inputWrapperVariants = pv({
  base: 'relative flex w-full min-w-0 items-center',
});

/**
 * `pointer-events-none` is what stops the affix from stealing the click: a user
 * aiming at the currency symbol still lands in the field, as they would in any
 * native control.
 */
export const inputAffixVariants = pv({
  base: [
    'pointer-events-none absolute inset-y-0 flex items-center',
    'text-(--noksha-fg-subtle)',
    '[&_svg]:shrink-0',
  ].join(' '),
  variants: {
    side: {
      start: 'start-0 ps-(--noksha-control-px-sm)',
      end: 'end-0 pe-(--noksha-control-px-sm)',
    },
    size: {
      xs: '[&_svg]:size-3.5 text-xs',
      sm: '[&_svg]:size-4 text-sm',
      md: '[&_svg]:size-4 text-sm',
      lg: '[&_svg]:size-5 text-base',
      xl: '[&_svg]:size-5 text-base',
    },
  },
  defaultVariants: { side: 'start', size: 'md' },
});
