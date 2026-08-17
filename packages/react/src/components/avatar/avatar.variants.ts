import { pv } from '@noksha-ui/core';

export const avatarVariants = pv({
  base: [
    'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden',
    'bg-(--noksha-bg-muted) text-(--noksha-fg-muted)',
    'align-middle font-medium',
  ].join(' '),

  variants: {
    size: {
      xs: 'size-6 text-[0.625rem]',
      sm: 'size-8 text-xs',
      md: 'size-10 text-sm',
      lg: 'size-12 text-base',
      xl: 'size-16 text-lg',
      '2xl': 'size-24 text-2xl',
    },
    shape: {
      circle: 'rounded-full',
      rounded: 'rounded-(--noksha-radius-md)',
    },
  },

  defaultVariants: { size: 'md', shape: 'circle' },
});

/**
 * `object-cover` is not optional here. Avatars are square and photographs are
 * not, so without it every non-square upload arrives visibly stretched.
 */
export const avatarImageVariants = pv({
  base: 'size-full object-cover',
});

export const avatarFallbackVariants = pv({
  base: 'flex size-full items-center justify-center uppercase leading-none',
});

export const avatarGroupVariants = pv({
  base: 'flex items-center [&>*]:ring-2 [&>*]:ring-(--noksha-bg-canvas)',
  variants: {
    spacing: {
      tight: '-space-x-3',
      normal: '-space-x-2',
      loose: '-space-x-1',
    },
  },
  defaultVariants: { spacing: 'normal' },
});
