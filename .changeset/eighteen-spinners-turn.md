---
'@noksha-ui/tailwind': minor
'@noksha-ui/react': minor
---

Spinner ships eighteen designs behind one `variant` prop.

`ring`, `arc`, `dual`, `dash`, `segment` and `comet` are ways of drawing a circle; `dots`, `bounce`,
`beat`, `orbit` and `halo` are dots; `bars`, `wave` and `spokes` are bars; `pulse`, `ripple`, `grid`
and `flip` are shapes. `ring` is still the default and still looks exactly as it did.

Only the drawing changes. Every design takes the same five sizes, paints from `currentColor` rather
than owning a `tone`, carries the same `label` contract, and slows rather than freezes under
`prefers-reduced-motion` — so picking one is a purely visual decision and the set stays swappable.

The eighteen are composed from eight shared keyframes rather than eighteen of their own: geometry
and `animation-delay` are what separate the dot ring from the spoke ring, not a second copy of the
same fade. All eight are registered in the generated stylesheet and in the v3 preset together, so
both install paths get them. Every part inside a spinner is laid out as a percentage of its box,
which is what lets one `size` govern the whole set.

Two variables carry the tuning. `--noksha-spinner-duration` is the tempo, set per design and
lengthened under reduced motion; `--noksha-spinner-stroke` is the line weight for the two designs
drawn with a CSS border or mask rather than an SVG stroke. Both can be overridden by a caller.

**Breaking:** the rendered element is now a `<span>` wrapping the drawing, not a bare `<svg>` — a
set of eighteen cannot all be one SVG. `SpinnerProps` therefore extends `HTMLAttributes<HTMLSpanElement>`
instead of `SVGProps<SVGSVGElement>`. `size`, `label` and `className` are unchanged, and the ARIA
contract moved onto the span untouched, so anything passing only those keeps working.
