import { pv } from '@noksha-ui/core';
import { toneVariants } from '../../internal/tone.js';

/**
 * A grid — icon, text, actions — rather than flex.
 *
 * With flex, a two-line description wraps back under the icon. The grid keeps
 * the text column aligned to itself however many lines it runs to, which is the
 * difference between an alert that looks designed and one that looks assembled.
 *
 * Which column the text starts in depends on whether there is an icon, so the
 * root publishes it as `--alert-col` and the parts read it. Same trick as the
 * Card's padding: the answer lives on the element, so the parts need no context
 * and a consumer's own child can line up with them too.
 */
export const alertVariants = pv({
  base: [
    'grid items-start gap-x-3 gap-y-1',
    'w-full rounded-(--noksha-radius-md) border p-4',
    'text-(length:--noksha-text-sm) leading-(--noksha-leading-normal)',
    '[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
  ].join(' '),

  variants: {
    variant: {
      soft: 'border-transparent bg-(--alert-subtle) text-(--alert-fg)',
      outline:
        'border-(--noksha-border-default) bg-(--noksha-bg-surface) text-(--noksha-fg-default)',
      solid: 'border-transparent bg-(--alert-solid) text-(--alert-ink)',
    },

    tone: toneVariants('alert'),

    withIcon: {
      true: 'grid-cols-[auto_1fr_auto] [--alert-col:2]',
      false: 'grid-cols-[1fr_auto] [--alert-col:1]',
    },
  },

  compoundVariants: [
    // On an outline alert the body text is default foreground, so the icon is
    // the only thing left carrying the tone and has to be repainted explicitly.
    { variant: 'outline', class: '[&>svg:first-child]:text-(--alert-fg)' },
  ],

  defaultVariants: { variant: 'soft', tone: 'info', withIcon: true },
});

export const alertTitleVariants = pv({
  base: 'col-start-(--alert-col) font-semibold leading-(--noksha-leading-snug)',
});

export const alertDescriptionVariants = pv({
  base: 'col-start-(--alert-col) opacity-90',
});

/** Spans every row so a single action button centres against two lines of text. */
export const alertActionsVariants = pv({
  base: 'row-span-full flex items-center gap-2 self-center',
});
