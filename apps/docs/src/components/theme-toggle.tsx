'use client';

import type { ThemeMode } from '@prism-ui/react';
import { Button, Tooltip, useTheme } from '@prism-ui/react';
import * as React from 'react';

import { MonitorIcon, MoonIcon, SunIcon } from './icons';

const MODES: Record<ThemeMode, { label: string; Icon: typeof SunIcon; next: ThemeMode }> = {
  light: { label: 'Light', Icon: SunIcon, next: 'dark' },
  dark: { label: 'Dark', Icon: MoonIcon, next: 'system' },
  system: { label: 'System', Icon: MonitorIcon, next: 'light' },
};

/**
 * Cycles light → dark → system.
 *
 * The icon renders as `system` until the component has mounted: the server has
 * no way to know what the browser resolved `system` to, and rendering a guess
 * would produce a hydration mismatch on exactly half of all visits.
 */
export function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = MODES[mode];
  const next = MODES[current.next];

  const Icon = mounted ? current.Icon : MonitorIcon;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          iconOnly
          variant="ghost"
          tone="neutral"
          size="sm"
          icon={<Icon />}
          onClick={() => setMode(current.next)}
          aria-label={`Theme: ${current.label}. Switch to ${next.label}.`}
        />
      </Tooltip.Trigger>
      <Tooltip.Content>Theme: {current.label}</Tooltip.Content>
    </Tooltip.Root>
  );
}
