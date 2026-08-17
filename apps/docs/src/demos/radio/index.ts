import type { Demo } from '@/lib/demos';

import RadioBasic from './basic';

export const radioDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Group',
    description:
      'Arrow keys move between options and select as they go — one Tab stop for the whole group, per the WAI-ARIA radio pattern.',
    Component: RadioBasic,
    minHeight: 260,
  },
];
