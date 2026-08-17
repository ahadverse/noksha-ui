import type { Demo } from '@/lib/demos';

import TextareaBasic from './basic';

export const textareaDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Fixed and auto-sizing',
    description:
      '`autoSize` forces `resize: none` — a box that resizes itself and can also be dragged fights the user.',
    Component: TextareaBasic,
    minHeight: 340,
  },
];
