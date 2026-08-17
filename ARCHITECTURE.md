# Noksha UI — Architecture

> Status: **Draft v1** · Last updated: 2026-08-14 · Owner: @ahadxx99

An open-source React component library built on Tailwind CSS. Positioned as a modern
alternative to Material UI, Ant Design and shadcn/ui — with three things they don't
have together: **zero-config semantic theming**, **enterprise-grade data components**,
and **motion polish at zero JS cost**.

---

## 1. Positioning

| | MUI | Ant Design | shadcn/ui | **Noksha UI** |
| --- | --- | --- | --- | --- |
| Install & go | ✅ | ✅ | ❌ (copy-paste) | ✅ **+ copy-paste CLI** |
| Own the source | ❌ | ❌ | ✅ | ✅ (via CLI) |
| Runtime CSS-in-JS | ✅ (cost) | ✅ (cost) | ❌ | ❌ **zero runtime** |
| Multi-brand theming | ThemeProvider | ConfigProvider | manual | **CSS vars, no provider** |
| Perceptual color scales | ❌ | ❌ | ❌ | ✅ **OKLCH generated** |
| Data table / date range | ✅ | ✅ | ❌ | ✅ (v0.2) |
| RSC-safe | partial | ❌ | ✅ | ✅ |

### Non-goals

- Not a design system for one company — no opinionated brand baked in.
- Not a CSS framework — Tailwind stays the styling layer.
- No React Native, no Vue/Svelte ports in v1 (but `@noksha-ui/core` is written so
  they stay possible).
- No IE11 / legacy browser support. Baseline: browsers with `oklch()` and
  `:has()` support (Chrome 111+, Safari 16.4+, Firefox 113+).

---

## 2. Repository layout

```
noksha-ui/
├── packages/
│   ├── tokens/        @noksha-ui/tokens     Color engine + token source of truth
│   ├── core/          @noksha-ui/core       Headless primitives, hooks, a11y
│   ├── react/         @noksha-ui/react      The styled components
│   ├── tailwind/      @noksha-ui/tailwind   Tailwind v4 @theme + v3 preset
│   └── cli/           @noksha-ui/cli        init / add / diff commands
├── apps/
│   └── docs/          @noksha-ui/docs       Next.js 15 + MDX documentation site
├── .changeset/                             Versioning + changelogs
├── turbo.json                              Task graph
├── pnpm-workspace.yaml
└── biome.json                              Lint + format (single tool)
```

### Dependency graph

```
tokens ──┬─► tailwind ──► react ──► docs
         │                 ▲
core ────┴─────────────────┘
cli ─► (reads a generated registry from react)
```

`core` never imports `tokens`. `tokens` never imports React. This keeps the color
engine usable as a standalone Node/CLI tool and the primitives portable.

---

## 3. Token architecture

Three layers, all plain CSS custom properties. **No ThemeProvider is required for
theming** — the provider only exists to persist and toggle the mode.

```
Layer 1  Primitive   --noksha-violet-500, --noksha-gray-200   generated, 11 steps
Layer 2  Semantic    --noksha-bg-surface, --noksha-fg-muted    role-based, theme-aware
Layer 3  Component   --noksha-button-h-md, --noksha-input-px   derived from scales
```

Only **Layer 2** changes between light and dark. Components only ever read Layer 2
and Layer 3 — never Layer 1 directly. This is what makes a new theme a ~40-line
CSS block instead of a fork.

### 3.1 The OKLCH engine (`@noksha-ui/tokens`)

Given a single seed color, generate a perceptually uniform 11-step scale:

```ts
generateScale('#6D4AFF')
// → { 50: 'oklch(0.971 0.014 285)', … 500: 'oklch(0.606 0.198 285)', … 950: '…' }
```

**Why OKLCH and not HSL:** in HSL, `hsl(60 100% 50%)` (yellow) and
`hsl(240 100% 50%)` (blue) claim the same lightness but differ by ~10× in perceived
brightness. Scales built in HSL need hand-tuning per hue. In OKLCH, `L` *is*
perceived lightness — so one lightness ramp works for every hue, and generated
scales are usable without a designer touching them.

