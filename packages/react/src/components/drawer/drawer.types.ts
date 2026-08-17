import type * as React from 'react';
import type { DialogContentProps, DialogProps } from '../dialog/dialog.types.js';

export type DrawerSide = 'top' | 'right' | 'bottom' | 'left';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type DrawerProps = DialogProps;

export interface DrawerContentProps extends Omit<DialogContentProps, 'size'> {
  /** Which edge it slides in from. */
  side?: DrawerSide;
  /** Width for a left/right drawer, height for a top/bottom one. */
  size?: DrawerSize;
}

export type { DialogPartProps as DrawerPartProps } from '../dialog/dialog.types.js';
export type DrawerTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};
