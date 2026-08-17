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
  'rounded-(--prism-radius-md) border',
  'text-(--prism-fg-default)',
  'placeholder:text-(--prism-fg-subtle)',

  'transition-[background-color,border-color,box-shadow,outline-color]',
  'duration-(--prism-duration-fast) ease-out',

  // Outline rather than ring, so an overflow-hidden ancestor cannot clip it.
  'outline-none',
  'focus-visible:outline-(length:--prism-ring-width) focus-visible:outline-offset-(--prism-ring-offset)',
  'focus-visible:outline-(--prism-ring) focus-visible:border-(--prism-border-focus)',

  'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-(--prism-bg-subtle)',

  // Driven off `aria-invalid` rather than a class, so a control marked invalid
  // by a form library — or by the Field — turns red with nothing else wired up.
  'aria-invalid:border-(--prism-danger-solid)',
  'aria-invalid:focus-visible:outline-(--prism-danger-solid)',
].join(' ');

export const controlVariantClasses: Record<ControlVariant, string> = {
  outline:
    'border-(--prism-border-default) bg-(--prism-bg-surface) hover:border-(--prism-border-strong)',
  soft: 'border-transparent bg-(--prism-bg-subtle) hover:bg-(--prism-bg-muted)',
  ghost: 'border-transparent bg-transparent hover:bg-(--prism-bg-subtle)',
};

/** Heights and pads come from the density scale, so one variable retunes them. */
export const controlSizeClasses: Record<ControlSize, string> = {
  xs: 'h-(--prism-control-h-xs) px-(--prism-control-px-xs) text-xs rounded-(--prism-radius-sm)',
  sm: 'h-(--prism-control-h-sm) px-(--prism-control-px-sm) text-sm',
  md: 'h-(--prism-control-h-md) px-(--prism-control-px-md) text-sm',
  lg: 'h-(--prism-control-h-lg) px-(--prism-control-px-lg) text-base',
  xl: 'h-(--prism-control-h-xl) px-(--prism-control-px-xl) text-lg rounded-(--prism-radius-lg)',
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
