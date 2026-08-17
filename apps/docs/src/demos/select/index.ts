import type { Demo } from '@/lib/demos';

import SelectBasic from './basic';
import SelectGroups from './groups';

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
];
