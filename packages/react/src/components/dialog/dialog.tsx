import {
  composeRefs,
  FocusScope,
  Slot,
  useControllableState,
  useDismissable,
  usePresence,
  useScrollLock,
} from '@noksha-ui/core';
import * as React from 'react';
import { isProduction } from '../../internal/env.js';
import { OverlayPortal } from '../../internal/overlay-portal.js';
import type {
  DialogContentProps,
  DialogOverlayProps,
  DialogPartProps,
  DialogProps,
  DialogTriggerProps,
} from './dialog.types.js';
import {
  dialogBodyVariants,
  dialogCloseVariants,
  dialogContentVariants,
  dialogDescriptionVariants,
  dialogFooterVariants,
  dialogHeaderVariants,
  dialogOverlayVariants,
  dialogPositionerVariants,
  dialogTitleVariants,
} from './dialog.variants.js';

export interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  modal: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  hasDescription: boolean;
  setHasTitle: (present: boolean) => void;
  setHasDescription: (present: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

/** Shared by Dialog and Drawer, which differ only in how the panel is dressed. */
export function useDialogContext(part: string): DialogContextValue {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(`[@noksha-ui/react] <${part}> must be used inside a Dialog or Drawer root.`);
  }
  return context;
}

/**
 * A window that interrupts the page for a task or a decision.
 *
 * ```tsx
 * <Dialog.Root>
 *   <Dialog.Trigger asChild><Button>Delete</Button></Dialog.Trigger>
 *   <Dialog.Content size="sm">
 *     <Dialog.Header>
 *       <Dialog.Title>Delete project?</Dialog.Title>
 *       <Dialog.Description>This cannot be undone.</Dialog.Description>
 *     </Dialog.Header>
 *     <Dialog.Footer>
 *       <Dialog.Close asChild><Button variant="ghost">Cancel</Button></Dialog.Close>
 *       <Button tone="danger">Delete</Button>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog.Root>
 * ```
 */
export function DialogRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  modal = true,
  children,
}: DialogProps) {
  const [open, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const id = React.useId();
  const [hasTitle, setHasTitle] = React.useState(false);
  const [hasDescription, setHasDescription] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const value = React.useMemo<DialogContextValue>(
    () => ({
      open,
      setOpen,
      modal,
      contentId: `${id}-content`,
      titleId: `${id}-title`,
      descriptionId: `${id}-description`,
      hasTitle,
      hasDescription,
      setHasTitle,
      setHasDescription,
      triggerRef,
    }),
    [open, setOpen, modal, id, hasTitle, hasDescription],
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}
DialogRoot.displayName = 'Dialog.Root';

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger({ asChild = false, onClick, ...rest }, forwardedRef) {
    const { open, setOpen, contentId, triggerRef } = useDialogContext('Dialog.Trigger');
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={composeRefs(forwardedRef, triggerRef)}
        {...(asChild ? {} : { type: 'button' as const })}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        data-state={open ? 'open' : 'closed'}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen(true);
        }}
        {...rest}
      />
    );
  },
);
DialogTrigger.displayName = 'Dialog.Trigger';

export const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  function DialogOverlay({ asChild = false, className, ...rest }, ref) {
    const { open } = useDialogContext('Dialog.Overlay');
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        className={dialogOverlayVariants({ className })}
        {...rest}
      />
    );
  },
);
DialogOverlay.displayName = 'Dialog.Overlay';

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

/**
 * The shared panel body for Dialog and Drawer.
 *
 * Everything that makes a modal correct lives here once — the portal, the
 * backdrop, the focus trap and restore, the scroll lock, the dismiss stack, and
 * staying mounted for the exit animation. A Drawer is the same machine with a
 * different surface, so it passes its own classes rather than reimplementing any
 * of it.
 */
export const DialogSurface = React.forwardRef<
  HTMLDivElement,
  DialogContentProps & { surfaceClassName: string; positionerClassName: string }
