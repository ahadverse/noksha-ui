import type { Demo } from '@/lib/demos';

import InputBasic from './basic';
import InputIcons from './icons';
import InputSizes from './sizes';

export const inputDemos: Demo[] = [
  { id: 'basic', title: 'Variants and states', Component: InputBasic, minHeight: 300 },
  {
    id: 'icons',
    title: 'Affixes',
    description:
      'Decorative only. Anything a user can click belongs outside the field, where it can own its own focus.',
    Component: InputIcons,
    minHeight: 220,
  },
  { id: 'sizes', title: 'Sizes', Component: InputSizes, minHeight: 300 },
];
