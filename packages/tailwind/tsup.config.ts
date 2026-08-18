import { defineConfig, type Options } from 'tsup';

export default defineConfig((overrides): Options => {
  const watching = overrides.watch !== undefined && overrides.watch !== false;

  return {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    /**
     * Never while watching. `pnpm dev` starts every package's watcher at once,
     * and cleaning here empties `dist` at the exact moment `@noksha-ui/cli` —
     * which bundles this package rather than depending on it — is resolving
     * `./dist/index.js`. Whoever loses that race dies with `Could not resolve
     * "@noksha-ui/tailwind"`, and Turbo tears the whole dev session down with it.
     *
     * There is nothing to clean anyway: Turbo's `dev` task declares
     * `dependsOn: ["^build"]`, so a full build has already produced this folder
     * before the watcher exists.
     */
    clean: !watching,
    treeshake: true,
    target: 'es2022',
    sourcemap: true,
  };
});
