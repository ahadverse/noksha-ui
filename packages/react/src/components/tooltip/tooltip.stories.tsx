import type { StoryGroup } from '../../stories.js';
import { Button } from '../button/button.js';
import { Tooltip } from './tooltip.js';

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
  </svg>
);

export const tooltipStories: StoryGroup = {
  component: 'Tooltip',
  stories: [
    {
      name: 'Basic',
      description: 'Describes the trigger with aria-describedby — it never becomes the label.',
      render: () => (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              iconOnly
              aria-label="Delete"
              icon={<TrashIcon />}
              variant="soft"
              tone="danger"
            />
          </Tooltip.Trigger>
          <Tooltip.Content>Delete permanently</Tooltip.Content>
        </Tooltip.Root>
      ),
    },
    {
      name: 'Sides',
      render: () => (
        <>
          {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
            <Tooltip.Root key={side}>
              <Tooltip.Trigger asChild>
                <Button variant="outline" tone="neutral">
                  {side}
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content side={side} arrow>
                Tooltip on the {side}
              </Tooltip.Content>
            </Tooltip.Root>
          ))}
        </>
      ),
    },
    {
      name: 'Grouped',
      description:
        'After the first tooltip, moving along the row shows the rest at once instead of re-waiting the delay.',
      render: () => (
        <Tooltip.Provider delayDuration={600} skipDelayDuration={400}>
          {['Bold', 'Italic', 'Underline'].map((label) => (
            <Tooltip.Root key={label}>
              <Tooltip.Trigger asChild>
                <Button variant="ghost" tone="neutral">
                  {label[0]}
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>{label}</Tooltip.Content>
            </Tooltip.Root>
          ))}
        </Tooltip.Provider>
      ),
    },
    {
      name: 'Long text',
      render: () => (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button variant="outline">Retention</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            Logs are kept for 30 days on the Pro plan and 90 days on Enterprise.
          </Tooltip.Content>
        </Tooltip.Root>
      ),
    },
  ],
};
