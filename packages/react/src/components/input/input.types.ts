import type * as React from 'react';
import type { ControlSize, ControlVariant } from '../../internal/control.js';

export type InputVariant = ControlVariant;
export type InputSize = ControlSize;

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  /** Marks the control invalid. Inherited from `<Field.Root invalid>` when omitted. */
  invalid?: boolean;
  /**
   * Decorative content inside the leading edge — a search glass, a currency
   * symbol. Not interactive: an affix a user can click is a button, and a button
   * inside a text field needs its own focus handling.
   */
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /** Classes for the wrapper that appears when an icon is present. */
  containerClassName?: string;
}
