---
'@noksha-ui/tailwind': minor
'@noksha-ui/react': minor
'@noksha-ui/cli': minor
---

Add `@noksha-ui/cli` — the ownership path, automated.

`init` generates a themed stylesheet from a brand seed and wires it into the stylesheet Tailwind
already compiles. `add` copies a component's source into the project along with the components and
shared helpers it imports, rewriting the imports to the project's own layout and stamping
`"use client"` where it is needed. `list` prints the catalogue.

`diff` is the one that does not exist elsewhere. It compares the registry, the files on disk, and a
record of what was copied, so a local edit and an upstream change are told apart rather than both
reported as "differs". `--apply` updates the files that were never customised and leaves the rest.

Two supporting changes make it work:

- `@noksha-ui/tailwind` now exports `emitStylesheet()` and the tone table that
  `@noksha-ui/react`'s build previously kept in a script of its own. Both the published
  `styles.css` and the CLI's generated theme come out of that one function, so the package path and
  the ownership path cannot drift apart.
- `Dialog`'s development-only warning no longer reads a bare `process.env.NODE_ENV`. Copied into a
  project without `@types/node` — a plain Vite app, for instance — that failed to typecheck, which
  made the component not really ownable. It reads through `globalThis` instead.
