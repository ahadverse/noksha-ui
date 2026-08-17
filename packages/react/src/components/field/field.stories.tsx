import type { StoryGroup } from '../../stories.js';
import { Checkbox } from '../checkbox/checkbox.js';
import { Input } from '../input/input.js';
import { Switch } from '../switch/switch.js';
import { Textarea } from '../textarea/textarea.js';
import { Field } from './field.js';

export const fieldStories: StoryGroup = {
  component: 'Field',
  stories: [
    {
      name: 'Label and description',
      description:
        'No ids to write: the label, the control and the helper text are wired automatically.',
      render: () => (
        <div className="w-full max-w-xs">
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input type="email" placeholder="you@example.com" />
            <Field.Description>We only use this for receipts.</Field.Description>
          </Field.Root>
        </div>
      ),
    },
    {
      name: 'Required',
      render: () => (
        <div className="w-full max-w-xs">
          <Field.Root required>
            <Field.Label>Workspace name</Field.Label>
            <Input placeholder="Acme" />
          </Field.Root>
        </div>
      ),
    },
    {
      name: 'Invalid',
      description:
        'The error is only mounted while the field is invalid, so nothing reserves empty space.',
      render: () => (
        <div className="w-full max-w-xs">
          <Field.Root invalid>
            <Field.Label>Email</Field.Label>
            <Input defaultValue="not-an-email" />
            <Field.Description>We only use this for receipts.</Field.Description>
            <Field.Error>Enter a valid email address.</Field.Error>
          </Field.Root>
        </div>
      ),
    },
    {
      name: 'Disabled',
      render: () => (
        <div className="w-full max-w-xs">
          <Field.Root disabled>
            <Field.Label>Email</Field.Label>
            <Input defaultValue="ada@example.com" />
          </Field.Root>
        </div>
      ),
    },
    {
      name: 'Horizontal',
      description: 'For controls that sit beside their label rather than under it.',
      render: () => (
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Field.Root orientation="horizontal">
            <Checkbox />
            <Field.Label>Email me about releases</Field.Label>
          </Field.Root>
          <Field.Root orientation="horizontal">
            <Switch />
            <Field.Label>Enable two-factor authentication</Field.Label>
          </Field.Root>
        </div>
      ),
    },
    {
      name: 'With a textarea',
      render: () => (
        <div className="w-full max-w-sm">
          <Field.Root>
            <Field.Label>Release notes</Field.Label>
            <Textarea autoSize minRows={3} maxRows={10} placeholder="What changed?" />
            <Field.Description>Markdown is supported.</Field.Description>
          </Field.Root>
        </div>
      ),
    },
  ],
};
