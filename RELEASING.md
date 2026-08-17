# Releasing

Two things ship from this repo, on separate tracks:

- **The packages** → npm. This is what makes `import { Button } from '@prism-ui/react'` work in
  someone else's app.
- **The docs site** → Vercel. This is what makes `curl https://storewike.store/r/button.json` work.

Hosting the docs does not distribute the components, and publishing the packages does not update the
docs. You need both.

---

## One-time setup

### npm

1. **Own the `@prism-ui` scope.** Scoped packages cannot be published to a scope you do not own:
   ```bash
   npm login
   npm org ls prism-ui        # or: create it at npmjs.com/org/create
   ```
   If the scope is taken, every `name` field in `packages/*/package.json` has to change — and so do
   the import paths in the docs, the demos, and the generated registry.
2. **Create an automation token** (npmjs.com → Access Tokens → Granular/Automation) and add it to
   the GitHub repo as the `NPM_TOKEN` secret.
3. Packages are already marked `"publishConfig": { "access": "public" }` — scoped packages default
   to private, which fails without a paid account.

### GitHub

The repo is initialised on `main` with an initial commit; it has no remote yet. Create the
repository on GitHub — empty, no README or licence, or the first push will conflict — then:

```bash
git remote add origin https://github.com/ahadverse/prism-ui.git
git push -u origin main
```

`.github/workflows/ci.yml` runs build → typecheck → test → lint on every push and PR.
`.github/workflows/release.yml` handles publishing (below).

### Vercel

Import the repo, then set:

| Setting | Value |
| --- | --- |
| Root Directory | `apps/docs` |
| Include files outside Root Directory | **on** — the build reaches up to `packages/*` |
| Install / Build commands | already declared in [`apps/docs/vercel.json`](./apps/docs/vercel.json) |
| Node version | 20.x or 22.x |

Then attach `storewike.store` under Project → Domains. **That apex domain currently serves a
different Vercel project** (a site titled "Home Improvement"); moving it here replaces that site,
and because `/` redirects to `/docs` there would be no landing page left at the root. Attach a
subdomain such as `ui.storewike.store` instead if that site should stay up — the only code change
is the production fallback in `apps/docs/src/lib/site.ts` plus the links in the four package
READMEs and their `homepage` fields.

The registry URL printed in the docs comes
from `apps/docs/src/lib/site.ts`, which resolves in this order:

1. `NEXT_PUBLIC_SITE_URL` if set,
2. Vercel's own deployment URL (so a preview deploy documents *itself*, not production),
3. `https://storewike.store`.

So preview deployments are self-consistent with no extra configuration. Set `NEXT_PUBLIC_SITE_URL`
only if the public domain ever differs from what Vercel reports.

---

## Publishing a release

### The automated path

1. Describe your change in a changeset:
   ```bash
   pnpm changeset
   ```
   Pick the packages and the bump. All four are in a `fixed` group, so they always move together —
   bumping one bumps all of them to the same version.
2. Commit the generated `.changeset/*.md` file and merge it to `main`.
3. The Release workflow opens a **"chore: version packages"** PR that applies the bumps and writes
   the changelogs.
4. Merge that PR. The same workflow then runs `pnpm release`, which builds every package and
   publishes to npm.

### Publishing by hand

```bash
pnpm install
pnpm changeset            # describe the change
pnpm version-packages     # apply bumps + changelogs
pnpm build                # or: pnpm turbo run build --filter="./packages/*"
pnpm test
pnpm release              # builds again, then `changeset publish`
git push --follow-tags
```

Use **pnpm**, not npm. `@prism-ui/react` depends on `@prism-ui/core` as `workspace:^`, and it is
pnpm's pack step that rewrites that to `^0.1.0` on the way out. Publishing with `npm publish`
directly would ship a package.json containing a `workspace:` specifier, which no consumer can
install.

### Before you push the button

```bash
cd packages/react && pnpm pack --pack-destination /tmp
tar -tzf /tmp/prism-ui-react-*.tgz | head -30
tar -xOzf /tmp/prism-ui-react-*.tgz package/package.json | grep -A2 dependencies
```

Confirm: `dist/` is present (it is gitignored, so an unbuilt tree packs an empty package),
`README.md` and `LICENSE` are in there, and no `workspace:` specifier survived.

`npm publish --dry-run` is not a substitute — it will not perform the workspace rewrite.

---

## What ships in each package

| Package | Contents |
| --- | --- |
| `@prism-ui/react` | 22 components, ESM + CJS, per-component entry points, `.d.ts`, `dist/styles.css`, and `dist/registry/*.json`. `"use client"` is stamped at build time. |
| `@prism-ui/core` | The `pv()` variant engine, focus/dismiss/roving hooks, `Slot`, `Portal`. |
| `@prism-ui/tokens` | The OKLCH engine, `buildTheme`, `emitThemeCss`, colour utilities. |
| `@prism-ui/tailwind` | `emitTailwindTheme` for v4, `preset` for v3. |

`apps/docs` is `private: true` and listed under `ignore` in `.changeset/config.json`, so it is never
published.

---

## Gotchas that have already bitten

- **The react build needs a 4 GB heap.** Generating declarations for 24 entry points exceeds Node's
  default limit and dies with `ERR_WORKER_OUT_OF_MEMORY`. The `build` script sets
  `NODE_OPTIONS=--max-old-space-size=4096` via `cross-env`; do not remove it, and note that CI
  runners have less RAM than a dev laptop, not more.
- **`dist/` is gitignored.** Every publish path must build first. The root `release` script does.
- **Tailwind v4 is a hard requirement for consumers.** The compiled components use v4-only utility
  syntax (`bg-(--btn-solid)`). The v3 preset in `@prism-ui/tailwind` only helps people who copy the
  source out of the registry.
- **The docs site is the registry.** `apps/docs/scripts/sync-registry.mjs` copies
  `@prism-ui/react/dist/registry` into `public/r` at build time, so a docs deploy that skipped the
  package build fails loudly rather than serving a stale catalogue. Redeploy the docs after every
  package release, or the JSON the CLI reads will lag the npm tarball.
- **npm provenance** (`NPM_CONFIG_PROVENANCE: true`) is commented out in the release workflow. Turn
  it on only after the first successful publish — it fails the release if the `repository` field
  does not exactly match the publishing repo.

---

## Not shipped yet

`@prism-ui/cli` — the `init` / `add` / `diff` commands the docs describe — is designed but not
built. `npx @prism-ui/cli add button` will not resolve. The registry it reads is live and versioned,
so the CLI can be added later without changing anything already published.
