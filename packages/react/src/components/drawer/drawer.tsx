import * as React from 'react';
import {
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '../dialog/dialog.js';
import type { DrawerContentProps } from './drawer.types.js';
import { drawerContentVariants } from './drawer.variants.js';

/**
 * A panel that slides in from an edge of the screen.
 *
 * ```tsx
 * <Drawer.Root>
 *   <Drawer.Trigger asChild><Button>Filters</Button></Drawer.Trigger>
 *   <Drawer.Content side="right" size="lg">
 *     <Drawer.Header><Drawer.Title>Filters</Drawer.Title></Drawer.Header>
 *     <Drawer.Body>…</Drawer.Body>
 *   </Drawer.Content>
 * </Drawer.Root>
 * ```
 *
 * It is a Dialog wearing a different surface, and it says so: the trap, the
 * scroll lock, the dismiss stack and the labelling all come from the same
 * implementation, so the two can never drift apart in behaviour — only in looks.
 */
export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent({ side = 'right', size = 'md', className, ...rest }, ref) {
    return (
      <DialogSurface
        ref={ref}
        // The panel positions itself against its edge, so there is nothing for
        // a centring layer to do — `display: contents` keeps it out of the way.
        positionerClassName="contents"
        surfaceClassName={drawerContentVariants({ side, size, className })}
        {...rest}
      />
    );
  },
);
DrawerContent.displayName = 'Drawer.Content';

/**
 * Flat aliases for the parts Drawer borrows from Dialog.
 *
 * A React Server Component cannot reach through the `Drawer` namespace below —
 * a `"use client"` module's exports arrive as opaque client references, and
 * `Drawer.Root` on one of those is `undefined`, not a component. Every other
 * compound component in the library already ships this flat form; without it,
 * Drawer would be the one component unusable from a server file.
 */
export {
  DialogBody as DrawerBody,
  DialogClose as DrawerClose,
  DialogDescription as DrawerDescription,
  DialogFooter as DrawerFooter,
  DialogHeader as DrawerHeader,
  DialogRoot as DrawerRoot,
  DialogTitle as DrawerTitle,
  DialogTrigger as DrawerTrigger,
} from '../dialog/dialog.js';

/** The namespace form, for client components. */
export const Drawer = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DrawerContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
};

export { drawerContentVariants };
