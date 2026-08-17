import type { Demo } from '@/lib/demos';

import CheckboxBasic from './basic';

export const checkboxDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Indeterminate parent',
    description:
      'The classic three-state group. Toggle a child and the parent goes half-checked on its own.',
    Component: CheckboxBasic,
    minHeight: 260,
  },
];
