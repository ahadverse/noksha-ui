import type * as React from 'react';
import type { Tone } from '../../internal/tone.js';

export type ButtonVariant =
  | 'solid'
  | 'soft'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'gradient'
  | 'glass'
  | 'glow'
  | 'dashed';
export type ButtonTone = Tone;

export type ButtonEffect = 'none' | 'lift' | 'sheen' | 'wipe' | 'pulse' | 'tilt';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** Outline of the box. `circle` also squares the aspect and drops the padding. */
export type ButtonShape = 'default' | 'round' | 'circle';
/** Where the indicator sits while `loading`. */
export type ButtonLoadingPlacement = 'overlay' | 'icon';

interface ButtonBaseProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual weight. */
  variant?: ButtonVariant;
  /** Semantic colour. */
  tone?: ButtonTone;
  /** Hover motion. Orthogonal to `variant` and `tone`. */
  effect?: ButtonEffect;
  size?: ButtonSize;
  /** Corner treatment. `round` is a pill, `circle` is the icon-only disc. */
  shape?: ButtonShape;
  /** Stretches to the container width. */
  fullWidth?: boolean;
  /** Shows a spinner and blocks interaction, holding the button's width. */
  loading?: boolean;
  /** Replaces the spinner's default label for screen readers. */
  loadingLabel?: string;
  /** Replaces the default `Spinner` while loading. */
  loadingIcon?: React.ReactNode;
  /**
   * `overlay` (default) blanks the button and centres the indicator, holding
   * the width. `icon` swaps it into the leading icon's slot and leaves the
   * label readable.
   */
  loadingPlacement?: ButtonLoadingPlacement;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Renders the child element instead of a `<button>`, merging props onto it. */
  asChild?: boolean;
}

export type ButtonProps = ButtonBaseProps &
  (
    | { iconOnly: true; 'aria-label': string; children?: never }
    | { iconOnly?: false; children?: React.ReactNode }
  );

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lay the buttons out in a column instead of a row. */
  orientation?: 'horizontal' | 'vertical';
  /** Join the buttons into one control, collapsing the borders between them. */
  attached?: boolean;
}

export type ToggleButtonProps = ButtonProps & {
  /** Present means controlled. */
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
};

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value'> {
  /** The text written to the clipboard. */
  value: string;
  /** Accessible name, and the label when `withLabel` is set. */
  label?: string;
  /** Replaces `label` while the confirmation is showing. */
  copiedLabel?: string;
  /** How long the confirmation stays up, in milliseconds. */
  timeout?: number;
  /** Show the label beside the icon instead of only as an accessible name. */
  withLabel?: boolean;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  /** Called after a successful copy, never after a rejected one. */
  onCopied?: (value: string) => void;
}

export type FloatingPlacement =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-right'
  | 'top-left'
  | 'top-center';

interface FloatingAnchorProps {
  placement?: FloatingPlacement;
  /** Distance from the two edges it is pinned to, in pixels. */
  offset?: number;
  /** Pins inside this element instead of the viewport. It must be positioned. */
  container?: React.RefObject<HTMLElement | null>;
}

export interface ScrollToTopProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    FloatingAnchorProps {
  /** Pixels scrolled before the button appears. */
  showAfter?: number;
  label?: string;
  /** Selector for the element to focus after scrolling. Defaults to the body. */
  focusTarget?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
}

export interface FloatingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    FloatingAnchorProps {
  /** Accessible name, and the visible text when `extended` is set. */
  label: string;
  icon: React.ReactNode;
  /** Show the label beside the icon instead of only as an accessible name. */
  extended?: boolean;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  effect?: ButtonEffect;
}

export interface FloatingAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  tone?: ButtonTone;
  onSelect?: () => void;
}

export interface FloatingMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'>,
    FloatingAnchorProps {
  /** Accessible name for the trigger and for the action stack it opens. */
  label: string;
  actions: FloatingAction[];
  icon?: React.ReactNode;
  /** Replaces the icon while the stack is open. */
  openIcon?: React.ReactNode;
  /** Hide the label chip beside each action. */
  hideActionLabels?: boolean;
  /** Present means controlled. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
}
