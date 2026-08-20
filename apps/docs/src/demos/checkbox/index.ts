import type { Demo } from '@/lib/demos';

import CheckboxBasic from './basic';
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
      'The three states a checkbox can be in — unchecked, checked and indeterminate — with nothing but native input attributes and CSS driving the look.',
    Component: CheckboxBasic,
    minHeight: 180,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Three sizes on the same control scale the rest of the library uses.',
    Component: CheckboxSizes,
    minHeight: 120,
  },
  {
    id: 'tones',
    title: 'Tones',
    description:
      'The six semantic tones, each repointing the same `--cb-solid` and `--cb-ink` variables the box and check mark are built from.',
    Component: CheckboxTones,
    minHeight: 140,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description:
      'A disabled checkbox is still a real input — `:disabled` drives the dimmed box and the cursor together, not just the colour.',
    Component: CheckboxDisabled,
    minHeight: 200,
  },
  {
    id: 'with-text',
    title: 'With text',
    description:
      'A label and a line of helper text, wired to the control through `Field.Description` rather than a hand-written `aria-describedby`.',
    Component: CheckboxWithText,
    minHeight: 260,
  },
  {
    id: 'group',
    title: 'Group',
    description:
      'Independent checkboxes with no shared parent — each one owns its own boolean, and the count below is derived, not stored.',
    Component: CheckboxGroup,
    minHeight: 300,
  },
  {
    id: 'select-all',
    title: 'Check all section',
    description:
      'The classic three-state parent. Toggle a child and the parent goes half-checked on its own, since `indeterminate` is read straight off the selection.',
    Component: CheckboxSelectAll,
    minHeight: 260,
  },
  {
    id: 'nested-groups',
    title: 'Nested groups',
    description:
      "Indeterminate composes: each group's own select-all checkbox rolls up into a master checkbox one level above it, with no special case for the extra level.",
    Component: CheckboxNestedGroups,
    minHeight: 420,
  },
  {
    id: 'card',
    title: 'Selectable cards',
    description:
      'The checkbox drives the whole card through `:has(:checked)` — no click handler on the card itself, and no state beyond which id is selected.',
    Component: CheckboxCard,
    minHeight: 260,
    stack: true,
  },
  {
    id: 'table',
    title: 'Table row selection',
    description:
      'The header checkbox is indeterminate when some but not all rows are selected, and drives every row through the same `checked`/`onCheckedChange` pair each row already uses on its own.',
    Component: CheckboxTable,
    minHeight: 320,
    stack: true,
  },
  {
    id: 'inline',
    title: 'Inline',
    description:
      'Compact, `sm`-sized checkboxes in a wrapped row, for a filter bar rather than a form.',
    Component: CheckboxInline,
    minHeight: 100,
  },
  {
    id: 'custom',
    title: 'Custom checkbox',
    description:
      '`className` restyles the box and `containerClassName` reaches the `--cb-solid` and `--cb-ink` variables directly — both win over the tone class because caller classes are always the last ones merged.',
    Component: CheckboxCustom,
    minHeight: 140,
  },
  {
    id: 'invalid',
    title: 'Invalid',
    description:
      'Field only marks the checkbox invalid after a first submit attempt, and `Field.Error` mounts nothing until then — an always-present error paragraph gets announced as empty by some screen readers before the user has done anything wrong.',
    Component: CheckboxInvalid,
    minHeight: 220,
  },
  {
    id: 'controlled',
    title: 'Controlled',
    description:
      '`checked` and `onCheckedChange` are the entire contract — the buttons below prove it by driving all four checkboxes from outside, with no internal state of their own to fight.',
    Component: CheckboxControlled,
    minHeight: 300,
  },
  {
    id: 'form',
    title: 'Native form',
    description:
      'A real `<form>` submit, read with `FormData` — every checked box posts its `value` under the shared `name`, and an unchecked one is simply absent. No JavaScript required to get there.',
    Component: CheckboxForm,
    minHeight: 320,
  },
];
