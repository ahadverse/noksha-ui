import type { Align, Side } from '@noksha-ui/core';
import type * as React from 'react';
import type { ControlSize, ControlVariant } from '../../internal/control.js';

export type SelectVariant = ControlVariant;
export type SelectSize = ControlSize;

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Posts with the surrounding form under this name. */
  name?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  children?: React.ReactNode;
}

export interface SelectTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  variant?: SelectVariant;
  size?: SelectSize;
  /** Shown when nothing is selected. */
  placeholder?: React.ReactNode;
  /** Replaces the default rendering of the selected item's label. */
  renderValue?: (value: string | undefined) => React.ReactNode;
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  collisionPadding?: number;
  container?: Element | null;
  /** Make the list at least as wide as the trigger. */
  matchTriggerWidth?: boolean;
}

export interface SelectItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  value: string;
  disabled?: boolean;
  /**
   * The label. Read directly out of the element tree, so it must be plain
   * enough to render inside the trigger too — text, or text with an icon.
   */
  children?: React.ReactNode;
  /** Overrides the text used for type-to-select when children are not plain text. */
  textValue?: string;
}

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

/** One option, as collected from the element tree. */
export interface SelectItemData {
  value: string;
  label: React.ReactNode;
  textValue: string;
  disabled: boolean;
}
