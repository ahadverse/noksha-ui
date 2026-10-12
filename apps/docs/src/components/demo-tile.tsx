'use client';

import { cx } from '@noksha-ui/core';
import * as React from 'react';

import { toJsx } from '@/lib/to-jsx';
import { CopyButton } from './copy-button';

const SnippetContext = React.createContext<Record<string, string>>({});

export function DemoSnippets({
  snippets,
  children,
}: {
  snippets: Record<string, string>;
  children: React.ReactNode;
}) {
  return <SnippetContext.Provider value={snippets}>{children}</SnippetContext.Provider>;
}

interface DemoTileProps {
  label: string;
  code?: string;
  className?: string;
  children: React.ReactNode;
}

export function DemoTile({ label, code, className, children }: DemoTileProps) {
  const snippets = React.useContext(SnippetContext);

  return (
    <figure className="m-0 flex min-w-0 flex-col rounded-xl border border-line-subtle bg-surface shadow-xs">
      <figcaption className="flex items-center justify-between gap-2 rounded-t-xl border-line-subtle border-b bg-subtle/60 py-1 ps-4 pe-1.5">
        <span className="truncate font-medium text-fg-muted text-xs uppercase tracking-wide">
          {label}
        </span>
        <CopyButton
          value={code ?? snippets[label] ?? toJsx(children)}
          aria-label={`Copy ${label}`}
        />
      </figcaption>
      <div
        className={cx(
          'flex min-h-32 flex-1 flex-col items-stretch justify-center gap-6 px-6 pt-12 pb-8',
          className,
        )}
      >
        {children}
      </div>
    </figure>
  );
}
