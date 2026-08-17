import type { StoryGroup } from '../../stories.js';
import { Badge } from '../badge/badge.js';
import { Button } from '../button/button.js';
import { Card } from './card.js';
import type { CardVariant } from './card.types.js';

const VARIANTS: CardVariant[] = ['elevated', 'outline', 'subtle', 'ghost'];

export const cardStories: StoryGroup = {
  component: 'Card',
  stories: [
    {
      name: 'Variants',
      render: () => (
        <>
          {VARIANTS.map((variant) => (
            <Card.Root key={variant} variant={variant} className="w-56">
              <Card.Header>
                <Card.Title>{variant}</Card.Title>
                <Card.Description>Surface weight, not colour.</Card.Description>
              </Card.Header>
            </Card.Root>
          ))}
        </>
      ),
    },
    {
      name: 'Full composition',
      render: () => (
        <Card.Root className="w-80">
          <Card.Header>
            <div className="flex items-center justify-between gap-2">
              <Card.Title>Usage</Card.Title>
              <Badge tone="success" dot>
                Live
              </Badge>
            </div>
            <Card.Description>Billing period to date</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="font-semibold text-3xl">2,481</p>
            <p className="text-(--noksha-fg-muted) text-sm">requests this month</p>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Upgrade</Button>
            <Button size="sm" variant="ghost" tone="neutral">
              Details
            </Button>
          </Card.Footer>
        </Card.Root>
      ),
    },
    {
      name: 'Padding scale',
      description:
        'One variable on the root drives every part — and anything a consumer adds between them.',
      render: () => (
        <>
          {(['sm', 'md', 'lg'] as const).map((padding) => (
            <Card.Root key={padding} padding={padding} variant="outline" className="w-44">
              <Card.Header>
                <Card.Title>{padding}</Card.Title>
              </Card.Header>
              <Card.Content>Content</Card.Content>
            </Card.Root>
          ))}
        </>
      ),
    },
    {
      name: 'Interactive',
      description:
        'asChild makes the whole card a real control — focusable, Enter-activated, announced as a link. No div with an onClick.',
      render: () => (
        <Card.Root asChild interactive variant="outline" className="w-64">
          <a href="#plans">
            <Card.Header>
              <Card.Title>Pro plan</Card.Title>
              <Card.Description>$20 per month</Card.Description>
            </Card.Header>
          </a>
        </Card.Root>
      ),
    },
  ],
};