Pipeline:

1. Parse seed (`hex` | `rgb()` | `oklch()`) → sRGB → linear sRGB → OKLab → OKLCH.
2. Apply a fixed **lightness ramp** across the 11 steps (identical for all hues).
3. Apply a **chroma curve** that peaks at step 500–600 and falls off at the ends,
   scaled by the seed's own chroma so muted brands stay muted.
4. **Gamut-map** each step: binary-search chroma downward until the color is
   representable in sRGB. (Display-P3 output is a v0.2 opt-in.)
5. Derive `on-*` foreground per step via WCAG relative luminance — pick white or
   the neutral ink, whichever passes contrast; error at build time if neither
   reaches 4.5:1.

Hue shift is *not* applied by default (no "warm at the light end" trick). It is
opt-in via `generateScale(seed, { hueShift: -6 })`, because it makes results
harder to predict for library consumers.

### 3.2 Semantic token set (Layer 2)

```
Surfaces      --noksha-bg-canvas · -surface · -subtle · -muted · -inverse
Foreground    --noksha-fg-default · -muted · -subtle · -disabled · -inverse
Border        --noksha-border-subtle · -default · -strong · -focus
Accent        --noksha-accent-solid · -solid-hover · -solid-active
              --noksha-accent-subtle · -subtle-hover · -fg · -on-solid
Status        --noksha-{danger,success,warning,info}-{solid,subtle,fg,on-solid}
Focus ring    --noksha-ring · --noksha-ring-offset · --noksha-ring-width
Elevation     --noksha-shadow-{xs,sm,md,lg,xl} (tinted with the neutral hue, not black)
```

The same 7-slot shape (`solid / solid-hover / solid-active / subtle / subtle-hover /
fg / on-solid`) is reused for accent and every status tone. That regularity is what
lets a component take a `tone` prop and swap its entire palette with one class.

### 3.3 Scale tokens (Layer 3 inputs)

| Scale | Driver variable | Effect |
| --- | --- | --- |
| Radius | `--noksha-radius-base` | `0` → sharp, `0.5rem` → soft, one var retunes everything |
| Density | `--noksha-density` | `0.875` compact · `1` default · `1.125` comfortable — drives control heights and paddings |
| Typography | `--noksha-font-sans/mono`, `--noksha-text-*` | fluid `clamp()` steps |
| Motion | `--noksha-duration-*`, `--noksha-ease-*` | all animation reads these; `prefers-reduced-motion` zeroes durations globally |
| Z-index | `--noksha-z-*` | one ladder for the whole overlay stack |

### 3.4 Theming contract

```css
/* Light is the :root default. */
:root { --noksha-bg-canvas: oklch(0.995 0.002 285); … }

/* Dark applies through THREE selectors so every setup works: */
.dark,
[data-theme='dark'] { … }

@media (prefers-color-scheme: dark) {
  :root:not(.light):not([data-theme='light']) { … }
}
```

Rebranding is one declaration:

```css
:root { --noksha-brand: #0EA5E9; }  /* whole library follows */
```

**No-flash SSR:** `@noksha-ui/react` exports `themeScript`, a ~700-byte string
injected into `<head>` before paint. It reads `localStorage` + `matchMedia` and
stamps the class on `<html>` synchronously. `ThemeProvider` is a thin client
component that only handles toggling and cross-tab sync — the initial paint never
depends on React.

---

## 4. `@noksha-ui/core` — what we build vs. what we borrow

The a11y layer is written from scratch; that is the point of the library. Three
**non-UI** utilities are taken as dependencies because writing them would consume
sprints without differentiating anything.

### Built in-house

