import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

export type SliderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SliderTone = Tone;
export type SliderVariant = 'default' | 'solid' | 'soft' | 'outline' | 'minimal';
export type SliderThumb = 'circle' | 'square' | 'bar' | 'pill';
export type SliderOrientation = 'horizontal' | 'vertical';
export type SliderTooltip = boolean | 'always';

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

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
  variant?: SliderVariant;
  thumb?: SliderThumb;
  orientation?: SliderOrientation;
  invalid?: boolean;
  /** Show the current value beside the track. */
  showValue?: boolean;
  tooltip?: SliderTooltip;
  marks?: boolean | ReadonlyArray<number | SliderMark>;
  /** Formats the displayed value, and the one announced by `aria-valuetext`. */
  formatValue?: (value: number) => string;
  /** Classes for the wrapper; `className` styles the track itself. */
  containerClassName?: string;
}

export interface RangeSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  minStepsBetween?: number;
  size?: SliderSize;
  tone?: SliderTone;
  variant?: SliderVariant;
  thumb?: SliderThumb;
  invalid?: boolean;
  disabled?: boolean;
  name?: string;
  showValue?: boolean;
  tooltip?: SliderTooltip;
  marks?: boolean | ReadonlyArray<number | SliderMark>;
  formatValue?: (value: number) => string;
  thumbLabels?: [string, string];
}
