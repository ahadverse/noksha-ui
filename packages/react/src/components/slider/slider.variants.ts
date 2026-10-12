import { pv } from '@noksha-ui/core';
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
const VARS_BASE = [
  '[--sl-track-radius:9999px]',
  '[--sl-fill-image:linear-gradient(var(--sl-solid),var(--sl-solid))]',
  '[--sl-box:max(var(--sl-thumb-h),var(--sl-track))]',
  'aria-invalid:[--sl-solid:var(--noksha-danger-solid)]',
  'aria-invalid:[--sl-subtle:var(--noksha-danger-subtle)]',
  'data-invalid:[--sl-solid:var(--noksha-danger-solid)]',
  'data-invalid:[--sl-subtle:var(--noksha-danger-subtle)]',
].join(' ');

const SIZE_VARS = {
  xs: '[--sl-track:0.1875rem] [--sl-thumb:0.75rem]',
  sm: '[--sl-track:0.25rem] [--sl-thumb:0.875rem]',
  md: '[--sl-track:0.375rem] [--sl-thumb:1.125rem]',
  lg: '[--sl-track:0.5rem] [--sl-thumb:1.375rem]',
  xl: '[--sl-track:0.75rem] [--sl-thumb:1.75rem]',
};

const THUMB_VARS = {
  circle:
    '[--sl-thumb-w:var(--sl-thumb)] [--sl-thumb-h:var(--sl-thumb)] [--sl-thumb-radius:9999px]',
  square:
    '[--sl-thumb-w:var(--sl-thumb)] [--sl-thumb-h:var(--sl-thumb)] [--sl-thumb-radius:calc(var(--sl-thumb)*0.25)]',
  bar: '[--sl-thumb-w:calc(var(--sl-thumb)*0.4)] [--sl-thumb-h:calc(var(--sl-thumb)*1.35)] [--sl-thumb-radius:9999px]',
  pill: '[--sl-thumb-w:calc(var(--sl-thumb)*1.6)] [--sl-thumb-h:var(--sl-thumb)] [--sl-thumb-radius:9999px]',
};

const VARIANT_VARS = {
  default: [
    '[--sl-rail:var(--noksha-bg-muted)] [--sl-track-shadow:none]',
    '[--sl-thumb-bg:var(--noksha-bg-surface)] [--sl-thumb-border:var(--sl-solid)]',
    '[--sl-thumb-border-width:2px] [--sl-thumb-shadow:var(--noksha-shadow-sm)]',
  ].join(' '),
  solid: [
    '[--sl-rail:var(--noksha-bg-muted)] [--sl-track-shadow:none]',
    '[--sl-thumb-bg:var(--sl-solid)] [--sl-thumb-border:var(--noksha-bg-surface)]',
    '[--sl-thumb-border-width:2px] [--sl-thumb-shadow:var(--noksha-shadow-md)]',
  ].join(' '),
  soft: [
    '[--sl-rail:var(--sl-subtle)] [--sl-track-shadow:none]',
    '[--sl-thumb-bg:var(--sl-solid)] [--sl-thumb-border:transparent]',
    '[--sl-thumb-border-width:0px] [--sl-thumb-shadow:0_0_0_4px_var(--sl-subtle)]',
  ].join(' '),
  outline: [
    '[--sl-rail:var(--noksha-bg-surface)] [--sl-track-shadow:inset_0_0_0_1px_var(--noksha-border-strong)]',
    '[--sl-thumb-bg:var(--noksha-bg-surface)] [--sl-thumb-border:var(--sl-solid)]',
    '[--sl-thumb-border-width:2px] [--sl-thumb-shadow:none]',
  ].join(' '),
  minimal: [
    '[--sl-rail:var(--noksha-bg-muted)] [--sl-track-shadow:none]',
    '[--sl-thumb-bg:var(--sl-solid)] [--sl-thumb-border:transparent]',
    '[--sl-thumb-border-width:0px] [--sl-thumb-shadow:var(--noksha-shadow-sm)]',
  ].join(' '),
};

const ORIENTATION_VARS = {
  horizontal: '[--sl-dir:to_right] rtl:[--sl-dir:to_left]',
  vertical: '[--sl-dir:to_top]',
};

