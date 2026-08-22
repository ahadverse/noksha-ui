'use client';

import { FieldDescription, FieldLabel, FieldRoot, Input, sliderVariants } from '@noksha-ui/react';
import * as React from 'react';

const MIN_DISCOUNT = 0;
const MAX_DISCOUNT = 100;

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-warning-subtle) text-(--noksha-warning-fg) [&>svg]:size-3.5';
const WARNING_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-warning-solid) bg-(--noksha-warning-subtle)/25 hover:border-(--noksha-warning-solid) hover:bg-(--noksha-warning-subtle)/40';

const PercentIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 5 5 19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

function clampDiscount(value: number) {
  return Math.min(MAX_DISCOUNT, Math.max(MIN_DISCOUNT, value));
}

export default function FieldPercent() {
  const [discount, setDiscount] = React.useState(20);

  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PercentIcon />
          </span>
          <FieldLabel>Discount</FieldLabel>
        </div>
        <Input
          type="number"
          inputMode="numeric"
          value={discount}
          min={MIN_DISCOUNT}
          max={MAX_DISCOUNT}
          step={1}
          endIcon={<span className="text-(--noksha-warning-fg)">%</span>}
          onChange={(event) => setDiscount(clampDiscount(Number(event.target.value) || 0))}
          className={WARNING_INPUT_CLASSES}
        />
        <input
          type="range"
          min={MIN_DISCOUNT}
          max={MAX_DISCOUNT}
          step={1}
          value={discount}
          aria-label="Discount percentage"
          onChange={(event) => setDiscount(clampDiscount(event.currentTarget.valueAsNumber))}
          style={{ ['--sl-fill' as string]: `${discount}%` }}
          className={sliderVariants({ tone: 'warning', size: 'sm', className: 'mt-3' })}
        />
        <FieldDescription>Drag the slider or type a number — both stay in sync.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
