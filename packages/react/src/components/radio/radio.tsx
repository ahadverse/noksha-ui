import { useControllableState } from '@noksha-ui/core';
import * as React from 'react';
import { useFieldControl } from '../field/field.js';
import type { RadioGroupProps, RadioProps, RadioSize, RadioTone } from './radio.types.js';
import {
  radioCircleVariants,
  radioDotVariants,
  radioGroupVariants,
  radioInputVariants,
  radioRootVariants,
} from './radio.variants.js';

interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  setValue: (value: string) => void;
  size: RadioSize;
  tone: RadioTone;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

/**
 * A set of mutually exclusive choices.
 *
 * ```tsx
 * <RadioGroup name="plan" defaultValue="pro" onValueChange={setPlan}>
 *   <Radio value="free" /> <Radio value="pro" />
 * </RadioGroup>
 * ```
 *
 * There is no roving-focus hook here on purpose. Native radios that share a
 * `name` already get arrow-key navigation, wrap-around, and "select on focus"
 * from the platform — reimplementing that on top would mean fighting it.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    name,
    value: valueProp,
    defaultValue,
    onValueChange,
    orientation = 'vertical',
    size = 'md',
    tone = 'accent',
    disabled = false,
    required = false,
    invalid = false,
    className,
    ...rest
  },
  ref,
) {
  const generatedName = React.useId();
  const [value, setValue] = useControllableState<string | undefined>({
    value: valueProp,
    defaultValue,
    onChange: (next) => {
      if (next !== undefined) onValueChange?.(next);
    },
  });

  const field = useFieldControl({ disabled, required, 'aria-invalid': invalid || undefined });

  const context = React.useMemo<RadioGroupContextValue>(
    () => ({
      name: name ?? `noksha-radio-${generatedName}`,
      value,
      setValue,
      size,
      tone,
      disabled: field.disabled ?? disabled,
      required: field.required ?? required,
      invalid: field['aria-invalid'] === true || invalid,
    }),
    [name, generatedName, value, setValue, size, tone, field, disabled, required, invalid],
  );

  return (
    <RadioGroupContext.Provider value={context}>
      <div
        ref={ref}
        role="radiogroup"
        aria-orientation={orientation}
        aria-required={context.required || undefined}
        aria-invalid={context.invalid || undefined}
        aria-describedby={field['aria-describedby']}
        data-disabled={context.disabled || undefined}
        className={radioGroupVariants({ orientation, className })}
        {...rest}
      />
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = 'RadioGroup';

/** One choice. Works standalone, but normally lives inside a `<RadioGroup>`. */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, size, tone, invalid, containerClassName, className, onChange, ...rest },
  ref,
) {
  const group = React.useContext(RadioGroupContext);
  const inGroup = group !== null;

  /**
   * The field wiring applies in a group as well as out of one.
   *
   * A radio is normally both: inside a `<RadioGroup>` for the shared name, and
   * inside a `<Field.Root>` for its own label. The group supplies `name` and
   * `checked`; everything identity-shaped — the `id` a `<Field.Label htmlFor>`
   * points at, `aria-describedby` — has to come from the field, or the label
   * references an element that is not there.
   */
  const field = useFieldControl({
    id: rest.id,
    disabled: rest.disabled ?? group?.disabled,
    required: rest.required ?? group?.required,
    'aria-describedby': rest['aria-describedby'],
    'aria-invalid': (invalid ?? group?.invalid) || undefined,
  });

  return (
    <span
      className={radioRootVariants({
        tone: tone ?? group?.tone ?? 'accent',
        size: size ?? group?.size ?? 'md',
        className: containerClassName,
      })}
    >
      <input
        ref={ref}
        type="radio"
        value={value}
        {...(inGroup ? { name: rest.name ?? group.name, checked: group.value === value } : null)}
        {...rest}
        {...field}
        className={radioInputVariants()}
        onChange={(event) => {
          if (event.currentTarget.checked) group?.setValue(value);
          onChange?.(event);
        }}
      />
      <span aria-hidden="true" className={radioCircleVariants({ className })} />
      <span aria-hidden="true" className={radioDotVariants()} />
    </span>
  );
});
Radio.displayName = 'Radio';

export { radioRootVariants as radioVariants };
