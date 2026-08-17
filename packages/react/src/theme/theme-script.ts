export const DEFAULT_STORAGE_KEY = 'noksha-theme';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeScriptOptions {
  storageKey?: string;
  /** Mode to use when nothing is stored. */
  defaultMode?: ThemeMode;
}

/**
 * A self-contained script to run in `<head>` before first paint.
 *
 * This is what makes dark mode flash-free: it reads `localStorage` and
 * `matchMedia` and stamps the class on `<html>` synchronously, so the very
 * first paint is already correct. React never enters into it — by the time
 * hydration runs, the page has been the right color for hundreds of ms.
 *
 * ```tsx
 * <head>
 *   <script dangerouslySetInnerHTML={{ __html: themeScript() }} />
 * </head>
 * ```
 *
 * It also sets `color-scheme`, so native form controls, scrollbars and the
 * browser's own canvas match the theme instead of staying stubbornly light.
 */
export function themeScript(options: ThemeScriptOptions = {}): string {
  const { storageKey = DEFAULT_STORAGE_KEY, defaultMode = 'system' } = options;

  // Written as one compact IIFE and wrapped in try/catch: localStorage throws
  // in Safari private mode, and a throw here would block the whole document.
  return `(function(){try{var e=document.documentElement,m=localStorage.getItem(${JSON.stringify(
    storageKey,
  )})||${JSON.stringify(defaultMode)},r=m==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):m;e.classList.remove("light","dark");e.classList.add(r);e.setAttribute("data-theme",r);e.style.colorScheme=r}catch(t){}})()`;
}
