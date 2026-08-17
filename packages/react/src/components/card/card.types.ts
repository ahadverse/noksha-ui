import type * as React from 'react';

export type CardVariant = 'elevated' | 'outline' | 'subtle' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Applied to the header, content and footer parts — not to the root. */
  padding?: CardPadding;
  /**
   * Adds hover and press affordances. Does **not** make the card focusable on
   * its own: use `asChild` with an `<a>` or a `<button>` for that, so the whole
   * card carries real semantics instead of a click handler on a `<div>`.
   */
  interactive?: boolean;
  asChild?: boolean;
}

export interface CardPartProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The heading level. Pick the one that fits the page outline. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  asChild?: boolean;
}
