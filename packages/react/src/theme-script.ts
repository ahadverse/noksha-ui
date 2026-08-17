/**
 * The one entry with no `"use client"` directive.
 *
 * `themeScript` returns a string that has to be inlined into `<head>` during the
 * server render — before React exists at all. Shipping it from the client barrel
 * would turn it into a client reference the server cannot call, so it gets its
 * own directive-free entry (ARCHITECTURE.md §3.4, §7).
 *
 * ```tsx
 * import { themeScript } from '@noksha-ui/react/theme-script';
 *
 * <head>
 *   <script dangerouslySetInnerHTML={{ __html: themeScript() }} />
 * </head>
 * ```
 */
export {
  DEFAULT_STORAGE_KEY,
  type ResolvedTheme,
  type ThemeMode,
  type ThemeScriptOptions,
  themeScript,
} from './theme/theme-script.js';
