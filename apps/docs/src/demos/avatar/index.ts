import type { Demo } from '@/lib/demos';

import AvatarBasic from './basic';
import AvatarGroupDemo from './group';

export const avatarDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Sizes and shapes',
    description:
      'The fallback waits until the image is known to have failed, so a cached avatar never flashes initials first.',
    Component: AvatarBasic,
    minHeight: 140,
  },
  {
    id: 'group',
    title: 'Group',
    description: 'Overlapping stack with a `+n` counter past `max`.',
    Component: AvatarGroupDemo,
    minHeight: 140,
  },
];