| Primitive | Why it matters |
| --- | --- |
| `FocusScope` | Focus trap with restore, sentinel-free, handles portal + iframe edge cases |
| `useDismissable` | Layer stack: Escape / outside-pointer / focus-out, correct nesting order |
| `useRovingFocus` | Arrow-key navigation for tabs, menus, toolbars, radio groups |
| `Portal` | SSR-safe, container-aware, ordered by z-ladder |
| `Slot` / `asChild` | Merge props + refs onto a child element without a wrapper DOM node |
| `useControllableState` | Controlled/uncontrolled duality with a single hook |
| `useScrollLock` | Body lock without layout shift (scrollbar-gutter aware), iOS-safe |
| `useTypeahead` | Type-to-select for Select / Menu / Combobox |
| `pv()` | Variant engine (~60 LOC) — CVA alternative with better type inference |

### Taken as dependencies (ADR-002)

| Dep | Size | Rationale |
| --- | --- | --- |
| `clsx` | 0.5 kB | className joining; re-exported through `cx()` so it can be dropped later |
| `tailwind-merge` | 7 kB | Resolves conflicting Tailwind classes (`px-2` vs `px-4`). Re-implementing means tracking every Tailwind release forever |
| `@floating-ui/react-dom` | 9 kB | Pure geometry for flip/shift/collision. No UI, no a11y opinions. Lazy-loaded — only overlay components pull it in |

`react` and `react-dom` are peer dependencies (`>=18`). Nothing else is.

---

## 5. Component API conventions

Every component follows the same contract, so learning one teaches the rest.

```tsx
<Button
  variant="solid"      // solid | soft | outline | ghost | link
  tone="accent"        // accent | neutral | danger | success | warning
  size="md"            // xs | sm | md | lg | xl
  asChild              // render as the child element (Link, etc.)
/>
```

Rules:

1. **`variant` = visual weight, `tone` = semantic color.** Never merged into one
   prop (`variant="danger-outline"` is what MUI/AntD get wrong).
2. **`asChild` everywhere** a component renders a single element — no wrapper divs.
3. **`className` always wins.** Internally merged through `cx()`, so user classes
   override library classes rather than fighting specificity.
4. **`data-*` state attributes** for styling: `data-state="open"`,
   `data-disabled`, `data-loading`. Animations hook these — no JS animation state.
5. **Forwarded refs on every component.** No exceptions.
6. **Compound components** for anything with parts: `Dialog.Root / .Trigger /
   .Content / .Title`. Flat props only for leaf components.
7. **Uncontrolled by default**, controlled when `value` + `onValueChange` are passed.
8. **Native form participation** — inputs carry `name`/`value` and work with
   `FormData` and server actions with no JS.

### Type safety as a feature

```ts
// iconOnly requires an accessible label — enforced at the type level
type ButtonProps =
  | { iconOnly: true; 'aria-label': string; children?: never }
  | { iconOnly?: false; children: React.ReactNode };
```

---

## 6. Reference component: Button

The pattern-setter. Everything after it copies this file structure.

```
packages/react/src/components/button/
├── button.tsx            component + forwardRef + asChild
├── button.variants.ts    pv() definition — the only place classes live
├── button.types.ts       public props, exported for consumers
├── button.test.tsx       Vitest + Testing Library
├── button.stories.tsx    dev harness
└── index.ts              barrel: Button, buttonVariants, type ButtonProps
```

Behaviour spec:

- `loading` sets `aria-busy`, disables interaction, swaps content for a spinner
  **while preserving the button's width** (no layout jump).
- `disabled` uses `aria-disabled` + pointer-events guard rather than the `disabled`
  attribute when the button is in a toolbar, so it stays keyboard-reachable.
- Focus ring is `:focus-visible` only, drawn with `outline` (not `ring`) so it
  never gets clipped by `overflow-hidden` parents.
- Icons get `aria-hidden` automatically; `iconOnly` demands `aria-label` by type.
- Press feedback is a CSS `scale(0.98)` on `:active`, gated behind
  `prefers-reduced-motion`.

---

## 7. Build & distribution

- **Bundler:** `tsup` (esbuild) → ESM + CJS + `.d.ts`.
- **Entry points:** one per component (`@noksha-ui/react/button`) plus a root barrel.
  Real tree-shaking regardless of the consumer's bundler.
- **`"use client"` banner** injected per client component at build time, so the
  root barrel stays importable from a React Server Component.
