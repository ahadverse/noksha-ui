import type { Demo } from '@/lib/demos';

import ToastBasic from './basic';
import ToastPromise from './promise';

export const toastDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Tones and actions',
    description:
      'Hover a toast to pause its timer. `duration: Infinity` keeps one up until it is acted on.',
    Component: ToastBasic,
    minHeight: 160,
  },
  {
    id: 'promise',
    title: 'Updating in place',
    description: 'Pass the id you got back to replace a toast instead of stacking another.',
    Component: ToastPromise,
    minHeight: 140,
  },
];
