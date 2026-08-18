import { defineConfig, type Options } from 'tsup';

import { components } from './entries.mjs';

/**
 * One entry per component, so a consumer importing `@noksha-ui/react/button`
 * gets Button and nothing else regardless of how good their bundler's
 * tree-shaking is (ARCHITECTURE.md §7). The list lives in `entries.mjs` because
 * the `"use client"` step needs the same one.
 */
const componentEntries = Object.fromEntries(
  components.map((name) => [name, `src/components/${name}/index.ts`]),
);

export default defineConfig((overrides): Options[] => {
  const watching = overrides.watch !== undefined && overrides.watch !== false;

  const shared: Options = {
    format: ['esm', 'cjs'],
    /**
     * Declarations are the expensive half of this build: 24 entry points put
     * the dts worker over its heap even with the 4 GB the `build` script asks
     * for, and in watch mode it pays that price on every keystroke.
     *
     * Watch mode does not need them. Turbo's `dev` task declares
     * `dependsOn: ["^build"]`, so a full build — declarations included — has
     * always run before the watcher starts, and consumers keep resolving types
     * through those files while the watcher only refreshes JavaScript.
     */
    dts: !watching,
    treeshake: true,
    target: 'es2022',
    sourcemap: true,
    external: ['react', 'react-dom'],
  };

  return [
    {
      ...shared,
      // Every entry in this group owns state, listens to the document, or renders
      // something that does. `"use client"` is stamped on afterwards by
      // `scripts/add-use-client.mjs` — a `banner` here does not survive, because
      // the Rollup pass behind `treeshake` drops the directive esbuild emits.
      entry: { index: 'src/index.ts', theme: 'src/theme/index.ts', ...componentEntries },
      // Cleaning under watch would delete the declarations the preceding build
      // left behind, which are the only ones watch mode is going to produce.
      clean: !watching,
      /**
       * Every rebuild overwrites the stamped entries with unstamped ones, so
       * without this the first save during `pnpm dev` strips `"use client"` off
       * all 24 of them and the next page load fails in a Server Component. Only
       * this config re-stamps; the `theme-script` entry below is server-safe.
       */
      ...(watching ? { onSuccess: 'node scripts/add-use-client.mjs' } : {}),
    },
    {
      ...shared,
      // The one server-safe entry: a plain string for the no-flash <head> script,
      // which a Server Component has to be able to call during its own render.
      entry: { 'theme-script': 'src/theme-script.ts' },
      clean: false,
    },
  ];
});
