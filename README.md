# Noksha UI

An accessible, zero-config-theming React component library built on Tailwind CSS v4.

Twenty-two components. One seed colour generates the whole palette in OKLCH. No runtime CSS-in-JS,
no theme provider required, no `tailwind.config` edits on the consumer side.

**Docs:** [nokshaui.com/docs](https://nokshaui.com/docs) · **Architecture:** [ARCHITECTURE.md](./ARCHITECTURE.md) · **Releasing:** [RELEASING.md](./RELEASING.md)

## Install

```bash
pnpm add @noksha-ui/react
```

Then add two lines to the stylesheet Tailwind already processes — usually `app/globals.css`:

```css
@import "tailwindcss";
@import "@noksha-ui/react/styles.css";
```

That second import carries the design tokens, the dark-mode rules, the animation keyframes, and an
`@source` directive pointing at the package's own `dist`. Tailwind scans it and generates the
utilities the components use, so there is nothing to add to a Tailwind config.

```tsx
import { Button } from '@noksha-ui/react';

export default function Page() {
  return <Button variant="solid" tone="accent">Ship it</Button>;
}
```

Components ship with `"use client"` already stamped on, so a React Server Component can render them
directly.

> **Tailwind v4 is required.** The shipped CSS uses `@source` and `@theme`, and the compiled
> components use v4-only utility syntax (`bg-(--btn-solid)`). Under Tailwind v3 you get the tokens
> and no utilities.

### No flash of the wrong theme

```tsx
import { themeScript } from '@noksha-ui/react/theme-script';

<html lang="en" suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: themeScript() }} />
  </head>
  …
</html>
```

The one server-safe entry: it returns a string, so a Server Component can inline it before anything
paints.

## Packages

| Package | What it is |
| --- | --- |
| [`@noksha-ui/react`](./packages/react) | The components. This is the one you install. |
| [`@noksha-ui/core`](./packages/core) | Headless primitives — the `pv()` variant engine, focus management, dismiss/roving-focus hooks. |
| [`@noksha-ui/tokens`](./packages/tokens) | The OKLCH colour engine and the token source of truth. |
| [`@noksha-ui/tailwind`](./packages/tailwind) | Tailwind v4 `@theme` mapping, the stylesheet generator, and a v3 preset. |
| [`@noksha-ui/cli`](./packages/cli) | `init` / `add` / `diff` — the copy-paste path, and a way to keep it current. |
| `apps/docs` | The documentation site — and the component registry it serves. |

`@noksha-ui/react` depends on `@noksha-ui/core`. `tokens` and `tailwind` are build-time tools you
only install if you are generating your own theme, and `cli` is run through `npx` rather than
installed at all.

## Owning the source instead

```bash
npx @noksha-ui/cli init          # theme stylesheet, wired into Tailwind
npx @noksha-ui/cli add button    # the source, into ./src/components/ui
npx @noksha-ui/cli diff          # what moved upstream since you copied
```

`add` follows the real import graph, so Button brings Spinner and Checkbox brings Field, and it
rewrites the imports to your layout on the way in.

`diff` is the part copy-paste libraries tend to be missing. It compares three things — the
registry, your files, and a record of what you were handed — so an edit you made and a change
upstream made are told apart instead of both reading as "differs". `--apply` updates the
components you never customised and leaves the ones you did.

Every component is also published as JSON at `/r/<name>.json`, with its files, its dependency graph
and a hash per file. The CLI installs from it, the docs render from it, and the "Own the source"
panel on each component page hands you the same files to paste in by hand.

## Development

```bash
pnpm install
pnpm build          # turbo, respects the dependency graph
pnpm test           # vitest across every package
pnpm typecheck
pnpm lint           # biome
pnpm docs           # docs site on :3100
```

Requires Node >= 20.11 and pnpm 11. `packages/react`'s build raises the Node heap to 4 GB —
generating 24 entry points of declarations exceeds the default limit.

## Licence

MIT
