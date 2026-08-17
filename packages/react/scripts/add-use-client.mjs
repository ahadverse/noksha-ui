/**
 * Stamps `"use client"` onto the built client entries.
 *
 * This cannot be done with tsup's `banner` option. esbuild strips source-level
 * directives, and the banner esbuild re-adds is then dropped again by the
 * Rollup pass that `treeshake: true` runs afterwards — so the directive silently
 * never reaches dist, and every component throws the moment a Server Component
 * imports it. Stamping the files here is the step that actually holds.
 *
 * Only entries are stamped, never chunks: the directive marks the boundary the
 * server crosses, and everything an entry pulls in is already inside it.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { clientEntries } from '../entries.mjs';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

/** `.js` needs single quotes for ESM parsers; `.cjs` is happy with either. */
const DIRECTIVE = "'use client';\n";

let stamped = 0;

await Promise.all(
  clientEntries.flatMap((entry) =>
    ['js', 'cjs'].map(async (ext) => {
      const file = join(dist, `${entry}.${ext}`);
      const source = await readFile(file, 'utf8');

      // Idempotent: a re-run over an already-stamped dist must not double it.
      if (/^\s*['"]use client['"]/.test(source)) return;

      await writeFile(file, DIRECTIVE + source, 'utf8');
      stamped += 1;
    }),
  ),
);

console.log(`[@prism-ui/react] stamped "use client" on ${stamped} entry files`);
