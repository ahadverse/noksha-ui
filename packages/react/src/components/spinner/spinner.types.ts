import type * as React from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type SpinnerSpeed = 'slow' | 'normal' | 'fast';

export type SpinnerVariant =
  | 'ring'
  | 'arc'
  | 'dual'
  | 'dash'
  | 'segment'
  | 'comet'
  | 'dots'
  | 'bounce'
  | 'beat'
  | 'orbit'
  | 'halo'
  | 'bars'
  | 'wave'
  | 'spokes'
  | 'pulse'
  | 'ripple'
  | 'grid'
  | 'flip';

export interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  speed?: SpinnerSpeed;
  label?: string | null;
}
