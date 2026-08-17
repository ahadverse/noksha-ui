import type * as React from 'react';

export type AccordionVariant = 'bordered' | 'separated' | 'ghost';

interface AccordionBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  variant?: AccordionVariant;
  disabled?: boolean;
}

/**
 * `type` decides the shape of `value`, so the two are a discriminated union
 * rather than a loose `string | string[]`. Passing an array to a single-open
 * accordion is then a compile error instead of a silent no-op.
 */
export type AccordionProps = AccordionBaseProps &
  (
    | {
        type?: 'single';
        value?: string;
        defaultValue?: string;
        onValueChange?: (value: string) => void;
        /** Allow closing the open item, leaving none open. */
        collapsible?: boolean;
      }
    | {
        type: 'multiple';
        value?: string[];
        defaultValue?: string[];
        onValueChange?: (value: string[]) => void;
        collapsible?: never;
      }
  );

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Heading level for the wrapper, so the page outline stays correct. */
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Replaces the chevron. Pass `null` for no indicator. */
  indicator?: React.ReactNode | null;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Keep the panel mounted while collapsed — for content that must not lose its
   * state, such as a partly-filled form.
   *
   * Off by default: a collapsed panel that stays in the DOM stays in the
   * accessibility tree too, and a screen reader will read every section of a
   * long page whether it is open or not.
   */
  forceMount?: boolean;
}
