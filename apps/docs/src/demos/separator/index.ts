import type { Demo } from '@/lib/demos';

import SeparatorBasic from './basic';

export const separatorDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Orientations',
    description:
      'Decorative by default — it stays out of the accessibility tree unless you say the division is meaningful.',
    Component: SeparatorBasic,
    minHeight: 240,
  },
];
