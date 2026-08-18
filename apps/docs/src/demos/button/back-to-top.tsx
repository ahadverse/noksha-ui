'use client';

import { ScrollToTop } from '@noksha-ui/react';
import * as React from 'react';

const SECTIONS = [
  'Scroll this panel',
  'Keep going',
  'Almost there',
  'Past the threshold',
  'The button is up now',
  'Still scrolling',
  'Nearly the end',
  'The end',
];

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
            {SECTIONS.map((title, index) => (
              <div key={title}>
                <p className="font-semibold text-fg text-sm">
                  {index + 1}. {title}
                </p>
                <p className="mt-1 text-fg-muted text-sm">
                  It watches this panel rather than the window, because it was handed a ref to it.
                  Past 160px it fades in; click it and the panel scrolls smoothly back.
                </p>
              </div>
            ))}
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
