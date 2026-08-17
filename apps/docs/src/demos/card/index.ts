import type { Demo } from '@/lib/demos';

import CardBasic from './basic';
import CardVariants from './variants';

export const cardDemos: Demo[] = [
  { id: 'basic', title: 'Anatomy', Component: CardBasic, minHeight: 320 },
  {
    id: 'variants',
    title: 'Variants',
    description: 'Four surfaces, from raised to no chrome at all.',
    Component: CardVariants,
    minHeight: 220,
  },
];
