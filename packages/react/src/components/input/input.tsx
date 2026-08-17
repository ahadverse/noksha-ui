import * as React from 'react';
import { useFieldControl } from '../field/field.js';
import type { InputProps } from './input.types.js';
import { inputAffixVariants, inputVariants, inputWrapperVariants } from './input.variants.js';

/**
 * A single-line text field.
 *
 * ```tsx
 * <Input placeholder="Search" startIcon={<SearchIcon />} />
 * ```
 *
 * It is a real `<input>`, so `name`, `value`, `FormData` and server actions work
 * with no JavaScript on the page. The wrapper element only appears when there is
 * an icon to position — a plain input stays a plain input, which keeps consumer
 * CSS and autofill behaving the way they do everywhere else.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    variant = 'outline',
    size = 'md',
    invalid,
    startIcon,
    endIcon,
    containerClassName,
    className,
    type = 'text',
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

  const input = (
    <input
      ref={ref}
      type={type}
      {...rest}
      {...field}
      className={inputVariants({
        variant,
        size,
        withStartIcon: startIcon != null,
        withEndIcon: endIcon != null,
        className,
      })}
    />
  );

  if (startIcon == null && endIcon == null) return input;

  return (
    <div className={inputWrapperVariants({ className: containerClassName })}>
      {startIcon != null ? (
        <span aria-hidden="true" className={inputAffixVariants({ side: 'start', size })}>
          {startIcon}
        </span>
      ) : null}
      {input}
      {endIcon != null ? (
        <span aria-hidden="true" className={inputAffixVariants({ side: 'end', size })}>
          {endIcon}
        </span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export { inputVariants };
