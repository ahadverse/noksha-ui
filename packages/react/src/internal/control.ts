/**
 * The shared visual shell for text-entry controls.
 *
 * Input, Textarea and the Select trigger are three different elements that must
 * be pixel-identical when stacked in a form. Keeping the classes in one place is
 * the only way that stays true — the moment each component owns its own border
 * and focus ring, they drift, and the drift shows up as a 1px misalignment in
 * every form in the application.
 */

export type ControlVariant = 'outline' | 'soft' | 'ghost';
export type ControlSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const controlBase = [
  'w-full min-w-0 appearance-none',
  'rounded-(--noksha-radius-md) border',
  'text-(--noksha-fg-default)',
  'placeholder:text-(--noksha-fg-subtle)',

  'transition-[background-color,border-color,box-shadow,outline-color]',
  'duration-(--noksha-duration-fast) ease-out',

  // Outline rather than ring, so an overflow-hidden ancestor cannot clip it.
  'outline-none',
  'focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset)',
  'focus-visible:outline-(--noksha-ring) focus-visible:border-(--noksha-border-focus)',

  'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-(--noksha-bg-subtle)',

  // Driven off `aria-invalid` rather than a class, so a control marked invalid
  // by a form library — or by the Field — turns red with nothing else wired up.
  'aria-invalid:border-(--noksha-danger-solid)',
  'aria-invalid:focus-visible:outline-(--noksha-danger-solid)',
].join(' ');

export const controlVariantClasses: Record<ControlVariant, string> = {
  outline:
    'border-(--noksha-border-default) bg-(--noksha-bg-surface) hover:border-(--noksha-border-strong)',
  soft: 'border-transparent bg-(--noksha-bg-subtle) hover:bg-(--noksha-bg-muted)',
  ghost: 'border-transparent bg-transparent hover:bg-(--noksha-bg-subtle)',
};

/** Heights and pads come from the density scale, so one variable retunes them. */
export const controlSizeClasses: Record<ControlSize, string> = {
  xs: 'h-(--noksha-control-h-xs) px-(--noksha-control-px-xs) text-xs rounded-(--noksha-radius-sm)',
  sm: 'h-(--noksha-control-h-sm) px-(--noksha-control-px-sm) text-sm',
  md: 'h-(--noksha-control-h-md) px-(--noksha-control-px-md) text-sm',
  lg: 'h-(--noksha-control-h-lg) px-(--noksha-control-px-lg) text-base',
  xl: 'h-(--noksha-control-h-xl) px-(--noksha-control-px-xl) text-lg rounded-(--noksha-radius-lg)',
};

/** Icon sizes and the padding needed to clear them, per control size. */
export const controlAffixClasses: Record<
  ControlSize,
  { icon: string; start: string; end: string }
> = {
  xs: { icon: 'size-3.5', start: 'ps-7', end: 'pe-7' },
  sm: { icon: 'size-4', start: 'ps-8', end: 'pe-8' },
  md: { icon: 'size-4', start: 'ps-9', end: 'pe-9' },
  lg: { icon: 'size-5', start: 'ps-11', end: 'pe-11' },
  xl: { icon: 'size-5', start: 'ps-12', end: 'pe-12' },
};
