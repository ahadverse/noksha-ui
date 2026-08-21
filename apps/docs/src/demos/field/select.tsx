'use client';

import {
  FieldDescription,
  FieldLabel,
  FieldRoot,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@noksha-ui/react';
import * as React from 'react';

const CITIES: Record<string, string[]> = {
  us: ['New York', 'San Francisco', 'Austin'],
  gb: ['London', 'Manchester', 'Bristol'],
  jp: ['Tokyo', 'Osaka', 'Kyoto'],
};

const COUNTRY_LABEL: Record<string, string> = {
  us: 'United States',
  gb: 'United Kingdom',
  jp: 'Japan',
};

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_TRIGGER_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16" />
  </svg>
);

const PinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export default function FieldSelect() {
  const [country, setCountry] = React.useState('us');
  const [city, setCity] = React.useState('New York');

  const handleCountryChange = (next: string) => {
    setCountry(next);
    setCity(CITIES[next]?.[0] ?? '');
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <GlobeIcon />
          </span>
          <FieldLabel>Country</FieldLabel>
        </div>
        <SelectRoot value={country} onValueChange={handleCountryChange}>
          <SelectTrigger className={ACCENT_TRIGGER_CLASSES} />
          <SelectContent>
            {Object.entries(COUNTRY_LABEL).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PinIcon />
          </span>
          <FieldLabel>City</FieldLabel>
        </div>
        <SelectRoot value={city} onValueChange={setCity}>
          <SelectTrigger className={ACCENT_TRIGGER_CLASSES} />
          <SelectContent>
            {(CITIES[country] ?? []).map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <FieldDescription>Options here depend on the country selected above.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
