'use client';

import { Input } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m16.5 16.5 4 4" strokeLinecap="round" />
  </svg>
);

export default function InputIcons() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Leading icon">
        <Input
          startIcon={<SearchIcon />}
          aria-label="Search components"
          placeholder="Search components"
          type="search"
        />
      </DemoTile>

      <DemoTile label="Currency prefix">
        <Input
          startIcon={<span className="text-fg-muted">$</span>}
          aria-label="Amount"
          placeholder="0.00"
          inputMode="decimal"
        />
      </DemoTile>

      <div className="min-w-0 sm:col-span-2">
        <DemoTile label="Domain suffix">
          <Input
            endIcon={<span className="text-fg-muted text-sm">.noksha.dev</span>}
            aria-label="Subdomain"
            placeholder="my-app"
          />
        </DemoTile>
      </div>
    </div>
  );
}
