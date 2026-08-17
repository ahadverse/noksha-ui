import type { Tone } from '../../internal/tone.js';
import type { StoryGroup } from '../../stories.js';
import { Field } from '../field/field.js';
import { Switch } from './switch.js';

const TONES: Tone[] = ['accent', 'success', 'danger', 'warning'];

export const switchStories: StoryGroup = {
  component: 'Switch',
  stories: [
    {
      name: 'States',
      render: () => (
        <>
          <Switch aria-label="Off" />
          <Switch aria-label="On" defaultChecked />
          <Switch aria-label="Disabled" disabled />
          <Switch aria-label="Disabled on" disabled defaultChecked />
        </>
      ),
    },
    {
      name: 'Sizes',
      description:
        'The thumb travel is computed from the track, so a new size needs no hand-tuning.',
      render: () => (
        <>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Switch key={size} size={size} defaultChecked aria-label={size} />
          ))}
        </>
      ),
    },
    {
      name: 'Tones',
      render: () => (
        <>
          {TONES.map((tone) => (
            <Switch key={tone} tone={tone} defaultChecked aria-label={tone} />
          ))}
        </>
      ),
    },
    {
      name: 'With a label',
      description:
        'A Switch applies immediately; a choice confirmed later with Save is a Checkbox.',
      render: () => (
        <Field.Root orientation="horizontal">
          <Switch defaultChecked />
          <Field.Label>Enable two-factor authentication</Field.Label>
        </Field.Root>
      ),
    },
  ],
};
