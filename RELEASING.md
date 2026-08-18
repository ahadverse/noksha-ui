# Releasing

Two things ship from this repo, on separate tracks:

- **The packages** → npm. This is what makes `import { Button } from '@noksha-ui/react'` work in
  someone else's app.
- **The docs site** → Vercel. This is what makes `curl https://storewike.store/r/button.json` work.

Hosting the docs does not distribute the components, and publishing the packages does not update the
docs. You need both.

---

## One-time setup

### npm

1. **Own the `@noksha-ui` scope.** Scoped packages cannot be published to a scope you do not own:
   ```bash
   npm login
   npm org ls noksha-ui        # or: create it at npmjs.com/org/create
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
git remote add origin https://github.com/ahadverse/noksha-ui.git
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

Then attach `storewike.store` under Project → Domains. Note that `/` redirects to `/docs`, so the
apex has no landing page of its own — the documentation is the site.

The registry URL printed in the docs comes
from `apps/docs/src/lib/site.ts`, which resolves in this order:

1. `NEXT_PUBLIC_SITE_URL` if set,
2. `https://storewike.store` whenever `VERCEL_ENV` is `production`,
3. the per-deployment host, so a preview deploy documents *itself* rather than production.

Production is pinned to the canonical domain deliberately.
`VERCEL_PROJECT_PRODUCTION_URL` is the project's `*.vercel.app` host and **not** the custom domain
attached to it, so trusting it had production telling readers to `curl noksha-ui-docs.vercel.app`
while they were reading on `storewike.store`. Previews have no custom domain, so there the
per-deployment host is the right answer and is still used.

Changing the public domain means changing `CANONICAL` in that file — or setting
`NEXT_PUBLIC_SITE_URL` in the Vercel project to override it without a deploy.

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

Use **pnpm**, not npm. `@noksha-ui/react` depends on `@noksha-ui/core` as `workspace:^`, and it is
pnpm's pack step that rewrites that to `^0.1.0` on the way out. Publishing with `npm publish`
directly would ship a package.json containing a `workspace:` specifier, which no consumer can
install.

### Before you push the button

```bash
cd packages/react && pnpm pack --pack-destination /tmp
tar -tzf /tmp/noksha-ui-react-*.tgz | head -30
tar -xOzf /tmp/noksha-ui-react-*.tgz package/package.json | grep -A2 dependencies
```

Confirm: `dist/` is present (it is gitignored, so an unbuilt tree packs an empty package),
`README.md` and `LICENSE` are in there, and no `workspace:` specifier survived.

`npm publish --dry-run` is not a substitute — it will not perform the workspace rewrite.

---

## What ships in each package

| Package | Contents |
| --- | --- |
| `@noksha-ui/react` | 22 components, ESM + CJS, per-component entry points, `.d.ts`, `dist/styles.css`, and `dist/registry/*.json`. `"use client"` is stamped at build time. |
| `@noksha-ui/core` | The `pv()` variant engine, focus/dismiss/roving hooks, `Slot`, `Portal`. |
| `@noksha-ui/tokens` | The OKLCH engine, `buildTheme`, `emitThemeCss`, colour utilities. |
| `@noksha-ui/tailwind` | `emitTailwindTheme` for v4, `preset` for v3. |

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
  syntax (`bg-(--btn-solid)`). The v3 preset in `@noksha-ui/tailwind` only helps people who copy the
  source out of the registry.
- **The docs site is the registry.** `apps/docs/scripts/sync-registry.mjs` copies
  `@noksha-ui/react/dist/registry` into `public/r` at build time, so a docs deploy that skipped the
  package build fails loudly rather than serving a stale catalogue. Redeploy the docs after every
  package release, or the JSON the CLI reads will lag the npm tarball.
- **npm provenance** (`NPM_CONFIG_PROVENANCE: true`) is commented out in the release workflow. Turn
  it on only after the first successful publish — it fails the release if the `repository` field
  does not exactly match the publishing repo.

---

## The CLI

`@noksha-ui/cli` publishes with everything else and is in the `fixed` version group, so its version
always matches the `@noksha-ui/react` whose registry it reads.

Two things about it are worth remembering at release time:

- **It bundles `tokens` and `tailwind`** rather than depending on them, so `npx @noksha-ui/cli` has
  nothing to install. That snapshot is only safe because of lockstep versioning — do not move the CLI
  out of the `fixed` group without turning those into real dependencies first.
- **It reads the deployed docs site, not the tarball.** A published CLI against a docs deploy that
  still serves last release's registry will hand people stale source. The rule above holds doubly
  here: redeploy the docs after every package release.

Smoke-test a release candidate against the built registry before publishing:

```bash
pnpm build
node packages/cli/dist/index.js list --registry https://storewike.store/r
```
