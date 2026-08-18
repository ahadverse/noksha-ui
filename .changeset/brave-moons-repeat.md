---
'@noksha-ui/tokens': patch
'@noksha-ui/tailwind': patch
'@noksha-ui/core': patch
'@noksha-ui/cli': patch
---

Fix `pnpm dev`, which killed its own session on startup with `Could not resolve "@noksha-ui/…"`.

Every package's `dev` is `tsup --watch`, and Turbo starts all of them at once. Each watcher opened
by deleting its own `dist` — while the packages that *bundle* it were resolving that exact folder.
`@noksha-ui/cli` bundles the token engine and the stylesheet emitter rather than depending on them,
and `@noksha-ui/react` bundles `@noksha-ui/core`, so both had to find built files that a sibling had
just removed. Whoever lost the race failed its first build, and a watcher whose first build fails
exits instead of watching — which Turbo reports as a failed task and tears the whole dev session
down over. Which package lost varied from run to run, which is why it looked intermittent.

Cleaning is now skipped under `--watch` in all four configs, matching what `@noksha-ui/react`
already did. Nothing is lost by it: Turbo's `dev` task declares `dependsOn: ["^build"]`, so every
`dist` is complete and correct before any watcher starts. A one-off `pnpm build` still cleans
exactly as it did.
