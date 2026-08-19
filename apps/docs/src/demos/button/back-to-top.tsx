'use client';

import { ScrollToTop } from '@noksha-ui/react';
import * as React from 'react';

export default function ButtonBackToTop() {
  const panel = React.useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div
          ref={panel}
          className="h-72 overflow-y-auto rounded-xl border border-line-subtle bg-surface"
        >
          <div className="flex flex-col gap-4 p-5">
            <div>
              <p className="font-semibold text-fg text-sm">1. Scroll this panel</p>
              <p className="mt-1 text-fg-muted text-sm">
                It watches this panel rather than the window, because it was handed a ref to it.
                Past 160px it fades in; click it and the panel scrolls smoothly back.
              </p>
            </div>

            <div>
              <p className="font-semibold text-fg text-sm">2. Keep going</p>
              <p className="mt-1 text-fg-muted text-sm">
                It watches this panel rather than the window, because it was handed a ref to it.
                Past 160px it fades in; click it and the panel scrolls smoothly back.
              </p>
            </div>

            <div>
              <p className="font-semibold text-fg text-sm">3. Almost there</p>
              <p className="mt-1 text-fg-muted text-sm">
                It watches this panel rather than the window, because it was handed a ref to it.
                Past 160px it fades in; click it and the panel scrolls smoothly back.
              </p>
            </div>

            <div>
              <p className="font-semibold text-fg text-sm">4. Past the threshold</p>
              <p className="mt-1 text-fg-muted text-sm">
                It watches this panel rather than the window, because it was handed a ref to it.
                Past 160px it fades in; click it and the panel scrolls smoothly back.
              </p>
            </div>

            <div>
              <p className="font-semibold text-fg text-sm">5. The button is up now</p>
              <p className="mt-1 text-fg-muted text-sm">
                It watches this panel rather than the window, because it was handed a ref to it.
                Past 160px it fades in; click it and the panel scrolls smoothly back.
              </p>
            </div>

            <div>
              <p className="font-semibold text-fg text-sm">6. Still scrolling</p>
              <p className="mt-1 text-fg-muted text-sm">
                It watches this panel rather than the window, because it was handed a ref to it.
                Past 160px it fades in; click it and the panel scrolls smoothly back.
              </p>
            </div>

            <div>
              <p className="font-semibold text-fg text-sm">7. Nearly the end</p>
              <p className="mt-1 text-fg-muted text-sm">
                It watches this panel rather than the window, because it was handed a ref to it.
                Past 160px it fades in; click it and the panel scrolls smoothly back.
              </p>
            </div>

            <div>
              <p className="font-semibold text-fg text-sm">8. The end</p>
              <p className="mt-1 text-fg-muted text-sm">
                It watches this panel rather than the window, because it was handed a ref to it.
                Past 160px it fades in; click it and the panel scrolls smoothly back.
              </p>
            </div>
          </div>
        </div>

        <ScrollToTop container={panel} showAfter={160} size="md" offset={16} />
      </div>

      <p className="mt-3 text-fg-muted text-xs">
        The button is a sibling of the scrolling panel, not a child of it — an absolutely positioned
        child would scroll away with the content. Give it no container and it watches the window
        instead, which is the usual full-page back-to-top.
      </p>
    </div>
  );
}
