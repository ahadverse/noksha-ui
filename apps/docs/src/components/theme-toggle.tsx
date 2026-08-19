'use client';

import { Tooltip, useTheme } from '@noksha-ui/react';
import * as React from 'react';

import { MoonIcon, SunIcon } from './icons';

const MODES = [
  { mode: 'light', label: 'Light', Icon: SunIcon },
  { mode: 'dark', label: 'Dark', Icon: MoonIcon },
] as const;

/**
 * The theme control in the site header.
 *
 * Selection follows `resolvedTheme`, not `mode`. The provider still starts in
 * `system`, which is not one of these two buttons — reading the resolved value
 * marks whichever the OS actually produced instead of leaving both unmarked.
 *
 * Nothing is marked until after mount: the mode comes from `localStorage`,
 * which does not exist during the render that produced the HTML, so painting a
 * selection on the first pass would tear on hydration.
 */
export function ThemeToggle() {
  const { resolvedTheme, setMode } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const selected = MODES.findIndex((option) => option.mode === resolvedTheme);

  return (
    <fieldset className="relative flex min-w-0 items-center rounded-full border border-line-subtle bg-subtle p-0.5">
      <legend className="sr-only">Colour theme</legend>

      {mounted && selected >= 0 ? (
        <span
          aria-hidden="true"
          className="absolute top-0.5 left-0.5 size-7 rounded-full bg-surface shadow-(--noksha-shadow-xs) transition-transform duration-(--noksha-duration-fast) ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(${selected * 100}%)` }}
        />
      ) : null}

      {MODES.map(({ mode: value, label, Icon }) => {
        const active = mounted && resolvedTheme === value;

        return (
          <Tooltip.Root key={value}>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                aria-pressed={active}
                aria-label={`${label} theme`}
                onClick={() => setMode(value)}
                className={`relative z-10 flex size-7 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2 ${
                  active ? 'text-fg' : 'text-fg-subtle hover:text-fg'
                }`}
              >
                <Icon className="size-4" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>{label}</Tooltip.Content>
          </Tooltip.Root>
        );
      })}
    </fieldset>
  );
}
