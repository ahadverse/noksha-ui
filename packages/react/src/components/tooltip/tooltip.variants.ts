import { pv } from '@prism-ui/core';
import { overlayMotion, overlaySideMotion } from '../../internal/overlay.js';

/**
 * Inverted rather than a surface panel. A tooltip is transient annotation, and
 * making it look like a card invites people to put controls in it — which they
 * then cannot reach, because the tooltip closes the moment the pointer leaves.
 */
export const tooltipContentVariants = pv({
  base: [
    overlayMotion,
    overlaySideMotion,
    'z-(--prism-z-tooltip) max-w-64',
    'rounded-(--prism-radius-sm) px-2 py-1',
    'bg-(--prism-bg-inverse) text-(--prism-fg-inverse)',
    'text-xs leading-(--prism-leading-snug)',
    'shadow-(--prism-shadow-md)',
    // The pointer must be able to pass through to whatever is underneath, or a
    // tooltip near the edge of a control blocks the control's own hover.
    'pointer-events-none',
  ].join(' '),
  variants: {
    interactive: {
      true: 'pointer-events-auto',
      false: '',
    },
  },
  defaultVariants: { interactive: false },
});

export const tooltipArrowVariants = pv({
  base: 'size-2 rotate-45 bg-(--prism-bg-inverse)',
});
