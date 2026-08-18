# @noksha-ui/core

Headless primitives behind [`@noksha-ui/react`](https://www.npmjs.com/package/@noksha-ui/react) —
the variant engine, focus management, and the behaviour hooks. No markup, no styles.

[Documentation](https://storewike.store/docs) · [GitHub](https://github.com/ahadverse/noksha-ui)

```bash
pnpm add @noksha-ui/core
```

Installed for you as a dependency of `@noksha-ui/react`. Install it directly if you copied component
source out of the registry, or if you are building your own components on the same foundation.

## The variant engine

```ts
import { pv, type VariantProps } from '@noksha-ui/core';

const badge = pv({
  base: 'inline-flex items-center rounded-full font-medium',
  variants: {
    tone: { accent: 'bg-accent-subtle text-accent-fg', danger: 'bg-danger-subtle text-danger-fg' },
    size: { sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-sm' },
  },
  defaultVariants: { tone: 'accent', size: 'md' },
});

type BadgeProps = VariantProps<typeof badge>;

badge({ tone: 'danger', size: 'sm' });
```

Resolution is deterministic and conflicting Tailwind classes are merged, so a caller's `className`
always wins over the variant's.

## Behaviour hooks

| | |
| --- | --- |
| `useControllableState` | One hook for controlled and uncontrolled props. |
| `useDismissable` | Escape, outside-press and scroll dismissal with correct layering. |
| `useRovingFocus` | Arrow-key navigation for a composite widget. |
| `useTypeahead` | Type-to-select over a collection. |
| `useAnchorPosition` | Floating-element placement, on top of `@floating-ui/react-dom`. |
| `useScrollLock` | Reference-counted body scroll lock. |
| `usePresence` | Keeps an element mounted through its exit animation. |

## Composition and focus

`Slot` / `Slottable` implement `asChild`, so any component can render as a different element without
a wrapper. `Portal` and `FocusScope` handle rendering out of tree and trapping focus inside it.
`cx` merges class strings; `composeRefs` merges refs.

Layer counting is shared, which is what makes Escape close the topmost overlay rather than all of
them.

## Licence

MIT
