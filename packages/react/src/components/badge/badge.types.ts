import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeTone = Tone;
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual weight. Never merged with `tone` — see ADR-007. */
  variant?: BadgeVariant;
  /** Semantic color. */
  tone?: BadgeTone;
  size?: BadgeSize;
  /** A small filled circle before the label, for status lists. */
  dot?: boolean;
  icon?: React.ReactNode;
  /** Renders the child element instead of a `<span>`. */
  asChild?: boolean;
}
