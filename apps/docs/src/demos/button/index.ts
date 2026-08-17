import type { Demo } from '@/lib/demos';

import ButtonIcons from './icons';
import ButtonLoading from './loading';
import ButtonSizes from './sizes';
import ButtonTones from './tones';
import ButtonVariants from './variants';

export const buttonDemos: Demo[] = [
  {
    id: 'variants',
    title: 'Variants',
    description: 'Visual weight, from most to least emphasis. Colour never comes from here.',
    Component: ButtonVariants,
  },
  {
    id: 'tones',
    title: 'Tones',
    description:
      'One prop repaints the whole button. Every tone declares the same seven slots, so there is no variant × tone matrix to maintain.',
    Component: ButtonTones,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Heights and padding derive from --noksha-density; one variable retunes them all.',
    Component: ButtonSizes,
  },
  { id: 'icons', title: 'With icons', Component: ButtonIcons },
  {
    id: 'loading',
    title: 'Loading',
    description: 'Click Save — the button holds its exact width while the spinner is in.',
    Component: ButtonLoading,
  },
];
