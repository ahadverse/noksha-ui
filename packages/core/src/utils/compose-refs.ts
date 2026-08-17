import type * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

/** Assigns to a ref of either shape, returning a React 19 cleanup if one is given. */
function assignRef<T>(ref: PossibleRef<T>, value: T): (() => void) | undefined {
  if (typeof ref === 'function') {
    const cleanup = ref(value);
    return typeof cleanup === 'function' ? cleanup : undefined;
  }
  if (ref !== null && ref !== undefined) {
    (ref as React.RefObject<T | null>).current = value;
  }
  return undefined;
}

/**
 * Points several refs at the same node.
 *
 * Callback refs may return a cleanup function in React 19; those are collected
 * and run on detach. For React 18, where no cleanup is returned, the refs are
 * nulled out instead — so the same call site works on both peer versions.
 */
export function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return (node: T) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = assignRef(ref, node);
      if (cleanup) hasCleanup = true;
      return cleanup;
    });

    if (!hasCleanup) return;

    return () => {
      for (const [index, cleanup] of cleanups.entries()) {
        if (cleanup) {
          cleanup();
        } else {
          assignRef(refs[index], null as T);
        }
      }
    };
  };
}
