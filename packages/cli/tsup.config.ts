import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm'],
  // A bin has no importers, so declarations would be dead weight in the tarball.
  dts: false,
  clean: true,
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
   */
  noExternal: [/^@noksha-ui\//],
  banner: { js: '#!/usr/bin/env node' },
});
