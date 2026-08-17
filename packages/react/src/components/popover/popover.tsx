import {
  composeRefs,
  FocusScope,
  Portal,
  Slot,
  useAnchorPosition,
  useControllableState,
  useDismissable,
  useIsomorphicLayoutEffect,
  usePresence,
} from '@prism-ui/core';
import * as React from 'react';
import type { PopoverContentProps, PopoverProps, PopoverTriggerProps } from './popover.types.js';
import { popoverArrowVariants, popoverContentVariants } from './popover.variants.js';

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  anchor: HTMLElement | null;
  setAnchor: (element: HTMLElement | null) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  modal: boolean;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext(part: string): PopoverContextValue {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error(`[@prism-ui/react] <Popover.${part}> must be used inside <Popover.Root>.`);
  }
  return context;
}

/**
 * A panel anchored to a trigger.
 *
 * ```tsx
 * <Popover.Root>
 *   <Popover.Trigger asChild><Button>Filters</Button></Popover.Trigger>
 *   <Popover.Content arrow>…</Popover.Content>
 * </Popover.Root>
 * ```
 */
export function PopoverRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  modal = false,
  children,
}: PopoverProps) {
  const [open, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const contentId = React.useId();

  const value = React.useMemo<PopoverContextValue>(
    () => ({ open, setOpen, contentId, anchor, setAnchor, triggerRef, modal }),
    [open, setOpen, contentId, anchor, modal],
  );

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
}
PopoverRoot.displayName = 'Popover.Root';

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger({ asChild = false, onClick, ...rest }, forwardedRef) {
    const { open, setOpen, contentId, setAnchor, triggerRef } = usePopoverContext('Trigger');
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={composeRefs(forwardedRef, triggerRef, setAnchor)}
        {...(asChild ? {} : { type: 'button' as const })}
        aria-haspopup="dialog"
        aria-expanded={open}
        // Only pointed at while the panel exists — a control referencing an
        // absent id is a broken reference, not an empty one.
        aria-controls={open ? contentId : undefined}
        data-state={open ? 'open' : 'closed'}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen(!open);
        }}
        {...rest}
      />
    );
  },
);
PopoverTrigger.displayName = 'Popover.Trigger';

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      side = 'bottom',
      align = 'center',
      sideOffset = 8,
      collisionPadding = 8,
      arrow = false,
      container,
      trapFocus = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onOpenAutoFocus,
      onCloseAutoFocus,
      className,
      children,
      ...rest
    },
    forwardedRef,
  ) {
    const { open, setOpen, contentId, anchor, triggerRef, modal } = usePopoverContext('Content');
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Kept mounted through the exit animation; see usePresence.
    const present = usePresence(open, contentRef);

    const position = useAnchorPosition({
      open: present,
      placement: align === 'center' ? side : `${side}-${align}`,
      offset: sideOffset,
      collisionPadding,
    });

    const { setAnchor } = position;
    useIsomorphicLayoutEffect(() => setAnchor(anchor), [setAnchor, anchor]);

    useDismissable({
      ref: contentRef,
      enabled: open,
      extraRefs: [triggerRef],
      // A modal popover ignores outside presses, so it can only be closed
      // deliberately — used for panels holding a form mid-edit.
      disableOutsidePointer: modal,
      onDismiss: (reason, event) => {
        if (reason === 'escape') onEscapeKeyDown?.(event);
        if (reason === 'outside-pointer') onPointerDownOutside?.(event);
        if (!event.defaultPrevented) setOpen(false);
      },
    });

    if (!present) return null;

    return (
      <Portal container={container}>
        <div
          ref={position.setFloating}
          style={position.floatingStyles}
          className="z-(--prism-z-popover)"
        >
          <FocusScope
            asChild
            trapped={trapFocus || modal}
            autoFocus
            restoreFocus
            onMountAutoFocus={onOpenAutoFocus}
            onUnmountAutoFocus={onCloseAutoFocus}
          >
            <div
              ref={composeRefs(forwardedRef, contentRef)}
              id={contentId}
              role="dialog"
              data-state={open ? 'open' : 'closed'}
              data-side={position.side}
              data-align={position.align}
              className={popoverContentVariants({ className })}
              {...rest}
            >
              {children}
              {arrow ? (
                <span
                  ref={position.setArrow}
                  data-side={position.side}
                  style={position.arrowStyles}
                  className={popoverArrowVariants()}
                />
              ) : null}
            </div>
          </FocusScope>
        </div>
      </Portal>
    );
  },
);
PopoverContent.displayName = 'Popover.Content';

/** Closes the popover. Handy for a "Done" button inside the panel. */
export const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverClose({ asChild = false, onClick, ...rest }, ref) {
    const { setOpen } = usePopoverContext('Close');
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        {...(asChild ? {} : { type: 'button' as const })}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen(false);
        }}
        {...rest}
      />
    );
  },
);
PopoverClose.displayName = 'Popover.Close';

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
};

export { popoverContentVariants };
