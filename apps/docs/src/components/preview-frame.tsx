'use client';

import { Tabs } from '@noksha-ui/react';
import type * as React from 'react';

import { CopyButton } from './copy-button';

interface PreviewFrameProps {
  title: string;
  description?: string;
  /** Raw source, for the clipboard. The rendered `code` slot is highlighted. */
  source: string;
  preview: React.ReactNode;
  code: React.ReactNode;
  minHeight?: number;
  stack?: boolean;
}

/**
 * The Preview / Code pair every example on the site is shown in.
 *
 * Both slots arrive already rendered on the server — the live demo and the
 * highlighted source — and this component only owns which of the two is
 * visible. That keeps the highlighter and the demo's own code out of the
 * boundary this file creates.
 *
 * It is built from the library's own Tabs. If tab focus or activation ever
 * broke, every page of the documentation would break with it, which is a
 * better regression test than a screenshot.
 */
export function PreviewFrame({
  title,
  description,
  source,
  preview,
  code,
  minHeight = 180,
  stack = false,
}: PreviewFrameProps) {
  const headingId = `demo-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <section className="scroll-mt-24" aria-labelledby={headingId}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={headingId} className="font-semibold text-base text-fg">
          {title}
        </h3>
      </div>

      {description ? <p className="mb-3 max-w-2xl text-fg-muted text-sm">{description}</p> : null}

      <Tabs.Root defaultValue="preview" variant="line" size="sm">
        <div className="flex items-center justify-between gap-2 border-line-subtle border-b">
          <Tabs.List>
            <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
            <Tabs.Trigger value="code">Code</Tabs.Trigger>
          </Tabs.List>
          <CopyButton value={source} label="Copy" />
        </div>

        <Tabs.Content value="preview" className="focus-visible:outline-none">
          <div
            className="noksha-canvas-bg flex items-center justify-center rounded-b-lg border border-line-subtle border-t-0 bg-surface p-8"
            style={{ minHeight }}
          >
            <div
              className={
                stack
                  ? 'flex w-full max-w-md flex-col items-stretch gap-4'
                  : 'flex flex-wrap items-center justify-center gap-3'
              }
            >
              {preview}
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="code" className="focus-visible:outline-none">
          <div className="overflow-hidden rounded-b-lg border border-line-subtle border-t-0 bg-subtle">
            {code}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