- **`sideEffects: false`** except for `*.css`.
- **Size budget in CI:** every component has a byte ceiling in `size-limit`.
  A PR that pushes Button past 3 kB gzipped fails. This is how the
  "lighter than MUI" claim stays true instead of decaying.

### Consumer setup (the "just install" promise)

```bash
pnpm add @noksha-ui/react
```

```css
/* app.css — Tailwind v4 */
@import 'tailwindcss';
@import '@noksha-ui/react/styles.css';
```

That's it. No provider, no config file, no `extend`. Tailwind v3 users add
`presets: [require('@noksha-ui/tailwind')]` instead.

### CLI (ownership path)

```bash
npx @noksha-ui/cli init          # writes theme CSS + tailwind wiring
npx @noksha-ui/cli add button    # copies source into ./components/ui
npx @noksha-ui/cli diff button   # shows upstream changes since you copied
```

`diff` is the piece shadcn lacks — copied code goes stale silently there.

> Note: unscoped `noksha-ui` is taken on npm, so the CLI is always invoked as
> `@noksha-ui/cli`.

---

## 8. Testing strategy

| Layer | Tool | Gate |
| --- | --- | --- |
| Unit / behaviour | Vitest + Testing Library | required per component |
| Accessibility | `vitest-axe` on every story | zero violations |
| Keyboard | explicit `userEvent.keyboard` tests | required for interactive components |
| Types | `tsc --noEmit` + `expect-type` assertions | CI |
| Visual regression | Playwright screenshots, light + dark | CI on PR |
| Bundle size | `size-limit` | per-component ceiling |

A component is not "done" until it passes all six.

---

## 9. Release process

- `changesets` for versioning; all `@noksha-ui/*` packages version in lockstep
  (`fixed` group) so version numbers never confuse consumers.
- GitHub Actions: `test → typecheck → size → build → changeset publish`.
- Conventional commits, `main` always releasable, `next` tag for prereleases.
- Every breaking change ships with a codemod in `@noksha-ui/cli migrate`.

---

## 10. Roadmap

### v0.1 — Foundation 20

| Phase | Contents |
| --- | --- |
| **1 · Foundation** | tokens engine · core primitives · theme + no-flash script · **Button** · Spinner |
| **2 · Forms** | Input · Textarea · Checkbox · Radio · Switch · Slider · Select · RHF + Zod adapter |
| **3 · Display** | Badge · Avatar · Card · Alert · Separator |
| **4 · Overlay** | Tooltip · Popover · Dialog · Drawer · Toast — one shared layer stack |
| **5 · Navigation** | Tabs · Accordion |
| **6 · Launch** | docs site · theme builder · CLI registry · npm publish |

### v0.2 — The differentiator

DataTable (sort / filter / paginate / row-select / virtualized) · DatePicker +
RangePicker · Combobox · Command palette · Form builder · Upload · Tree · Charts.

This is where Noksha beats shadcn and matches Ant Design — with a tenth of the
bundle and none of the CSS-in-JS runtime.

---

## 11. Decision records

| # | Decision | Rationale |
| --- | --- | --- |
| ADR-001 | npm package **and** copy-paste CLI | Convenience of MUI, ownership of shadcn — no forced trade-off |
| ADR-002 | Build a11y in-house, borrow geometry | Differentiation lives in a11y, not in collision math |
| ADR-003 | OKLCH over HSL | One lightness ramp works for every hue; scales are generatable, not hand-tuned |
| ADR-004 | CSS-first animation | Zero JS cost, RSC-safe, `motion` stays an optional adapter |
| ADR-005 | Tailwind v4 first, v3 via preset | v4 `@theme inline` maps CSS vars to utilities cleanly; v3 users are not stranded |
| ADR-006 | Biome over ESLint + Prettier | One tool, ~20× faster, near-zero config — contributors get instant feedback |
| ADR-007 | `variant` and `tone` as separate props | Avoids the combinatorial prop explosion MUI and AntD both hit |
| ADR-008 | Per-component size budget in CI | Performance claims decay without a gate |
