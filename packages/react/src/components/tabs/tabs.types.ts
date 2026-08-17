import type * as React from 'react';

export type TabsVariant = 'line' | 'solid' | 'pill';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  variant?: TabsVariant;
  size?: TabsSize;
  /**
   * `automatic` selects a tab as soon as it is focused; `manual` waits for
   * Enter or Space.
   *
   * Automatic is the default because it is what the WAI-ARIA pattern
   * recommends for panels that are cheap to show. Switch to manual when a panel
   * fetches on mount, or arrowing across the strip fires a request per tab.
   */
  activationMode?: 'automatic' | 'manual';
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stretch the tabs to fill the row. */
  fitted?: boolean;
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Keep the panel mounted while hidden — for forms that must not lose state. */
  forceMount?: boolean;
}
