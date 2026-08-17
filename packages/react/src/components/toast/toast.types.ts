import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

export type ToastTone = Tone;
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  tone?: ToastTone;
  /** How long before it dismisses itself. `Infinity` keeps it until acted on. */
  duration?: number;
  /** A single action. More than one belongs in a dialog, not a toast. */
  action?: React.ReactNode;
  /** Reuse an id to replace a toast in place — a "saving" that becomes "saved". */
  id?: string;
  onDismiss?: () => void;
}

export interface ToastRecord extends ToastOptions {
  id: string;
  open: boolean;
}

export interface ToastProviderProps {
  children?: React.ReactNode;
  position?: ToastPosition;
  /** Default lifetime, in ms. */
  duration?: number;
  /**
   * How many are shown at once. Older ones are dropped.
   *
   * A stack that grows without limit stops being a notification and becomes a
   * wall the user has to dismiss their way through.
   */
  max?: number;
  /** Where the viewport is portalled to. */
  container?: Element | null;
  /** Accessible name for the notification region. */
  label?: string;
}

export interface ToastApi {
  /** Shows a toast and returns its id. */
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  toasts: ToastRecord[];
}
