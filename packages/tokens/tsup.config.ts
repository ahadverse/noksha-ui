import { defineConfig, type Options } from 'tsup';

export default defineConfig((overrides): Options => {
  const watching = overrides.watch !== undefined && overrides.watch !== false;

  return {
    entry: {
      index: 'src/index.ts',
      color: 'src/color/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    /**
     * Never while watching. `@noksha-ui/tailwind` and `@noksha-ui/cli` both
     * bundle this package, and `pnpm dev` starts all of their watchers at once —
     * so emptying `dist` on startup hands them a folder that is briefly not
     * there, and a first build that cannot resolve it exits rather than watches.
     *
     * Turbo's `dev` task declares `dependsOn: ["^build"]`, so this folder is
     * already complete before the watcher starts; there is nothing to clean.
     */
    clean: !watching,
    treeshake: true,
    target: 'es2022',
    sourcemap: true,
  };
});
