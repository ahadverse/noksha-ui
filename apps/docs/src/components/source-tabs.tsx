'use client';

import { Tabs } from '@noksha-ui/react';
import type * as React from 'react';

export interface SourcePanel {
  path: string;
  node: React.ReactNode;
}

/**
 * The file switcher over a component's own source.
 *
 * Each panel is already rendered and highlighted on the server; this only
 * decides which one is on screen, so opening a component page does not ship a
 * highlighter or four copies of a file to the browser.
 */
export function SourceTabs({ panels }: { panels: SourcePanel[] }) {
  const first = panels[0];
  if (!first) return null;

  return (
    <Tabs.Root defaultValue={first.path} variant="line" size="sm">
      <div className="overflow-x-auto border-line-subtle border-b">
        <Tabs.List>
          {panels.map((panel) => (
            <Tabs.Trigger key={panel.path} value={panel.path} className="font-mono text-xs">
              {panel.path.split('/').pop()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      {panels.map((panel) => (
        <Tabs.Content key={panel.path} value={panel.path} className="focus-visible:outline-none">
          <div className="overflow-hidden rounded-b-lg border border-line-subtle border-t-0 bg-subtle">
            {panel.node}
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
