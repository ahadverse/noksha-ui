import { pv } from '@noksha-ui/core';
import { toneVariants } from '../../internal/tone.js';

export const buttonVariants = pv({
  base: [
    'relative inline-flex shrink-0 items-center justify-center',
    'whitespace-nowrap font-medium leading-none',
    'rounded-(--noksha-radius-md) border border-transparent',
    'select-none',

    'transition-[background-color,border-color,color,box-shadow,transform,opacity]',
    'duration-(--noksha-duration-fast) ease-out',

    'outline-none',
    'focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset)',
    'focus-visible:outline-(--noksha-ring)',

    'disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',

    'active:scale-[0.98] motion-reduce:active:scale-100 motion-reduce:transition-none',

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

      gradient: [
        'text-(--btn-ink) [--btn-current:var(--btn-ink)]',
        'bg-[linear-gradient(140deg,var(--btn-solid),var(--btn-solid-active))]',
        'hover:bg-[linear-gradient(140deg,var(--btn-solid-hover),var(--btn-solid))]',
        'shadow-(--noksha-shadow-sm)',
      ].join(' '),

      glass: [
        'text-(--btn-fg) [--btn-current:var(--btn-fg)]',
        'border-(--noksha-border-subtle) bg-(--btn-subtle)/50 backdrop-blur-md',
        'hover:border-(--noksha-border-default) hover:bg-(--btn-subtle)/75',
        'shadow-(--noksha-shadow-sm)',
      ].join(' '),

      glow: [
        'bg-(--btn-solid) text-(--btn-ink) [--btn-current:var(--btn-ink)]',
        'hover:bg-(--btn-solid-hover)',
        'shadow-[0_4px_18px_-6px_var(--btn-solid)]',
        'hover:shadow-[0_8px_28px_-6px_var(--btn-solid)]',
        'active:shadow-[0_2px_10px_-6px_var(--btn-solid)]',
      ].join(' '),

      dashed: [
        'border-dashed border-(--noksha-border-strong) bg-transparent',
        'text-(--btn-fg) [--btn-current:var(--btn-fg)]',
        'hover:border-(--btn-solid) hover:bg-(--btn-subtle)',
        'active:bg-(--btn-subtle-hover)',
      ].join(' '),
    },

    tone: toneVariants('btn'),

    effect: {
      none: '',

      lift: [
        'hover:-translate-y-0.5 hover:shadow-(--noksha-shadow-md)',
        'active:translate-y-0 active:shadow-(--noksha-shadow-xs)',
        'motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0',
      ].join(' '),

      sheen: [
        'isolate overflow-hidden',
        "before:pointer-events-none before:absolute before:content-['']",
        'before:-z-10 before:inset-y-0 before:-left-full before:w-1/2 before:-skew-x-12',
        'before:bg-[linear-gradient(90deg,transparent,var(--btn-current),transparent)]',
        'before:opacity-25',
        'before:transition-transform before:duration-700 before:ease-out',
        'hover:before:translate-x-[400%]',
        'motion-reduce:before:hidden',
      ].join(' '),

      wipe: [
        'isolate overflow-hidden',
        "before:pointer-events-none before:absolute before:content-['']",
        'before:-z-10 before:inset-0 before:origin-left before:scale-x-0',
        'before:bg-(--btn-current) before:opacity-15',
        'before:transition-transform before:duration-(--noksha-duration-normal) before:ease-out',
        'hover:before:scale-x-100',
        'motion-reduce:before:hidden',
      ].join(' '),

      pulse: [
        "after:pointer-events-none after:absolute after:inset-0 after:content-['']",
        'after:rounded-[inherit] after:border after:border-(--btn-solid)',
        'after:animate-noksha-pulse',
        'hover:after:animate-none motion-reduce:after:animate-none',
      ].join(' '),

      tilt: [
        'hover:-rotate-1 hover:scale-[1.02]',
        'active:rotate-0 active:scale-[0.98]',
        'motion-reduce:hover:rotate-0 motion-reduce:hover:scale-100',
      ].join(' '),
    },

    size: {
      xs: 'h-(--noksha-control-h-xs) gap-(--noksha-control-gap-xs) px-(--noksha-control-px-xs) text-xs rounded-(--noksha-radius-sm) [&_svg]:size-3.5',
      sm: 'h-(--noksha-control-h-sm) gap-(--noksha-control-gap-sm) px-(--noksha-control-px-sm) text-sm [&_svg]:size-4',
      md: 'h-(--noksha-control-h-md) gap-(--noksha-control-gap-md) px-(--noksha-control-px-md) text-sm [&_svg]:size-4',
      lg: 'h-(--noksha-control-h-lg) gap-(--noksha-control-gap-lg) px-(--noksha-control-px-lg) text-base [&_svg]:size-5',
      xl: 'h-(--noksha-control-h-xl) gap-(--noksha-control-gap-xl) px-(--noksha-control-px-xl) text-lg rounded-(--noksha-radius-lg) [&_svg]:size-5',
    },

    iconOnly: {
      true: 'aspect-square px-0',
      false: '',
    },

    shape: {
      default: '',
      round: 'rounded-full',
      circle: 'aspect-square rounded-full px-0',
    },

    fullWidth: {
      true: 'w-full',
      false: '',
    },

    loading: {
      true: 'cursor-progress disabled:opacity-100 aria-disabled:opacity-100',
      false: '',
    },

    loadingPlacement: {
      overlay: '',
      icon: '',
    },
  },

  compoundVariants: [
    {
      loading: true,
      loadingPlacement: 'overlay',
      class: 'text-transparent [&_svg]:invisible',
    },

    { variant: 'link', iconOnly: true, class: 'aspect-auto' },
    { variant: 'link', shape: 'circle', class: 'aspect-auto px-0' },

    { variant: 'link', effect: ['sheen', 'wipe'], class: 'overflow-visible before:hidden' },
    { variant: 'link', effect: 'pulse', class: 'after:hidden' },

    { variant: 'glass', effect: 'sheen', class: 'before:z-10 before:opacity-15' },

    {
      variant: ['solid', 'gradient', 'glow'],
      effect: 'pulse',
      class: 'after:border-(--btn-current)',
    },
  ],

  defaultVariants: {
    variant: 'solid',
    tone: 'accent',
    effect: 'none',
    size: 'md',
    iconOnly: false,
    loadingPlacement: 'overlay',
    shape: 'default',
    fullWidth: false,
    loading: false,
  },
});
