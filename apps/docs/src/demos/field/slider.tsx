'use client';

import { FieldDescription, FieldLabel, FieldRoot, Slider } from '@noksha-ui/react';
import * as React from 'react';

const PRICE_PER_GB = 0.1;

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';

const GaugeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 7h10M18 7h2M4 17h2M8 17h12" />
    <circle cx="16" cy="7" r="2" fill="currentColor" />
    <circle cx="6" cy="17" r="2" fill="currentColor" />
  </svg>
);

export default function FieldSlider() {
  const [storage, setStorage] = React.useState(100);

  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <GaugeIcon />
          </span>
          <FieldLabel>Storage</FieldLabel>
        </div>
        <Slider
          value={storage}
          onValueChange={setStorage}
          min={10}
          max={500}
          step={10}
          showValue
          formatValue={(value) => `${value}GB`}
        />
        <FieldDescription>${(storage * PRICE_PER_GB).toFixed(2)}/mo at $0.10/GB.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
