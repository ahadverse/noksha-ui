import type { Demo } from '@/lib/demos';

import BadgeStatus from './status';
import BadgeVariants from './variants';

export const badgeDemos: Demo[] = [
  { id: 'variants', title: 'Variants', Component: BadgeVariants, minHeight: 120 },
  {
    id: 'status',
    title: 'Status dots',
    description: 'The `dot` prop is what makes a badge readable at a glance in a long list.',
    Component: BadgeStatus,
    minHeight: 120,
  },
];
