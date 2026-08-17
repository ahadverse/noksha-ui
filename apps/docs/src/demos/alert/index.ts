import type { Demo } from '@/lib/demos';

import AlertWithActions from './actions';
import AlertTones from './tones';

export const alertDemos: Demo[] = [
  {
    id: 'tones',
    title: 'Tones',
    description: 'Each tone brings its own icon. Pass `icon={null}` to drop it.',
    Component: AlertTones,
    stack: true,
    minHeight: 320,
  },
  {
    id: 'actions',
    title: 'With actions',
    Component: AlertWithActions,
    stack: true,
    minHeight: 180,
  },
];
