import type { Align, Side } from '@noksha-ui/core';
import type * as React from 'react';

export type PopoverSide = Side;
export type PopoverAlign = Align;

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Keeps the popover open when the trigger is clicked again. */
  modal?: boolean;
  children?: React.ReactNode;
}

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: PopoverSide;
  align?: PopoverAlign;
  /** Gap between the trigger and the panel, in px. */
  sideOffset?: number;
  /** Clearance kept from the viewport edge, in px. */
  collisionPadding?: number;
  /** Draw the little pointer at the trigger. */
  arrow?: boolean;
  /** Where to portal to. `null` renders in place, inside the trigger's parent. */
  container?: Element | null;
  /** Trap Tab inside the panel. */
  trapFocus?: boolean;
  onEscapeKeyDown?: (event: Event) => void;
  onPointerDownOutside?: (event: Event) => void;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
}
