'use client';

import { Badge, Tabs } from '@noksha-ui/react';
import type * as React from 'react';

export interface CodeTabPanel {
  /** Stable id for the tab; also what the choice is remembered as. */
  value: string;
  label: string;
  /** A short qualifier shown beside the label — "recommended", "legacy". */
  note?: string;
  /** One line under the tab strip, before the code. */
  description?: string;
  /** Already highlighted on the server, so no highlighter reaches the browser. */
  node: React.ReactNode;
}

/**
 * One instruction, in whichever version or framework the reader is actually on.
 *
 * Setup docs that stack every variant vertically make the reader do the
 * filtering, and the usual result is that someone on Tailwind v3 copies the v4
 * block because it came first. Tabs put exactly one answer on screen.
 *
 * Every panel is rendered and highlighted on the server and handed in as a
 * node; this component only decides which one is visible.
 */
export function CodeTabs({
  panels,
  label,
}: {
  panels: CodeTabPanel[];
  /** Names the tab strip for screen readers — "Tailwind version", "Framework". */
  label: string;
}) {
  const first = panels[0];
  if (!first) return null;

  return (
    <Tabs.Root defaultValue={first.value} variant="line" size="sm">
      <div className="overflow-x-auto border-line-subtle border-b">
        <Tabs.List aria-label={label}>
          {panels.map((panel) => (
            <Tabs.Trigger key={panel.value} value={panel.value}>
              <span className="flex items-center gap-2">
                {panel.label}
                {panel.note ? (
                  <Badge size="sm" variant="soft" tone="accent">
                    {panel.note}
                  </Badge>
                ) : null}
              </span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      {panels.map((panel) => (
        <Tabs.Content key={panel.value} value={panel.value} className="focus-visible:outline-none">
          {panel.description ? (
            <p className="pt-3 text-fg-muted text-sm">{panel.description}</p>
          ) : null}
          <div className="mt-3">{panel.node}</div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
