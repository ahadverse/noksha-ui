'use client';

import { Portal, type PortalProps, useIsomorphicLayoutEffect } from '@noksha-ui/core';
import * as React from 'react';

type Mode = 'dark' | 'light';

/** Reads the mode an element declares, if it declares one at all. */
function modeOf(element: Element): Mode | null {
  if (element.classList.contains('dark')) return 'dark';
  if (element.classList.contains('light')) return 'light';
  const attribute = element.getAttribute('data-theme');
  return attribute === 'dark' || attribute === 'light' ? attribute : null;
}

/**
 * The nearest ancestor that declares a mode, stopping short of `<html>`.
 *
 * `<html>` is deliberately excluded: a portal lands in `<body>`, so a mode
 * declared at the root already reaches it through the ordinary cascade and
 * mirroring it would be noise.
 */
function scopeHostOf(from: Element | null): Element | null {
  for (let node = from; node && node !== document.documentElement; node = node.parentElement) {
    if (modeOf(node)) return node;
  }
  return null;
}

/**
 * A portal that carries the theme out with it.
 *
 * Every overlay in the library renders into `document.body`, which is the only
 * way to escape a clipping or stacking ancestor. The cost is that it also
 * escapes any theme declared below `<html>` — and an app that puts `dark` on a
 * wrapper, a layout shell or `<body>` is a normal app, not a broken one. Its
 * page turns dark and its drawers and tooltips stay stubbornly light, because
 * the tokens they inherit come from `:root`.
 *
 * So the mode is read from where the overlay *logically* sits — a hidden marker
 * left behind in the tree — and mirrored onto the portalled subtree. The
 * mirror is a `display: contents` wrapper: it inherits and passes on the custom
 * properties, which is the entire job, while generating no box of its own, so
 * nothing about positioning, stacking or layout changes.
 *
 * The read happens in a layout effect, before paint, so there is no light frame
 * to see. A `MutationObserver` on the host keeps it honest afterwards — toggling
 * the theme while a drawer is open repaints the drawer too.
 */
export function OverlayPortal({ container, children }: PortalProps) {
  const marker = React.useRef<HTMLSpanElement>(null);
  const [mode, setMode] = React.useState<Mode | null>(null);

  useIsomorphicLayoutEffect(() => {
    const host = scopeHostOf(marker.current);
    if (!host) {
      setMode(null);
      return;
    }

    const read = () => setMode(modeOf(host));
    read();

    const observer = new MutationObserver(read);
    observer.observe(host, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Left in the tree on purpose: it is the only record of where the
          overlay belongs once its content has moved to <body>. */}
      <span ref={marker} hidden aria-hidden="true" />
      <Portal container={container}>
        {/* Rendered unconditionally, even with no mode to mirror — swapping the
            wrapper in later would remount the overlay mid-animation. */}
        <div className={mode ?? undefined} data-theme={mode ?? undefined} style={CONTENTS}>
          {children}
        </div>
      </Portal>
    </>
  );
}
OverlayPortal.displayName = 'OverlayPortal';

const CONTENTS: React.CSSProperties = { display: 'contents' };
