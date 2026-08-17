/**
 * Copies the registry `@noksha-ui/react` generated into `public/r`.
 *
 * Two reasons it is copied rather than read where it lies. Resolving the
 * package from application code does not survive bundling — webpack rewrites
 * `require.resolve` to a numeric module id — and, more usefully, `public/r`
 * means the deployed docs site *is* the registry endpoint: the same JSON the
 * pages render is the JSON `noksha add button` fetches over HTTP.
 */
import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const app = join(dirname(fileURLToPath(import.meta.url)), '..');

const source = join(dirname(require.resolve('@noksha-ui/react/package.json')), 'dist', 'registry');
const target = join(app, 'public', 'r');

try {
  await readdir(source);
} catch {
  throw new Error(
    `No registry at ${source}. Run \`pnpm --filter @noksha-ui/react build\` before building the docs.`,
  );
}

// Removed first, so a component deleted upstream cannot linger as a stale page.
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

const files = await readdir(target);
console.log(`[@noksha-ui/docs] synced ${files.length} registry files into public/r`);