export const sliderVarsVariants = pv({
  base: VARS_BASE,
  variants: {
    tone: toneVariants('sl'),
    size: SIZE_VARS,
    thumb: THUMB_VARS,
    variant: VARIANT_VARS,
    orientation: ORIENTATION_VARS,
  },
  defaultVariants: {
    tone: 'accent',
    size: 'md',
    thumb: 'circle',
    variant: 'default',
    orientation: 'horizontal',
  },
});

const INPUT_BASE = [
  'peer block shrink-0 cursor-pointer appearance-none bg-transparent outline-none',
  'disabled:cursor-not-allowed disabled:opacity-60',

  // WebKit and Blink
  '[&::-webkit-slider-runnable-track]:[block-size:var(--sl-track)]',
  '[&::-webkit-slider-runnable-track]:rounded-(--sl-track-radius)',
  '[&::-webkit-slider-runnable-track]:border-none',
  '[&::-webkit-slider-thumb]:appearance-none',
  '[&::-webkit-slider-thumb]:box-border',
  '[&::-webkit-slider-thumb]:[inline-size:var(--sl-thumb-w)]',
  '[&::-webkit-slider-thumb]:[block-size:var(--sl-thumb-h)]',
  '[&::-webkit-slider-thumb]:[margin-block-start:calc((var(--sl-track)-var(--sl-thumb-h))/2)]',
  '[&::-webkit-slider-thumb]:rounded-(--sl-thumb-radius)',
  '[&::-webkit-slider-thumb]:border-solid',
  '[&::-webkit-slider-thumb]:border-(length:--sl-thumb-border-width)',
  '[&::-webkit-slider-thumb]:border-(--sl-thumb-border)',
  '[&::-webkit-slider-thumb]:bg-(--sl-thumb-bg)',
  '[&::-webkit-slider-thumb]:[box-shadow:var(--sl-thumb-shadow)]',
  '[&::-webkit-slider-thumb]:transition-[scale,opacity,box-shadow]',
  '[&::-webkit-slider-thumb]:duration-(--noksha-duration-fast)',
  '[&::-webkit-slider-thumb]:ease-out',
  '[&::-webkit-slider-thumb]:hover:scale-110',

  // Gecko
  '[&::-moz-range-track]:[block-size:var(--sl-track)]',
  '[&::-moz-range-track]:rounded-(--sl-track-radius)',
  '[&::-moz-range-track]:border-none',
  '[&::-moz-range-thumb]:box-border',
  '[&::-moz-range-thumb]:[inline-size:var(--sl-thumb-w)]',
  '[&::-moz-range-thumb]:[block-size:var(--sl-thumb-h)]',
  '[&::-moz-range-thumb]:rounded-(--sl-thumb-radius)',
  '[&::-moz-range-thumb]:border-solid',
  '[&::-moz-range-thumb]:border-(length:--sl-thumb-border-width)',
  '[&::-moz-range-thumb]:border-(--sl-thumb-border)',
  '[&::-moz-range-thumb]:bg-(--sl-thumb-bg)',
  '[&::-moz-range-thumb]:[box-shadow:var(--sl-thumb-shadow)]',
  '[&::-moz-range-thumb]:transition-[scale,opacity,box-shadow]',
  '[&::-moz-range-thumb]:duration-(--noksha-duration-fast)',
  '[&::-moz-range-thumb]:ease-out',
  '[&::-moz-range-thumb]:hover:scale-110',

  // The ring goes on the thumb, not the whole 400px-wide input.
  'focus-visible:[&::-webkit-slider-thumb]:outline-(length:--noksha-ring-width)',
  'focus-visible:[&::-webkit-slider-thumb]:outline-offset-(--noksha-ring-offset)',
  'focus-visible:[&::-webkit-slider-thumb]:outline-(--noksha-ring)',
  'focus-visible:[&::-moz-range-thumb]:outline-(length:--noksha-ring-width)',
  'focus-visible:[&::-moz-range-thumb]:outline-offset-(--noksha-ring-offset)',
  'focus-visible:[&::-moz-range-thumb]:outline-(--noksha-ring)',

  'motion-reduce:[&::-webkit-slider-thumb]:transition-none',
  'motion-reduce:[&::-moz-range-thumb]:transition-none',
].join(' ');

