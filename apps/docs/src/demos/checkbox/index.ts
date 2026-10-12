import type { Demo } from '@/lib/demos';

import CheckboxBasic from './basic';
import CheckboxBoldStyles from './bold-styles';
import CheckboxCard from './card';
import CheckboxControlled from './controlled';
import CheckboxCustom from './custom';
import CheckboxDisabled from './disabled';
import CheckboxForm from './form';
import CheckboxGroup from './group';
import CheckboxInline from './inline';
import CheckboxInvalid from './invalid';
import CheckboxNestedGroups from './nested-groups';
import CheckboxSelectAll from './select-all';
import CheckboxSizes from './sizes';
import CheckboxTable from './table';
import CheckboxTones from './tones';
import CheckboxWithText from './with-text';

export const checkboxDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Basic',
    description:
      'The three states a checkbox can be in — unchecked, checked and indeterminate — with nothing but native input attributes and CSS driving the look. Each tile copies on its own.',
    Component: CheckboxBasic,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'bold-styles',
    title: 'Bold styles',
    description:
      'Fourteen looks built entirely from `className`, `containerClassName` and the `--cb-solid`/`--cb-ink` variables — a gradient fill, neon, a diamond, a gradient ring, glass, and more, with no fork of the component underneath any of them. Copy any tile on its own.',
    Component: CheckboxBoldStyles,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description:
      'Three sizes on the same control scale the rest of the library uses. Each tile copies on its own.',
    Component: CheckboxSizes,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'tones',
    title: 'Tones',
    description:
      'The six semantic tones, each repointing the same `--cb-solid` and `--cb-ink` variables the box and check mark are built from. Each tile copies on its own.',
    Component: CheckboxTones,
    minHeight: 360,
    wide: true,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description:
      'A disabled checkbox is still a real input — `:disabled` drives the dimmed box and the cursor together, not just the colour. Each tile copies on its own.',
    Component: CheckboxDisabled,
    minHeight: 360,
    wide: true,
  },
  {
    id: 'with-text',
    title: 'With text',
    description:
      'A label and a line of helper text, wired to the control through `Field.Description` rather than a hand-written `aria-describedby`.',
    Component: CheckboxWithText,
    minHeight: 220,
    wide: true,
  },
  {
    id: 'group',
    title: 'Group',
    description:
      'Independent checkboxes with no shared parent — each one owns its own boolean, and the count below is derived, not stored.',
    Component: CheckboxGroup,
    minHeight: 240,
    wide: true,
  },
  {
    id: 'select-all',
    title: 'Check all section',
    description:
      'The classic three-state parent. Toggle a child and the parent goes half-checked on its own, since `indeterminate` is read straight off the selection.',
    Component: CheckboxSelectAll,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'nested-groups',
    title: 'Nested groups',
    description:
      "Indeterminate composes: each group's own select-all checkbox rolls up into a master checkbox one level above it, with no special case for the extra level.",
    Component: CheckboxNestedGroups,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'card',
    title: 'Selectable cards',
    description:
      'The checkbox drives the whole card through `:has(:checked)` — no click handler on the card itself, and no state beyond which id is selected.',
    Component: CheckboxCard,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'table',
    title: 'Table row selection',
    description:
      'The header checkbox is indeterminate when some but not all rows are selected, and drives every row through the same `checked`/`onCheckedChange` pair each row already uses on its own.',
    Component: CheckboxTable,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'inline',
    title: 'Inline',
    description:
      'Compact, `sm`-sized checkboxes in a wrapped row, for a filter bar rather than a form.',
    Component: CheckboxInline,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'custom',
    title: 'Custom checkbox',
    description:
      '`className` restyles the box and `containerClassName` reaches the `--cb-solid` and `--cb-ink` variables directly — both win over the tone class because caller classes are always the last ones merged. Each tile copies on its own.',
    Component: CheckboxCustom,
    minHeight: 360,
    wide: true,
  },
  {
    id: 'invalid',
    title: 'Invalid',
    description:
      'Field only marks the checkbox invalid after a first submit attempt, and `Field.Error` mounts nothing until then — an always-present error paragraph gets announced as empty by some screen readers before the user has done anything wrong.',
    Component: CheckboxInvalid,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'controlled',
    title: 'Controlled',
    description:
      '`checked` and `onCheckedChange` are the entire contract — the buttons below prove it by driving all four checkboxes from outside, with no internal state of their own to fight.',
    Component: CheckboxControlled,
    minHeight: 220,
    wide: true,
  },
  {
    id: 'form',
    title: 'Native form',
    description:
      'A real `<form>` submit, read with `FormData` — every checked box posts its `value` under the shared `name`, and an unchecked one is simply absent. No JavaScript required to get there.',
    Component: CheckboxForm,
    minHeight: 220,
    wide: true,
  },
];
