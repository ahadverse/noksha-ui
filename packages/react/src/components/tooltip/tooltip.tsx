import {
  composeRefs,
  Portal,
  Slot,
  useAnchorPosition,
  useControllableState,
  useDismissable,
  useIsomorphicLayoutEffect,
  usePresence,
} from '@prism-ui/core';
import * as React from 'react';
import type {
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
} from './tooltip.types.js';
import { tooltipArrowVariants, tooltipContentVariants } from './tooltip.variants.js';

interface TooltipGroupValue {
  delayDuration: number;
  /** True while the skip window is open, so the next tooltip opens instantly. */
  isSkipping: () => boolean;
  onOpened: () => void;
  onClosed: () => void;
}

const TooltipGroupContext = React.createContext<TooltipGroupValue | null>(null);

/**
 * Shares the open delay across a group of tooltips.
 *
 * Optional — a lone tooltip works without it. What it adds is the behaviour
 * people expect from a toolbar: after the first tooltip, moving along the row
 * shows the rest immediately instead of making the user wait out the delay at
 * every single button.
 */
export function TooltipProvider({
  delayDuration = 400,
  skipDelayDuration = 300,
  children,
}: TooltipProviderProps) {
  const skipUntil = React.useRef(0);
  const openCount = React.useRef(0);

  const value = React.useMemo<TooltipGroupValue>(
    () => ({
      delayDuration,
      isSkipping: () => openCount.current > 0 || Date.now() < skipUntil.current,
      onOpened: () => {
        openCount.current += 1;
      },
      onClosed: () => {
        openCount.current = Math.max(0, openCount.current - 1);
        skipUntil.current = Date.now() + skipDelayDuration;
      },
    }),
    [delayDuration, skipDelayDuration],
  );

  return <TooltipGroupContext.Provider value={value}>{children}</TooltipGroupContext.Provider>;
}
TooltipProvider.displayName = 'Tooltip.Provider';

interface TooltipContextValue {
  open: boolean;
  contentId: string;
  interactive: boolean;
  anchor: HTMLElement | null;
  setAnchor: (element: HTMLElement | null) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  openWithDelay: () => void;
  closeWithDelay: () => void;
  closeNow: () => void;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltipContext(part: string): TooltipContextValue {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error(`[@prism-ui/react] <Tooltip.${part}> must be used inside <Tooltip.Root>.`);
  }
  return context;
}

/**
 * A short label describing what a control does.
 *
 * ```tsx
 * <Tooltip.Root>
 *   <Tooltip.Trigger asChild><Button iconOnly aria-label="Delete" icon={<Trash />} /></Tooltip.Trigger>
 *   <Tooltip.Content>Delete permanently</Tooltip.Content>
 * </Tooltip.Root>
 * ```
 *
 * It describes; it never names. The trigger keeps its own accessible name, and
 * the tooltip is attached with `aria-describedby` — a tooltip used as the only
 * label leaves touch users, who never see it, with an unlabelled button.
 */
