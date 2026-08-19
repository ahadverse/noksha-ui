import type * as React from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export type SpinnerSpeed = 'slow' | 'normal' | 'fast';

export type SpinnerPlacement = 'end' | 'start' | 'top' | 'bottom';

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

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  speed?: SpinnerSpeed;
  label?: string | null;
  placement?: SpinnerPlacement;
  icon?: React.ReactNode;
}
