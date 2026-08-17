import { pv } from '@prism-ui/core';
import type * as React from 'react';

export const spinnerVariants = pv({
  base: [
    'animate-spin',
    // Reads the shared motion scale, so prefers-reduced-motion slows the whole
    // library from one place. The spinner keeps turning rather than freezing —
    // a still spinner reads as a hung UI.
    '[animation-duration:700ms] motion-reduce:[animation-duration:1800ms]',
  ].join(' '),
  variants: {
    size: {
      xs: 'size-3.5',
      sm: 'size-4',
      md: 'size-4',
      lg: 'size-5',
      xl: 'size-5',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface SpinnerProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Accessible label. Pass `null` when the spinner sits inside something that
   * already announces the busy state, so it is not read out twice.
   */
  label?: string | null;
}

/** An indeterminate progress indicator. CSS-only — no JS animation loop. */
export function Spinner({ size = 'md', label = 'Loading', className, ...rest }: SpinnerProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={spinnerVariants({ size, className })}
      role={label ? 'status' : 'presentation'}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2.75" opacity="0.22" />
      <path
        d="M21.5 12A9.5 9.5 0 0 0 12 2.5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

Spinner.displayName = 'Spinner';
