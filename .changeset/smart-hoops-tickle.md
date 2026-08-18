---
'@noksha-ui/tailwind': minor
'@noksha-ui/react': minor
---

Expand Button: four expressive variants, a hover-effect axis, and six patterns built on it.

`variant` gains `gradient`, `glass`, `glow` and `dashed`. Each is built from the tone variables it
already had, so the gradient runs along the tone's own OKLCH ramp and the glow is that tone as a
shadow — none of them introduces a colour the theme did not choose.

`effect` is a new prop, deliberately orthogonal to `variant` and `tone` for the same reason those
two are kept apart (ADR-007): `lift`, `sheen`, `wipe`, `pulse`, `tilt` and `none`. Nine variants,
six tones and six effects compose freely, so an effect written once works on a variant added later.
Every effect paints from `--btn-current`, and all of them are inert under `prefers-reduced-motion`.
Only `pulse` needs a keyframe, and it is registered in the generated stylesheet and the v3 preset
together so both install paths get it.

Six components ship alongside Button, in its own registry item rather than beside it:

- `ButtonGroup` joins buttons into one control, collapsing the borders between them.
- `ToggleButton` holds a pressed state on `aria-pressed`, controlled or uncontrolled.
- `CopyButton` writes to the clipboard, confirms for two seconds, and announces it politely.
- `FloatingButton` pins one action to a corner, icon-only or extended with its label.
- `FloatingMenu` is the expandable form: a staggered entrance, Escape and outside-press to close,
  and focus handed back to the trigger on select.
- `ScrollToTop` is the back-to-top pattern — a passive rAF-throttled listener, `visibility` rather
  than `opacity` so it leaves the tab order while hidden, and focus returned to the top after the
  scroll.

The three floating components take an optional `container` ref and pin inside that element instead
of the viewport, which is also what lets `ScrollToTop` watch a scrolling panel rather than the
window.

Button also gains a `shape` axis and two loading controls.

`shape` is `default`, `round` or `circle` — the pill and the icon disc, kept off `variant` for the
same reason `effect` is, so either works on any of the nine variants and any of the five sizes.
`circle` squares the aspect and drops the padding, which makes it the shape an icon button wants
without `iconOnly` having to mean two things at once.

`loadingIcon` replaces the default `Spinner`, and `loadingPlacement` chooses how it is shown:
`overlay` (the existing behaviour, unchanged) blanks the content and holds the button's width, and
`icon` puts the indicator in the leading icon's slot so the label stays readable — the better read
when the label names what is being waited on.
