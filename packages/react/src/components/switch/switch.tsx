import * as React from 'react';
import { useFieldControl } from '../field/field.js';
import type { SwitchProps } from './switch.types.js';
import {
  switchInputVariants,
  switchRootVariants,
  switchThumbVariants,
  switchTrackVariants,
} from './switch.variants.js';

/**
 * An on/off toggle that applies immediately.
 *
 * ```tsx
 * <Switch name="notifications" defaultChecked onCheckedChange={save} />
 * ```
 *
 * Use it for settings that take effect the moment they change. A choice the user
 * confirms later with a Save button is a Checkbox — the difference is what the
 * control promises, and screen readers announce the two differently.
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    size = 'md',
    tone = 'accent',
    invalid,
    onCheckedChange,
    onChange,
    containerClassName,
    className,
    ...rest
  },
  ref,
) {
  const field = useFieldControl({
    id: rest.id,
    disabled: rest.disabled,
    required: rest.required,
    'aria-invalid': invalid || undefined,
    'aria-describedby': rest['aria-describedby'],
  });

  return (
    <span className={switchRootVariants({ tone, size, className: containerClassName })}>
      <input
        ref={ref}
        type="checkbox"
        // A checkbox under the hood, so it posts with the form like any other;
        // `role="switch"` is what makes it announce as "on"/"off" rather than
        // "checked"/"unchecked". `aria-checked` is deliberately not written:
        // the native input's own checked state supplies it, and duplicating it
        // in an attribute would mean tracking the value in both modes.
        // biome-ignore lint/a11y/useAriaPropsForRole: aria-checked comes from the native checkbox
        role="switch"
        {...rest}
        {...field}
        className={switchInputVariants()}
        onChange={(event) => {
          onCheckedChange?.(event.currentTarget.checked);
          onChange?.(event);
        }}
      />
      <span aria-hidden="true" className={switchTrackVariants({ className })} />
      <span aria-hidden="true" className={switchThumbVariants()} />
    </span>
  );
});

Switch.displayName = 'Switch';

export { switchRootVariants as switchVariants };
