import type { Tone } from '../../internal/tone.js';
import type { StoryGroup } from '../../stories.js';
import { Field } from '../field/field.js';
import { Checkbox } from './checkbox.js';

const TONES: Tone[] = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'];

export const checkboxStories: StoryGroup = {
  component: 'Checkbox',
  stories: [
    {
      name: 'States',
      description:
        'All three states are CSS — :checked and :indeterminate come from the native input.',
      render: () => (
        <>
          <Checkbox aria-label="Unchecked" />
          <Checkbox aria-label="Checked" defaultChecked />
          <Checkbox aria-label="Indeterminate" indeterminate />
          <Checkbox aria-label="Disabled" disabled />
          <Checkbox aria-label="Disabled checked" disabled defaultChecked />
          <Checkbox aria-label="Invalid" invalid />
        </>
      ),
    },
    {
      name: 'Sizes',
      render: () => (
        <>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Checkbox key={size} size={size} defaultChecked aria-label={size} />
          ))}
        </>
      ),
    },
    {
      name: 'Tones',
      render: () => (
        <>
          {TONES.map((tone) => (
            <Checkbox key={tone} tone={tone} defaultChecked aria-label={tone} />
          ))}
        </>
      ),
    },
    {
      name: 'With a label',
      render: () => (
        <div className="flex flex-col gap-2">
          <Field.Root orientation="horizontal">
            <Checkbox />
            <Field.Label>Email me about releases</Field.Label>
          </Field.Root>
          <Field.Root orientation="horizontal" disabled>
            <Checkbox />
            <Field.Label>Email me about everything else</Field.Label>
          </Field.Root>
        </div>
      ),
    },
  ],
};
