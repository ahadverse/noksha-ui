import { defineConfig, type Options } from 'tsup';

export default defineConfig((overrides): Options => {
  const watching = overrides.watch !== undefined && overrides.watch !== false;

  return {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    /**
     * Never while watching. `@noksha-ui/react` bundles this package, and
     * `pnpm dev` starts both watchers at once — so emptying `dist` on startup
     * can pull it out from under React's first build, which then exits instead
     * of watching and takes the whole Turbo dev session with it.
     *
     * Turbo's `dev` task declares `dependsOn: ["^build"]`, so this folder is
     * already complete before the watcher starts; there is nothing to clean.
     */
    clean: !watching,
    treeshake: true,
    target: 'es2022',
    sourcemap: true,
    external: ['react', 'react-dom'],
  };
});
