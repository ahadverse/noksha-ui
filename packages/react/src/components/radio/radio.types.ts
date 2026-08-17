import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioTone = Tone;

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The shared `name`. Generated when omitted, so the group still posts. */
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  size?: RadioSize;
  tone?: RadioTone;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  value: string;
  size?: RadioSize;
  tone?: RadioTone;
  invalid?: boolean;
  /** Classes for the outer wrapper; `className` styles the visible circle. */
  containerClassName?: string;
}
