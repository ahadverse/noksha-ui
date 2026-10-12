'use client';

import {
  Badge,
  Button,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  FieldLabel,
  FieldRoot,
  RangeSlider,
  Slider,
} from '@noksha-ui/react';
import * as React from 'react';

const PRICE_MIN = 0;
const PRICE_MAX = 1500;
const PRICE_STEP = 10;
const DISTANCE_MAX = 100;
const RATING_MIN = 1;
const BUCKETS = 30;
const BUCKET_SIZE = (PRICE_MAX - PRICE_MIN) / BUCKETS;

const ANY_PRICE: [number, number] = [PRICE_MIN, PRICE_MAX];

const RATING_MARKS = [
  { value: 1, label: '1★' },
  { value: 2, label: '2★' },
  { value: 3, label: '3★' },
  { value: 4, label: '4★' },
  { value: 5, label: '5★' },
];

const VALUE_CLASSES = 'text-(--noksha-fg-muted) text-sm tabular-nums';

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const random = seeded(2026);

const PRODUCTS = Array.from({ length: 1200 }, () => ({
  price: Math.round(((random() + random() + random()) / 3) ** 1.4 * PRICE_MAX),
  rating: Math.round((5 - random() ** 1.6 * 4) * 10) / 10,
  distance: Math.max(1, Math.round(random() ** 1.3 * DISTANCE_MAX)),
}));

const HISTOGRAM = Array.from({ length: BUCKETS }, (_, index) => {
  const start = PRICE_MIN + index * BUCKET_SIZE;
  const end = start + BUCKET_SIZE;
  const last = index === BUCKETS - 1;
  const count = PRODUCTS.filter(
    (product) => product.price >= start && (product.price < end || (last && product.price <= end)),
  ).length;
  return { start, middle: start + BUCKET_SIZE / 2, count };
});

const TALLEST = Math.max(...HISTOGRAM.map((bucket) => bucket.count));

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function formatPrice(value: number) {
  return value === PRICE_MAX ? `${usd.format(value)}+` : usd.format(value);
}

export default function SliderFilters() {
  const [price, setPrice] = React.useState<[number, number]>([200, 900]);
  const [rating, setRating] = React.useState(3);
  const [distance, setDistance] = React.useState(40);

  const results = React.useMemo(
    () =>
      PRODUCTS.filter(
        (product) =>
          product.price >= price[0] &&
          product.price <= price[1] &&
          product.rating >= rating &&
          product.distance <= distance,
      ).length,
    [price, rating, distance],
  );

  const active = [
    price[0] !== ANY_PRICE[0] || price[1] !== ANY_PRICE[1],
    rating !== RATING_MIN,
    distance !== DISTANCE_MAX,
  ].filter(Boolean).length;

  return (
    <CardRoot className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CardTitle as="h3">Filters</CardTitle>
            {active > 0 ? (
              <Badge variant="soft" size="sm">
                {active} active
              </Badge>
            ) : null}
          </div>
          <Button
            variant="ghost"
            tone="neutral"
            size="sm"
            disabled={active === 0}
            onClick={() => {
              setPrice(ANY_PRICE);
              setRating(RATING_MIN);
              setDistance(DISTANCE_MAX);
            }}
          >
            Clear all
          </Button>
        </div>
        <CardDescription>
          {PRODUCTS.length.toLocaleString('en-US')} refurbished laptops from local sellers.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-7">
        <FieldRoot>
          <div className="flex items-baseline justify-between gap-3">
            <FieldLabel>Price</FieldLabel>
            <span className={VALUE_CLASSES}>
              {formatPrice(price[0])} – {formatPrice(price[1])}
            </span>
          </div>
          <div aria-hidden="true" className="mt-2 flex h-12 items-end gap-px px-2">
            {HISTOGRAM.map((bucket) => (
              <span
                key={bucket.start}
                className={
                  bucket.middle >= price[0] && bucket.middle <= price[1]
                    ? 'flex-1 rounded-t-[2px] bg-(--noksha-accent-solid)'
                    : 'flex-1 rounded-t-[2px] bg-(--noksha-bg-muted)'
                }
                style={{ height: `${Math.max(4, (bucket.count / TALLEST) * 100)}%` }}
              />
            ))}
          </div>
          <RangeSlider
            value={price}
            onValueChange={setPrice}
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            minStepsBetween={5}
            formatValue={formatPrice}
            thumbLabels={['Minimum price', 'Maximum price']}
          />
        </FieldRoot>

        <FieldRoot>
          <div className="flex items-baseline justify-between gap-3">
            <FieldLabel>Minimum rating</FieldLabel>
            <span className={VALUE_CLASSES}>
              {rating === RATING_MIN ? 'Any rating' : `${rating}★ & up`}
            </span>
          </div>
          <Slider
            value={rating}
            onValueChange={setRating}
            min={RATING_MIN}
            max={5}
            tone="warning"
            marks={RATING_MARKS}
            formatValue={(value) => `${value} stars and up`}
          />
        </FieldRoot>

        <FieldRoot>
          <div className="flex items-baseline justify-between gap-3">
            <FieldLabel>Distance</FieldLabel>
            <span className={VALUE_CLASSES}>
              {distance === DISTANCE_MAX ? 'Any distance' : `Within ${distance} km`}
            </span>
          </div>
          <Slider
            value={distance}
            onValueChange={setDistance}
            min={1}
            max={DISTANCE_MAX}
            tone="info"
            tooltip
            formatValue={(value) => `${value} km`}
          />
        </FieldRoot>
      </CardContent>

      <CardFooter>
        <Button fullWidth disabled={results === 0}>
          {results === 0
            ? 'No matching laptops'
            : `Show ${results.toLocaleString('en-US')} results`}
        </Button>
      </CardFooter>
    </CardRoot>
  );
}
