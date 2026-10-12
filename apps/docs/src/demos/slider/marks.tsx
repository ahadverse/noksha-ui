'use client';

import { RangeSlider, Slider } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function SliderMarks() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Step ticks">
        <Slider aria-label="Rating" min={0} max={10} defaultValue={7} marks />
      </DemoTile>

      <DemoTile label="Ticks at values">
        <Slider aria-label="Quality" defaultValue={50} marks={[0, 25, 50, 75, 100]} />
      </DemoTile>

      <DemoTile label="Labelled percentages">
        <Slider
          aria-label="Opacity"
          defaultValue={75}
          marks={[
            { value: 0, label: '0%' },
            { value: 25, label: '25%' },
            { value: 50, label: '50%' },
            { value: 75, label: '75%' },
            { value: 100, label: '100%' },
          ]}
          formatValue={(value) => `${value}%`}
        />
      </DemoTile>

      <DemoTile label="Named stops">
        <Slider
          aria-label="Shirt size"
          min={0}
          max={4}
          defaultValue={2}
          variant="solid"
          marks={[
            { value: 0, label: 'XS' },
            { value: 1, label: 'S' },
            { value: 2, label: 'M' },
            { value: 3, label: 'L' },
            { value: 4, label: 'XL' },
          ]}
          formatValue={(value) => ['XS', 'S', 'M', 'L', 'XL'][value] ?? ''}
        />
      </DemoTile>

      <DemoTile label="Ticks with tooltip">
        <Slider
          aria-label="Discount"
          step={10}
          defaultValue={40}
          marks
          tooltip
          formatValue={(value) => `${value}%`}
        />
      </DemoTile>

      <DemoTile label="Playback speed">
        <Slider
          aria-label="Playback speed"
          min={0.5}
          max={2}
          step={0.25}
          defaultValue={1}
          size="lg"
          variant="soft"
          marks={[
            { value: 0.5, label: '0.5×' },
            { value: 1, label: '1×' },
            { value: 1.5, label: '1.5×' },
            { value: 2, label: '2×' },
          ]}
          formatValue={(value) => `${value}×`}
        />
      </DemoTile>

      <DemoTile label="Dense ticks with value">
        <Slider
          aria-label="Grid columns"
          min={1}
          max={24}
          defaultValue={12}
          size="sm"
          variant="solid"
          tone="neutral"
          marks
          showValue
        />
      </DemoTile>

      <DemoTile label="Range with marks">
        <RangeSlider
          min={0}
          max={1000}
          step={50}
          minStepsBetween={2}
          defaultValue={[250, 750]}
          tooltip
          marks={[
            { value: 0, label: '$0' },
            { value: 250, label: '$250' },
            { value: 500, label: '$500' },
            { value: 750, label: '$750' },
            { value: 1000, label: '$1k' },
          ]}
          formatValue={(value) => `$${value}`}
          thumbLabels={['Minimum price', 'Maximum price']}
        />
      </DemoTile>
    </div>
  );
}
