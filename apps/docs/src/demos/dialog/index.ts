import type { Demo } from '@/lib/demos';

import DialogBasic from './basic';
import DialogDestructive from './destructive';

export const dialogDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Form dialog',
    description:
      'Open it and press Tab repeatedly — focus never leaves. Escape closes it and puts focus back on the trigger.',
    Component: DialogBasic,
    minHeight: 160,
  },
  { id: 'destructive', title: 'Confirmation', Component: DialogDestructive, minHeight: 160 },
];
