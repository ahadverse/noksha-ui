'use client';

import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  RangeSlider,
  Slider,
} from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function SliderStates() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Disabled">
        <Slider aria-label="Volume" defaultValue={40} disabled />
      </DemoTile>

      <DemoTile label="Disabled with value">
        <Slider aria-label="Brightness" variant="solid" defaultValue={65} showValue disabled />
      </DemoTile>

      <DemoTile label="Invalid">
        <Slider aria-label="CPU limit" defaultValue={92} invalid />
      </DemoTile>

      <DemoTile label="Invalid range">
        <RangeSlider
          defaultValue={[5, 95]}
          invalid
          showValue
          thumbLabels={['Lower alert threshold', 'Upper alert threshold']}
        />
      </DemoTile>

      <DemoTile label="Invalid field with error">
        <FieldRoot invalid>
          <FieldLabel>Monthly budget</FieldLabel>
          <Slider
            min={0}
            max={120}
            step={5}
            defaultValue={95}
            showValue
            formatValue={(value) => `$${value}k`}
          />
          <FieldError>Above the $80k approved for this quarter.</FieldError>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Required with description">
        <FieldRoot required>
          <FieldLabel>Team size</FieldLabel>
          <Slider min={1} max={20} defaultValue={6} showValue />
          <FieldDescription>Seats are billed per active member.</FieldDescription>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Disabled range">
        <RangeSlider
          min={0}
          max={500}
          step={10}
          defaultValue={[120, 340]}
          disabled
          showValue
          formatValue={(value) => `$${value}`}
          thumbLabels={['Minimum price', 'Maximum price']}
        />
      </DemoTile>

      <DemoTile label="Disabled field">
        <FieldRoot disabled>
          <FieldLabel>Log retention</FieldLabel>
          <Slider
            min={7}
            max={90}
            defaultValue={30}
            showValue
            formatValue={(value) => `${value} days`}
          />
          <FieldDescription>Locked by your organisation’s data policy.</FieldDescription>
        </FieldRoot>
      </DemoTile>
    </div>
  );
}
