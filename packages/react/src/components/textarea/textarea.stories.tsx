import type { StoryGroup } from '../../stories.js';
import { Textarea } from './textarea.js';

export const textareaStories: StoryGroup = {
  component: 'Textarea',
  stories: [
    {
      name: 'Variants',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-3">
          {(['outline', 'soft', 'ghost'] as const).map((variant) => (
            <Textarea key={variant} variant={variant} placeholder={variant} aria-label={variant} />
          ))}
        </div>
      ),
    },
    {
      name: 'Auto-sizing',
      description:
        'Height comes from a measurement, not from counting newlines — so it stays right when a line wraps.',
      render: () => (
        <div className="w-full max-w-sm">
          <Textarea
            autoSize
            minRows={2}
            maxRows={8}
            aria-label="Auto-sizing"
            placeholder="Type a few lines and watch it grow, then stop at eight rows."
          />
        </div>
      ),
    },
    {
      name: 'Resize',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-3">
          {(['none', 'vertical', 'both'] as const).map((resize) => (
            <Textarea
              key={resize}
              resize={resize}
              placeholder={`resize: ${resize}`}
              aria-label={resize}
            />
          ))}
        </div>
      ),
    },
    {
      name: 'States',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Textarea placeholder="Invalid" aria-label="Invalid" invalid />
          <Textarea placeholder="Disabled" aria-label="Disabled" disabled />
        </div>
      ),
    },
  ],
};
