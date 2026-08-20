import { pv } from '@noksha-ui/core';
import { toneVariants } from '../../internal/tone.js';

export const skeletonVariants = pv({
  base: [
    'relative isolate block min-w-0 overflow-hidden bg-(--sk-subtle)',
    '[animation-delay:var(--sk-delay,0ms)]',
    '[animation-duration:calc(var(--noksha-skeleton-duration,1.6s)*var(--noksha-skeleton-speed,1))]',
    '[&_*]:[animation-delay:var(--sk-delay,0ms)]',
    '[&_*]:[animation-duration:calc(var(--noksha-skeleton-duration,1.6s)*var(--noksha-skeleton-speed,1))]',
  ].join(' '),

  variants: {
    variant: {
      pulse:
        'animate-noksha-skeleton-pulse [--noksha-skeleton-duration:1.6s] motion-reduce:[--noksha-skeleton-duration:3.2s]',
      breathe:
        'animate-noksha-skeleton-breathe [--noksha-skeleton-duration:1.8s] motion-reduce:[--noksha-skeleton-duration:3.6s]',
      blink:
        'animate-noksha-skeleton-blink [--noksha-skeleton-duration:1.4s] motion-reduce:[--noksha-skeleton-duration:2.8s]',
      fade: '[--noksha-skeleton-duration:2s] motion-reduce:[--noksha-skeleton-duration:4s]',

      shimmer: '[--noksha-skeleton-duration:1.6s] motion-reduce:[--noksha-skeleton-duration:3.2s]',
      wave: '[--noksha-skeleton-duration:2s] motion-reduce:[--noksha-skeleton-duration:4s]',
      sheen: '[--noksha-skeleton-duration:1.8s] motion-reduce:[--noksha-skeleton-duration:3.6s]',
      slide: '[--noksha-skeleton-duration:1.5s] motion-reduce:[--noksha-skeleton-duration:3s]',

      ripple: '[--noksha-skeleton-duration:1.8s] motion-reduce:[--noksha-skeleton-duration:3.6s]',
      glow: '[--noksha-skeleton-duration:2s] motion-reduce:[--noksha-skeleton-duration:4s]',
      bar: '[--noksha-skeleton-duration:1.6s] motion-reduce:[--noksha-skeleton-duration:3.2s]',

      gradient: [
        'animate-noksha-skeleton-shift bg-[length:200%_100%]',
        'bg-[linear-gradient(90deg,var(--sk-subtle)_0%,var(--sk-subtle-hover)_50%,var(--sk-subtle)_100%)]',
        '[--noksha-skeleton-duration:1.8s] motion-reduce:[--noksha-skeleton-duration:3.6s]',
      ].join(' '),
      stripe: [
        'animate-noksha-skeleton-shift bg-[length:200%_100%]',
        'bg-[repeating-linear-gradient(45deg,var(--sk-subtle)_0_8px,var(--sk-subtle-hover)_8px_16px)]',
        '[--noksha-skeleton-duration:2.2s] motion-reduce:[--noksha-skeleton-duration:4.4s]',
      ].join(' '),
      grid: [
        'animate-noksha-skeleton-drift bg-[length:14px_14px]',
        'bg-[linear-gradient(var(--sk-subtle-hover)_1px,transparent_1px),linear-gradient(90deg,var(--sk-subtle-hover)_1px,transparent_1px)]',
        '[--noksha-skeleton-duration:2.4s] motion-reduce:[--noksha-skeleton-duration:4.8s]',
      ].join(' '),
      dots: [
        'animate-noksha-skeleton-drift bg-[length:14px_14px]',
        'bg-[radial-gradient(var(--sk-subtle-hover)_1.5px,transparent_1.5px)]',
        '[--noksha-skeleton-duration:2.4s] motion-reduce:[--noksha-skeleton-duration:4.8s]',
      ].join(' '),

      outline: 'border border-(--noksha-border-default) bg-transparent',
      dashed: 'border border-(--noksha-border-default) border-dashed bg-transparent',
      flat: 'bg-(--sk-subtle)',
    },

    shape: {
      text: 'w-full rounded-(--noksha-radius-sm)',
      rect: 'w-full rounded-none',
      rounded: 'w-full rounded-(--noksha-radius-lg)',
      circle: 'shrink-0 rounded-(--noksha-radius-full)',
      pill: 'rounded-(--noksha-radius-full)',
    },

    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },

    tone: toneVariants('sk'),

    speed: {
      slow: '[--noksha-skeleton-speed:1.75]',
      normal: '[--noksha-skeleton-speed:1]',
      fast: '[--noksha-skeleton-speed:0.55]',
    },
  },

  compoundVariants: [
    { shape: 'text', size: 'xs', class: 'h-2.5' },
    { shape: 'text', size: 'sm', class: 'h-3' },
    { shape: 'text', size: 'md', class: 'h-4' },
    { shape: 'text', size: 'lg', class: 'h-5' },
    { shape: 'text', size: 'xl', class: 'h-6' },

    { shape: ['rect', 'rounded'], size: 'xs', class: 'h-12' },
    { shape: ['rect', 'rounded'], size: 'sm', class: 'h-16' },
    { shape: ['rect', 'rounded'], size: 'md', class: 'h-24' },
    { shape: ['rect', 'rounded'], size: 'lg', class: 'h-32' },
    { shape: ['rect', 'rounded'], size: 'xl', class: 'h-40' },

    { shape: 'circle', size: 'xs', class: 'size-6' },
    { shape: 'circle', size: 'sm', class: 'size-8' },
    { shape: 'circle', size: 'md', class: 'size-10' },
    { shape: 'circle', size: 'lg', class: 'size-14' },
    { shape: 'circle', size: 'xl', class: 'size-20' },

    { shape: 'pill', size: 'xs', class: 'h-4 w-20' },
    { shape: 'pill', size: 'sm', class: 'h-5 w-24' },
    { shape: 'pill', size: 'md', class: 'h-6 w-28' },
    { shape: 'pill', size: 'lg', class: 'h-7 w-36' },
    { shape: 'pill', size: 'xl', class: 'h-9 w-44' },
  ],
  defaultVariants: {
    variant: 'pulse',
    shape: 'text',
    size: 'md',
    tone: 'neutral',
    speed: 'normal',
  },
});

/** The column `lines` renders into. Rows carry the treatment; this only spaces them. */
export const skeletonStackVariants = pv({
  base: 'flex w-full flex-col gap-2.5',
});
