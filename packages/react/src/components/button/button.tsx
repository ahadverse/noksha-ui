import { Slot, Slottable } from '@noksha-ui/core';
import * as React from 'react';
import { Spinner } from '../spinner/spinner.js';
import type { ButtonProps } from './button.types.js';
import { buttonVariants } from './button.variants.js';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const {
    variant = 'solid',
    tone = 'accent',
    effect = 'none',
    size = 'md',
    shape = 'default',
    iconOnly = false,
    fullWidth = false,
    loading = false,
    loadingLabel = 'Loading',
    loadingIcon,
    loadingPlacement = 'overlay',
    icon,
    trailingIcon,
    asChild = false,
    className,
    children,
    disabled,
    type,
    ...rest
  } = props as ButtonProps & { children?: React.ReactNode; iconOnly?: boolean };

  const Comp = asChild ? Slot : 'button';

  // Two ways to show the same indicator. `overlay` blanks the content and
  // centres it, so the button holds the exact width it had; `icon` puts it
  // where the leading icon was and leaves the label readable, which is the
  // better read when the label names what is being waited on.
  const overlaid = loading && loadingPlacement === 'overlay';
  const inline = loading && loadingPlacement === 'icon';

  const indicator = loadingIcon ?? <Spinner size={size} label={loadingLabel} />;

  return (
    <Comp
      ref={ref}
      {...(asChild ? {} : { type: type ?? 'button' })}
      className={buttonVariants({
        variant,
        tone,
        effect,
        size,
        shape,
        iconOnly,
        fullWidth,
        loading: overlaid,
        className: inline ? `cursor-progress ${className ?? ''}` : className,
      })}
      disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      {inline ? indicator : icon}
      <Slottable>{children}</Slottable>
      {trailingIcon}

      {overlaid ? (
        <span
          data-noksha-loader=""
          className="absolute inset-0 flex items-center justify-center text-(--btn-current) [&_svg]:visible!"
        >
          {indicator}
        </span>
      ) : null}
    </Comp>
  );
}) as (props: ButtonProps & React.RefAttributes<HTMLButtonElement>) => React.ReactElement | null;

(Button as unknown as { displayName: string }).displayName = 'Button';

export { buttonVariants };
