import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

export type AlertVariant = 'soft' | 'outline' | 'solid';
export type AlertTone = Tone;

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  tone?: AlertTone;
  /**
   * Announce the alert the moment it appears, interrupting the screen reader.
   *
   * Off by default. `role="alert"` is an assertive live region, and using it for
   * a banner that was already on the page when it loaded — a plan notice, a
   * deprecation warning — interrupts the user for something that is not news.
   * Turn it on for messages that appear in response to an action.
   */
  live?: boolean;
  /** Replaces the tone's default icon. Pass `null` for no icon at all. */
  icon?: React.ReactNode | null;
  asChild?: boolean;
}

export interface AlertPartProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}
