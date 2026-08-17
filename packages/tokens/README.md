# @noksha-ui/tokens

The OKLCH colour engine behind [Noksha UI](https://nokshaui.com/docs) — one seed colour in,
eleven perceptually even steps out, plus every non-colour token the components read.

[Documentation](https://nokshaui.com/docs/theming) · [Theme builder](https://nokshaui.com/themes) · [GitHub](https://github.com/ahadverse/noksha-ui)

```bash
pnpm add -D @noksha-ui/tokens
```

A build-time dependency. You only need it if you are generating a theme; `@noksha-ui/react` ships
the default theme already compiled into its stylesheet.

## Generate a theme

```ts
import { buildTheme, emitThemeCss } from '@noksha-ui/tokens';

const theme = buildTheme({ brand: '#6D4AFF' });
const css = emitThemeCss(theme);
```

`css` is a `:root { … }` block of `--noksha-*` custom properties plus its dark counterpart — write it
to a file and import it after `@noksha-ui/react/styles.css` to override the defaults.

Only the accent ramp follows the brand. `danger`, `success`, `warning` and `info` keep their own
hues, because a rebrand should not make a destructive action look safe.

## Colour utilities

```ts
import { generateScale, readableOn, contrastRatio, parseColor } from '@noksha-ui/tokens/color';

generateScale('#6D4AFF');          // 50 → 950, even in perceptual lightness
readableOn('#6D4AFF');             // the text colour that passes on that background
contrastRatio('#fff', '#6D4AFF');  // WCAG ratio
```

Everything is computed in OKLCH and gamut-mapped back into sRGB, so a ramp stays even in lightness
instead of collapsing at the dark end the way HSL ramps do. `meetsContrast` and `CONTRAST_THRESHOLDS`
cover the WCAG checks.

## Non-colour tokens

`radiusTokens`, `motionTokens`, `shadowTokens`, `typographyTokens`, `densityTokens`, `focusTokens`,
`zIndexTokens`, `scaleTokens` — and `reducedMotionTokens`, which is what lets the components drop
their animations under `prefers-reduced-motion` without a media query in every component.

## Licence

MIT
