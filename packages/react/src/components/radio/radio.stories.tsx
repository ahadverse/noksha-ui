import type { StoryGroup } from '../../stories.js';
import { Field } from '../field/field.js';
import { Radio, RadioGroup } from './radio.js';

const PLANS = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
];

export const radioStories: StoryGroup = {
  component: 'Radio',
  stories: [
    {
      name: 'Group',
      description: 'Arrow keys, wrap-around and select-on-focus all come from the platform.',
      render: () => (
        <RadioGroup aria-label="Plan" defaultValue="pro">
          {PLANS.map((plan) => (
            <Field.Root key={plan.value} orientation="horizontal">
              <Radio value={plan.value} />
              <Field.Label>{plan.label}</Field.Label>
            </Field.Root>
          ))}
        </RadioGroup>
      ),
    },
    {
      name: 'Horizontal',
      render: () => (
        <RadioGroup aria-label="Density" orientation="horizontal" defaultValue="default">
          {['compact', 'default', 'comfortable'].map((value) => (
            <Field.Root key={value} orientation="horizontal">
              <Radio value={value} />
              <Field.Label>{value}</Field.Label>
            </Field.Root>
          ))}
        </RadioGroup>
      ),
    },
    {
      name: 'Sizes',
      render: () => (
        <>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <RadioGroup
              key={size}
              aria-label={size}
              orientation="horizontal"
              defaultValue="a"
              size={size}
            >
              <Radio value="a" aria-label={`${size} a`} />
              <Radio value="b" aria-label={`${size} b`} />
            </RadioGroup>
          ))}
        </>
      ),
    },
    {
      name: 'Disabled',
      render: () => (
        <RadioGroup aria-label="Plan" defaultValue="pro" disabled>
          {PLANS.map((plan) => (
            <Field.Root key={plan.value} orientation="horizontal">
              <Radio value={plan.value} />
              <Field.Label>{plan.label}</Field.Label>
            </Field.Root>
          ))}
        </RadioGroup>
      ),
    },
  ],
};
