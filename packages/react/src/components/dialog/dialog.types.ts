import type * as React from 'react';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Blocks the page behind it: focus is trapped, scrolling is locked, and the
   * rest of the document is hidden from assistive tech.
   *
   * Turn it off only for panels the user is meant to work alongside.
   */
  modal?: boolean;
  children?: React.ReactNode;
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: DialogSize;
  container?: Element | null;
  /** Hide the built-in corner close button. */
  hideCloseButton?: boolean;
  closeLabel?: string;
  onEscapeKeyDown?: (event: Event) => void;
  onPointerDownOutside?: (event: Event) => void;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
}

export interface DialogPartProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}
