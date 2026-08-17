import * as React from 'react';

export interface UseControllableStateOptions<T> {
  /** Present means controlled. `undefined` means uncontrolled. */
  value?: T | undefined;
  /** Initial value in the uncontrolled case. */
  defaultValue: T;
  /** Called on every change, in both modes. */
  onChange?: ((value: T) => void) | undefined;
}

/**
 * One hook for the controlled/uncontrolled duality.
 *
 * The returned setter accepts a value or an updater, matching `useState`, and
 * calls `onChange` in both modes — so a consumer can listen without taking over
 * ownership of the state.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, (next: React.SetStateAction<T>) => void] {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue);

  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  // Kept in a ref so the setter identity stays stable across renders; a changing
  // setter would defeat memoisation in every component that consumes this.
  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  });

  const currentRef = React.useRef(current);
  React.useEffect(() => {
    currentRef.current = current;
  });

  const isControlledRef = React.useRef(isControlled);
  React.useEffect(() => {
    isControlledRef.current = isControlled;
  });

  useControlledWarning(isControlled);

  const setValue = React.useCallback((next: React.SetStateAction<T>) => {
    const resolved =
      typeof next === 'function' ? (next as (prev: T) => T)(currentRef.current) : next;

    if (Object.is(resolved, currentRef.current)) return;

    // Track eagerly so two setter calls in one tick both see the newer value,
    // rather than the second overwriting the first with a stale base.
    currentRef.current = resolved;

    if (!isControlledRef.current) setUncontrolled(resolved);
    onChangeRef.current?.(resolved);
  }, []);

  return [current, setValue];
}

/** Dev-only warning for the classic controlled/uncontrolled switch footgun. */
function useControlledWarning(isControlled: boolean): void {
  const wasControlled = React.useRef(isControlled);

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    if (wasControlled.current !== isControlled) {
      console.error(
        `[@prism-ui/core] A component switched from ${
          wasControlled.current ? 'controlled to uncontrolled' : 'uncontrolled to controlled'
        }. Decide on one for the component's lifetime: pass \`value\` always, or never.`,
      );
      wasControlled.current = isControlled;
    }
  }, [isControlled]);
}
