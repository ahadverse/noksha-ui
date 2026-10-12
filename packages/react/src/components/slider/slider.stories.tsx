import { TONES } from '../../internal/tone.js';
import type { StoryGroup } from '../../stories.js';
import { Field } from '../field/field.js';
import { RangeSlider, Slider } from './slider.js';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const VARIANTS = ['default', 'solid', 'soft', 'outline', 'minimal'] as const;
const THUMBS = ['circle', 'square', 'bar', 'pill'] as const;

const ZOOM_MARKS = [
  { value: 0, label: '0%' },
  { value: 25, label: '25%' },
  { value: 50, label: '50%' },
  { value: 75, label: '75%' },
  { value: 100, label: '100%' },
];

const formatPrice = (value: number) => `$${value}`;

export const sliderStories: StoryGroup = {
  component: 'Slider',
  stories: [
    {
      name: 'Sizes',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-5">
          {SIZES.map((size) => (
            <Slider key={size} size={size} defaultValue={40} aria-label={size} />
          ))}
        </div>
      ),
    },
    {
      name: 'Variants',
      description: '`minimal` hides the thumb until the track is hovered, focused or dragged.',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-5">
          {VARIANTS.map((variant) => (
            <Slider key={variant} variant={variant} defaultValue={60} aria-label={variant} />
          ))}
        </div>
      ),
    },
    {
      name: 'Thumbs',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-5">
          {THUMBS.map((thumb) => (
            <Slider key={thumb} thumb={thumb} size="lg" defaultValue={50} aria-label={thumb} />
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
          {TONES.map((tone) => (
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
    {
      name: 'Marks',
      description: 'Marks are decorative; the value is still announced from the input itself.',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-8">
          <Slider step={25} defaultValue={50} marks={ZOOM_MARKS} aria-label="Zoom" />
          <Slider min={0} max={10} step={1} defaultValue={4} marks aria-label="Rating" />
        </div>
      ),
    },
    {
      name: 'Tooltip',
      render: () => (
        <div className="w-full max-w-sm pt-10">
          <Slider
            defaultValue={40}
            tooltip="always"
            formatValue={(value) => `${value}%`}
            aria-label="Volume"
          />
        </div>
      ),
    },
    {
      name: 'Vertical',
      render: () => (
        <div className="flex h-48 gap-10">
          <Slider orientation="vertical" defaultValue={30} aria-label="Bass" />
          <Slider orientation="vertical" defaultValue={60} showValue aria-label="Mid" />
          <Slider orientation="vertical" step={25} defaultValue={75} marks aria-label="Treble" />
        </div>
      ),
    },
    {
      name: 'Range',
      description: 'Two native range inputs over one track, so each thumb keeps its own keyboard.',
      render: () => (
        <div className="w-full max-w-sm">
          <Field.Root>
            <Field.Label>Price</Field.Label>
            <RangeSlider
              min={0}
              max={1000}
              step={10}
              defaultValue={[200, 750]}
              showValue
              formatValue={formatPrice}
              thumbLabels={['Minimum price', 'Maximum price']}
            />
          </Field.Root>
        </div>
      ),
    },
    {
      name: 'Range with marks',
      render: () => (
        <div className="w-full max-w-sm">
          <RangeSlider
            step={25}
            minStepsBetween={1}
            defaultValue={[25, 75]}
            marks={ZOOM_MARKS}
            thumbLabels={['Minimum zoom', 'Maximum zoom']}
          />
        </div>
      ),
    },
  ],
};
