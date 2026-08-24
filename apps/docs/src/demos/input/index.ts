import type { Demo } from '@/lib/demos';

import InputAdvanced from './advanced';
import InputBasic from './basic';
import InputBold from './bold';
import InputContexts from './contexts';
import InputIcons from './icons';
import InputModern from './modern';
import InputPatterns from './patterns';
import InputSizes from './sizes';
import InputStates from './states';
import InputUnique from './unique';

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
  {
    id: 'states',
    title: 'State gallery',
    description:
      'Eight states side by side — default through success — so a status never has to be guessed from a diff.',
    Component: InputStates,
    minHeight: 340,
  },
  {
    id: 'bold',
    title: 'Bold styles',
    description:
      'Eight loud looks built with plain `className` on top of the same Input — neon, glass, a gradient ring, and more.',
    Component: InputBold,
    minHeight: 260,
  },
  {
    id: 'modern',
    title: 'Modern styles',
    description:
      'Seven quieter looks — frosted glass, a floating label, a floating card, an animated gradient border.',
    Component: InputModern,
    minHeight: 300,
  },
  {
    id: 'advanced',
    title: 'Advanced interactions',
    description:
      'Six behaviors layered on top of the plain Input — a password toggle, a debounced availability check, a copy field.',
    Component: InputAdvanced,
    minHeight: 620,
    stack: true,
  },
  {
    id: 'unique',
    title: 'Unique concepts',
    description:
      'Twelve less-common shapes — five one-time-code layouts, a focus tilt, a rotating placeholder, two volume sliders — each built from a different mechanism.',
    Component: InputUnique,
    minHeight: 760,
  },
  {
    id: 'contexts',
    title: 'In context',
    description:
      'The same Input dropped into six real layouts — a navbar, a chat composer, a login card, a command palette.',
    Component: InputContexts,
    minHeight: 900,
    stack: true,
  },
  {
    id: 'patterns',
    title: 'Composed patterns',
    description:
      'Twelve compositions built from Input plus one more part — an attached Select, seven date-range triggers sharing one two-month calendar popover, a tag list.',
    Component: InputPatterns,
    minHeight: 1600,
    stack: true,
  },
];
