import type * as React from 'react';

export type FieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Overrides the generated id used to tie the label to the control. */
  id?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  /** Sizes the label and helper text with the control. */
  size?: FieldSize;
  /** Puts the label beside the control — for checkboxes, switches and radios. */
  orientation?: 'vertical' | 'horizontal';
  asChild?: boolean;
}

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Hides the asterisk without changing the control's `required` state. */
  hideRequiredMarker?: boolean;
  asChild?: boolean;
}

export interface FieldTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
}

/** What a form control reads out of the surrounding `<Field.Root>`. */
export interface FieldControlProps {
  id?: string;
  disabled?: boolean;
  required?: boolean;
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
  'aria-describedby'?: string;
  'aria-required'?: React.AriaAttributes['aria-required'];
}
