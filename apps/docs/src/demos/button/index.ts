import type { Demo } from '@/lib/demos';

import ButtonBackToTop from './back-to-top';
import ButtonBoldStyles from './bold-styles';
import ButtonComposed from './composed';
import ButtonEffects from './effects';
import ButtonFloating from './floating';
import ButtonIcons from './icons';
import ButtonLoading from './loading';
import ButtonPatterns from './patterns';
import ButtonShapes from './shapes';
import ButtonSizes from './sizes';
import ButtonSurfaces from './surfaces';
import ButtonTones from './tones';
import ButtonVariants from './variants';

export const buttonDemos: Demo[] = [
  {
    id: 'bold-styles',
    title: 'Bold styles',
    description:
      'Twenty-eight one-off looks built with plain `className` on top of the same Button — neon, glass, neumorphic, a rotating gradient border, a real ripple, a hold-to-confirm fill, a save button that morphs into a checkmark, a confetti burst, and a real progress fill, among others. Copy any tile on its own.',
    Component: ButtonBoldStyles,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'variants',
    title: 'Variants',
    description:
      'Visual weight, from most to least emphasis. Colour never comes from here. Every tile copies on its own.',
    Component: ButtonVariants,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'surfaces',
    title: 'Expressive variants',
    description:
      'Four surfaces beyond the flat set. Every colour in them is the tone you passed — the gradient runs along the tone’s own OKLCH ramp, and the glow is that same tone as a shadow.',
    Component: ButtonSurfaces,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'effects',
    title: 'Hover effects',
    description:
      'Point at each one. Effect is a third axis, independent of variant and tone, so any of the six works on any of the nine variants. All of them are inert under prefers-reduced-motion.',
    Component: ButtonEffects,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'composed',
    title: 'Three axes at once',
    description:
      'Variant, tone and effect chosen separately. None of these is a preset — there is no variant named after a use case anywhere in the library.',
    Component: ButtonComposed,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'patterns',
    title: 'Grouped, toggled, copied',
    description:
      'Three shipped patterns built on Button rather than beside it — ButtonGroup joins buttons into one control, ToggleButton holds a pressed state on aria-pressed, and CopyButton writes to the clipboard and announces it.',
    Component: ButtonPatterns,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'floating',
    title: 'Floating buttons',
    description:
      'FloatingButton pins one action to a corner — icon-only, extended with its label, in the gradient/glow/soft variants, with a pulse effect, or anchored to a different corner. FloatingMenu is the expandable version, shown here with hidden labels and a custom open icon too — both stack their actions with a staggered entrance, close on Escape or an outside press, and hand focus back to the trigger. Each tile pins to its own box through `container`, and copies on its own.',
    Component: ButtonFloating,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'back-to-top',
    title: 'Back to top',
    description:
      'Scroll the panel to watch it work. A passive rAF-throttled listener, visibility rather than opacity so it leaves the tab order while hidden, and focus handed back to the top after the scroll. Pass a container ref and it watches that element instead of the window.',
    Component: ButtonBackToTop,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'tones',
    title: 'Tones',
    description:
      'One prop repaints the whole button. Every tone declares the same seven slots, so there is no variant × tone matrix to maintain.',
    Component: ButtonTones,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Heights and padding derive from --noksha-density; one variable retunes them all.',
    Component: ButtonSizes,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'shapes',
    title: 'Shapes',
    description:
      'A third box axis beside size — `round` is the pill, `circle` the icon disc. It composes with every variant and every size rather than being a look of its own. Two groups show what that composes into: a notification bell and cart with count badges, an unread dot, a wishlist heart, an avatar; then back, close, a real play/pause toggle, a star rating, a kebab menu, a mic-mute toggle, help and location — all `Button`/`ToggleButton`, no bespoke controls.',
    Component: ButtonShapes,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'icons',
    title: 'With icons',
    description:
      '`icon` leads, `trailingIcon` follows, and `iconOnly` demands an `aria-label` — the type will not compile without one.',
    Component: ButtonIcons,
    minHeight: 220,
    wide: true,
  },
  {
    id: 'loading',
    title: 'Loading',
    description:
      'Click Save — the button holds its exact width while the spinner is in. `loadingPlacement="icon"` swaps the indicator into the leading icon’s slot instead, which keeps the label readable, and `loadingIcon` replaces the spinner with any node.',
    Component: ButtonLoading,
    minHeight: 280,
    wide: true,
  },
];
