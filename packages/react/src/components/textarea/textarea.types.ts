import type * as React from 'react';
import type { ControlSize, ControlVariant } from '../../internal/control.js';

export type TextareaVariant = ControlVariant;
export type TextareaSize = ControlSize;
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  size?: TextareaSize;
  invalid?: boolean;
  /**
   * Grow with the content instead of scrolling.
   *
   * Turning this on forces `resize` to `none`: a box that resizes itself and can
   * also be dragged fights the user, snapping back to the content height the
   * next time they type.
   */
  autoSize?: boolean;
  /** Smallest height, in rows. */
  minRows?: number;
  /** Largest height before it starts scrolling. Only meaningful with `autoSize`. */
  maxRows?: number;
  resize?: TextareaResize;
}
