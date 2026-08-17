import type { Demo } from '@/lib/demos';

import DrawerSides from './sides';

export const drawerDemos: Demo[] = [
  {
    id: 'sides',
    title: 'All four edges',
    description:
      'A Dialog wearing a different surface — the same focus trap, scroll lock and dismiss stack, so the two can only differ in looks.',
    Component: DrawerSides,
    minHeight: 160,
  },
];