>(function DialogSurface(
  {
    container,
    hideCloseButton = false,
    closeLabel = 'Close',
    onEscapeKeyDown,
    onPointerDownOutside,
    onOpenAutoFocus,
    onCloseAutoFocus,
    surfaceClassName,
    positionerClassName,
    className,
    children,
    size: _size,
    ...rest
  },
  forwardedRef,
) {
  const { open, setOpen, modal, contentId, titleId, descriptionId, hasTitle, hasDescription } =
    useDialogContext('Dialog.Content');

  const contentRef = React.useRef<HTMLDivElement>(null);
  const present = usePresence(open, contentRef);

  useScrollLock(present && modal);

  useDismissable({
    ref: contentRef,
    enabled: open,
    onDismiss: (reason, event) => {
      if (reason === 'escape') onEscapeKeyDown?.(event);
      if (reason === 'outside-pointer') onPointerDownOutside?.(event);
      if (!event.defaultPrevented) setOpen(false);
    },
  });

  const labelled = hasTitle || Boolean(rest['aria-label']) || Boolean(rest['aria-labelledby']);

  /**
   * A dialog with no accessible name is announced as just "dialog", which tells
   * the user nothing about what has taken over their screen.
   *
   * Deferred by a task because `<Dialog.Title>` registers from its own effect,
   * which lands after this one on the first commit — checking synchronously
   * would warn about every correctly-labelled dialog in the codebase.
   */
  React.useEffect(() => {
    if (isProduction() || !present || labelled) return;

    const timer = setTimeout(() => {
      console.warn(
        '[@noksha-ui/react] A dialog needs an accessible name. Add a <Dialog.Title>, ' +
          'or an aria-label if the title should not be visible.',
      );
    }, 0);

    return () => clearTimeout(timer);
  }, [present, labelled]);

  if (!present) return null;

  return (
    <OverlayPortal container={container}>
      <DialogOverlay />
      <div className={positionerClassName}>
        <FocusScope
          asChild
          trapped
          autoFocus
          restoreFocus
          onMountAutoFocus={onOpenAutoFocus}
          onUnmountAutoFocus={onCloseAutoFocus}
        >
          <div
            ref={composeRefs(forwardedRef, contentRef)}
            id={contentId}
            role="dialog"
            aria-modal={modal || undefined}
            aria-labelledby={hasTitle ? titleId : undefined}
            aria-describedby={hasDescription ? descriptionId : undefined}
            data-state={open ? 'open' : 'closed'}
            className={surfaceClassName}
            {...rest}
          >
            {children}
            {hideCloseButton ? null : (
              <button
                type="button"
                aria-label={closeLabel}
                className={dialogCloseVariants()}
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        </FocusScope>
      </div>
    </OverlayPortal>
  );
});
DialogSurface.displayName = 'Dialog.Surface';

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent({ size = 'md', className, ...rest }, ref) {
    return (
      <DialogSurface
        ref={ref}
        positionerClassName={dialogPositionerVariants()}
        surfaceClassName={dialogContentVariants({ size, className })}
        {...rest}
      />
    );
  },
);
DialogContent.displayName = 'Dialog.Content';

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogPartProps>(function DialogHeader(
  { asChild = false, className, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  return <Comp ref={ref} className={dialogHeaderVariants({ className })} {...rest} />;
});
DialogHeader.displayName = 'Dialog.Header';

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogPartProps>(
  function DialogTitle({ asChild = false, className, ...rest }, ref) {
    const { titleId, setHasTitle } = useDialogContext('Dialog.Title');

    // Registered rather than assumed, so `aria-labelledby` is only written when
    // there is genuinely a title element to point at.
    React.useEffect(() => {
      setHasTitle(true);
      return () => setHasTitle(false);
    }, [setHasTitle]);

    const Comp = asChild ? Slot : 'h2';
    return <Comp ref={ref} id={titleId} className={dialogTitleVariants({ className })} {...rest} />;
  },
);
DialogTitle.displayName = 'Dialog.Title';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogPartProps>(
  function DialogDescription({ asChild = false, className, ...rest }, ref) {
    const { descriptionId, setHasDescription } = useDialogContext('Dialog.Description');

    React.useEffect(() => {
      setHasDescription(true);
      return () => setHasDescription(false);
    }, [setHasDescription]);

    const Comp = asChild ? Slot : 'p';
    return (
      <Comp
        ref={ref}
        id={descriptionId}
        className={dialogDescriptionVariants({ className })}
        {...rest}
      />
    );
  },
);
DialogDescription.displayName = 'Dialog.Description';

/** The one scrolling region, so the header and footer stay put on a long form. */
export const DialogBody = React.forwardRef<HTMLDivElement, DialogPartProps>(function DialogBody(
  { asChild = false, className, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  return <Comp ref={ref} className={dialogBodyVariants({ className })} {...rest} />;
});
DialogBody.displayName = 'Dialog.Body';

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogPartProps>(function DialogFooter(
  { asChild = false, className, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  return <Comp ref={ref} className={dialogFooterVariants({ className })} {...rest} />;
});
DialogFooter.displayName = 'Dialog.Footer';

export const DialogClose = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogClose({ asChild = false, onClick, ...rest }, ref) {
    const { setOpen } = useDialogContext('Dialog.Close');
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
DialogClose.displayName = 'Dialog.Close';

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
};

export { dialogContentVariants };
