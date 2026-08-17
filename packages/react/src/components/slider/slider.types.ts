import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderTone = Tone;

export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'value' | 'defaultValue' | 'onChange'
  > {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: SliderSize;
  tone?: SliderTone;
  invalid?: boolean;
  /** Show the current value beside the track. */
  showValue?: boolean;
  /** Formats the displayed value, and the one announced by `aria-valuetext`. */
  formatValue?: (value: number) => string;
  /** Classes for the wrapper; `className` styles the track itself. */
  containerClassName?: string;
}
