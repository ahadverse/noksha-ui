import { Slot } from '@noksha-ui/core';
import * as React from 'react';
import type {
  FieldControlProps,
  FieldLabelProps,
  FieldProps,
  FieldSize,
  FieldTextProps,
} from './field.types.js';
import {
  fieldDescriptionVariants,
  fieldErrorVariants,
  fieldLabelVariants,
  fieldRequiredVariants,
  fieldVariants,
} from './field.variants.js';

interface FieldContextValue {
  id: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
  size: FieldSize;
  hasDescription: boolean;
  hasError: boolean;
  setHasDescription: (present: boolean) => void;
  setHasError: (present: boolean) => void;
}

const FieldContext = React.createContext<FieldContextValue | null>(null);

/**
 * Groups a label, a control and its helper text, and wires the aria between
 * them.
 *
 * ```tsx
 * <Field.Root invalid={!!errors.email} required>
 *   <Field.Label>Email</Field.Label>
 *   <Input name="email" />
 *   <Field.Description>We only use this for receipts.</Field.Description>
 *   <Field.Error>{errors.email?.message}</Field.Error>
 * </Field.Root>
 * ```
 *
 * Every control in the library reads this context, so the `id`,
 * `aria-describedby`, `aria-invalid` and `required` wiring is done once here
 * rather than by hand at each of the hundreds of call sites in an application —
 * which is where it is normally got wrong.
 */
export const FieldRoot = React.forwardRef<HTMLDivElement, FieldProps>(function FieldRoot(
  {
    id,
    invalid = false,
    required = false,
    disabled = false,
    size = 'md',
    orientation = 'vertical',
    asChild = false,
    className,
    ...rest
  },
  ref,
) {
  const generatedId = React.useId();
  const fieldId = id ?? `noksha-field-${generatedId}`;

  // Which helper texts exist is discovered rather than declared, so
  // `aria-describedby` never points at an id that is not in the document —
  // a dangling reference makes the whole attribute be ignored.
  const [hasDescription, setHasDescription] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const value = React.useMemo<FieldContextValue>(
    () => ({
      id: fieldId,
      descriptionId: `${fieldId}-description`,
      errorId: `${fieldId}-error`,
      invalid,
      required,
      disabled,
      size,
      hasDescription,
      hasError,
      setHasDescription,
      setHasError,
    }),
    [fieldId, invalid, required, disabled, size, hasDescription, hasError],
  );

  const Comp = asChild ? Slot : 'div';

  return (
    <FieldContext.Provider value={value}>
      <Comp
        ref={ref}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        data-required={required || undefined}
        className={fieldVariants({ orientation, disabled, className })}
        {...rest}
      />
    </FieldContext.Provider>
  );
});
FieldRoot.displayName = 'Field.Root';

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
  { hideRequiredMarker = false, asChild = false, className, children, ...rest },
  ref,
) {
  const field = React.useContext(FieldContext);
  const Comp = asChild ? Slot : 'label';

  return (
    <Comp
      ref={ref}
      htmlFor={rest.htmlFor ?? field?.id}
      className={fieldLabelVariants({ size: field?.size ?? 'md', className })}
      {...rest}
    >
      {children}
      {field?.required && !hideRequiredMarker ? (
        // Decorative: the control already carries `aria-required`, so reading
        // the asterisk out would announce the requirement twice.
        <span aria-hidden="true" className={fieldRequiredVariants()}>
          *
        </span>
      ) : null}
    </Comp>
  );
});
FieldLabel.displayName = 'Field.Label';

export const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldTextProps>(
  function FieldDescription({ asChild = false, className, ...rest }, ref) {
    const field = React.useContext(FieldContext);
    const setHasDescription = field?.setHasDescription;

    React.useEffect(() => {
      setHasDescription?.(true);
      return () => setHasDescription?.(false);
    }, [setHasDescription]);

    const Comp = asChild ? Slot : 'p';

    return (
      <Comp
        ref={ref}
        id={field?.descriptionId}
        className={fieldDescriptionVariants({ size: field?.size ?? 'md', className })}
        {...rest}
      />
    );
  },
);
FieldDescription.displayName = 'Field.Description';

/**
 * Renders nothing unless the field is invalid *and* there is a message.
 *
 * Keeping the empty case unmounted is deliberate: an always-present error
 * paragraph is announced as an empty live region on some screen readers, and
 * it reserves vertical space that makes forms jump as they validate.
 */
export const FieldError = React.forwardRef<HTMLParagraphElement, FieldTextProps>(
  function FieldError({ asChild = false, className, children, ...rest }, ref) {
    const field = React.useContext(FieldContext);
    const setHasError = field?.setHasError;
    const visible = Boolean(children) && (field?.invalid ?? true);

    React.useEffect(() => {
      setHasError?.(visible);
      return () => setHasError?.(false);
    }, [setHasError, visible]);

    if (!visible) return null;

    const Comp = asChild ? Slot : 'p';

    return (
      <Comp
        ref={ref}
        id={field?.errorId}
        className={fieldErrorVariants({ size: field?.size ?? 'md', className })}
        {...rest}
      >
        {children}
      </Comp>
    );
  },
);
FieldError.displayName = 'Field.Error';

/** Read the surrounding field, if there is one. */
export function useFieldContext(): FieldContextValue | null {
  return React.useContext(FieldContext);
}

/**
 * Merges a control's own props with the field's, and returns what to spread.
 *
 * The control's explicit props always win. A `<Input disabled />` inside an
 * enabled field is still disabled; the field only fills in what the caller left
 * unsaid.
 */
export function useFieldControl(props: FieldControlProps = {}): FieldControlProps {
  const field = React.useContext(FieldContext);
  if (!field) return props;

  const described = [
    props['aria-describedby'],
    field.hasDescription ? field.descriptionId : null,
    field.hasError ? field.errorId : null,
  ]
    .filter(Boolean)
    .join(' ');

  return {
    ...props,
    id: props.id ?? field.id,
    disabled: props.disabled ?? field.disabled,
    required: props.required ?? field.required,
    'aria-required': props['aria-required'] ?? (field.required || undefined),
    'aria-invalid': props['aria-invalid'] ?? (field.invalid || undefined),
    'aria-describedby': described || undefined,
  };
}

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
};

export { fieldVariants };