const TRACK = {
  fill: [
    '[&::-webkit-slider-runnable-track]:[background:linear-gradient(var(--sl-dir),transparent_var(--sl-fill),var(--sl-rail)_var(--sl-fill)),var(--sl-fill-image)]',
    '[&::-webkit-slider-runnable-track]:[box-shadow:var(--sl-track-shadow)]',
    '[&::-moz-range-track]:[background:linear-gradient(var(--sl-dir),transparent_var(--sl-fill),var(--sl-rail)_var(--sl-fill)),var(--sl-fill-image)]',
    '[&::-moz-range-track]:[box-shadow:var(--sl-track-shadow)]',
  ].join(' '),
  overlay: [
    'pointer-events-none relative disabled:opacity-100',
    '[&::-webkit-slider-runnable-track]:bg-transparent',
    '[&::-moz-range-track]:bg-transparent',
    '[&::-webkit-slider-thumb]:pointer-events-auto',
    '[&::-moz-range-thumb]:pointer-events-auto',
  ].join(' '),
};

const MINIMAL_THUMB = [
  '[&::-webkit-slider-thumb]:opacity-0',
  '[&::-moz-range-thumb]:opacity-0',
  'hover:[&::-webkit-slider-thumb]:opacity-100',
  'hover:[&::-moz-range-thumb]:opacity-100',
  'focus-visible:[&::-webkit-slider-thumb]:opacity-100',
  'focus-visible:[&::-moz-range-thumb]:opacity-100',
  'active:[&::-webkit-slider-thumb]:opacity-100',
  'active:[&::-moz-range-thumb]:opacity-100',
].join(' ');

const ORIENTATION_INPUT = {
  horizontal: 'h-(--sl-box) w-full',
  vertical: 'h-full w-(--sl-box) [direction:rtl] [writing-mode:vertical-lr]',
};

export const sliderInputVariants = pv({
  base: INPUT_BASE,
  variants: {
    track: TRACK,
    variant: { default: '', solid: '', soft: '', outline: '', minimal: MINIMAL_THUMB },
    orientation: ORIENTATION_INPUT,
  },
  defaultVariants: { track: 'fill', variant: 'default', orientation: 'horizontal' },
});

export const sliderVariants = pv({
  base: `${VARS_BASE} ${INPUT_BASE}`,
  variants: {
    tone: toneVariants('sl'),
    size: SIZE_VARS,
    thumb: THUMB_VARS,
    variant: {
      default: VARIANT_VARS.default,
      solid: VARIANT_VARS.solid,
      soft: VARIANT_VARS.soft,
      outline: VARIANT_VARS.outline,
      minimal: `${VARIANT_VARS.minimal} ${MINIMAL_THUMB}`,
    },
    orientation: {
      horizontal: `${ORIENTATION_VARS.horizontal} ${ORIENTATION_INPUT.horizontal}`,
      vertical: `${ORIENTATION_VARS.vertical} ${ORIENTATION_INPUT.vertical}`,
    },
    track: TRACK,
  },
  defaultVariants: {
    tone: 'accent',
    size: 'md',
    thumb: 'circle',
    variant: 'default',
    orientation: 'horizontal',
    track: 'fill',
  },
});

