'use client';

import { FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m16.5 16.5 4 4" strokeLinecap="round" />
  </svg>
);

const COMPONENTS = [
  'Accordion',
  'Alert',
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'Checkbox',
  'Dialog',
  'Drawer',
  'Field',
  'Input',
  'Popover',
  'Radio',
  'Select',
  'Separator',
  'Skeleton',
  'Slider',
  'Spinner',
  'Switch',
  'Tabs',
  'Textarea',
  'Toast',
  'Tooltip',
];

export default function FieldSearch() {
  const [query, setQuery] = React.useState('');
  const results =
    query.length === 0
      ? []
      : COMPONENTS.filter((name) => name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);

  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <SearchIcon />
          </span>
          <FieldLabel>Search components</FieldLabel>
        </div>
        <Input
          type="search"
          startIcon={<SearchIcon />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search…"
          className={ACCENT_INPUT_CLASSES}
        />
      </FieldRoot>
      {results.length > 0 ? (
        <ul className="mt-2 divide-y divide-line rounded-lg border border-line">
          {results.map((name) => (
            <li key={name} className="px-3 py-2 text-sm">
              {name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
