import type { Demo } from '@/lib/demos';

import SelectAdornments from './adornments';
import SelectBasic from './basic';
import SelectControlled from './controlled';
import SelectForms from './forms';
import SelectGrouped from './grouped';
import SelectGroups from './groups';
import SelectLongLists from './long-lists';
import SelectPlacement from './placement';
import SelectRichRows from './rich-rows';
import SelectShells from './shells';
import SelectSizes from './sizes';
import SelectStates from './states';
import SelectTones from './tones';

export const selectDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Single choice',
    description:
      'A listbox, not a native `<select>` — so it can be styled, but it still posts with a form through a hidden input.',
    Component: SelectBasic,
    minHeight: 260,
  },
  { id: 'groups', title: 'Grouped options', Component: SelectGroups, minHeight: 200 },
  {
    id: 'shells',
    title: 'Trigger shells',
    description:
      'Thirteen shells over one listbox. `variant` and `size` carry the shape; `renderValue` is what puts an icon, a glyph or a status dot in front of the label. Every tile copies on its own.',
    Component: SelectShells,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description:
      'All five control sizes, then the same scale combined with shape overrides so a compact form and a hero form use one component.',
    Component: SelectSizes,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'states',
    title: 'States',
    description:
      'Placeholder, disabled, invalid and required — on the root, on individual options, and wired through `FieldRoot` for label and error text.',
    Component: SelectStates,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'adornments',
    title: 'Prefixes and suffixes',
    description:
      '`renderValue` owns the trigger content, so a flag, an avatar, a count, a price or a keyboard hint all sit inside the same control.',
    Component: SelectAdornments,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'grouped',
    title: 'Grouping',
    description:
      'Groups with and without a leading ungrouped item, disabled sections, emoji labels, and lists wide enough to break out of the trigger.',
    Component: SelectGrouped,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'rich-rows',
    title: 'Rich option rows',
    description:
      'Two-line rows, avatars and trailing metadata. `textValue` keeps type-to-select working when the label is no longer plain text.',
    Component: SelectRichRows,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'placement',
    title: 'Placement',
    description:
      '`side`, `align`, `sideOffset` and `collisionPadding` on the content, plus `matchTriggerWidth` against a free-width list.',
    Component: SelectPlacement,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'tones',
    title: 'Semantic tones',
    description:
      'Neutral, accent, success, warning and danger — each as a subtle fill, a solid fill and an edge treatment, all from the token set.',
    Component: SelectTones,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'controlled',
    title: 'Controlled patterns',
    description:
      'Dependent selects, mirrored state, reset and clear buttons, a controlled `open`, and two triggers bound to one value. Each tile copies with its own state.',
    Component: SelectControlled,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'forms',
    title: 'Forms',
    description:
      '`name` posts through a hidden input. The rest is `FieldRoot` — labels, descriptions, errors, sizes and a real submit.',
    Component: SelectForms,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'long-lists',
    title: 'Long lists',
    description:
      'Twenty-four timezones and thirty years. The size middleware caps the list to the space below the trigger; type a letter to jump.',
    Component: SelectLongLists,
    minHeight: 420,
    wide: true,
  },
];