export const sliderWrapperVariants = pv({
  base: [
    'flex min-w-0 has-disabled:opacity-60',
    'has-aria-invalid:[--sl-solid:var(--noksha-danger-solid)]',
    'has-aria-invalid:[--sl-subtle:var(--noksha-danger-subtle)]',
  ].join(' '),
  variants: {
    orientation: {
      horizontal: 'w-full items-start gap-3',
      vertical: 'h-full flex-col-reverse items-center gap-2',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const sliderAreaVariants = pv({
  base: 'relative flex',
  variants: {
    orientation: {
      horizontal: 'min-w-0 flex-1 flex-col',
      vertical: 'min-h-0 flex-1 flex-row',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const sliderValueVariants = pv({
  base: 'inline-flex shrink-0 items-center font-medium text-(--noksha-fg-muted) tabular-nums',
  variants: {
    orientation: {
      horizontal: 'h-(--sl-box) justify-end',
      vertical: 'justify-center',
    },
    size: {
      xs: 'min-w-7 text-xs',
      sm: 'min-w-8 text-xs',
      md: 'min-w-10 text-sm',
      lg: 'min-w-12 text-base',
      xl: 'min-w-14 text-lg',
    },
  },
  defaultVariants: { orientation: 'horizontal', size: 'md' },
});

export const sliderTooltipVariants = pv({
  base: [
    'pointer-events-none absolute z-10 whitespace-nowrap rounded-(--noksha-radius-md) px-2 py-1',
    'bg-(--noksha-bg-inverse) font-medium text-(--noksha-fg-inverse) text-xs tabular-nums',
    'shadow-(--noksha-shadow-md) transition-opacity duration-(--noksha-duration-fast) ease-out',
    'motion-reduce:transition-none',
    '[--sl-pos:calc(var(--sl-thumb-w)/2+(100%-var(--sl-thumb-w))*var(--sl-p))]',
    'after:absolute after:border-4 after:border-transparent',
  ].join(' '),
  variants: {
    orientation: {
      horizontal: [
        'start-(--sl-pos) bottom-full mb-2 -translate-x-1/2 rtl:translate-x-1/2',
        'after:start-1/2 after:top-full after:-translate-x-1/2 after:border-t-(--noksha-bg-inverse)',
      ].join(' '),
      vertical: [
        'end-full bottom-(--sl-pos) me-2 translate-y-1/2',
        'after:start-full after:top-1/2 after:-translate-y-1/2 after:border-s-(--noksha-bg-inverse)',
      ].join(' '),
    },
    peer: {
      single: 'peer-hover:opacity-100 peer-focus-visible:opacity-100 peer-active:opacity-100',
      lo: 'peer-hover/lo:opacity-100 peer-focus-visible/lo:opacity-100 peer-active/lo:opacity-100',
      hi: 'peer-hover/hi:opacity-100 peer-focus-visible/hi:opacity-100 peer-active/hi:opacity-100',
    },
    always: { true: 'opacity-100', false: 'opacity-0' },
  },
  defaultVariants: { orientation: 'horizontal', peer: 'single', always: false },
});

export const sliderMarksVariants = pv({
  base: 'pointer-events-none relative shrink-0',
  variants: {
    orientation: { horizontal: 'mt-1 w-full', vertical: 'ms-1 h-full' },
    labelled: { true: '', false: '' },
  },
  compoundVariants: [
    { orientation: 'horizontal', labelled: true, className: 'h-6' },
    { orientation: 'horizontal', labelled: false, className: 'h-1.5' },
    { orientation: 'vertical', labelled: true, className: 'w-10' },
    { orientation: 'vertical', labelled: false, className: 'w-1.5' },
  ],
  defaultVariants: { orientation: 'horizontal', labelled: false },
});

export const sliderMarkVariants = pv({
  base: [
    'absolute flex items-center gap-1 whitespace-nowrap text-(--noksha-fg-subtle) text-xs leading-none',
    '[--sl-pos:calc(var(--sl-thumb-w)/2+(100%-var(--sl-thumb-w))*var(--sl-p))]',
    'data-active:text-(--noksha-fg-default)',
  ].join(' '),
  variants: {
    orientation: {
      horizontal: 'start-(--sl-pos) top-0 -translate-x-1/2 flex-col rtl:translate-x-1/2',
      vertical: 'start-0 bottom-(--sl-pos) translate-y-1/2 flex-row',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const sliderTickVariants = pv({
  base: 'shrink-0 rounded-full bg-(--noksha-border-strong) data-active:bg-(--sl-solid)',
  variants: {
    orientation: { horizontal: 'h-1.5 w-0.5', vertical: 'h-0.5 w-1.5' },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const rangeSliderVariants = pv({
  base: 'flex w-full min-w-0 items-start gap-3 data-disabled:opacity-60',
});

export const rangeSliderTrackVariants = pv({
  base: [
    'pointer-events-none absolute inset-x-0 top-[calc((var(--sl-box)-var(--sl-track))/2)]',
    'h-(--sl-track) rounded-(--sl-track-radius)',
    '[--sl-a:calc(var(--sl-thumb-w)/2+(100%-var(--sl-thumb-w))*var(--sl-from))]',
    '[--sl-b:calc(var(--sl-thumb-w)/2+(100%-var(--sl-thumb-w))*var(--sl-to))]',
    '[background:linear-gradient(var(--sl-dir),var(--sl-rail)_var(--sl-a),transparent_var(--sl-a),transparent_var(--sl-b),var(--sl-rail)_var(--sl-b)),var(--sl-fill-image)]',
    '[box-shadow:var(--sl-track-shadow)]',
  ].join(' '),
});
