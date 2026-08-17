import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxTone = Tone;

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: CheckboxSize;
  tone?: CheckboxTone;
  /**
   * The third state: some but not all of the children are checked.
   *
   * It is a DOM property, not an attribute, so it cannot be expressed in JSX on
   * a native input — which is why it needs its own prop here.
   */
  indeterminate?: boolean;
  invalid?: boolean;
  /** Convenience over `onChange`, giving the boolean directly. */
  onCheckedChange?: (checked: boolean) => void;
  /** Classes for the outer wrapper; `className` styles the visible box. */
  containerClassName?: string;
}
