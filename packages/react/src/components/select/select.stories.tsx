import type { StoryGroup } from '../../stories.js';
import { Field } from '../field/field.js';
import { Select } from './select.js';

const COUNTRIES = [
  { value: 'bd', label: 'Bangladesh' },
  { value: 'br', label: 'Brazil' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'ng', label: 'Nigeria' },
  { value: 'us', label: 'United States' },
];

export const selectStories: StoryGroup = {
  component: 'Select',
  stories: [
    {
      name: 'Basic',
      description:
        'The trigger shows the selected label on the first paint — no need to open the list first.',
      render: () => (
        <div className="w-full max-w-xs">
          <Field.Root>
            <Field.Label>Plan</Field.Label>
            <Select.Root defaultValue="pro">
              <Select.Trigger placeholder="Choose a plan" />
              <Select.Content matchTriggerWidth>
                <Select.Item value="free">Free</Select.Item>
                <Select.Item value="pro">Pro</Select.Item>
                <Select.Item value="team">Team</Select.Item>
              </Select.Content>
            </Select.Root>
          </Field.Root>
        </div>
      ),
    },
    {
      name: 'Type to select',
      description: 'Typing works with the list closed too, exactly as a native select does.',
      render: () => (
        <div className="w-full max-w-xs">
          <Select.Root>
            <Select.Trigger placeholder="Country" aria-label="Country" />
            <Select.Content matchTriggerWidth>
              {COUNTRIES.map((country) => (
                <Select.Item key={country.value} value={country.value}>
                  {country.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      ),
    },
    {
      name: 'Groups and disabled items',
      render: () => (
        <div className="w-full max-w-xs">
          <Select.Root>
            <Select.Trigger placeholder="Choose a plan" aria-label="Plan" />
            <Select.Content matchTriggerWidth>
              <Select.Group label="Personal">
                <Select.Item value="free">Free</Select.Item>
                <Select.Item value="pro">Pro</Select.Item>
              </Select.Group>
              <Select.Group label="Business">
                <Select.Item value="team">Team</Select.Item>
                <Select.Item value="enterprise" disabled>
                  Enterprise — contact sales
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      ),
    },
    {
      name: 'Sizes',
      render: () => (
        <div className="flex w-full max-w-xs flex-col gap-3">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Select.Root key={size} defaultValue="pro">
              <Select.Trigger size={size} aria-label={size} />
              <Select.Content>
                <Select.Item value="pro">Pro</Select.Item>
                <Select.Item value="team">Team</Select.Item>
              </Select.Content>
            </Select.Root>
          ))}
        </div>
      ),
    },
    {
      name: 'States',
      render: () => (
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Select.Root invalid defaultValue="pro">
            <Select.Trigger aria-label="Invalid" />
            <Select.Content>
              <Select.Item value="pro">Pro</Select.Item>
            </Select.Content>
          </Select.Root>
          <Select.Root disabled defaultValue="pro">
            <Select.Trigger aria-label="Disabled" />
            <Select.Content>
              <Select.Item value="pro">Pro</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      ),
    },
  ],
};
