import * as React from 'react';
import { Button } from './button.js';
import type { FloatingButtonProps } from './button.types.js';
import { anchorStyle } from './floating.js';

export const FloatingButton = React.forwardRef<HTMLButtonElement, FloatingButtonProps>(
  function FloatingButton(
    {
      label,
      icon,
      extended = false,
      placement = 'bottom-right',
      offset = 24,
      container,
      variant = 'solid',
      tone = 'accent',
      size = 'lg',
      effect = 'lift',
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const scoped = Boolean(container);

    const shape = extended ? 'rounded-full px-5' : 'rounded-full';

    return (
      <div
        className="pointer-events-none z-(--noksha-z-sticky)"
        style={{
          ...anchorStyle(placement, offset, scoped),
          maxInlineSize: `calc(100% - ${offset * 2}px)`,
          ...style,
        }}
      >
        {extended ? (
          <Button
            {...rest}
            ref={ref}
            variant={variant}
            tone={tone}
            size={size}
            effect={effect}
            icon={icon}
            className={`pointer-events-auto min-w-0 shrink shadow-(--noksha-shadow-lg) ${shape} ${className ?? ''}`}
          >
            <span className="min-w-0 truncate">{label}</span>
          </Button>
        ) : (
          <Button
            {...rest}
            ref={ref}
            iconOnly
            aria-label={label}
            variant={variant}
            tone={tone}
            size={size}
            effect={effect}
            icon={icon}
            className={`pointer-events-auto shadow-(--noksha-shadow-lg) ${shape} ${className ?? ''}`}
          />
        )}
      </div>
    );
  },
);
FloatingButton.displayName = 'FloatingButton';
