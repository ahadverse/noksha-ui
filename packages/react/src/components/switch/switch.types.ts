import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchTone = Tone;

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: SwitchSize;
  tone?: SwitchTone;
  invalid?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Classes for the outer wrapper; `className` styles the visible track. */
  containerClassName?: string;
}
