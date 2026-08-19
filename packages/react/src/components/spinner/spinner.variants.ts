import { pv } from '@noksha-ui/core';

export const spinnerVariants = pv({
  base: [
    'relative inline-flex shrink-0 items-center justify-center align-middle',
    '[&_*]:[animation-duration:calc(var(--noksha-spinner-duration,1s)*var(--noksha-spinner-speed,1))]',
  ].join(' '),

  variants: {
    size: {
      xs: 'size-3 [--noksha-spinner-stroke:1.5px]',
      sm: 'size-3.5 [--noksha-spinner-stroke:1.5px]',
      md: 'size-4 [--noksha-spinner-stroke:1.5px]',
      lg: 'size-5 [--noksha-spinner-stroke:2px]',
      xl: 'size-6 [--noksha-spinner-stroke:2px]',
      '2xl': 'size-8 [--noksha-spinner-stroke:2.5px]',
      '3xl': 'size-12 [--noksha-spinner-stroke:3px]',
    },

    variant: {
      ring: '[--noksha-spinner-duration:700ms] motion-reduce:[--noksha-spinner-duration:1800ms]',
      arc: '[--noksha-spinner-duration:700ms] motion-reduce:[--noksha-spinner-duration:1800ms]',
      dual: '[--noksha-spinner-duration:900ms] motion-reduce:[--noksha-spinner-duration:2200ms]',
      dash: '[--noksha-spinner-duration:1.5s] motion-reduce:[--noksha-spinner-duration:3s]',
      segment: '[--noksha-spinner-duration:900ms] motion-reduce:[--noksha-spinner-duration:2200ms]',
      comet: '[--noksha-spinner-duration:800ms] motion-reduce:[--noksha-spinner-duration:2s]',

      dots: '[--noksha-spinner-duration:1.2s] motion-reduce:[--noksha-spinner-duration:2.4s]',
      bounce: '[--noksha-spinner-duration:1s] motion-reduce:[--noksha-spinner-duration:2s]',
      beat: '[--noksha-spinner-duration:1.2s] motion-reduce:[--noksha-spinner-duration:2.4s]',
      orbit: '[--noksha-spinner-duration:900ms] motion-reduce:[--noksha-spinner-duration:2200ms]',
      halo: '[--noksha-spinner-duration:1.2s] motion-reduce:[--noksha-spinner-duration:2.4s]',

      bars: '[--noksha-spinner-duration:1.1s] motion-reduce:[--noksha-spinner-duration:2.2s]',
      wave: '[--noksha-spinner-duration:1s] motion-reduce:[--noksha-spinner-duration:2s]',
      spokes: '[--noksha-spinner-duration:1.1s] motion-reduce:[--noksha-spinner-duration:2.2s]',

      pulse: '[--noksha-spinner-duration:1.4s] motion-reduce:[--noksha-spinner-duration:2.8s]',
      ripple: '[--noksha-spinner-duration:1.6s] motion-reduce:[--noksha-spinner-duration:3.2s]',
      grid: '[--noksha-spinner-duration:1.3s] motion-reduce:[--noksha-spinner-duration:2.6s]',
      flip: '[--noksha-spinner-duration:1.6s] motion-reduce:[--noksha-spinner-duration:3.2s]',
    },

    speed: {
      slow: '[--noksha-spinner-speed:1.75]',
      normal: '[--noksha-spinner-speed:1]',
      fast: '[--noksha-spinner-speed:0.55]',
    },
  },

  defaultVariants: { size: 'md', variant: 'ring', speed: 'normal' },
});
