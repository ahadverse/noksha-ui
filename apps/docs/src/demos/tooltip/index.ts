import type { Demo } from '@/lib/demos';

import TooltipBasic from './basic';

export const tooltipDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Toolbar hints',
    description:
      'Hover the first, then move along the row: the delay is spent once. That shared timer lives in the provider, which is why one wraps the app.',
    Component: TooltipBasic,
    minHeight: 160,
  },
];
