import type { Demo } from '@/lib/demos';

import RadioBasic from './basic';
import RadioBoldStyles from './bold-styles';
import RadioCards from './cards';
import RadioControlled from './controlled';
import RadioDisabled from './disabled';
import RadioFlipBadge from './flip-badge';
import RadioIconTiles from './icon-tiles';
import RadioInline from './inline';
import RadioInvalid from './invalid';
import RadioNavList from './nav-list';
import RadioOrientation from './orientation';
import RadioPulseList from './pulse-list';
import RadioRotaryDial from './rotary-dial';
import RadioSegmented from './segmented';
import RadioSizes from './sizes';
import RadioTones from './tones';
import RadioWheelPicker from './wheel-picker';
import RadioWithText from './with-text';

export const radioDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Group',
    description:
      'Arrow keys move between options and select as they go — one Tab stop for the whole group, per the WAI-ARIA radio pattern.',
    Component: RadioBasic,
    minHeight: 220,
    wide: true,
  },
  {
    id: 'bold-styles',
    title: 'Bold styles',
    description:
      'Twelve looks built entirely from `className`, `containerClassName` and the `--rd-solid` variable — neon, a diamond, a gradient ring, glass, and more, with no fork of the component underneath any of them. Copy any tile on its own.',
    Component: RadioBoldStyles,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description:
      'Three sizes on the same control scale the rest of the library uses. Each tile copies on its own.',
    Component: RadioSizes,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'tones',
    title: 'Tones',
    description:
      'The six semantic tones, each repointing the same `--rd-solid` variable the ring and dot are built from. Each tile copies on its own.',
    Component: RadioTones,
    minHeight: 360,
    wide: true,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description:
      'A disabled radio is still a real input — `:disabled` drives the dimmed ring and the cursor together, not just the colour. Each tile copies on its own.',
    Component: RadioDisabled,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'with-text',
    title: 'With text',
    description:
      'A label and a line of helper text per option, wired to the control through `Field.Description` rather than a hand-written `aria-describedby`.',
    Component: RadioWithText,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'cards',
    title: 'Selectable cards',
    description:
      'The radio drives the whole card through `:has(:checked)` — no click handler on the card itself, and only one can ever be selected.',
    Component: RadioCards,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'orientation',
    title: 'Orientation',
    description:
      '`orientation` swaps `aria-orientation` and the flex direction together, so arrow-key navigation always matches the layout it drives. Each tile copies on its own.',
    Component: RadioOrientation,
    minHeight: 240,
    wide: true,
  },
  {
    id: 'inline',
    title: 'Inline',
    description:
      'Compact, `sm`-sized radios sharing one horizontal group, for a size picker rather than a form.',
    Component: RadioInline,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'invalid',
    title: 'Invalid',
    description:
      'Field only marks the group invalid after a first submit attempt, and `Field.Error` mounts nothing until then — an always-present error paragraph gets announced as empty by some screen readers before the user has done anything wrong.',
    Component: RadioInvalid,
    minHeight: 260,
    wide: true,
  },
  {
    id: 'controlled',
    title: 'Controlled',
    description:
      '`value` and `onValueChange` are the entire contract — the buttons below prove it by driving the group from outside, with no internal state of their own to fight.',
    Component: RadioControlled,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'nav-list',
    title: 'Nav list',
    description:
      'A sidebar-style picker — one option checked at a time, a hidden radio behind each row, and a left accent bar driven by `has-[:checked]` rather than a click handler.',
    Component: RadioNavList,
    minHeight: 260,
    wide: true,
  },
  {
    id: 'pulse-list',
    title: 'Pulse list',
    description:
      'The dot itself is still a real `Radio` — only `className` and `dotClassName` change — highlighted inside a row whose border reacts to the same `:checked` state.',
    Component: RadioPulseList,
    minHeight: 220,
    wide: true,
  },
  {
    id: 'icon-tiles',
    title: 'Icon tiles',
    description:
      'The same hidden-radio pattern in two layouts — a grid of square tiles and a list of pills — both driven by `has-[:checked]` on the label, no click handler on the tile. Each layout copies on its own.',
    Component: RadioIconTiles,
    minHeight: 320,
    wide: true,
  },
  {
    id: 'segmented',
    title: 'Segmented',
    description:
      'Five sliding-glider segmented controls — pill tabs, dark blocks, glass tiers, a vertical edge-light, and a glass dial — each a real `RadioGroup` with the glider position computed from the selected index. Copy any tile on its own.',
    Component: RadioSegmented,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'flip-badge',
    title: 'Flip badge',
    description:
      'A 3D flip card next to each option, rotated by `group-has-[:checked]` rather than a click handler on the badge itself.',
    Component: RadioFlipBadge,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'rotary-dial',
    title: 'Rotary dial',
    description:
      'Six radios arranged around a dial, each positioned with `rotate → translate → counter-rotate`; the pointer angle is computed from the selected index rather than hand-tuned per option.',
    Component: RadioRotaryDial,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'wheel-picker',
    title: 'Wheel picker',
    description:
      'A vertical picker where the unselected rows fade, shrink and blur by their distance from the selected one — the distance is computed in React, not chained per-option CSS.',
    Component: RadioWheelPicker,
    minHeight: 290,
    wide: true,
  },
];
