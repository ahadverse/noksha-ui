import type { Align, Side } from '@noksha-ui/core';
import type * as React from 'react';

export interface TooltipProviderProps {
  /** How long the pointer must rest before the first tooltip opens. */
  delayDuration?: number;
  /**
   * Window after one tooltip closes in which the next opens instantly.
   *
   * Scanning a toolbar should not mean waiting out the delay at every button;
   * once the user has shown they are reading tooltips, the rest come at once.
   */
  skipDelayDuration?: number;
  children?: React.ReactNode;
}

export interface TooltipProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  /** Grace period on leaving, so a wobbling pointer does not flicker it. */
  closeDelay?: number;
  /** Keep it open while the pointer is over the tooltip itself. */
  interactive?: boolean;
  children?: React.ReactNode;
}

export interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  collisionPadding?: number;
  arrow?: boolean;
  container?: Element | null;
}
