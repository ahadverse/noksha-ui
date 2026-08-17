import type { Demo } from '@/lib/demos';

import SpinnerBasic from './basic';

export const spinnerDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Sizes and colour',
    description:
      'It has no tone prop — the spinner inherits `currentColor`, so it matches whatever it sits inside.',
    Component: SpinnerBasic,
    minHeight: 120,
  },
];
