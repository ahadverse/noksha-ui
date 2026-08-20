import type { StoryGroup } from '../../stories.js';
import { Skeleton } from './skeleton.js';
import type { SkeletonVariant } from './skeleton.types.js';

const MOVING: SkeletonVariant[] = ['pulse', 'breathe', 'blink', 'fade'];
const SWEEPS: SkeletonVariant[] = ['shimmer', 'wave', 'sheen', 'slide'];
const LIT: SkeletonVariant[] = ['ripple', 'glow', 'bar'];
const TEXTURES: SkeletonVariant[] = ['gradient', 'stripe', 'grid', 'dots'];
const STILL: SkeletonVariant[] = ['outline', 'dashed', 'flat'];

const gallery = (variants: SkeletonVariant[]) => () => (
  <>
    {variants.map((variant) => (
      <span key={variant} className="inline-flex w-32 flex-col items-center gap-2">
        <Skeleton variant={variant} shape="rounded" className="h-14 w-full" />
        <code className="text-xs opacity-60">{variant}</code>
      </span>
    ))}
  </>
);

export const skeletonStories: StoryGroup = {
  component: 'Skeleton',
  stories: [
    {
      name: 'Opacity loops',
      description: 'Four ways for the same box to breathe.',
      render: gallery(MOVING),
    },
    {
      name: 'Travelling highlights',
      description: 'One sweep keyframe; the gradient under it is what differs.',
      render: gallery(SWEEPS),
    },
    {
      name: 'Lit shapes',
      render: gallery(LIT),
    },
    {
      name: 'Textures',
      render: gallery(TEXTURES),
    },
    {
      name: 'Still',
      description: 'No animation at all — for dense tables where movement is noise.',
      render: gallery(STILL),
    },
    {
      name: 'Tones',
      description: 'The same six tones every other component takes.',
      render: () => (
        <>
          <Skeleton variant="shimmer" shape="pill" tone="neutral" />
          <Skeleton variant="shimmer" shape="pill" tone="accent" />
          <Skeleton variant="shimmer" shape="pill" tone="danger" />
          <Skeleton variant="shimmer" shape="pill" tone="success" />
          <Skeleton variant="shimmer" shape="pill" tone="warning" />
          <Skeleton variant="shimmer" shape="pill" tone="info" />
        </>
      ),
    },
    {
      name: 'Shapes and lines',
      render: () => (
        <>
          <Skeleton shape="circle" variant="shimmer" />
          <Skeleton shape="pill" variant="shimmer" />
          <Skeleton shape="rounded" variant="shimmer" className="w-40" />
          <span className="w-56">
            <Skeleton variant="shimmer" lines={3} />
          </span>
        </>
      ),
    },
  ],
};
