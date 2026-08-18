import { useControllableState, useDismissable, usePresence } from '@noksha-ui/core';
import * as React from 'react';
import { Button } from './button.js';
import type { FloatingMenuProps } from './button.types.js';
import { anchorStyle, stackAlignment, stacksUpward } from './floating.js';

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const FloatingMenu = React.forwardRef<HTMLDivElement, FloatingMenuProps>(
  function FloatingMenu(
    {
      label,
      actions,
      icon,
      openIcon,
      hideActionLabels = false,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      placement = 'bottom-right',
      offset = 24,
      container,
      variant = 'solid',
      tone = 'accent',
      size = 'lg',
      className,
      style,
      ...rest
    },
    forwardedRef,
  ) {
    const [open, setOpen] = useControllableState<boolean>({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const scoped = Boolean(container);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const panelRef = React.useRef<HTMLUListElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const panelId = React.useId();

    const present = usePresence(open, panelRef);

    useDismissable({
      ref: wrapperRef,
      enabled: open,
      onDismiss: (reason) => {
        setOpen(false);
        if (reason === 'escape') triggerRef.current?.focus();
      },
    });

    const upward = stacksUpward(placement);

    const trigger = (
      <Button
        ref={triggerRef}
        iconOnly
        aria-label={label}
        aria-expanded={open}
        aria-controls={present ? panelId : undefined}
        variant={variant}
        tone={tone}
        size={size}
        effect="lift"
        icon={open ? (openIcon ?? <CloseIcon />) : (icon ?? <PlusIcon />)}
        className="pointer-events-auto rounded-full shadow-(--noksha-shadow-lg)"
        onClick={() => setOpen(!open)}
      />
    );

    const panel = present ? (
      <ul
        ref={panelRef}
        id={panelId}
        aria-label={label}
        data-state={open ? 'open' : 'closed'}
        className={[
          'pointer-events-auto flex flex-col gap-2',
          stackAlignment(placement),
          'data-[state=open]:animate-noksha-in data-[state=closed]:animate-noksha-out',
          upward ? '[--noksha-enter-y:0.75rem]' : '[--noksha-enter-y:-0.75rem]',
          upward ? '[--noksha-exit-y:0.75rem]' : '[--noksha-exit-y:-0.75rem]',
        ].join(' ')}
      >
        {(upward ? [...actions].reverse() : actions).map((action, index) => (
          <li
            key={action.id}
            className={[
              'flex items-center gap-2',
              placement.endsWith('left') ? 'flex-row-reverse' : '',
              'animate-noksha-in [animation-fill-mode:backwards]',
              'motion-reduce:animate-none',
            ].join(' ')}
            style={{ animationDelay: `${index * 45}ms` }}
          >
            {hideActionLabels ? null : (
              <span
                aria-hidden="true"
                className="whitespace-nowrap rounded-(--noksha-radius-sm) bg-(--noksha-bg-inverse) px-2 py-1 text-(--noksha-fg-inverse) text-xs shadow-(--noksha-shadow-md)"
              >
                {action.label}
              </span>
            )}
            <Button
              iconOnly
              aria-label={action.label}
              variant="solid"
              tone={action.tone ?? 'neutral'}
              size="md"
              effect="lift"
              icon={action.icon}
              className="rounded-full shadow-(--noksha-shadow-md)"
              onClick={() => {
                action.onSelect?.();
                setOpen(false);
                triggerRef.current?.focus();
              }}
            />
          </li>
        ))}
      </ul>
    ) : null;

    return (
      <div
        ref={forwardedRef}
        className={`pointer-events-none z-(--noksha-z-sticky) ${className ?? ''}`}
        style={{ ...anchorStyle(placement, offset, scoped), ...style }}
        {...rest}
      >
        <div ref={wrapperRef} className={`flex flex-col gap-3 ${stackAlignment(placement)}`}>
          {upward ? panel : trigger}
          {upward ? trigger : panel}
        </div>
      </div>
    );
  },
);
FloatingMenu.displayName = 'FloatingMenu';
