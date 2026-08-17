import { Slot, Slottable } from '@noksha-ui/core';
import * as React from 'react';
import { Spinner } from '../spinner/spinner.js';
import type { ButtonProps } from './button.types.js';
import { buttonVariants } from './button.variants.js';

/**
 * The pattern-setter for every other component in the library.
 *
 * ```tsx
 * <Button variant="soft" tone="danger" size="sm">Delete</Button>
 * <Button asChild><a href="/pricing">Pricing</a></Button>
 * <Button iconOnly aria-label="Delete" icon={<TrashIcon />} />
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const {
    variant = 'solid',
    tone = 'accent',
    size = 'md',
    iconOnly = false,
    fullWidth = false,
    loading = false,
    loadingLabel = 'Loading',
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

  return (
    <Comp
      ref={ref}
      // A bare <button> inside a <form> defaults to type="submit", which
      // submits by accident far more often than it is intended.
      {...(asChild ? {} : { type: type ?? 'button' })}
      className={buttonVariants({ variant, tone, size, iconOnly, fullWidth, loading, className })}
      disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      {/*
        `Slottable` marks the one child that `asChild` merges onto, so it wraps
        `children` alone. Wrapping the icons with it too would hand the button's
        props to a fragment, where React drops every one of them.
      */}
      {icon}
      <Slottable>{children}</Slottable>
      {trailingIcon}

      {/*
        Loading hides the content in place rather than replacing it — the label
        keeps its width (no click-jump) and keeps its place in the a11y tree, so
        the button is still announced by name and not merely as "Loading".
        The hiding is done in CSS on the root, which is what lets it work
        identically when `asChild` has swapped that root for an <a>.
      */}
      {loading ? (
        <span
          data-noksha-loader=""
          className="absolute inset-0 flex items-center justify-center text-(--btn-current) [&_svg]:visible!"
        >
          <Spinner size={size} label={loadingLabel} />
        </span>
      ) : null}
    </Comp>
  );
}) as (props: ButtonProps & React.RefAttributes<HTMLButtonElement>) => React.ReactElement | null;

(Button as unknown as { displayName: string }).displayName = 'Button';

export { buttonVariants };
