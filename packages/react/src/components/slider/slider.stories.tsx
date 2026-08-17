import type { StoryGroup } from '../../stories.js';
import { Field } from '../field/field.js';
import { Slider } from './slider.js';

export const sliderStories: StoryGroup = {
  component: 'Slider',
  stories: [
    {
      name: 'Sizes',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-5">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Slider key={size} size={size} defaultValue={40} aria-label={size} />
          ))}
        </div>
      ),
    },
    {
      name: 'With a value',
      description:
        'aria-valuetext carries the formatted string, so it is announced as "40%", not "0.4".',
      render: () => (
        <div className="w-full max-w-sm">
          <Field.Root>
            <Field.Label>Opacity</Field.Label>
            <Slider
              min={0}
              max={1}
              step={0.05}
              defaultValue={0.4}
              showValue
              formatValue={(value) => `${Math.round(value * 100)}%`}
            />
          </Field.Root>
        </div>
      ),
    },
    {
      name: 'Tones',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-5">
          {(['accent', 'success', 'danger'] as const).map((tone) => (
            <Slider key={tone} tone={tone} defaultValue={60} aria-label={tone} />
          ))}
        </div>
      ),
    },
    {
      name: 'States',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-5">
          <Slider defaultValue={30} aria-label="Invalid" invalid />
          <Slider defaultValue={30} aria-label="Disabled" disabled />
        </div>
      ),
    },
    {
      name: 'Stepped',
      render: () => (
        <div className="w-full max-w-sm">
          <Slider min={0} max={10} step={1} defaultValue={7} showValue aria-label="Rating" />
        </div>
      ),
    },
  ],
};
