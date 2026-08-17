import { pv } from '@noksha-ui/core';

export const accordionVariants = pv({
  base: 'w-full',
  variants: {
    variant: {
      bordered:
        'divide-y divide-(--noksha-border-subtle) rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle)',
      separated: 'flex flex-col gap-2',
      ghost: 'divide-y divide-(--noksha-border-subtle)',
    },
  },
  defaultVariants: { variant: 'bordered' },
});

export const accordionItemVariants = pv({
  base: 'min-w-0',
  variants: {
    variant: {
      bordered: 'first:rounded-t-(--noksha-radius-lg) last:rounded-b-(--noksha-radius-lg)',
      separated: 'rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle)',
      ghost: '',
    },
  },
  defaultVariants: { variant: 'bordered' },
});

export const accordionTriggerVariants = pv({
  base: [
    'flex w-full items-center justify-between gap-3 px-4 py-3.5',
    'text-start font-medium text-(length:--noksha-text-sm) text-(--noksha-fg-default)',
    'transition-colors duration-(--noksha-duration-fast)',
    'hover:bg-(--noksha-bg-subtle)',

    'outline-none',
    'focus-visible:outline-(length:--noksha-ring-width) focus-visible:-outline-offset-2',
    'focus-visible:outline-(--noksha-ring)',

    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:size-4 [&_svg]:shrink-0',
  ].join(' '),
});

/** Rotates rather than swapping icons, so there is one element and one state. */
export const accordionIndicatorVariants = pv({
  base: [
    'text-(--noksha-fg-muted)',
    'transition-transform duration-(--noksha-duration-normal) ease-out',
    'motion-reduce:transition-none',
    'group-data-[state=open]/trigger:rotate-180',
  ].join(' '),
});

/**
 * The height animation is `grid-template-rows: 0fr → 1fr`.
 *
 * `height: auto` is not animatable, which is why most accordions measure the
 * content with JavaScript and write a pixel height — then get it wrong the
 * moment the content reflows, an image loads, or the window is resized. The
 * grid technique animates to the content's *own* height in pure CSS, with
 * nothing to measure and nothing to keep in sync (ADR-004).
 *
 * An animation, not a transition: the panel is unmounted while collapsed, so
 * there is no previous value for a transition to run from. `usePresence` holds
 * it in the DOM long enough for the closing half to play.
 */
export const accordionContentVariants = pv({
  base: [
    'grid',
    'data-[state=open]:animate-noksha-collapse-in',
    'data-[state=closed]:animate-noksha-collapse-out',
  ].join(' '),
});

/** The inner element must own `overflow: hidden` for the 0fr row to clip it. */
export const accordionContentInnerVariants = pv({
  base: 'overflow-hidden',
});

export const accordionContentBodyVariants = pv({
  base: 'px-4 pb-4 text-(length:--noksha-text-sm) text-(--noksha-fg-muted) leading-(--noksha-leading-relaxed)',
});
