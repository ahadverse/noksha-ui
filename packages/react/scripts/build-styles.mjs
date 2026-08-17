/**
 * Generates `dist/styles.css` — the single stylesheet a consumer imports.
 *
 * It is produced from the token engine rather than hand-maintained, so the
 * shipped CSS can never drift from what `buildTheme()` computes.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { emitTailwindTheme } from '@prism-ui/tailwind';
import { DEFAULT_BRAND, emitThemeCss } from '@prism-ui/tokens';

import { TONE_NAMES, TONE_PREFIXES, TONE_SLOTS, toneSlotValue } from '../tone-prefixes.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const banner = `/*!
 * Prism UI — generated stylesheet. Do not edit.
 *
 * Usage (Tailwind v4):
 *   @import 'tailwindcss';
 *   @import '@prism-ui/react/styles.css';
 */`;

/**
 * Tailwind v4 skips node_modules when scanning for classes, so a consumer would
 * otherwise get unstyled components. Registering the dist folder here means the
 * consumer does not have to know about it.
 */
const source = `@source "./";`;

/**
 * One enter/exit pair — `animate-prism-in` and `animate-prism-out` — for every
 * overlay in the library.
 *
 * The direction and the scale are read from variables rather than baked in, so
 * a tooltip that flipped from `top` to `bottom` animates the right way with a
 * single class and no per-side keyframes. Components set `--prism-enter-y` and
 * friends from their resolved `data-side`.
 *
 * Because both durations come from the motion scale, `prefers-reduced-motion`
 * zeroes them from the token layer — and `usePresence` sees a zero-length
 * animation and unmounts immediately instead of waiting on an event that will
 * never arrive.
 */
const motion = `@keyframes prism-in {
  from {
    opacity: 0;
    transform: translate3d(var(--prism-enter-x, 0), var(--prism-enter-y, 0), 0)
      scale(var(--prism-enter-scale, 1));
  }
}

@keyframes prism-out {
  to {
    opacity: 0;
    transform: translate3d(var(--prism-exit-x, 0), var(--prism-exit-y, 0), 0)
      scale(var(--prism-exit-scale, 1));
  }
}

/* Collapse animates \`grid-template-rows\` between 0fr and 1fr, which resolves to
   the content's own height — so nothing has to be measured in JavaScript, and
   the animation stays correct when the content reflows or an image loads. The
   inner wrapper owns \`overflow: hidden\`, which is what makes the 0fr row clip. */
@keyframes prism-collapse-in {
  from { grid-template-rows: 0fr; opacity: 0; }
  to { grid-template-rows: 1fr; opacity: 1; }
}

@keyframes prism-collapse-out {
  from { grid-template-rows: 1fr; opacity: 1; }
  to { grid-template-rows: 0fr; opacity: 0; }
}

/* Registered as animations rather than as bespoke utilities, so the class is
   \`animate-prism-in\` on Tailwind v4 and on the v3 preset alike. */
@theme {
  --animate-prism-in: prism-in var(--prism-duration-normal) var(--prism-ease-out);
  --animate-prism-out: prism-out var(--prism-duration-fast) var(--prism-ease-in) forwards;
  --animate-prism-collapse-in: prism-collapse-in var(--prism-duration-normal) var(--prism-ease-out);
  --animate-prism-collapse-out: prism-collapse-out var(--prism-duration-fast) var(--prism-ease-in) forwards;
}`;

/**
 * The `tone` prop's seven slots, one rule per component namespace × tone.
 *
 * These are emitted rather than left to Tailwind because the class names are
 * built from a prefix and a tone at runtime, and Tailwind only generates
 * utilities it can find as literal strings in source. Written as utilities they
 * silently produced nothing, and every toned component rendered transparent.
 * See `src/internal/tone.ts`.
 *
 * They go in the `components` layer so a caller's own `bg-*` utility still
 * wins — the layer order is what keeps rule 3 ("className always wins") true
 * here without an `!important`.
 */
const tones = `@layer components {
${TONE_PREFIXES.flatMap((prefix) =>
  TONE_NAMES.map((tone) => {
    const declarations = TONE_SLOTS.map(
      (slot) => `    --${prefix}-${slot}: ${toneSlotValue(tone, slot)};`,
    ).join('\n');

    return `  .prism-tone-${prefix}-${tone} {\n${declarations}\n  }`;
  }),
).join('\n\n')}
}`;

const base = `@layer base {
  html {
    -webkit-text-size-adjust: 100%;
    font-family: var(--prism-font-sans);
  }

  body {
    background-color: var(--prism-bg-canvas);
    color: var(--prism-fg-default);
    font-size: var(--prism-text-md);
    line-height: var(--prism-leading-normal);
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
    background-color: var(--prism-accent-subtle);
    color: var(--prism-accent-fg);
  }
}`;

const css = [
  banner,
  '',
  source,
  '',
  emitThemeCss({ brand: DEFAULT_BRAND }),
  emitTailwindTheme(),
  '',
  motion,
  '',
  tones,
  '',
  base,
  '',
].join('\n');

await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(join(root, 'dist', 'styles.css'), css, 'utf8');

console.log(`[@prism-ui/react] wrote dist/styles.css (${(css.length / 1024).toFixed(1)} kB)`);
