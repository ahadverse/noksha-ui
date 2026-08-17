import type { Demo } from '@/lib/demos';

import TabsVariants from './variants';
import TabsVertical from './vertical';

export const tabsDemos: Demo[] = [
  {
    id: 'variants',
    title: 'Variants',
    description:
      'One Tab stop reaches the strip; arrow keys move along it. Switch to `activationMode="manual"` when a panel fetches on mount.',
    Component: TabsVariants,
    minHeight: 420,
  },
  {
    id: 'vertical',
    title: 'Vertical',
    description: 'Up and Down replace Left and Right; the roving focus follows the orientation.',
    Component: TabsVertical,
    minHeight: 220,
  },
];
