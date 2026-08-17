import * as React from 'react';

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server.
 *
 * Plain `useLayoutEffect` warns during SSR, and every overlay primitive needs
 * to measure before paint — so the switch lives here once instead of in each
 * of them.
 */
export const useIsomorphicLayoutEffect =
  typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;
