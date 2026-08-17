import type { StoryGroup } from '../../stories.js';
import { Badge } from './badge.js';
import type { BadgeSize, BadgeTone, BadgeVariant } from './badge.types.js';

const VARIANTS: BadgeVariant[] = ['solid', 'soft', 'outline'];
const TONES: BadgeTone[] = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'];
const SIZES: BadgeSize[] = ['sm', 'md', 'lg'];

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const badgeStories: StoryGroup = {
  component: 'Badge',
  stories: [
    {
      name: 'Variants',
      render: () => (
        <>
          {VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </>
      ),
    },
    {
      name: 'Tones',
      description: 'The same seven-slot tone table the Button uses — one prop, whole repaint.',
      render: () => (
        <>
          {TONES.map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </>
      ),
    },
    {
      name: 'Solid tones',
      render: () => (
        <>
          {TONES.map((tone) => (
            <Badge key={tone} variant="solid" tone={tone}>
              {tone}
            </Badge>
          ))}
        </>
      ),
    },
    {
      name: 'Sizes',
      render: () => (
        <>
          {SIZES.map((size) => (
            <Badge key={size} size={size}>
              Badge {size}
            </Badge>
          ))}
        </>
      ),
    },
    {
      name: 'With a status dot',
      render: () => (
        <>
          <Badge dot tone="success">
            Live
          </Badge>
          <Badge dot tone="warning">
            Degraded
          </Badge>
          <Badge dot tone="danger">
            Down
          </Badge>
          <Badge dot variant="solid" tone="success">
            Live
          </Badge>
        </>
      ),
    },
    {
      name: 'With an icon',
      render: () => (
        <>
          <Badge icon={<CheckIcon />} tone="success">
            Verified
          </Badge>
          <Badge icon={<CheckIcon />} variant="solid" tone="accent">
            Pro
          </Badge>
        </>
      ),
    },
    {
      name: 'asChild',
      render: () => (
        <Badge asChild variant="outline" tone="neutral">
          <a href="#releases">v1.2.0</a>
        </Badge>
      ),
    },
  ],
};
