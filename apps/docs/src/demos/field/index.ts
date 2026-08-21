import type { Demo } from '@/lib/demos';

import FieldBasic from './basic';
import FieldCheckbox from './checkbox';
import FieldColor from './color';
import FieldCurrency from './currency';
import FieldCustom from './custom';
import FieldDate from './date';
import FieldEmail from './email';
import FieldFile from './file';
import FieldNumber from './number';
import FieldPassword from './password';
import FieldRadio from './radio';
import FieldSearch from './search';
import FieldSelect from './select';
import FieldSlider from './slider';
import FieldSwitch from './switch';
import FieldTel from './tel';
import FieldText from './text';
import FieldTextarea from './textarea';
import FieldTime from './time';
import FieldUrl from './url';

export const fieldDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Label, description and error',
    description:
      'Field owns the ids. Any control inside it picks up `disabled`, `required` and `invalid` without being told twice.',
    Component: FieldBasic,
    minHeight: 340,
  },
  {
    id: 'text',
    title: 'Text',
    description: 'The workspace URL below the field is derived from what you type, not hard-coded.',
    Component: FieldText,
    minHeight: 140,
  },
  {
    id: 'email',
    title: 'Email',
    description:
      'A debounced availability check swaps the helper text for `Field.Error` the moment a taken address is typed.',
    Component: FieldEmail,
    minHeight: 160,
  },
  {
    id: 'password',
    title: 'Password',
    description: 'A strength meter reads the same value as the input, computed on every keystroke.',
    Component: FieldPassword,
    minHeight: 180,
  },
  {
    id: 'number',
    title: 'Number',
    description: 'The helper text is a live price, not a static hint.',
    Component: FieldNumber,
    minHeight: 140,
  },
  {
    id: 'tel',
    title: 'Phone',
    description:
      'Digits are formatted into `(555) 000-0000` as you type — only the digits are ever stored.',
    Component: FieldTel,
    minHeight: 140,
  },
  {
    id: 'url',
    title: 'URL',
    description:
      'The hostname shown below is parsed from the value with the real `URL` constructor.',
    Component: FieldUrl,
    minHeight: 140,
  },
  {
    id: 'search',
    title: 'Search',
    description: 'Filters a fixed list as you type — no library involved beyond the field itself.',
    Component: FieldSearch,
    minHeight: 220,
  },
  {
    id: 'date',
    title: 'Date',
    description:
      'A fully custom calendar popover — no native `<input type="date">` in sight. Anchor positioning, focus trapping and dismissal come from the same primitives Select is built on; arrow keys, Home/End and Page Up/Down move focus around the grid.',
    Component: FieldDate,
    minHeight: 160,
  },
  {
    id: 'time',
    title: 'Time',
    description: 'Picking a time outside the maintenance window marks the field invalid, live.',
    Component: FieldTime,
    minHeight: 180,
  },
  {
    id: 'color',
    title: 'Color',
    description:
      'The contrast ratio against white is computed from the picked color and checked against WCAG AA.',
    Component: FieldColor,
    minHeight: 160,
  },
  {
    id: 'file',
    title: 'File',
    description: 'Picking a file over 2MB marks the field invalid and swaps in `Field.Error`.',
    Component: FieldFile,
    minHeight: 160,
  },
  {
    id: 'currency',
    title: 'Currency',
    description:
      'Digits are grouped with thousands separators as you type, using `Intl.NumberFormat`.',
    Component: FieldCurrency,
    minHeight: 120,
  },
  {
    id: 'textarea',
    title: 'Textarea',
    description: 'A live character count turns red as the field nears its limit.',
    Component: FieldTextarea,
    minHeight: 200,
  },
  {
    id: 'select',
    title: 'Select',
    description:
      'Choosing a country repopulates the city options below it — two Fields, one dependency.',
    Component: FieldSelect,
    minHeight: 260,
    stack: true,
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'Checking the box mounts a second, required Field beneath it.',
    Component: FieldCheckbox,
    minHeight: 200,
  },
  {
    id: 'radio',
    title: 'Radio group',
    description: 'Picking "Something else" reveals a follow-up text field.',
    Component: FieldRadio,
    minHeight: 240,
  },
  {
    id: 'switch',
    title: 'Switch',
    description:
      'Flipping the switch toggles `required` and `disabled` on the Field below it — both read live off the switch state.',
    Component: FieldSwitch,
    minHeight: 220,
  },
  {
    id: 'slider',
    title: 'Slider',
    description: 'The monthly cost below is computed straight from the slider value.',
    Component: FieldSlider,
    minHeight: 160,
  },
  {
    id: 'custom',
    title: 'Custom control',
    description:
      "A star rating built with plain buttons — not a library control. `useFieldControl` wires the field's id and aria straight onto it, the same way every built-in control does.",
    Component: FieldCustom,
    minHeight: 180,
  },
];
