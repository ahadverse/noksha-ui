import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';
export type ButtonTone = Tone;
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonBaseProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual weight. Never merged with `tone` — see ADR-007. */
  variant?: ButtonVariant;
  /** Semantic color. Never merged with `variant`. */
  tone?: ButtonTone;
  size?: ButtonSize;
  /** Stretches to the container width. */
  fullWidth?: boolean;
  /**
   * Shows a spinner, sets `aria-busy`, and blocks interaction — while holding
   * the button's width so the layout does not jump.
   */
  loading?: boolean;
  /** Replaces the spinner's default label for screen readers. */
  loadingLabel?: string;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Renders the child element instead of a `<button>`, merging props onto it. */
  asChild?: boolean;
}

/**
 * An icon-only button has no text, so it must carry an accessible name.
 *
 * Making that a union rather than a runtime warning means the compiler rejects
 * `<Button iconOnly icon={<Trash />} />` outright — the a11y rule is enforced
 * before the code ever runs.
 */
export type ButtonProps = ButtonBaseProps &
  (
    | { iconOnly: true; 'aria-label': string; children?: never }
    | { iconOnly?: false; children?: React.ReactNode }
  );
