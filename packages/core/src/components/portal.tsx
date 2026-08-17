import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useIsomorphicLayoutEffect } from '../hooks/use-isomorphic-layout-effect.js';

export interface PortalProps {
  children?: React.ReactNode;
  /**
   * Where to render. Defaults to `document.body`.
   *
   * Passing a container is how a dialog inside a shadow root, an iframe, or a
   * `dialog`-based full-screen element keeps its overlays in the right tree.
   */
  container?: Element | DocumentFragment | null;
}

/**
 * Renders its children into another part of the DOM, safely on the server.
 *
 * The mount flag matters: `document` does not exist during SSR, and reading it
 * during the first client render would make the markup disagree with the
 * server's. Rendering `null` on both passes and portalling on the layout effect
 * keeps hydration clean — the overlay appears in the same frame, before paint.
 */
export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = React.useState(false);

  useIsomorphicLayoutEffect(() => setMounted(true), []);

  // `undefined` means "no preference, use body"; an explicit `null` means the
  // caller's container ref has not resolved yet. Collapsing the two would flash
  // the overlay at the end of <body> for a frame before it moves.
  const target = container !== undefined ? container : mounted ? globalThis.document?.body : null;
  if (!target) return null;

  return ReactDOM.createPortal(children, target);
}

Portal.displayName = 'Portal';