export function TooltipRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  delayDuration,
  closeDelay = 100,
  interactive = false,
  children,
}: TooltipProps) {
  const group = React.useContext(TooltipGroupContext);
  const delay = delayDuration ?? group?.delayDuration ?? 400;

  const [open, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentId = React.useId();

  const clear = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  React.useEffect(() => clear, [clear]);

  const groupRef = React.useRef(group);
  groupRef.current = group;

  const openWithDelay = React.useCallback(() => {
    clear();
    const wait = groupRef.current?.isSkipping() ? 0 : delay;
    if (wait === 0) {
      setOpen(true);
      groupRef.current?.onOpened();
      return;
    }
    timer.current = setTimeout(() => {
      setOpen(true);
      groupRef.current?.onOpened();
    }, wait);
  }, [clear, delay, setOpen]);

  const closeNow = React.useCallback(() => {
    clear();
    setOpen(false);
  }, [clear, setOpen]);

  const closeWithDelay = React.useCallback(() => {
    clear();
    timer.current = setTimeout(() => setOpen(false), closeDelay);
  }, [clear, closeDelay, setOpen]);

  // Report the close from an effect rather than from the handler: a tooltip
  // closed by unmounting or by a controlled prop must still open the skip
  // window, or moving on to the next control feels inconsistent.
  const wasOpen = React.useRef(open);
  React.useEffect(() => {
    if (wasOpen.current && !open) group?.onClosed();
    wasOpen.current = open;
  }, [open, group]);

  const value = React.useMemo<TooltipContextValue>(
    () => ({
      open,
      contentId,
      interactive,
      anchor,
      setAnchor,
      triggerRef,
      openWithDelay,
      closeWithDelay,
      closeNow,
    }),
    [open, contentId, interactive, anchor, openWithDelay, closeWithDelay, closeNow],
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
}
TooltipRoot.displayName = 'Tooltip.Root';

export const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  function TooltipTrigger({ asChild = false, ...rest }, forwardedRef) {
    const { open, contentId, setAnchor, triggerRef, openWithDelay, closeWithDelay, closeNow } =
      useTooltipContext('Trigger');

    const Comp = asChild ? Slot : 'button';

    /**
     * Whether focus arrived from a pointer press rather than from the keyboard.
     *
     * `:focus-visible` is the obvious test and the wrong one to depend on: it
     * is a live browser heuristic, so the answer differs across engines and
     * test environments. Tracking the press directly gives the same answer
     * everywhere — and it is the actual question being asked.
     */
    const fromPointer = React.useRef(false);

    return (
      <Comp
        ref={composeRefs(forwardedRef, triggerRef, setAnchor)}
        {...(asChild ? {} : { type: 'button' as const })}
        // Describes, never names: the trigger's own label is untouched.
        aria-describedby={open ? contentId : undefined}
        data-state={open ? 'open' : 'closed'}
        {...rest}
        onPointerEnter={(event: React.PointerEvent<HTMLButtonElement>) => {
          rest.onPointerEnter?.(event);
          // Touch has no hover; a long-press tooltip would fight the platform's
          // own text selection and context menu.
          if (event.pointerType !== 'touch') openWithDelay();
        }}
        onPointerLeave={(event: React.PointerEvent<HTMLButtonElement>) => {
          rest.onPointerLeave?.(event);
          fromPointer.current = false;
          if (event.pointerType !== 'touch') closeWithDelay();
        }}
        onPointerDown={(event: React.PointerEvent<HTMLButtonElement>) => {
          rest.onPointerDown?.(event);
          // Acting on the control answers the question the tooltip was asking.
          fromPointer.current = true;
          closeNow();
        }}
        onFocus={(event: React.FocusEvent<HTMLButtonElement>) => {
          rest.onFocus?.(event);
          // Focus that follows a click must not reopen what the click just
          // dismissed — only keyboard focus opens the tooltip.
          if (!fromPointer.current) openWithDelay();
        }}
        onBlur={(event: React.FocusEvent<HTMLButtonElement>) => {
          rest.onBlur?.(event);
          fromPointer.current = false;
          closeNow();
        }}
      />
    );
  },
);
TooltipTrigger.displayName = 'Tooltip.Trigger';

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(
    {
      side = 'top',
      align = 'center',
      sideOffset = 6,
      collisionPadding = 8,
      arrow = false,
      container,
      className,
      children,
      ...rest
    },
    forwardedRef,
  ) {
    const {
      open,
      contentId,
      interactive,
      anchor,
      triggerRef,
      closeNow,
      closeWithDelay,
      openWithDelay,
    } = useTooltipContext('Content');

    const contentRef = React.useRef<HTMLDivElement>(null);
    const present = usePresence(open, contentRef);

    const position = useAnchorPosition({
      open: present,
      placement: align === 'center' ? side : `${side}-${align}`,
      offset: sideOffset,
      collisionPadding,
    });

    const { setAnchor } = position;
    useIsomorphicLayoutEffect(() => setAnchor(anchor), [setAnchor, anchor]);

    // Escape only. An outside press is already handled by the pointer leaving
    // the trigger, and closing a tooltip on focus-out would fight the trigger.
    useDismissable({
      ref: contentRef,
      enabled: open,
      extraRefs: [triggerRef],
      disableOutsidePointer: true,
      onDismiss: closeNow,
    });

    if (!present) return null;

    return (
      <Portal container={container}>
        <div
          ref={position.setFloating}
          style={position.floatingStyles}
          className="z-(--prism-z-tooltip)"
        >
          <div
            ref={composeRefs(forwardedRef, contentRef)}
            id={contentId}
            role="tooltip"
            data-state={open ? 'open' : 'closed'}
            data-side={position.side}
            data-align={position.align}
            className={tooltipContentVariants({ interactive, className })}
            {...(interactive
              ? { onPointerEnter: openWithDelay, onPointerLeave: closeWithDelay }
              : {})}
            {...rest}
          >
            {children}
            {arrow ? (
              <span
                ref={position.setArrow}
                style={position.arrowStyles}
                className={tooltipArrowVariants()}
              />
            ) : null}
          </div>
        </div>
      </Portal>
    );
  },
);
TooltipContent.displayName = 'Tooltip.Content';

export const Tooltip = {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};

export { tooltipContentVariants };
