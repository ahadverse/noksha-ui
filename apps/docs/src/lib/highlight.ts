import { type BundledLanguage, createHighlighter, type Highlighter } from 'shiki';

/**
 * Syntax highlighting, done once on the server.
 *
 * Shipping a highlighter to the browser to re-colour code that never changes
 * would be roughly the size of the whole component library. Pages are static,
 * so the HTML arrives already coloured and the client bundle stays free of it.
 */

/**
 * Loaded up front, because Shiki throws on an unregistered language rather than
 * falling back to plain text — a page using an unlisted one 500s at render.
 */
const LANGS: BundledLanguage[] = ['tsx', 'ts', 'jsx', 'js', 'bash', 'json', 'css', 'html'];

/**
 * Both themes are baked into the same markup as CSS variables (`--shiki-light`
 * / `--shiki-dark`) and picked between in CSS — otherwise the theme toggle
 * would need a second copy of every code block.
 */
const THEMES = { light: 'github-light', dark: 'github-dark-dimmed' };

let highlighterPromise: Promise<Highlighter> | undefined;

function getHighlighter(): Promise<Highlighter> {
  // A module-level singleton: `next build` renders every page in one process,
  // and starting a WASM highlighter per code block would dominate build time.
  highlighterPromise ??= createHighlighter({
    themes: Object.values(THEMES),
    langs: LANGS,
  });
  return highlighterPromise;
}

export async function highlight(code: string, lang: BundledLanguage = 'tsx'): Promise<string> {
  const highlighter = await getHighlighter();

  // A code block is never worth failing a page over: an unregistered language
  // degrades to unhighlighted text, which is still readable and still copyable.
  const resolved = LANGS.includes(lang) ? lang : ('text' as BundledLanguage);

  return highlighter.codeToHtml(code.trim(), {
    lang: resolved,
    themes: THEMES,
    defaultColor: false,
    colorReplacements: { 'github-dark-dimmed': { '#22272e': 'transparent' } },
  });
}
