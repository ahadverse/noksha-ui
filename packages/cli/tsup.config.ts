import { defineConfig, type Options } from 'tsup';

export default defineConfig((overrides): Options => {
  const watching = overrides.watch !== undefined && overrides.watch !== false;

  return {
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    // A bin has no importers, so declarations would be dead weight in the tarball.
    dts: false,
    /**
     * Never while watching — for symmetry with the packages this one bundles,
     * which stop cleaning under watch for a reason that matters here: nothing
     * else should ever see this folder empty mid-session.
     *
     * Turbo's `dev` task declares `dependsOn: ["^build"]`, so `dist` is already
     * complete before the watcher starts.
     */
    clean: !watching,
    treeshake: true,
    target: 'node20',
    platform: 'node',
    sourcemap: true,
    /**
     * The token engine and the stylesheet emitter are bundled in rather than
     * declared as dependencies. `npx @noksha-ui/cli` is the way almost everyone
     * will run this, and every dependency is another install to wait through
     * before the first component lands. Lockstep versioning (`fixed` in
     * `.changeset/config.json`) is what makes the snapshot safe — a CLI can never
     * be published against a token engine it was not built with.
     *
     * It is also why this package is the one that breaks first when a sibling
     * empties its `dist`: bundling means esbuild has to find the built files,
     * where a plain dependency would only have to find the package.
     */
    noExternal: [/^@noksha-ui\//],
    banner: { js: '#!/usr/bin/env node' },
  };
});
