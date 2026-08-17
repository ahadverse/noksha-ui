'use client';

import { ThemeProvider, ToastProvider, TooltipProvider } from '@prism-ui/react';
import type * as React from 'react';

/**
 * The three providers the site needs, in one client boundary.
 *
 * Only Theme is required for theming — the tokens are plain CSS variables and
 * work with no provider at all (ARCHITECTURE.md §3.4). This one exists for the
 * toggle in the header. Tooltip and Toast are here because their demos would
 * otherwise each need their own provider, which is not how an app uses them.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <ToastProvider position="bottom-right">{children}</ToastProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
