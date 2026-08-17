import { pv } from '@prism-ui/core';
import { toneVariants } from '../../internal/tone.js';

/**
 * A styled `<input type="range">`, not a div with drag handlers.
 *
 * Range inputs are awkward to style — every engine exposes its own
 * pseudo-elements — but what comes back is worth it: pointer *and* touch
 * dragging, arrow keys, Home/End, Page Up/Down, `aria-valuenow` maintained by
 * the platform, form participation, and correct behaviour under every assistive
 * technology, none of which has to be written or tested here.
 *
 * The filled portion is a gradient stop driven by `--sl-fill`, so the paint
 * follows the value with no second element to keep in sync.
 */
const TRACK = [
  'h-(--sl-track) rounded-full border-none',
  'bg-[linear-gradient(to_right,var(--sl-solid)_var(--sl-fill),var(--prism-bg-muted)_var(--sl-fill))]',
];

const THUMB = [
  'size-(--sl-thumb) rounded-full border-2 border-(--sl-solid)',
  'bg-(--prism-bg-surface) shadow-(--prism-shadow-sm)',
  'transition-[transform,box-shadow] duration-(--prism-duration-fast) ease-out',
];

export const sliderVariants = pv({
  base: [
    'w-full cursor-pointer appearance-none bg-transparent',
    'outline-none disabled:cursor-not-allowed disabled:opacity-60',

    // WebKit and Blink
    ...TRACK.map((c) => `[&::-webkit-slider-runnable-track]:${c}`),
    ...THUMB.map((c) => `[&::-webkit-slider-thumb]:${c}`),
    '[&::-webkit-slider-thumb]:appearance-none',
    // Centres the thumb on the track — WebKit aligns it to the track's top edge.
    '[&::-webkit-slider-thumb]:mt-[calc((var(--sl-track)-var(--sl-thumb))/2)]',
    '[&::-webkit-slider-thumb]:hover:scale-110',
    '[&::-webkit-slider-thumb]:active:scale-95',

    // Gecko
    ...TRACK.map((c) => `[&::-moz-range-track]:${c}`),
    ...THUMB.map((c) => `[&::-moz-range-thumb]:${c}`),
    '[&::-moz-range-thumb]:hover:scale-110',

    // The ring goes on the thumb, not the whole 400px-wide input.
    'focus-visible:[&::-webkit-slider-thumb]:outline-(length:--prism-ring-width)',
    'focus-visible:[&::-webkit-slider-thumb]:outline-offset-(--prism-ring-offset)',
    'focus-visible:[&::-webkit-slider-thumb]:outline-(--prism-ring)',
    'focus-visible:[&::-moz-range-thumb]:outline-(length:--prism-ring-width)',
    'focus-visible:[&::-moz-range-thumb]:outline-offset-(--prism-ring-offset)',
    'focus-visible:[&::-moz-range-thumb]:outline-(--prism-ring)',

    'aria-invalid:[--sl-solid:var(--prism-danger-solid)]',
    'motion-reduce:[&::-webkit-slider-thumb]:transition-none',
  ].join(' '),

  variants: {
    tone: toneVariants('sl'),
    size: {
      sm: '[--sl-track:0.25rem] [--sl-thumb:0.875rem] h-3.5',
      md: '[--sl-track:0.375rem] [--sl-thumb:1.125rem] h-[1.125rem]',
      lg: '[--sl-track:0.5rem] [--sl-thumb:1.375rem] h-[1.375rem]',
    },
  },

  defaultVariants: { tone: 'accent', size: 'md' },
});

export const sliderWrapperVariants = pv({
  base: 'flex w-full min-w-0 items-center gap-3',
});

export const sliderValueVariants = pv({
  base: 'shrink-0 text-right font-medium text-(--prism-fg-muted) text-sm tabular-nums',
  variants: {
    size: {
      sm: 'min-w-8 text-xs',
      md: 'min-w-10 text-sm',
      lg: 'min-w-12 text-base',
    },
  },
  defaultVariants: { size: 'md' },
});
