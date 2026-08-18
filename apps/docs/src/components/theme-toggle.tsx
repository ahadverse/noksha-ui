'use client';

import type { ThemeMode } from '@noksha-ui/react';
import { Tooltip, useTheme } from '@noksha-ui/react';
import * as React from 'react';

import { MonitorIcon, MoonIcon, SunIcon } from './icons';

const MODES: { mode: ThemeMode; label: string; Icon: typeof SunIcon }[] = [
  { mode: 'light', label: 'Light', Icon: SunIcon },
  { mode: 'dark', label: 'Dark', Icon: MoonIcon },
  { mode: 'system', label: 'System', Icon: MonitorIcon },
];

/**
 * The theme control in the site header.
 *
 * A segmented group rather than a button that cycles: cycling hides the current
 * mode behind an icon that has to stand for three states, and reaching `system`
 * from `light` costs two clicks and a guess. Here all three are visible, the
 * selected one is marked, and any of them is one click away.
 *
 * Nothing is marked selected until after mount. The server cannot know what the
 * browser resolved — the mode is read from `localStorage`, which does not exist
 * during the render that produced the HTML — so painting a selection on the
 * first pass would tear on hydration for every visitor who is not on the
 * default. `mounted` is what keeps the first paint honest.
 *
 * `aria-pressed` on three buttons rather than a radiogroup: a radiogroup owes
 * the user arrow-key navigation and a roving tabindex, and a toolbar of toggles
 * is the pattern this actually is.
 */
export function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const selected = MODES.findIndex((option) => option.mode === mode);

  return (
    <fieldset className="relative flex min-w-0 items-center rounded-full border border-line-subtle bg-subtle p-0.5">
      <legend className="sr-only">Colour theme</legend>

      {/* The moving pill. Rendered only once the selection is known, so it does
          not slide in from the wrong segment on the first frame. */}
      {mounted && selected >= 0 ? (
        <span
          aria-hidden="true"
          className="absolute top-0.5 left-0.5 size-7 rounded-full bg-surface shadow-(--noksha-shadow-xs) transition-transform duration-(--noksha-duration-fast) ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(${selected * 100}%)` }}
        />
      ) : null}

      {MODES.map(({ mode: value, label, Icon }) => {
        const active = mounted && mode === value;

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
