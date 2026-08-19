import type { StoryGroup } from '../../stories.js';
import { Spinner } from './spinner.js';
import type { SpinnerVariant } from './spinner.types.js';

const RINGS: SpinnerVariant[] = ['ring', 'arc', 'dual', 'dash', 'segment', 'comet'];
const DOTS: SpinnerVariant[] = ['dots', 'bounce', 'beat', 'orbit', 'halo'];
const BARS: SpinnerVariant[] = ['bars', 'wave', 'spokes'];
const SHAPES: SpinnerVariant[] = ['pulse', 'ripple', 'grid', 'flip'];

const gallery = (variants: SpinnerVariant[]) => () => (
  <>
    {variants.map((variant) => (
      <span key={variant} className="inline-flex flex-col items-center gap-2">
        <Spinner variant={variant} className="size-8" label={null} />
        <code className="text-xs opacity-60">{variant}</code>
      </span>
    ))}
  </>
);

export const spinnerStories: StoryGroup = {
  component: 'Spinner',
  stories: [
    {
      name: 'Sizes',
      render: () => (
        <>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Spinner key={size} size={size} />
          ))}
        </>
      ),
    },
    {
      name: 'Rings',
      description: 'Six ways to draw the same circle. `comet` is a masked conic gradient.',
      render: gallery(RINGS),
    },
    {
      name: 'Dots',
      description: 'The same three or eight dots, separated only by which loop they run.',
      render: gallery(DOTS),
    },
    {
      name: 'Bars',
      render: gallery(BARS),
    },
    {
      name: 'Shapes',
      render: gallery(SHAPES),
    },
    {
      name: 'Inherits colour',
      description: 'Painted with currentColor, so it takes the tone of whatever contains it.',
      render: () => (
        <>
          <span className="text-[var(--noksha-fg-muted)]">
            <Spinner size="lg" />
          </span>
          <span className="text-[var(--noksha-accent-solid)]">
            <Spinner size="lg" variant="dots" />
          </span>
          <span className="text-[var(--noksha-danger-solid)]">
            <Spinner size="lg" variant="bars" />
          </span>
          <span className="text-[var(--noksha-success-solid)]">
            <Spinner size="lg" variant="halo" />
          </span>
        </>
      ),
    },
  ],
};
