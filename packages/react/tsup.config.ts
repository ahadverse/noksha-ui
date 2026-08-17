import { defineConfig, type Options } from 'tsup';

import { components } from './entries.mjs';

const shared: Options = {
  format: ['esm', 'cjs'],
  dts: true,
  treeshake: true,
  target: 'es2022',
  sourcemap: true,
  external: ['react', 'react-dom'],
};

/**
 * One entry per component, so a consumer importing `@noksha-ui/react/button`
 * gets Button and nothing else regardless of how good their bundler's
 * tree-shaking is (ARCHITECTURE.md §7). The list lives in `entries.mjs` because
 * the `"use client"` step needs the same one.
 */
const componentEntries = Object.fromEntries(
  components.map((name) => [name, `src/components/${name}/index.ts`]),
);

export default defineConfig([
  {
    ...shared,
    // Every entry in this group owns state, listens to the document, or renders
    // something that does. `"use client"` is stamped on afterwards by
    // `scripts/add-use-client.mjs` — a `banner` here does not survive, because
    // the Rollup pass behind `treeshake` drops the directive esbuild emits.
    entry: { index: 'src/index.ts', theme: 'src/theme/index.ts', ...componentEntries },
    clean: true,
  },
  {
    ...shared,
    // The one server-safe entry: a plain string for the no-flash <head> script,
    // which a Server Component has to be able to call during its own render.
    entry: { 'theme-script': 'src/theme-script.ts' },
    clean: false,
  },
]);
