# @noksha-ui/cli

Copy Noksha UI components into your own project, and keep knowing what happened to them afterwards.

```bash
npx @noksha-ui/cli init
npx @noksha-ui/cli add button
```

There is no install step — `npx` fetches it, and it has no dependencies of its own.

## Why this exists

`@noksha-ui/react` is the easy path: install the package, import a component, take upgrades as they
come. This is the other one. `add` writes the component's actual source into your tree, where you
can rename it, delete the props you never use, or restyle it past anything the `variant` prop was
going to allow.

The usual cost of that trade is that the code goes stale in silence. Upstream fixes an aria
attribute six months later and it reaches nobody, because nothing on your machine remembers where
those files came from. `diff` is the answer to that, and the reason this is worth having as a
command rather than a copy button.

## Commands

### `init`

```bash
npx @noksha-ui/cli init
npx @noksha-ui/cli init --brand '#0EA5E9' --yes
```

Generates a stylesheet next to the one Tailwind already compiles, imports it from there, and writes
a `noksha.json` recording the answers. The theme is produced by the same generator that builds the
published package's `styles.css`, so you get identical tokens, tone rules and keyframes — seeded
from whatever brand colour you give it.

It reads your project before asking anything: `src/` layout, the stylesheet with the Tailwind
import in it, and the `paths` alias in your `tsconfig.json`. Every guess is a default you can
overrule, by answering the prompt or by passing the flag.

| | |
| --- | --- |
| `--brand <color>` | Seed the palette. Hex, `rgb()` or `oklch()`. |
| `--css <path>` | The stylesheet Tailwind compiles. |
| `--dir <path>` | Where components should go. |
| `--alias <prefix>` | Import prefix for copied files. Blank for relative imports. |
| `--registry <url>` | Read from somewhere other than storewike.store. |
| `--force` | Rewrite an existing `noksha.json`. |

### `add`

```bash
npx @noksha-ui/cli add button
npx @noksha-ui/cli add dialog select --dry-run
npx @noksha-ui/cli add --all
```

Writes the component's files, and the files it imports. Asking for Button brings Spinner, because
Button renders one; asking for Checkbox brings Field. The shared helpers under `internal/` come
too, narrowed to the ones something you asked for actually reaches.

On the way in, the imports are rewritten to your layout and alias, and `"use client"` is stamped on
the files that need it — the published package does that at build time, so the registry sources
carry none and a copied component would otherwise throw inside a Server Component.

`@noksha-ui/core` stays a dependency. It is the focus traps, the dismiss-layer stack and the
variant engine, and it is not what anyone means by owning a component.

| | |
| --- | --- |
| `--all` | Every component in the registry. |
| `--overwrite` | Replace files that differ, without asking. |
| `--dry-run` | List what would be written, marking what it would replace. |

### `diff`

```bash
npx @noksha-ui/cli diff
npx @noksha-ui/cli diff button --verbose
npx @noksha-ui/cli diff --apply
```

Compares three things, not two: what the registry serves now, what is in your tree, and what you
were given when you copied. That third one is what `noksha.json` records, and it is what turns an
unhelpful "these files differ" into a verdict:

| | |
| --- | --- |
| `up to date` | Identical to the registry. |
| `yours` | You edited it. Upstream has not moved. |
| `update available` | You have not touched it, and upstream has moved. |
| `conflict` | Both moved. Overwriting would lose your edits. |
| `missing` | Not on disk. |

`--apply` writes the `update available` files and leaves everything else alone, so an upstream
accessibility fix lands in the components you never customised without touching the ones you did.
`--verbose` prints the changed lines for the rest.

### `list`

```bash
npx @noksha-ui/cli list
npx @noksha-ui/cli list --installed
```

The catalogue, ticking off what this project already has. Works without a `noksha.json`.

## noksha.json

```json
{
  "registry": "https://storewike.store/r",
  "brand": "#6D4AFF",
  "css": "src/app/globals.css",
  "components": "src/components/ui",
  "alias": "@/components/ui",
  "tsx": true,
  "installed": {
    "button": {
      "hash": "4a2e88f3d734e843",
      "files": { "button/button.tsx": "9f2c1b8e4a0d7c33" }
    }
  }
}
```

Commit it. `installed` is the record `diff` reads; without it in version control, a colleague who
pulls your branch gets components that look, to the tool, like they came from nowhere.

Changing `alias` or `components` and re-running `add` rewrites the imports to match.

## The registry

Everything here reads static JSON generated from `packages/react/src` at build time:

```bash
curl https://storewike.store/r/index.json
curl https://storewike.store/r/button.json
```

Each file carries its own hash, which is what the three-way comparison is built on. Point
`--registry` at your own copy to serve a fork.

## Licence

MIT
