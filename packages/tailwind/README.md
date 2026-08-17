# @prism-ui/tailwind

Maps [Prism UI](https://storewike.store/docs) tokens onto Tailwind — a v4 `@theme` emitter and a v3
preset.

[Documentation](https://storewike.store/docs/theming) · [GitHub](https://github.com/ahadverse/prism-ui)

```bash
pnpm add -D @prism-ui/tailwind
```

**Most people do not need this package.** `@prism-ui/react/styles.css` already contains the emitted
`@theme` block. Reach for this only when generating your own stylesheet, or when using Tailwind v3.

## Tailwind v4

```ts
import { emitTailwindTheme } from '@prism-ui/tailwind';

const css = emitTailwindTheme(); // "@theme { --color-accent-solid: var(--prism-accent-solid); … }"
```

The mapping is by reference, not by value — Tailwind's theme keys point at the `--prism-*` variables
rather than copying their values. That is what makes a runtime theme swap work: change one variable
and every utility follows, with no rebuild.

Individual maps (`colorMap`, `radiusMap`, `shadowMap`, `motionMap`, `spacingMap`, `typographyMap`)
are exported if you want to emit a subset.

## Tailwind v3

```js
// tailwind.config.js
const { preset } = require('@prism-ui/tailwind');

module.exports = {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

This gives a v3 project the token-backed theme scale. Note that the **prebuilt**
`@prism-ui/react` components will still not work under v3 — they compile to v4-only utility syntax.
The preset is for v3 projects that copy component source out of the registry and adapt it.

## Licence

MIT
