import type { Demo } from '@/lib/demos';

import PopoverBasic from './basic';

export const popoverDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Form in a popover',
    description:
      'Focus moves in on open and returns to the trigger on close. Escape and an outside click both dismiss it.',
    Component: PopoverBasic,
    minHeight: 220,
  },
];
