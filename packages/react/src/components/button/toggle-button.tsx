import { useControllableState } from '@noksha-ui/core';
import * as React from 'react';
import { Button } from './button.js';
import type { ToggleButtonProps } from './button.types.js';

const PRESSED = [
  'aria-pressed:bg-(--btn-subtle-hover) aria-pressed:text-(--btn-fg)',
  'aria-pressed:border-(--btn-solid)/40',
].join(' ');

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  function ToggleButton(props, ref) {
    const {
      pressed: pressedProp,
      defaultPressed = false,
      onPressedChange,
      variant = 'ghost',
      onClick,
      className,
      ...rest
    } = props as ToggleButtonProps & { children?: React.ReactNode };

    const [pressed, setPressed] = useControllableState<boolean>({
      value: pressedProp,
      defaultValue: defaultPressed,
      onChange: onPressedChange,
    });

    return (
      <Button
        {...(rest as React.ComponentProps<typeof Button>)}
        ref={ref}
        variant={variant}
        aria-pressed={pressed}
        data-state={pressed ? 'on' : 'off'}
        className={`${PRESSED} ${className ?? ''}`.trim()}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (!event.defaultPrevented) setPressed((current) => !current);
        }}
      />
    );
  },
) as (
  props: ToggleButtonProps & React.RefAttributes<HTMLButtonElement>,
) => React.ReactElement | null;

(ToggleButton as unknown as { displayName: string }).displayName = 'ToggleButton';
