---
'@noksha-ui/tokens': patch
'@noksha-ui/tailwind': patch
'@noksha-ui/react': patch
---

Make dark mode work when the theme marker is not on `<html>`, including inside portalled overlays.

Two separate failures produced the same report — a page that goes dark while its drawers, dialogs,
tooltips, popovers, selects and toasts stay stubbornly light.

The first was in the generated stylesheet. Dark tokens were written to `:root.dark`, so an app that
puts the class on `<body>` or on a layout wrapper — a normal app, not a broken one — got light
tokens everywhere. The selector is now the bare `.dark` and `[data-theme='dark']` as well, which
also makes a themed island possible; and light is re-asserted through the matching `.light`
selectors, so a light subtree inside a dark ancestor is no longer inherited into darkness.

The second was structural, and the stylesheet alone could not fix it. Overlays render into
`document.body` to escape clipping and stacking ancestors, which also escapes any theme declared
below `<html>`. Every overlay now leaves a hidden marker where it logically sits, reads the mode
from there, and mirrors it onto the portalled subtree through a `display: contents` wrapper — a
wrapper that inherits and passes on the custom properties while generating no box, so nothing about
positioning, stacking or layout changes. It is read in a layout effect, before paint, and a
`MutationObserver` keeps it live, so toggling the theme with a drawer open repaints the drawer too.

Also fixes the registry generator dropping any internal file with a `.tsx` extension, which would
have left components copied through `noksha add` importing a file that was never written.
