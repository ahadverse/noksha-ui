'use client';

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
  FieldDescription,
  FieldLabel,
  FieldRoot,
  Slider,
  type Tone,
} from '@noksha-ui/react';
import * as React from 'react';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const usdCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const AMOUNT_MARKS = [
  { value: 50_000, label: '$50K' },
  { value: 500_000, label: '$500K' },
  { value: 1_000_000, label: '$1M' },
  { value: 1_500_000, label: '$1.5M' },
];

const TERM_MARKS = [5, 10, 15, 20, 25, 30].map((years) => ({ value: years, label: `${years} yr` }));

function monthlyPayment(principal: number, annualRate: number, years: number) {
  const months = years * 12;
  const rate = annualRate / 100 / 12;
  if (rate === 0) return principal / months;
  const growth = (1 + rate) ** months;
  return (principal * rate * growth) / (growth - 1);
}

function rateOutlook(rate: number): { tone: Tone; note: string } {
  if (rate < 4)
    return { tone: 'success', note: 'A low rate — most of each payment goes to principal.' };
  if (rate < 7.5) return { tone: 'accent', note: 'Close to the typical fixed rate for this term.' };
  return { tone: 'warning', note: 'A high rate — interest can outgrow the loan itself.' };
}

export default function SliderLoan() {
  const [amount, setAmount] = React.useState(420_000);
  const [years, setYears] = React.useState(30);
  const [rate, setRate] = React.useState(6.4);

  const monthly = monthlyPayment(amount, rate, years);
  const totalPaid = monthly * years * 12;
  const interest = totalPaid - amount;
  const principalShare = Math.round((amount / totalPaid) * 100);
  const outlook = rateOutlook(rate);

  return (
    <CardRoot variant="outline" padding="lg" className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle as="h3">Mortgage calculator</CardTitle>
        <CardDescription>A fixed-rate loan, repaid in equal monthly instalments.</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <FieldRoot className="gap-3">
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
            <FieldLabel>Loan amount</FieldLabel>
            <span className="font-semibold text-3xl text-fg tabular-nums tracking-tight">
              {usd.format(amount)}
            </span>
          </div>
          <Slider
            size="lg"
            variant="solid"
            min={50_000}
            max={1_500_000}
            step={5_000}
            value={amount}
            onValueChange={setAmount}
            marks={AMOUNT_MARKS}
            formatValue={(value) => usd.format(value)}
          />
        </FieldRoot>

        <FieldRoot className="gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <FieldLabel>Term</FieldLabel>
            <span className="font-semibold text-fg text-sm tabular-nums">{years} years</span>
          </div>
          <Slider
            min={5}
            max={30}
            step={5}
            value={years}
            onValueChange={setYears}
            marks={TERM_MARKS}
            formatValue={(value) => `${value} years`}
          />
        </FieldRoot>

        <FieldRoot className="gap-3">
          <FieldLabel>Interest rate</FieldLabel>
          <Slider
            min={1}
            max={12}
            step={0.1}
            value={rate}
            onValueChange={setRate}
            tone={outlook.tone}
            showValue
            formatValue={(value) => `${value.toFixed(1)}%`}
          />
          <FieldDescription>{outlook.note}</FieldDescription>
        </FieldRoot>
      </CardContent>

      <div className="flex flex-col gap-6 border-(--noksha-border-subtle) border-t bg-subtle p-(--card-p)">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <span className="text-fg-muted text-sm">Monthly payment</span>
            <span className="font-semibold text-4xl text-fg tabular-nums tracking-tight">
              {usdCents.format(monthly)}
            </span>
            <span className="text-fg-muted text-xs">
              {years * 12} payments at {rate.toFixed(1)}% APR
            </span>
          </div>

          <dl className="flex flex-col gap-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-fg-muted">Principal</dt>
              <dd className="text-fg tabular-nums">{usd.format(amount)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-fg-muted">Total interest</dt>
              <dd className="text-fg tabular-nums">{usd.format(interest)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-(--noksha-border-subtle) border-t pt-2.5">
              <dt className="font-medium text-fg">Total cost</dt>
              <dd className="font-medium text-fg tabular-nums">{usd.format(totalPaid)}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-3">
          <div
            aria-hidden="true"
            className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full bg-(--noksha-accent-solid) transition-[width] duration-200 ease-out motion-reduce:transition-none"
              style={{ width: `${principalShare}%` }}
            />
            <div className="h-full flex-1 bg-(--noksha-warning-solid)" />
          </div>
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 text-fg-muted text-xs">
            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-(--noksha-accent-solid)" />
              Principal, {principalShare}% of what you repay
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-(--noksha-warning-solid)" />
              Interest, {100 - principalShare}%
            </span>
          </div>
        </div>
      </div>
    </CardRoot>
  );
}
