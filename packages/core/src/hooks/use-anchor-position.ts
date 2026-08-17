import {
  arrow as arrowMiddleware,
  autoUpdate,
  flip as flipMiddleware,
  limitShift,
  offset as offsetMiddleware,
  type Placement,
  shift as shiftMiddleware,
  size as sizeMiddleware,
  useFloating,
} from '@floating-ui/react-dom';
import * as React from 'react';

export type { Placement };
export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Align = 'start' | 'center' | 'end';

export interface UseAnchorPositionOptions {
  /** Positioning only runs while this is true — a closed layer costs nothing. */
  open?: boolean;
  placement?: Placement;
  /** Gap between the anchor and the layer, in px. */
  offset?: number;
  /** Flip to the opposite side when there is not enough room. */
  flip?: boolean;
  /** Slide along the anchor's axis to stay on screen. */
  shift?: boolean;
  /** Keep this much clearance from the viewport edge. */
  collisionPadding?: number;
  /** Publish the anchor width and available height as CSS variables. */
  matchAnchorWidth?: boolean;
  strategy?: 'absolute' | 'fixed';
}

export interface UseAnchorPosition {
  setAnchor: (element: HTMLElement | null) => void;
  setFloating: (element: HTMLElement | null) => void;
  setArrow: (element: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  arrowStyles: React.CSSProperties;
  /** After collision handling — which is what the animation should follow. */
  side: Side;
  align: Align;
  placement: Placement;
}

const OPPOSITE: Record<Side, Side> = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };

/**
 * Positions a floating layer against an anchor.
 *
 * Geometry is the one part of the overlay stack this library does not write
 * itself (ADR-002): flip, shift and collision maths are well-solved, carry no
 * accessibility opinions, and re-deriving them would cost sprints without
 * differentiating anything. Everything around them — focus, dismissal, layer
 * ordering — is ours.
 *
 * The returned `side` is the *resolved* one. A tooltip asked for `top` that got
 * flipped to `bottom` must animate upward from the anchor, not downward from
 * where it was going to be, and that only works if the animation reads this
 * rather than the requested placement.
 */
export function useAnchorPosition(options: UseAnchorPositionOptions = {}): UseAnchorPosition {
  const {
    open = true,
    placement = 'bottom',
    offset = 8,
    flip = true,
    shift = true,
    collisionPadding = 8,
    matchAnchorWidth = false,
    strategy = 'absolute',
  } = options;

  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);

  const middleware = React.useMemo(
    () =>
      [
        offsetMiddleware(offset),
        flip ? flipMiddleware({ padding: collisionPadding }) : null,
        shift ? shiftMiddleware({ padding: collisionPadding, limiter: limitShift() }) : null,
        matchAnchorWidth
          ? sizeMiddleware({
              padding: collisionPadding,
              apply({ rects, availableHeight, elements }) {
                // Published as variables rather than written as inline styles,
                // so a consumer can opt into matching the width, capping the
                // height, or neither, from CSS alone.
                elements.floating.style.setProperty(
                  '--noksha-anchor-width',
                  `${rects.reference.width}px`,
                );
                elements.floating.style.setProperty(
                  '--noksha-available-height',
                  `${availableHeight}px`,
                );
              },
            })
          : null,
        arrowElement ? arrowMiddleware({ element: arrowElement, padding: 6 }) : null,
      ].filter(Boolean),
    [offset, flip, shift, collisionPadding, matchAnchorWidth, arrowElement],
  );

  const floating = useFloating({
    placement,
    strategy,
    // Only track while open: autoUpdate installs scroll and resize observers,
    // and a page with fifty closed menus should not be paying for fifty of them.
    whileElementsMounted: open ? autoUpdate : undefined,
    middleware,
  });

  const [resolvedSide, resolvedAlign] = floating.placement.split('-') as [Side, Align | undefined];
  const arrowData = floating.middlewareData.arrow;

  const arrowStyles = React.useMemo<React.CSSProperties>(
    () => ({
      position: 'absolute',
      left: arrowData?.x != null ? `${arrowData.x}px` : '',
      top: arrowData?.y != null ? `${arrowData.y}px` : '',
      // Pinned to the edge the layer is anchored *from*, which is the opposite
      // of the side it sits on.
      [OPPOSITE[resolvedSide]]: '0',
    }),
    [arrowData?.x, arrowData?.y, resolvedSide],
  );

  return {
    setAnchor: floating.refs.setReference,
    setFloating: floating.refs.setFloating,
    setArrow: setArrowElement,
    floatingStyles: floating.floatingStyles,
    arrowStyles,
    side: resolvedSide,
    align: resolvedAlign ?? 'center',
    placement: floating.placement,
  };
}
