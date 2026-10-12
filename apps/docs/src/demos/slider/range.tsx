'use client';

import { RangeSlider } from '@noksha-ui/react';
import { DemoTile } from '@/components/demo-tile';

const CLOCK_MARKS = [
  { value: 0, label: '00:00' },
  { value: 360, label: '06:00' },
  { value: 720, label: '12:00' },
  { value: 1080, label: '18:00' },
  { value: 1440, label: '24:00' },
];

const DISCOUNT_MARKS = [
  { value: 0, label: '0%' },
  { value: 10, label: '10%' },
  { value: 20, label: '20%' },
  { value: 30, label: '30%' },
  { value: 40, label: '40%' },
  { value: 50, label: '50%' },
];

export default function SliderRange() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Price filter">
        <RangeSlider
          defaultValue={[120, 860]}
          min={0}
          max={1000}
          step={10}
          showValue
          formatValue={(value) => `$${value.toLocaleString('en-US')}`}
          thumbLabels={['Minimum price', 'Maximum price']}
        />
      </DemoTile>

      <DemoTile label="Minimum gap of 20">
        <RangeSlider
          defaultValue={[30, 60]}
          step={5}
          minStepsBetween={4}
          size="sm"
          tone="neutral"
          showValue
          thumbLabels={['Lower bound', 'Upper bound']}
        />
      </DemoTile>

      <DemoTile label="Age range with tooltips">
        <RangeSlider
          defaultValue={[24, 45]}
          min={18}
          max={80}
          variant="outline"
          thumb="bar"
          tone="info"
          tooltip="always"
          formatValue={(value) => `${value} yrs`}
          thumbLabels={['Youngest age', 'Oldest age']}
        />
      </DemoTile>

      <DemoTile label="Time-of-day window">
        <RangeSlider
          defaultValue={[540, 1020]}
          min={0}
          max={1440}
          step={15}
          minStepsBetween={4}
          variant="solid"
          tone="warning"
          marks={CLOCK_MARKS}
          showValue
          formatValue={(value) =>
            `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`
          }
          thumbLabels={['Window opens', 'Window closes']}
        />
      </DemoTile>

      <DemoTile label="Discount tiers">
        <RangeSlider
          defaultValue={[10, 30]}
          min={0}
          max={50}
          step={5}
          variant="soft"
          thumb="pill"
          tone="success"
          marks={DISCOUNT_MARKS}
          formatValue={(value) => `${value}%`}
          thumbLabels={['Smallest discount', 'Largest discount']}
        />
      </DemoTile>

      <DemoTile label="Stepped levels">
        <RangeSlider
          defaultValue={[3, 7]}
          min={0}
          max={10}
          size="lg"
          variant="solid"
          thumb="square"
          marks
          showValue
          thumbLabels={['Lowest level', 'Highest level']}
        />
      </DemoTile>

      <DemoTile label="Minimal, thumbs on hover">
        <RangeSlider
          defaultValue={[20, 80]}
          size="xs"
          variant="minimal"
          showValue
          formatValue={(value) => `${value}%`}
          thumbLabels={['Low cut', 'High cut']}
        />
      </DemoTile>

      <DemoTile label="Alert band">
        <RangeSlider
          defaultValue={[70, 95]}
          size="xl"
          tone="danger"
          showValue
          formatValue={(value) => `${value}%`}
          thumbLabels={['Warning threshold', 'Critical threshold']}
        />
      </DemoTile>

      <DemoTile label="Invalid">
        <RangeSlider
          defaultValue={[40, 90]}
          invalid
          showValue
          thumbLabels={['Minimum budget', 'Maximum budget']}
        />
      </DemoTile>

      <DemoTile label="Disabled">
        <RangeSlider
          defaultValue={[20, 50]}
          disabled
          showValue
          thumbLabels={['Minimum seats', 'Maximum seats']}
        />
      </DemoTile>
    </div>
  );
}
