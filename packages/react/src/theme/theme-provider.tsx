'use client';

import * as React from 'react';
import { DEFAULT_STORAGE_KEY, type ResolvedTheme, type ThemeMode } from './theme-script.js';

export interface ThemeContextValue {
  /** What the user chose: `light`, `dark`, or `system`. */
  mode: ThemeMode;
  /** What that resolves to right now. */
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  /** Flips between light and dark, resolving `system` first. */
  toggle: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children?: React.ReactNode;
  storageKey?: string;
  defaultMode?: ThemeMode;
  /** Skip writing to localStorage — for embeds and previews. */
  disableStorage?: boolean;
}

function systemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(resolved: ResolvedTheme): void {
  const el = document.documentElement;
  el.classList.remove('light', 'dark');
  el.classList.add(resolved);
  el.setAttribute('data-theme', resolved);
  el.style.colorScheme = resolved;
}

/**
 * Handles toggling and cross-tab sync. It does **not** own the initial paint —
 * `themeScript` does that before React exists, which is the whole point of the
 * split (ARCHITECTURE.md §3.4). Theming itself needs no provider at all; this
 * exists only for the toggle.
 */
export function ThemeProvider({
  children,
  storageKey = DEFAULT_STORAGE_KEY,
  defaultMode = 'system',
  disableStorage = false,
}: ThemeProviderProps) {
  const [mode, setModeState] = React.useState<ThemeMode>(() => {
    if (typeof window === 'undefined' || disableStorage) return defaultMode;
    try {
      return (localStorage.getItem(storageKey) as ThemeMode | null) ?? defaultMode;
    } catch {
      return defaultMode;
    }
  });

  const [systemPreference, setSystemPreference] = React.useState<ResolvedTheme>(systemTheme);
  const resolvedTheme: ResolvedTheme = mode === 'system' ? systemPreference : mode;

  // Track the OS preference so `system` stays live rather than only being read once.
  React.useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setSystemPreference(query.matches ? 'dark' : 'light');

    onChange();
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  React.useEffect(() => {
    apply(resolvedTheme);
  }, [resolvedTheme]);

  // Cross-tab sync: `storage` fires in every *other* tab, so a toggle in one
  // window moves the rest without a reload.
  React.useEffect(() => {
    if (disableStorage) return;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      setModeState((event.newValue as ThemeMode | null) ?? defaultMode);
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [storageKey, defaultMode, disableStorage]);

  const setMode = React.useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      if (disableStorage) return;
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        // Private mode — the toggle still works for this session.
      }
    },
    [storageKey, disableStorage],
  );

  const toggle = React.useCallback(() => {
    setMode(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setMode]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ mode, resolvedTheme, setMode, toggle }),
    [mode, resolvedTheme, setMode, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.displayName = 'ThemeProvider';

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('[@prism-ui/react] useTheme() must be used inside a <ThemeProvider>.');
  }
  return context;
}
