import type { StoryGroup } from '../../stories.js';
import { Separator } from './separator.js';

export const separatorStories: StoryGroup = {
  component: 'Separator',
  stories: [
    {
      name: 'Horizontal',
      render: () => (
        <div className="w-full max-w-sm">
          <p className="pb-3 text-sm">Above the line</p>
          <Separator />
          <p className="pt-3 text-sm">Below the line</p>
        </div>
      ),
    },
    {
      name: 'Vertical',
      render: () => (
        <div className="flex h-8 items-center gap-3 text-sm">
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Changelog</span>
        </div>
      ),
    },
    {
      name: 'With a label',
      description: 'The label splits the rule; both halves flex to fill what is left.',
      render: () => (
        <div className="w-full max-w-sm">
          <Separator>or</Separator>
        </div>
      ),
    },
    {
      name: 'Meaningful',
      description:
        'decorative={false} puts it in the a11y tree as role="separator" — for rules that genuinely divide sections.',
      render: () => (
        <div className="w-full max-w-sm">
          <Separator decorative={false} />
        </div>
      ),
    },
  ],
};
