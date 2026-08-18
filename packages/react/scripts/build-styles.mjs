/**
 * Generates `dist/styles.css` — the single stylesheet a consumer imports.
 *
 * The stylesheet itself is composed by `emitStylesheet()` in
 * `@noksha-ui/tailwind`, not here, because `@noksha-ui/cli init` writes the same
 * CSS into the tree of a consumer who owns the source instead. One generator
 * means the package path and the ownership path cannot drift apart — and it
 * means the shipped CSS still cannot drift from what `buildTheme()` computes.
 *
 * All this script decides is the two things that are specific to shipping as a
 * package: the banner, and the `@source` directive. Tailwind v4 skips
 * `node_modules` when scanning for classes, so registering `dist` here is what
 * spares the consumer from knowing about it.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { emitStylesheet } from '@noksha-ui/tailwind';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const css = emitStylesheet({ sources: ['./'] });

await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(join(root, 'dist', 'styles.css'), css, 'utf8');

console.log(`[@noksha-ui/react] wrote dist/styles.css (${(css.length / 1024).toFixed(1)} kB)`);
