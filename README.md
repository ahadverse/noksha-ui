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
| [`@noksha-ui/tailwind`](./packages/tailwind) | Tailwind v4 `@theme` mapping and a v3 preset. |
| `apps/docs` | The documentation site — and the component registry it serves. |

`@noksha-ui/react` depends on `@noksha-ui/core`; the other two are build-time tools you only install
if you are generating your own theme.

## Owning the source instead

Every component is also published as JSON at `/r/<name>.json` on the docs site, with its files,
its dependency graph, and a hash per file. The "Own the source" panel on each component page hands
you the same files to paste into your own tree.

A `@noksha-ui/cli` that automates this (`init` / `add` / `diff`) is designed but **not built yet** —
`npx @noksha-ui/cli add button` will not resolve today. The registry it would read is live.

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
