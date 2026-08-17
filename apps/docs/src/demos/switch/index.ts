import type { Demo } from '@/lib/demos';

import SwitchBasic from './basic';

export const switchDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Settings toggle',
    description:
      'Use a switch when the change takes effect immediately, and a checkbox when it is submitted with a form.',
    Component: SwitchBasic,
    minHeight: 240,
  },
];
