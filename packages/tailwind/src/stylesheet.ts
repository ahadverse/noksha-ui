import { type BuildThemeOptions, DEFAULT_BRAND, emitThemeCss } from '@noksha-ui/tokens';
import { emitTailwindTheme } from './theme.js';
import { emitToneLayer } from './tone.js';

const DEFAULT_BANNER = `/*!
 * Noksha UI — generated stylesheet. Do not edit.
 *
 * Usage (Tailwind v4):
 *   @import 'tailwindcss';
 *   @import '@noksha-ui/react/styles.css';
 */`;

/**
 * One enter/exit pair — `animate-noksha-in` and `animate-noksha-out` — for every
 * overlay in the library.
 *
 * The direction and the scale are read from variables rather than baked in, so
 * a tooltip that flipped from `top` to `bottom` animates the right way with a
 * single class and no per-side keyframes. Components set `--noksha-enter-y` and
 * friends from their resolved `data-side`.
 *
 * Because both durations come from the motion scale, `prefers-reduced-motion`
 * zeroes them from the token layer — and `usePresence` sees a zero-length
 * animation and unmounts immediately instead of waiting on an event that will
 * never arrive.
 */
const MOTION = `@keyframes noksha-in {
  from {
    opacity: 0;
    transform: translate3d(var(--noksha-enter-x, 0), var(--noksha-enter-y, 0), 0)
      scale(var(--noksha-enter-scale, 1));
  }
}

@keyframes noksha-out {
  to {
    opacity: 0;
    transform: translate3d(var(--noksha-exit-x, 0), var(--noksha-exit-y, 0), 0)
      scale(var(--noksha-exit-scale, 1));
  }
}

/* Collapse animates \`grid-template-rows\` between 0fr and 1fr, which resolves to
   the content's own height — so nothing has to be measured in JavaScript, and
   the animation stays correct when the content reflows or an image loads. The
   inner wrapper owns \`overflow: hidden\`, which is what makes the 0fr row clip. */
@keyframes noksha-collapse-in {
  from { grid-template-rows: 0fr; opacity: 0; }
  to { grid-template-rows: 1fr; opacity: 1; }
}

@keyframes noksha-collapse-out {
  from { grid-template-rows: 1fr; opacity: 1; }
  to { grid-template-rows: 0fr; opacity: 0; }
}

/* Registered as animations rather than as bespoke utilities, so the class is
   \`animate-noksha-in\` on Tailwind v4 and on the v3 preset alike. */
@theme {
  --animate-noksha-in: noksha-in var(--noksha-duration-normal) var(--noksha-ease-out);
  --animate-noksha-out: noksha-out var(--noksha-duration-fast) var(--noksha-ease-in) forwards;
  --animate-noksha-collapse-in: noksha-collapse-in var(--noksha-duration-normal) var(--noksha-ease-out);
  --animate-noksha-collapse-out: noksha-collapse-out var(--noksha-duration-fast) var(--noksha-ease-in) forwards;
}`;

const BASE = `@layer base {
  html {
    -webkit-text-size-adjust: 100%;
    font-family: var(--noksha-font-sans);
  }

  body {
    background-color: var(--noksha-bg-canvas);
    color: var(--noksha-fg-default);
    font-size: var(--noksha-text-md);
    line-height: var(--noksha-leading-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Native controls, scrollbars and the browser canvas follow the theme. */
  :root { color-scheme: light; }
  :root.dark, [data-theme='dark'] { color-scheme: dark; }

  @media (prefers-color-scheme: dark) {
    :root:not(.light):not([data-theme='light']) { color-scheme: dark; }
  }

  ::selection {
    background-color: var(--noksha-accent-subtle);
    color: var(--noksha-accent-fg);
  }
}`;

export interface StylesheetOptions extends Partial<BuildThemeOptions> {
  /** Header comment. Defaults to the one on the published package stylesheet. */
  banner?: string;
  /**
   * Paths to register with Tailwind v4's class scanner.
   *
   * The published package passes `['./']` because Tailwind skips `node_modules`
   * and would otherwise generate none of the utilities the compiled components
   * use. A consumer who owns the source instead points this at their own
   * component directory.
   */
  sources?: string[];
}

/**
 * The complete Noksha stylesheet for one brand: tokens, the Tailwind theme
 * mapping, the animation keyframes, the tone rules and the base layer.
 *
 * Two callers share this, and the whole reason it is a function is that neither
 * may drift from the other: `@noksha-ui/react`'s build bakes it into
 * `dist/styles.css` for the package path, and `@noksha-ui/cli init` writes it
 * into the consumer's own tree for the ownership path. A brand seed is the only
 * thing that changes between them — everything after the token block is
 * expressed against semantic variables and is identical for every theme.
 */
export function emitStylesheet(options: StylesheetOptions = {}): string {
  const { banner = DEFAULT_BANNER, sources = [], brand = DEFAULT_BRAND, ...seeds } = options;

  const sourceDirectives = sources.map((path) => `@source "${path}";`).join('\n');

  return [
    banner,
    '',
    ...(sourceDirectives ? [sourceDirectives, ''] : []),
    emitThemeCss({ ...seeds, brand }),
    emitTailwindTheme(),
    '',
    MOTION,
    '',
    emitToneLayer(),
    '',
    BASE,
    '',
  ].join('\n');
}
