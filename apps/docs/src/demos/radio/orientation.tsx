'use client';

import { FieldLabel, FieldRoot, Radio, RadioGroup } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

const OPTIONS = [
  { value: 'card', label: 'Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank', label: 'Bank transfer' },
];

export default function RadioOrientation() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Horizontal" className="items-center">
        <RadioGroup defaultValue="card" orientation="horizontal" aria-label="Payment method">
          {OPTIONS.map((option) => (
            <FieldRoot key={option.value} orientation="horizontal" className="w-auto">
              <Radio value={option.value} />
              <FieldLabel>{option.label}</FieldLabel>
            </FieldRoot>
          ))}
        </RadioGroup>
      </DemoTile>

      <DemoTile label="Vertical" className="items-center">
        <RadioGroup defaultValue="card" aria-label="Payment method">
          {OPTIONS.map((option) => (
            <FieldRoot key={option.value} orientation="horizontal">
              <Radio value={option.value} />
              <FieldLabel>{option.label}</FieldLabel>
            </FieldRoot>
          ))}
        </RadioGroup>
      </DemoTile>
    </div>
  );
}
