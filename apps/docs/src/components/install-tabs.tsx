'use client';

import { Tabs } from '@noksha-ui/react';
import * as React from 'react';

import { CopyButton } from './copy-button';

export interface InstallVariant {
  manager: string;
  command: string;
  /** Highlighted on the server, so no highlighter reaches the browser. */
  html: string;
}

const STORAGE_KEY = 'noksha-package-manager';

/**
 * The install command, in whichever package manager the reader actually uses.
 *
 * The choice is remembered across pages and across visits. Someone reading the
 * docs front to back should state their package manager once, not re-pick npm
 * on the introduction, the installation page and every component page they open.
 */
export function InstallTabs({ variants }: { variants: InstallVariant[] }) {
  const first = variants[0];

  /**
   * Starts on the server-rendered default and moves to the stored choice after
   * mount. Reading `localStorage` during render would not match the HTML the
   * server sent, and hydration would tear.
   */
  const [manager, setManager] = React.useState(first?.manager ?? '');

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null && variants.some((variant) => variant.manager === stored)) {
      setManager(stored);
    }
  }, [variants]);

  const choose = React.useCallback((value: string) => {
    setManager(value);
    // A quota error here is not worth breaking the tab switch over.
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {}
  }, []);

  if (!first) return null;

  return (
    <Tabs.Root value={manager} onValueChange={choose} variant="line" size="sm">
      <div className="overflow-hidden rounded-lg border border-line-subtle bg-subtle">
        <div className="flex items-center justify-between gap-2 border-line-subtle border-b pr-2">
          <div className="overflow-x-auto">
            <Tabs.List>
              {variants.map((variant) => (
                <Tabs.Trigger
                  key={variant.manager}
                  value={variant.manager}
                  className="font-mono text-xs"
                >
                  {variant.manager}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>

          <CopyButton
            value={
              variants.find((variant) => variant.manager === manager)?.command ?? first.command
            }
          />
        </div>

        {variants.map((variant) => (
          <Tabs.Content
            key={variant.manager}
            value={variant.manager}
            className="focus-visible:outline-none"
          >
            <div
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output, built from a command string we own.
              dangerouslySetInnerHTML={{ __html: variant.html }}
              className="overflow-x-auto px-4 py-3 font-mono text-sm [&_pre]:!bg-transparent"
            />
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
