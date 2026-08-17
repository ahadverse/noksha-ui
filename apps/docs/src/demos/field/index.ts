import type { Demo } from '@/lib/demos';

import FieldBasic from './basic';

export const fieldDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Label, description and error',
    description:
      'Field owns the ids. Any control inside it picks up `disabled`, `required` and `invalid` without being told twice.',
    Component: FieldBasic,
    minHeight: 340,
  },
];
