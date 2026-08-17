import { pv } from '@noksha-ui/core';
import { toneVariants } from '../../internal/tone.js';

/**
 * Every tone declares the same seven local variables; every visual variant
 * reads them. That is why `tone` can repaint the whole button with one class
 * instead of needing a `variant × tone` compound for all 30 combinations —
 * the regularity of the semantic token shape (ARCHITECTURE.md §3.2) is doing
 * the work. See `internal/tone.ts` for the slot table.
 */
export const buttonVariants = pv({
  base: [
    'relative inline-flex shrink-0 items-center justify-center',
    'whitespace-nowrap font-medium leading-none',
    'rounded-(--noksha-radius-md) border border-transparent',
    'select-none',

    // Only the properties that actually change are transitioned, so the
    // compositor is not handed a blanket `transition: all`.
    'transition-[background-color,border-color,color,box-shadow,transform,opacity]',
    'duration-(--noksha-duration-fast) ease-out',

    // Drawn with outline rather than a ring so an overflow-hidden ancestor
    // cannot clip it — the single most common focus-ring bug in UI kits.
    'outline-none',
    'focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset)',
    'focus-visible:outline-(--noksha-ring)',

    'disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',

    // Press feedback, dropped entirely under prefers-reduced-motion.
    'active:scale-[0.98] motion-reduce:active:scale-100 motion-reduce:transition-none',

    // Icons never announce themselves and never shrink.
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],

  variants: {
    variant: {
      solid: [
        'bg-(--btn-solid) text-(--btn-ink) [--btn-current:var(--btn-ink)]',
        'hover:bg-(--btn-solid-hover) active:bg-(--btn-solid-active)',
        'shadow-(--noksha-shadow-xs)',
      ].join(' '),

      soft: [
        'bg-(--btn-subtle) text-(--btn-fg) [--btn-current:var(--btn-fg)]',
        'hover:bg-(--btn-subtle-hover)',
        'active:bg-(--btn-subtle-hover)',
      ].join(' '),

      outline: [
        'border-(--noksha-border-default) bg-(--noksha-bg-surface) text-(--btn-fg) [--btn-current:var(--btn-fg)]',
        'hover:border-(--noksha-border-strong) hover:bg-(--btn-subtle)',
        'active:bg-(--btn-subtle-hover)',
        'shadow-(--noksha-shadow-xs)',
      ].join(' '),

      ghost: [
        'bg-transparent text-(--btn-fg) [--btn-current:var(--btn-fg)]',
        'hover:bg-(--btn-subtle)',
        'active:bg-(--btn-subtle-hover)',
      ].join(' '),

      link: [
        'bg-transparent text-(--btn-fg) [--btn-current:var(--btn-fg)] underline-offset-4',
        'hover:underline active:scale-100',
        'h-auto px-0',
      ].join(' '),
    },

    tone: toneVariants('btn'),

    size: {
      xs: 'h-(--noksha-control-h-xs) gap-(--noksha-control-gap-xs) px-(--noksha-control-px-xs) text-xs rounded-(--noksha-radius-sm) [&_svg]:size-3.5',
      sm: 'h-(--noksha-control-h-sm) gap-(--noksha-control-gap-sm) px-(--noksha-control-px-sm) text-sm [&_svg]:size-4',
      md: 'h-(--noksha-control-h-md) gap-(--noksha-control-gap-md) px-(--noksha-control-px-md) text-sm [&_svg]:size-4',
      lg: 'h-(--noksha-control-h-lg) gap-(--noksha-control-gap-lg) px-(--noksha-control-px-lg) text-base [&_svg]:size-5',
      xl: 'h-(--noksha-control-h-xl) gap-(--noksha-control-gap-xl) px-(--noksha-control-px-xl) text-lg rounded-(--noksha-radius-lg) [&_svg]:size-5',
    },

    /** Square, and the type system demands an aria-label — see button.types.ts. */
    iconOnly: {
      true: 'aspect-square px-0',
      false: '',
    },

    fullWidth: {
      true: 'w-full',
      false: '',
    },

    /**
     * The content is hidden where it stands instead of being unmounted, so the
     * button holds its exact width. Doing it in CSS on the root — rather than
     * with a wrapper element — is what makes it survive `asChild`, where the
     * root is the consumer's own element.
     */
    loading: {
      true: 'cursor-progress text-transparent [&_svg]:invisible',
      false: '',
    },
  },

  compoundVariants: [
    // A link has no box, so box-level sizing and the icon-only square do not apply.
    { variant: 'link', iconOnly: true, class: 'aspect-auto' },
  ],

  defaultVariants: {
    variant: 'solid',
    tone: 'accent',
    size: 'md',
    iconOnly: false,
    fullWidth: false,
    loading: false,
  },
});
