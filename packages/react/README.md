# @prism-ui/react

Accessible React components built on Tailwind CSS v4. Zero runtime CSS, zero-config theming, one
seed colour for the whole palette.

[Documentation](https://storewike.store/docs) · [Components](https://storewike.store/docs/components) · [GitHub](https://github.com/ahadverse/prism-ui)

## Install

```bash
pnpm add @prism-ui/react
# npm i @prism-ui/react · yarn add @prism-ui/react
```

Add two lines to the stylesheet Tailwind already processes (`app/globals.css`, `src/index.css`, …):

```css
@import "tailwindcss";
@import "@prism-ui/react/styles.css";
```

There is no third step. The shipped stylesheet registers its own `dist` folder as a Tailwind source,
so your build generates exactly the utilities the components use — no `content` globs, no preset, no
`tailwind.config` changes.

```tsx
import { Button } from '@prism-ui/react';

export function Example() {
  return (
    <>
      <Button variant="solid" tone="accent">Save</Button>
      <Button variant="outline" tone="danger">Delete</Button>
      <Button variant="ghost" loading>Working</Button>
    </>
  );
}
```

### Requirements

| | |
| --- | --- |
| React | >= 18 (peer) |
| Tailwind CSS | **v4** — required |
| Node | >= 18 |

Tailwind v3 will not work with the prebuilt package: the compiled components use v4-only utility
syntax such as `bg-(--btn-solid)` and `outline-(length:--prism-ring-width)`. A v3 preset exists in
`@prism-ui/tailwind` for consumers who copy the source instead.

## Components

`accordion` · `alert` · `avatar` · `badge` · `button` · `card` · `checkbox` · `dialog` · `drawer` ·
`field` · `input` · `popover` · `radio` · `select` · `separator` · `slider` · `spinner` · `switch` ·
`tabs` · `textarea` · `toast` · `tooltip`

Each has its own entry point, so an import costs you one component regardless of how good your
bundler's tree-shaking is:

```ts
import { Button } from '@prism-ui/react/button';
```

## Server Components

Every component entry is stamped with `"use client"` at build time, so an RSC can import and render
one directly. The exception is deliberate: `@prism-ui/react/theme-script` is server-safe and returns
a plain string.

```tsx
import { themeScript } from '@prism-ui/react/theme-script';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

It stamps the resolved theme onto `<html>` synchronously, before first paint, so a dark-mode visitor
never sees a white frame. `suppressHydrationWarning` is required because the script mutates `<html>`
before React compares it.

## Theming

Colour comes from CSS variables, not props. Override the seed and everything follows:

```css
@import "tailwindcss";
@import "@prism-ui/react/styles.css";

:root {
  --prism-accent-solid: oklch(0.55 0.19 250);
}
```

Semantic tones — `danger`, `success`, `warning`, `info` — keep their own ramps, so rebranding never
turns a destructive button into a friendly one. For generating a full ramp from one hex value, see
[`@prism-ui/tokens`](https://www.npmjs.com/package/@prism-ui/tokens).

Dark mode responds to `prefers-color-scheme`, a `.dark` class, or `[data-theme="dark"]` — set by the
theme script above, or by you.

## Own the source

Every component is served as JSON from the docs site, with its files and dependency graph:

```bash
curl https://storewike.store/r/button.json
```

Paste the files into your own tree and they are yours. Note that copied files still import
`@prism-ui/core` for the variant engine and hooks.

## Licence

MIT
