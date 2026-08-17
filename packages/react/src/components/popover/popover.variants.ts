import { pv } from '@prism-ui/core';
import {
  overlayArrow,
  overlayMotion,
  overlaySideMotion,
  overlaySurface,
} from '../../internal/overlay.js';

export const popoverContentVariants = pv({
  base: [
    overlaySurface,
    overlayMotion,
    overlaySideMotion,
    'z-(--prism-z-popover)',
    'w-72 max-w-[calc(100vw-1rem)] p-4',
    'outline-none',
  ].join(' '),
});

export const popoverArrowVariants = pv({
  base: [
    overlayArrow,
    // Only the two edges facing away from the trigger are drawn, so the arrow
    // reads as part of the panel's outline rather than as a diamond stuck to it.
    'data-[side=top]:-mt-1.25 data-[side=top]:border-r data-[side=top]:border-b',
    'data-[side=bottom]:-mb-1.25 data-[side=bottom]:border-t data-[side=bottom]:border-l',
    'data-[side=left]:-ml-1.25 data-[side=left]:border-t data-[side=left]:border-r',
    'data-[side=right]:-mr-1.25 data-[side=right]:border-b data-[side=right]:border-l',
  ].join(' '),
});
