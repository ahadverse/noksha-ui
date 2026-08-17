/**
 * What every floating layer shares: the surface, and the motion.
 *
 * The animation is one class pair for the whole library. Direction comes from
 * variables the component sets off its *resolved* `data-side`, so a popover that
 * flipped from `bottom` to `top` slides the correct way without a second
 * keyframe — and adding a new overlay costs no new CSS at all (ADR-004).
 */

export const overlaySurface = [
  'rounded-(--prism-radius-lg) border border-(--prism-border-subtle)',
  'bg-(--prism-bg-surface) text-(--prism-fg-default)',
  'shadow-(--prism-shadow-lg)',
].join(' ');

/**
 * `data-state` drives both halves. Exit only gets to run because `usePresence`
 * keeps the element mounted until `animationend` fires.
 */
export const overlayMotion = [
  'data-[state=open]:animate-prism-in',
  'data-[state=closed]:animate-prism-out',
  'will-change-[transform,opacity]',
].join(' ');

/**
 * Slide-from-the-anchor, expressed as offsets per resolved side.
 *
 * The layer enters from the anchor and leaves back toward it, which reads as the
 * anchor opening it rather than as a box appearing nearby.
 */
export const overlaySideMotion = [
  'data-[side=top]:[--prism-enter-y:0.375rem] data-[side=top]:[--prism-exit-y:0.375rem]',
  'data-[side=bottom]:[--prism-enter-y:-0.375rem] data-[side=bottom]:[--prism-exit-y:-0.375rem]',
  'data-[side=left]:[--prism-enter-x:0.375rem] data-[side=left]:[--prism-exit-x:0.375rem]',
  'data-[side=right]:[--prism-enter-x:-0.375rem] data-[side=right]:[--prism-exit-x:-0.375rem]',
  '[--prism-enter-scale:0.96] [--prism-exit-scale:0.96]',
].join(' ');

/** The arrow. A rotated square, so it inherits the surface's own border colour. */
export const overlayArrow = [
  'size-2.5 rotate-45',
  'border-(--prism-border-subtle) bg-(--prism-bg-surface)',
].join(' ');
