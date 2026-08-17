import { composeRefs, useIsomorphicLayoutEffect } from '@noksha-ui/core';
import * as React from 'react';
import { useFieldControl } from '../field/field.js';
import type { CheckboxProps } from './checkbox.types.js';
import {
  checkboxBoxVariants,
  checkboxInputVariants,
  checkboxMarkVariants,
  checkboxRootVariants,
} from './checkbox.variants.js';

const markProps = {
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/**
 * A checkbox with an optional third, indeterminate state.
 *
 * ```tsx
 * <Checkbox name="terms" onCheckedChange={setAgreed} />
 * <Checkbox indeterminate checked={someSelected} />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    size = 'md',
    tone = 'accent',
    indeterminate = false,
    invalid,
    onCheckedChange,
    onChange,
    containerClassName,
    className,
    ...rest
  },
  forwardedRef,
) {
  const innerRef = React.useRef<HTMLInputElement>(null);

  const field = useFieldControl({
    id: rest.id,
    disabled: rest.disabled,
    required: rest.required,
    'aria-invalid': invalid || undefined,
    'aria-describedby': rest['aria-describedby'],
  });

  // `indeterminate` exists only as a DOM property, so it has to be written to
  // the node. Doing it in a layout effect means `:indeterminate` matches before
  // the first paint, and the dash never flashes in as a check.
  useIsomorphicLayoutEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate, rest.checked, rest.defaultChecked]);

  return (
    <span className={checkboxRootVariants({ tone, size, className: containerClassName })}>
      <input
        ref={composeRefs(forwardedRef, innerRef)}
        type="checkbox"
        {...rest}
        {...field}
        // The native property does not reach assistive tech on its own;
        // `aria-checked="mixed"` is what actually announces the third state.
        aria-checked={indeterminate ? 'mixed' : undefined}
        className={checkboxInputVariants()}
        onChange={(event) => {
          onCheckedChange?.(event.currentTarget.checked);
          onChange?.(event);
        }}
      />
      <span aria-hidden="true" className={checkboxBoxVariants({ className })} />
      <svg {...markProps} aria-hidden="true" className={checkboxMarkVariants({ mark: 'check' })}>
        <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
      </svg>
      <svg {...markProps} aria-hidden="true" className={checkboxMarkVariants({ mark: 'dash' })}>
        <path d="M4 8h8" />
      </svg>
    </span>
  );
});

Checkbox.displayName = 'Checkbox';

export { checkboxRootVariants as checkboxVariants };
