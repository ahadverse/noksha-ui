import type { StoryGroup } from '../../stories.js';
import { Button } from '../button/button.js';
import { Field } from '../field/field.js';
import { Input } from '../input/input.js';
import { Popover } from './popover.js';
import type { PopoverSide } from './popover.types.js';

const SIDES: PopoverSide[] = ['top', 'right', 'bottom', 'left'];

export const popoverStories: StoryGroup = {
  component: 'Popover',
  stories: [
    {
      name: 'Basic',
      render: () => (
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="outline">Open</Button>
          </Popover.Trigger>
          <Popover.Content>
            <p className="font-medium text-sm">Anchored panel</p>
            <p className="mt-1 text-(--prism-fg-muted) text-sm">
              Positioned with flip and shift, so it stays on screen near an edge.
            </p>
          </Popover.Content>
        </Popover.Root>
      ),
    },
    {
      name: 'Sides',
      description:
        'The animation follows the side it actually landed on, not the one that was asked for.',
      render: () => (
        <>
          {SIDES.map((side) => (
            <Popover.Root key={side}>
              <Popover.Trigger asChild>
                <Button variant="soft" tone="neutral">
                  {side}
                </Button>
              </Popover.Trigger>
              <Popover.Content side={side} arrow className="w-48">
                <p className="text-sm">Opens on the {side}.</p>
              </Popover.Content>
            </Popover.Root>
          ))}
        </>
      ),
    },
    {
      name: 'With a form',
      description: 'Focus moves to the first field on open and back to the trigger on close.',
      render: () => (
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button>Rename</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div className="flex flex-col gap-3">
              <Field.Root>
                <Field.Label>Project name</Field.Label>
                <Input defaultValue="prism-ui" />
              </Field.Root>
              <div className="flex justify-end gap-2">
                <Popover.Close asChild>
                  <Button size="sm" variant="ghost" tone="neutral">
                    Cancel
                  </Button>
                </Popover.Close>
                <Popover.Close asChild>
                  <Button size="sm">Save</Button>
                </Popover.Close>
              </div>
            </div>
          </Popover.Content>
        </Popover.Root>
      ),
    },
    {
      name: 'Modal',
      description:
        'Ignores outside presses and traps focus — for a panel holding an edit in progress.',
      render: () => (
        <Popover.Root modal>
          <Popover.Trigger asChild>
            <Button variant="outline">Modal popover</Button>
          </Popover.Trigger>
          <Popover.Content>
            <p className="text-sm">Escape or a Close button, nothing else.</p>
            <Popover.Close asChild>
              <Button className="mt-3" size="sm" fullWidth>
                Done
              </Button>
            </Popover.Close>
          </Popover.Content>
        </Popover.Root>
      ),
    },
  ],
};
