import type { StoryGroup } from '../../stories.js';
import { Button } from '../button/button.js';
import { Drawer } from './drawer.js';
import type { DrawerSide } from './drawer.types.js';

const SIDES: DrawerSide[] = ['left', 'right', 'top', 'bottom'];

export const drawerStories: StoryGroup = {
  component: 'Drawer',
  stories: [
    {
      name: 'Sides',
      description: 'Pinned to its edge, so the slide needs no centring transform to work around.',
      render: () => (
        <>
          {SIDES.map((side) => (
            <Drawer.Root key={side}>
              <Drawer.Trigger asChild>
                <Button variant="outline" tone="neutral">
                  {side}
                </Button>
              </Drawer.Trigger>
              <Drawer.Content side={side}>
                <Drawer.Header>
                  <Drawer.Title>From the {side}</Drawer.Title>
                  <Drawer.Description>Same machinery as the Dialog.</Drawer.Description>
                </Drawer.Header>
              </Drawer.Content>
            </Drawer.Root>
          ))}
        </>
      ),
    },
    {
      name: 'Sizes',
      description: 'Size means width on a side drawer and height on a top or bottom one.',
      render: () => (
        <>
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Drawer.Root key={size}>
              <Drawer.Trigger asChild>
                <Button variant="soft" tone="neutral">
                  {size}
                </Button>
              </Drawer.Trigger>
              <Drawer.Content size={size}>
                <Drawer.Header>
                  <Drawer.Title>Size {size}</Drawer.Title>
                </Drawer.Header>
              </Drawer.Content>
            </Drawer.Root>
          ))}
        </>
      ),
    },
    {
      name: 'Filters panel',
      render: () => (
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <Button>Filters</Button>
          </Drawer.Trigger>
          <Drawer.Content side="right" size="lg">
            <Drawer.Header>
              <Drawer.Title>Filters</Drawer.Title>
              <Drawer.Description>Narrow the deployment list.</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
              <p className="text-(--prism-fg-muted) text-sm">Only the body scrolls.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button variant="ghost" tone="neutral">
                  Reset
                </Button>
              </Drawer.Close>
              <Drawer.Close asChild>
                <Button>Apply</Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      ),
    },
  ],
};
