import { pv } from '@noksha-ui/core';
import { toneVariants } from '../../internal/tone.js';

export const badgeVariants = pv({
  base: [
    'inline-flex shrink-0 items-center justify-center',
    'whitespace-nowrap font-medium leading-none',
    'rounded-(--noksha-radius-full) border border-transparent',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),

  variants: {
    variant: {
      solid: 'bg-(--badge-solid) text-(--badge-ink)',
      soft: 'bg-(--badge-subtle) text-(--badge-fg)',
      outline: 'border-(--noksha-border-default) bg-transparent text-(--badge-fg)',
    },

    tone: toneVariants('badge'),

    /**
     * Badges do not use the control height scale. They label other things
     * rather than being operated, so they size to their text and stay smaller
     * than the control they sit next to.
     */
    size: {
      sm: 'h-5 gap-1 px-1.5 text-[0.6875rem] [&_svg]:size-3',
      md: 'h-6 gap-1.5 px-2 text-xs [&_svg]:size-3.5',
      lg: 'h-7 gap-1.5 px-2.5 text-sm [&_svg]:size-4',
    },
  },

  defaultVariants: { variant: 'soft', tone: 'accent', size: 'md' },
});

/**
 * The status dot takes `currentColor` rather than the solid slot. On a `soft`
 * badge those are nearly the same thing; on a `solid` one the solid slot *is*
 * the badge's own background, so a dot painted with it would disappear.
 */
export const badgeDotVariants = pv({
  base: 'shrink-0 rounded-full bg-current',
  variants: {
    size: {
      sm: 'size-1.5',
      md: 'size-1.5',
      lg: 'size-2',
    },
  },
  defaultVariants: { size: 'md' },
});
