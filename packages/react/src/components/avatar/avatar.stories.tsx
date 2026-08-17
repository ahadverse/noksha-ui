import type { StoryGroup } from '../../stories.js';
import { Avatar } from './avatar.js';
import type { AvatarSize } from './avatar.types.js';

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export const avatarStories: StoryGroup = {
  component: 'Avatar',
  stories: [
    {
      name: 'Sizes',
      render: () => (
        <>
          {SIZES.map((size) => (
            <Avatar.Root key={size} size={size}>
              <Avatar.Fallback>AL</Avatar.Fallback>
            </Avatar.Root>
          ))}
        </>
      ),
    },
    {
      name: 'Shapes',
      render: () => (
        <>
          <Avatar.Root shape="circle">
            <Avatar.Fallback>AL</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root shape="rounded">
            <Avatar.Fallback>AL</Avatar.Fallback>
          </Avatar.Root>
        </>
      ),
    },
    {
      name: 'With an image',
      description:
        'The fallback sits underneath and the image fades in over it — no swap, no flicker.',
      render: () => (
        <>
          <Avatar.Root size="lg">
            <Avatar.Image
              src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%236D4AFF'/%3E%3C/svg%3E"
              alt="Ada Lovelace"
            />
            <Avatar.Fallback>AL</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root size="lg">
            <Avatar.Image src="/definitely-missing.png" alt="Grace Hopper" />
            <Avatar.Fallback>GH</Avatar.Fallback>
          </Avatar.Root>
        </>
      ),
    },
    {
      name: 'Group',
      description:
        'One size on the group keeps a dozen avatars in step; max collapses the tail into a counter.',
      render: () => (
        <Avatar.Group max={3} size="md">
          {['AL', 'GH', 'KJ', 'MR', 'TP'].map((initials) => (
            <Avatar.Root key={initials}>
              <Avatar.Fallback>{initials}</Avatar.Fallback>
            </Avatar.Root>
          ))}
        </Avatar.Group>
      ),
    },
    {
      name: 'Group spacing',
      render: () => (
        <div className="flex flex-col gap-3">
          {(['tight', 'normal', 'loose'] as const).map((spacing) => (
            <Avatar.Group key={spacing} spacing={spacing} size="sm">
              {['AL', 'GH', 'KJ'].map((initials) => (
                <Avatar.Root key={initials}>
                  <Avatar.Fallback>{initials}</Avatar.Fallback>
                </Avatar.Root>
              ))}
            </Avatar.Group>
          ))}
        </div>
      ),
    },
  ],
};
