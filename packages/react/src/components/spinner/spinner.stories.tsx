import type { StoryGroup } from '../../stories.js';
import { Spinner } from './spinner.js';

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
      name: 'Inherits colour',
      description: 'Stroked with currentColor, so it takes the tone of whatever contains it.',
      render: () => (
        <>
          <span className="text-[var(--prism-fg-muted)]">
            <Spinner size="lg" />
          </span>
          <span className="text-[var(--prism-accent-solid)]">
            <Spinner size="lg" />
          </span>
          <span className="text-[var(--prism-danger-solid)]">
            <Spinner size="lg" />
          </span>
          <span className="text-[var(--prism-success-solid)]">
            <Spinner size="lg" />
          </span>
        </>
      ),
    },
  ],
};
