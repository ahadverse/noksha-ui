import type { Demo } from '@/lib/demos';

import SkeletonBasic from './basic';
import SkeletonCards from './cards';
import SkeletonLayouts from './layouts';
import SkeletonShapes from './shapes';
import SkeletonSizes from './sizes';
import SkeletonTones from './tones';

export const skeletonDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Eighteen treatments',
    description:
      'One `variant` prop, eighteen surfaces. Four are opacity loops, four are highlights travelling across the box, three are lit shapes, four are textures drifting under it, and three do not move at all — for a dense table where movement is noise rather than feedback. They are composed from eight shared keyframes; the gradient underneath is what separates the shimmer from the sheen.',
    Component: SkeletonBasic,
    minHeight: 640,
    stack: true,
  },
  {
    id: 'tones',
    title: 'Colour',
    description:
      'The placeholder is not hardcoded grey. `tone` takes the same six semantic tones as every other component, and both the fill and the travelling highlight come from that tone — so a skeleton standing in for a danger panel reads as one. Underneath they are two variables, `--sk-subtle` and `--sk-subtle-hover`, which you can point anywhere: the bottom row sets plain hex values and never touches the token system.',
    Component: SkeletonTones,
    minHeight: 420,
    stack: true,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description:
      'Five rungs, and `shape` decides what they measure: the diameter of a disc, the height of a line, the height and width of a pill, the depth of a block. That is why the scale is one prop rather than a height passed per shape — a `size="lg"` avatar and a `size="lg"` heading line up with each other whatever they stand in for. `className` still overrides any of it.',
    Component: SkeletonSizes,
    minHeight: 520,
    stack: true,
  },
  {
    id: 'shapes',
    title: 'Shapes and lines',
    description:
      '`shape` is the outline of the thing being waited for. `lines` stacks text rows with the last one short, staggering each row a beat behind the one above so a sweep crosses the paragraph rather than every row at once.',
    Component: SkeletonShapes,
    minHeight: 340,
    stack: true,
  },
  {
    id: 'cards',
    title: 'Card skeletons',
    description:
      'Three cards composed from the same component: a media card with a thumbnail, title and byline; a profile card with an avatar and a paragraph; and a pair of stat tiles. Nothing here is a Skeleton feature — a card placeholder is a card built out of placeholders, which is the point. Keep one treatment per card: two sweeps at different tempos inside one border read as two separate things loading.',
    Component: SkeletonCards,
    minHeight: 700,
    stack: true,
  },
  {
    id: 'layouts',
    title: 'Lists and tables',
    description:
      'Match the real layout rather than an approximation of it — a placeholder that shifts on load is worse than no placeholder. The table on the right uses `flat`, because forty rows shimmering at once is the strongest argument there is for a still treatment.',
    Component: SkeletonLayouts,
    minHeight: 560,
    stack: true,
  },
];
