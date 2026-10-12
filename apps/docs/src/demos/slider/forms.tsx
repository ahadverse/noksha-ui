'use client';

import {
  Button,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  RangeSlider,
  Slider,
} from '@noksha-ui/react';
import * as React from 'react';

const MIN_BUDGET = 1000;

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function formatHour(value: number) {
  return `${String(value).padStart(2, '0')}:00`;
}

function serialize(data: FormData) {
  const result: Record<string, string | string[]> = {};
  for (const key of new Set(data.keys())) {
    const values = data.getAll(key).map(String);
    result[key] = values.length > 1 ? values : (values[0] ?? '');
  }
  return JSON.stringify(result, null, 2);
}

export default function SliderForms() {
  const [formKey, setFormKey] = React.useState(0);
  const [budgetError, setBudgetError] = React.useState<string | null>(null);
  const [entries, setEntries] = React.useState<string | null>(null);
  const budgetRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
      <form
        key={formKey}
        className="flex min-w-0 flex-col gap-7 rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle) bg-(--noksha-bg-surface) p-6"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const budget = Number(data.get('budget'));
          if (budget < MIN_BUDGET) {
            setBudgetError(
              `Raise it to at least ${usd.format(MIN_BUDGET)} — it is ${usd.format(budget)}.`,
            );
            setEntries(null);
            budgetRef.current?.focus();
            return;
          }
          setBudgetError(null);
          setEntries(serialize(data));
        }}
      >
        <FieldRoot required invalid={budgetError !== null}>
          <FieldLabel>Monthly budget</FieldLabel>
          <Slider
            ref={budgetRef}
            name="budget"
            defaultValue={750}
            min={0}
            max={5000}
            step={250}
            showValue
            formatValue={(value) => usd.format(value)}
            onValueChange={(value) => {
              if (value >= MIN_BUDGET) setBudgetError(null);
            }}
          />
          <FieldDescription>
            Managed plans start at {usd.format(MIN_BUDGET)} a month.
          </FieldDescription>
          <FieldError>{budgetError}</FieldError>
        </FieldRoot>

        <FieldRoot>
          <FieldLabel>Team size</FieldLabel>
          <RangeSlider
            name="team"
            defaultValue={[4, 12]}
            min={1}
            max={50}
            minStepsBetween={1}
            showValue
            thumbLabels={['Smallest team size', 'Largest team size']}
          />
          <FieldDescription>Both thumbs share one name, so it posts two values.</FieldDescription>
        </FieldRoot>

        <FieldRoot>
          <FieldLabel>Support hours</FieldLabel>
          <RangeSlider
            name="hours"
            defaultValue={[9, 17]}
            min={0}
            max={24}
            minStepsBetween={2}
            tone="info"
            showValue
            formatValue={formatHour}
            thumbLabels={['Support starts', 'Support ends']}
          />
          <FieldDescription>The form gets the raw hour, not the formatted label.</FieldDescription>
        </FieldRoot>

        <FieldRoot disabled>
          <FieldLabel>Included seats</FieldLabel>
          <Slider name="seats" defaultValue={5} min={1} max={20} showValue />
          <FieldDescription>Disabled controls are left out of FormData.</FieldDescription>
        </FieldRoot>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button type="submit">Save plan</Button>
          <Button
            variant="ghost"
            tone="neutral"
            onClick={() => {
              setFormKey((key) => key + 1);
              setBudgetError(null);
              setEntries(null);
            }}
          >
            Reset
          </Button>
        </div>
      </form>

      <div className="flex min-w-0 flex-col gap-3">
        <span className="font-(--noksha-weight-medium) text-(length:--noksha-text-xs) text-(--noksha-fg-subtle) uppercase tracking-(--noksha-tracking-wide)">
          Submitted FormData
        </span>
        <pre className="min-h-48 overflow-x-auto rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle) bg-(--noksha-bg-subtle) p-4 font-mono text-(--noksha-fg-default) text-xs leading-relaxed">
          {entries ?? 'Submit the form to see its entries.'}
        </pre>
      </div>
    </div>
  );
}
