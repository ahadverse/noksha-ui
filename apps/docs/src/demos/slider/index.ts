import type { Demo } from '@/lib/demos';

import SliderBasic from './basic';

export const sliderDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Value and steps',
    description:
      '`formatValue` shapes both the visible number and the one `aria-valuetext` announces, so the two cannot disagree.',
    Component: SliderBasic,
    minHeight: 280,
  },
];
