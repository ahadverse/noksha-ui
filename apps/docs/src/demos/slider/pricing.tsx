'use client';

import {
  Badge,
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
  FieldDescription,
  FieldLabel,
  FieldRoot,
  Slider,
  Switch,
  type Tone,
} from '@noksha-ui/react';
import * as React from 'react';

interface Tier {
  name: string;
  upTo: number;
  perSeat: number;
  tone: Tone;
  perks: string;
}

const TIERS: Tier[] = [
  {
    name: 'Starter',
    upTo: 10,
    perSeat: 12,
    tone: 'neutral',
    perks: 'Core workspace and 7-day history',
  },
  {
    name: 'Team',
    upTo: 50,
    perSeat: 10,
    tone: 'accent',
    perks: 'SSO, shared projects and 90-day history',
  },
  {
    name: 'Business',
    upTo: Number.POSITIVE_INFINITY,
    perSeat: 8,
    tone: 'success',
    perks: 'SAML, audit log and unlimited history',
  },
];

const STORAGE = [
  { gb: 10, price: 0 },
  { gb: 25, price: 5 },
  { gb: 50, price: 9 },
  { gb: 100, price: 15 },
  { gb: 250, price: 32 },
  { gb: 500, price: 55 },
  { gb: 1000, price: 90 },
];

const ANNUAL_DISCOUNT = 0.2;

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function formatStorage(gb: number) {
  return gb >= 1000 ? `${gb / 1000} TB` : `${gb} GB`;
}

function formatSeats(seats: number) {
  return `${seats} ${seats === 1 ? 'seat' : 'seats'}`;
}

function storageAt(index: number) {
  return STORAGE[index] ?? STORAGE[0]!;
}

function tierFor(seats: number) {
  return TIERS.find((tier) => seats <= tier.upTo) ?? TIERS[TIERS.length - 1]!;
}

const STORAGE_MARKS = STORAGE.map((step, index) =>
  index % 2 === 0 ? { value: index, label: formatStorage(step.gb) } : { value: index },
);

export default function SliderPricing() {
  const [seats, setSeats] = React.useState(24);
  const [storageIndex, setStorageIndex] = React.useState(3);
  const [annual, setAnnual] = React.useState(true);

  const tier = tierFor(seats);
  const storage = storageAt(storageIndex);
  const seatCost = seats * tier.perSeat;
  const subtotal = seatCost + storage.price;
  const discount = annual ? Math.round(subtotal * ANNUAL_DISCOUNT) : 0;
  const total = subtotal - discount;

  return (
    <CardRoot variant="outline" padding="lg" className="w-full overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <CardTitle as="h3">Estimate your plan</CardTitle>
            <CardDescription>Pay per seat, then add storage as your team grows.</CardDescription>
          </div>
          <Badge dot size="lg" tone={tier.tone}>
            {tier.name}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <FieldRoot className="gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <FieldLabel>Seats</FieldLabel>
            <span className="font-semibold text-fg text-sm tabular-nums">{formatSeats(seats)}</span>
          </div>
          <Slider
            min={1}
            max={200}
            value={seats}
            onValueChange={setSeats}
            tone={tier.tone}
            tooltip
            formatValue={formatSeats}
            containerClassName="pt-8"
          />
          <FieldDescription>
            {tier.name} at {usd.format(tier.perSeat)} per seat — {tier.perks}.
          </FieldDescription>
        </FieldRoot>

        <FieldRoot className="gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <FieldLabel>Storage</FieldLabel>
            <span className="font-semibold text-fg text-sm tabular-nums">
              {formatStorage(storage.gb)}
            </span>
          </div>
          <Slider
            min={0}
            max={STORAGE.length - 1}
            value={storageIndex}
            onValueChange={setStorageIndex}
            marks={STORAGE_MARKS}
            formatValue={(index) => formatStorage(storageAt(index).gb)}
          />
          <FieldDescription>
            {storage.price === 0
              ? 'The first 10 GB is included with every plan.'
              : `${usd.format(storage.price)} a month on top of seats.`}
          </FieldDescription>
        </FieldRoot>

        <FieldRoot
          orientation="horizontal"
          className="items-center justify-between gap-6 rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle) p-4"
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <FieldLabel>Annual billing</FieldLabel>
              <Badge size="sm" tone="success">
                Save 20%
              </Badge>
            </div>
            <FieldDescription>Billed once a year instead of every month.</FieldDescription>
          </div>
          <Switch checked={annual} onCheckedChange={setAnnual} />
        </FieldRoot>
      </CardContent>

      <div className="grid grid-cols-1 gap-6 border-(--noksha-border-subtle) border-t bg-subtle p-(--card-p) sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-fg-muted text-sm">
            {annual ? 'Per month, billed annually' : 'Per month'}
          </span>
          <span className="font-semibold text-4xl text-fg tabular-nums tracking-tight">
            {usd.format(total)}
          </span>
          <span className="text-fg-muted text-xs">
            {annual
              ? `${usd.format(total * 12)} charged today`
              : 'Change seats or cancel at any time'}
          </span>
        </div>

        <dl className="flex flex-col gap-2.5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-fg-muted">
              {formatSeats(seats)} × {usd.format(tier.perSeat)}
            </dt>
            <dd className="text-fg tabular-nums">{usd.format(seatCost)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-fg-muted">Storage, {formatStorage(storage.gb)}</dt>
            <dd className="text-fg tabular-nums">
              {storage.price === 0 ? 'Included' : usd.format(storage.price)}
            </dd>
          </div>
          {annual ? (
            <div className="flex justify-between gap-4">
              <dt className="text-fg-muted">Annual discount</dt>
              <dd className="text-success-fg tabular-nums">−{usd.format(discount)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-4 border-(--noksha-border-subtle) border-t pt-2.5">
            <dt className="font-medium text-fg">Total per month</dt>
            <dd className="font-medium text-fg tabular-nums">{usd.format(total)}</dd>
          </div>
        </dl>

        <Button fullWidth className="sm:col-span-2">
          Start a 14-day trial of {tier.name}
        </Button>
      </div>
    </CardRoot>
  );
}
