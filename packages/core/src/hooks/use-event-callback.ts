import * as React from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js';

/**
 * Wraps a handler so its identity never changes but it always sees the latest
 * render's closure.
 *
 * Every primitive in this package attaches document-level listeners. Without
 * this, each of those effects would have to list the handler in its dependency
 * array and therefore tear down and re-attach a global listener on every render
 * of the consumer — the quiet performance leak behind most "why does my menu
 * feel janky" reports.
 */
export function useEventCallback<Args extends unknown[], Result>(
  callback: ((...args: Args) => Result) | undefined,
): (...args: Args) => Result | undefined {
  const ref = React.useRef(callback);

  // Layout effect, not effect: a listener firing between paint and the passive
  // effect would otherwise call the previous render's callback.
  useIsomorphicLayoutEffect(() => {
    ref.current = callback;
  });

  return React.useCallback((...args: Args) => ref.current?.(...args), []);
}
