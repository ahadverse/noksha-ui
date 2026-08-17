/**
 * What every floating layer shares: the surface, and the motion.
 *
 * The animation is one class pair for the whole library. Direction comes from
 * variables the component sets off its *resolved* `data-side`, so a popover that
 * flipped from `bottom` to `top` slides the correct way without a second
 * keyframe — and adding a new overlay costs no new CSS at all (ADR-004).
 */

export const overlaySurface = [
  'rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle)',
  'bg-(--noksha-bg-surface) text-(--noksha-fg-default)',
  'shadow-(--noksha-shadow-lg)',
].join(' ');

/**
 * `data-state` drives both halves. Exit only gets to run because `usePresence`
 * keeps the element mounted until `animationend` fires.
 */
export const overlayMotion = [
  'data-[state=open]:animate-noksha-in',
  'data-[state=closed]:animate-noksha-out',
  'will-change-[transform,opacity]',
].join(' ');

/**
 * Slide-from-the-anchor, expressed as offsets per resolved side.
 *
 * The layer enters from the anchor and leaves back toward it, which reads as the
 * anchor opening it rather than as a box appearing nearby.
 */
export const overlaySideMotion = [
  'data-[side=top]:[--noksha-enter-y:0.375rem] data-[side=top]:[--noksha-exit-y:0.375rem]',
  'data-[side=bottom]:[--noksha-enter-y:-0.375rem] data-[side=bottom]:[--noksha-exit-y:-0.375rem]',
  'data-[side=left]:[--noksha-enter-x:0.375rem] data-[side=left]:[--noksha-exit-x:0.375rem]',
  'data-[side=right]:[--noksha-enter-x:-0.375rem] data-[side=right]:[--noksha-exit-x:-0.375rem]',
  '[--noksha-enter-scale:0.96] [--noksha-exit-scale:0.96]',
].join(' ');

/** The arrow. A rotated square, so it inherits the surface's own border colour. */
export const overlayArrow = [
  'size-2.5 rotate-45',
  'border-(--noksha-border-subtle) bg-(--noksha-bg-surface)',
].join(' ');
