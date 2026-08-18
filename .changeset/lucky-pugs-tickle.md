---
'@noksha-ui/react': patch
---

Fix `pnpm dev` for `@noksha-ui/react`, which crashed the moment it started.

Watch mode ran the declaration build for all 24 entry points on every rebuild, and the dts worker
exhausted its heap (`ERR_WORKER_OUT_OF_MEMORY`) before the watcher was ready. Declarations are now
skipped under `--watch`: Turbo's `dev` task depends on `^build`, so a full build has always
produced them first, and watch mode only needs to refresh JavaScript.

Two things that would have gone wrong once it did start are fixed with it — `clean` no longer runs
under watch, where it would have deleted the declarations that build left behind, and
`"use client"` is re-stamped after each rebuild instead of being stripped off all 24 entries by the
first save.
