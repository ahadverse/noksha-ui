import type { StoryGroup } from '../../stories.js';
import { Button } from '../button/button.js';
import { Field } from '../field/field.js';
import { Input } from '../input/input.js';
import { Dialog } from './dialog.js';
import type { DialogSize } from './dialog.types.js';

const SIZES: DialogSize[] = ['sm', 'md', 'lg', 'xl', 'full'];

export const dialogStories: StoryGroup = {
  component: 'Dialog',
  stories: [
    {
      name: 'Confirmation',
      description:
        'Focus is trapped, the page is locked, and focus returns to the trigger on close.',
      render: () => (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button tone="danger">Delete project</Button>
          </Dialog.Trigger>
          <Dialog.Content size="sm">
            <Dialog.Header>
              <Dialog.Title>Delete project?</Dialog.Title>
              <Dialog.Description>
                This removes every deployment and cannot be undone.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="ghost" tone="neutral">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button tone="danger">Delete</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      ),
    },
    {
      name: 'Sizes',
      render: () => (
        <>
          {SIZES.map((size) => (
            <Dialog.Root key={size}>
              <Dialog.Trigger asChild>
                <Button variant="outline" tone="neutral">
                  {size}
                </Button>
              </Dialog.Trigger>
              <Dialog.Content size={size}>
                <Dialog.Header>
                  <Dialog.Title>Size {size}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>The panel widths come from one scale.</Dialog.Body>
              </Dialog.Content>
            </Dialog.Root>
          ))}
        </>
      ),
    },
    {
      name: 'Scrolling body',
      description: 'Only the body scrolls, so the header and footer stay put on a long form.',
      render: () => (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Edit settings</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Settings</Dialog.Title>
              <Dialog.Description>Everything about this workspace.</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <div className="flex flex-col gap-4">
                {Array.from({ length: 12 }, (_, index) => `Field ${index + 1}`).map((label) => (
                  <Field.Root key={label}>
                    <Field.Label>{label}</Field.Label>
                    <Input placeholder="Value" />
                  </Field.Root>
                ))}
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="ghost" tone="neutral">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      ),
    },
    {
      name: 'Non-modal',
      description:
        'Leaves the page scrollable, for a panel meant to be used alongside the content.',
      render: () => (
        <Dialog.Root modal={false}>
          <Dialog.Trigger asChild>
            <Button variant="outline">Open non-modal</Button>
          </Dialog.Trigger>
          <Dialog.Content size="sm">
            <Dialog.Header>
              <Dialog.Title>Reference</Dialog.Title>
              <Dialog.Description>The page behind this still scrolls.</Dialog.Description>
            </Dialog.Header>
          </Dialog.Content>
        </Dialog.Root>
      ),
    },
  ],
};
