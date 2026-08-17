import { pv } from '@prism-ui/core';
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
    'rounded-(--prism-radius-md) border border-transparent',
    'select-none',

    // Only the properties that actually change are transitioned, so the
    // compositor is not handed a blanket `transition: all`.
    'transition-[background-color,border-color,color,box-shadow,transform,opacity]',
    'duration-(--prism-duration-fast) ease-out',

    // Drawn with outline rather than a ring so an overflow-hidden ancestor
    // cannot clip it — the single most common focus-ring bug in UI kits.
    'outline-none',
    'focus-visible:outline-(length:--prism-ring-width) focus-visible:outline-offset-(--prism-ring-offset)',
    'focus-visible:outline-(--prism-ring)',

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
        'shadow-(--prism-shadow-xs)',
      ].join(' '),

      soft: [
        'bg-(--btn-subtle) text-(--btn-fg) [--btn-current:var(--btn-fg)]',
        'hover:bg-(--btn-subtle-hover)',
        'active:bg-(--btn-subtle-hover)',
      ].join(' '),

      outline: [
        'border-(--prism-border-default) bg-(--prism-bg-surface) text-(--btn-fg) [--btn-current:var(--btn-fg)]',
        'hover:border-(--prism-border-strong) hover:bg-(--btn-subtle)',
        'active:bg-(--btn-subtle-hover)',
        'shadow-(--prism-shadow-xs)',
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
      xs: 'h-(--prism-control-h-xs) gap-(--prism-control-gap-xs) px-(--prism-control-px-xs) text-xs rounded-(--prism-radius-sm) [&_svg]:size-3.5',
      sm: 'h-(--prism-control-h-sm) gap-(--prism-control-gap-sm) px-(--prism-control-px-sm) text-sm [&_svg]:size-4',
      md: 'h-(--prism-control-h-md) gap-(--prism-control-gap-md) px-(--prism-control-px-md) text-sm [&_svg]:size-4',
      lg: 'h-(--prism-control-h-lg) gap-(--prism-control-gap-lg) px-(--prism-control-px-lg) text-base [&_svg]:size-5',
      xl: 'h-(--prism-control-h-xl) gap-(--prism-control-gap-xl) px-(--prism-control-px-xl) text-lg rounded-(--prism-radius-lg) [&_svg]:size-5',
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
