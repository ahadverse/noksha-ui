import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

/**
 * The surface treatment. Four axes of it: opacity loops (`pulse`, `breathe`,
 * `blink`, `fade`), travelling highlights (`shimmer`, `wave`, `sheen`,
 * `slide`), lit shapes (`ripple`, `glow`, `bar`), drifting textures
 * (`gradient`, `stripe`, `grid`, `dots`) and three still ones.
 */
export type SkeletonVariant =
  | 'pulse'
  | 'breathe'
  | 'blink'
  | 'fade'
  | 'shimmer'
  | 'wave'
  | 'sheen'
  | 'slide'
  | 'ripple'
  | 'glow'
  | 'bar'
  | 'gradient'
  | 'stripe'
  | 'grid'
  | 'dots'
  | 'outline'
  | 'dashed'
  | 'flat';

/** The box being stood in for. Each carries a sensible default size. */
export type SkeletonShape = 'text' | 'rect' | 'rounded' | 'circle' | 'pill';

/** Height of the placeholder. `shape` decides what the height applies to. */
export type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type SkeletonTone = Tone;

export type SkeletonSpeed = 'slow' | 'normal' | 'fast';

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Surface treatment. Independent of shape, tone and speed. */
  variant?: SkeletonVariant;
  /** Outline of the placeholder, and what `size` measures. */
  shape?: SkeletonShape;
  /** Rung of the size scale. A line of text, a disc, a block — one scale. */
  size?: SkeletonSize;
  /** Semantic colour. `neutral` is the usual grey placeholder. */
  tone?: SkeletonTone;
  /** Scales the treatment's own tempo rather than replacing it. */
  speed?: SkeletonSpeed;
  /** Stacks this many rows, staggered, with the last one short. */
  lines?: number;
  /** Accessible name. Placeholders are silent by default. */
  label?: string | null;
}
