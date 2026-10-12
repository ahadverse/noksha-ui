'use client';

import { Button, SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const COUNTRIES = [
  { value: 'bd', label: 'Bangladesh' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
];

const CITIES: Record<string, { value: string; label: string }[]> = {
  bd: [
    { value: 'dac', label: 'Dhaka' },
    { value: 'cgp', label: 'Chattogram' },
    { value: 'syl', label: 'Sylhet' },
  ],
  de: [
    { value: 'ber', label: 'Berlin' },
    { value: 'muc', label: 'Munich' },
    { value: 'ham', label: 'Hamburg' },
  ],
  jp: [
    { value: 'tyo', label: 'Tokyo' },
    { value: 'osa', label: 'Osaka' },
    { value: 'kyo', label: 'Kyoto' },
  ],
};

const SIZES = [
  { value: 's', label: 'Small' },
  { value: 'm', label: 'Medium' },
  { value: 'l', label: 'Large' },
];

function citiesFor(country: string) {
  return CITIES[country] ?? [];
}

function renderSizeOptions() {
  return SIZES.map((size) => (
    <SelectItem key={size.value} value={size.value}>
      {size.label}
    </SelectItem>
  ));
}

function DependentSelects() {
  const [country, setCountry] = React.useState('bd');
  const [city, setCity] = React.useState('dac');

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <SelectRoot
        value={country}
        onValueChange={(next) => {
          setCountry(next);
          setCity(citiesFor(next)[0]?.value ?? '');
        }}
      >
        <SelectTrigger aria-label="Country" placeholder="Country" />
        <SelectContent matchTriggerWidth>
          {COUNTRIES.map((entry) => (
            <SelectItem key={entry.value} value={entry.value}>
              {entry.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <SelectRoot value={city} onValueChange={setCity}>
        <SelectTrigger aria-label="City" placeholder="City" />
        <SelectContent matchTriggerWidth>
          {citiesFor(country).map((entry) => (
            <SelectItem key={entry.value} value={entry.value}>
              {entry.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
}

function MirroredValue() {
  const [size, setSize] = React.useState('m');

  return (
    <div className="flex flex-col gap-2">
      <SelectRoot value={size} onValueChange={setSize}>
        <SelectTrigger aria-label="Size" placeholder="Size" />
        <SelectContent matchTriggerWidth>{renderSizeOptions()}</SelectContent>
      </SelectRoot>
      <code className="text-(--noksha-fg-subtle) text-xs">value: {size}</code>
    </div>
  );
}

function ResettableSize() {
  const [size, setSize] = React.useState('l');

  return (
    <div className="flex items-center gap-2">
      <SelectRoot value={size} onValueChange={setSize}>
        <SelectTrigger className="flex-1" aria-label="Size" placeholder="Size" />
        <SelectContent matchTriggerWidth>{renderSizeOptions()}</SelectContent>
      </SelectRoot>
      <Button variant="soft" size="sm" onClick={() => setSize('l')}>
        Reset
      </Button>
    </div>
  );
}

function ClearableSize() {
  const [size, setSize] = React.useState<string>('m');

  return (
    <div className="flex items-center gap-2">
      <SelectRoot value={size} onValueChange={setSize}>
        <SelectTrigger className="flex-1" aria-label="Size" placeholder="Nothing selected" />
        <SelectContent matchTriggerWidth>{renderSizeOptions()}</SelectContent>
      </SelectRoot>
      <Button variant="ghost" size="sm" disabled={!size} onClick={() => setSize('')}>
        Clear
      </Button>
    </div>
  );
}

function ChangeCounter() {
  const [size, setSize] = React.useState('s');
  const [changes, setChanges] = React.useState(0);

  return (
    <div className="flex flex-col gap-2">
      <SelectRoot
        value={size}
        onValueChange={(next) => {
          setSize(next);
          setChanges((count) => count + 1);
        }}
      >
        <SelectTrigger aria-label="Size" placeholder="Size" />
        <SelectContent matchTriggerWidth>{renderSizeOptions()}</SelectContent>
      </SelectRoot>
      <code className="text-(--noksha-fg-subtle) text-xs">changes: {changes}</code>
    </div>
  );
}

function ControlledOpen() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-2">
      <SelectRoot defaultValue="m" open={open} onOpenChange={setOpen}>
        <SelectTrigger className="flex-1" aria-label="Size" placeholder="Size" />
        <SelectContent matchTriggerWidth>{renderSizeOptions()}</SelectContent>
      </SelectRoot>
      <Button variant="soft" size="sm" onClick={() => setOpen((value) => !value)}>
        {open ? 'Close' : 'Open'}
      </Button>
    </div>
  );
}

function LockToggle() {
  const [size, setSize] = React.useState('m');

  return (
    <div className="flex items-center gap-2">
      <SelectRoot value={size} onValueChange={setSize} disabled={size === 'l'}>
        <SelectTrigger className="flex-1" aria-label="Size" placeholder="Size" />
        <SelectContent matchTriggerWidth>{renderSizeOptions()}</SelectContent>
      </SelectRoot>
      <Button variant="ghost" size="sm" onClick={() => setSize('m')}>
        Unlock
      </Button>
    </div>
  );
}

function TwoInSync() {
  const [size, setSize] = React.useState('m');

  return (
    <div className="flex items-center gap-2">
      <SelectRoot value={size} onValueChange={setSize}>
        <SelectTrigger size="sm" className="flex-1" aria-label="Size A" placeholder="A" />
        <SelectContent matchTriggerWidth>{renderSizeOptions()}</SelectContent>
      </SelectRoot>
      <SelectRoot value={size} onValueChange={setSize}>
        <SelectTrigger
          size="sm"
          variant="soft"
          className="flex-1"
          aria-label="Size B"
          placeholder="B"
        />
        <SelectContent matchTriggerWidth>{renderSizeOptions()}</SelectContent>
      </SelectRoot>
    </div>
  );
}

function DerivedSummary() {
  const [country, setCountry] = React.useState('bd');

  return (
    <div className="flex flex-col gap-2">
      <SelectRoot value={country} onValueChange={setCountry}>
        <SelectTrigger size="sm" aria-label="Country" placeholder="Country" />
        <SelectContent matchTriggerWidth>
          {COUNTRIES.map((entry) => (
            <SelectItem key={entry.value} value={entry.value}>
              {entry.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <span className="text-(--noksha-fg-subtle) text-xs">
        {citiesFor(country).length} cities available
      </span>
    </div>
  );
}

export default function SelectControlled() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="min-w-0 sm:col-span-2">
        <DemoTile label="Dependent country and city">
          <DependentSelects />
        </DemoTile>
      </div>

      <DemoTile label="Mirrored value">
        <MirroredValue />
      </DemoTile>

      <DemoTile label="Reset button">
        <ResettableSize />
      </DemoTile>

      <DemoTile label="Clearable">
        <ClearableSize />
      </DemoTile>

      <DemoTile label="Change counter">
        <ChangeCounter />
      </DemoTile>

      <DemoTile label="Controlled open">
        <ControlledOpen />
      </DemoTile>

      <DemoTile label="Default value">
        <SelectRoot defaultValue="s">
          <SelectTrigger aria-label="Size" placeholder="Size" />
          <SelectContent matchTriggerWidth>{renderSizeOptions()}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Uncontrolled">
        <SelectRoot defaultValue="m">
          <SelectTrigger variant="soft" aria-label="Size" placeholder="Size" />
          <SelectContent matchTriggerWidth>{renderSizeOptions()}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Lock toggle">
        <LockToggle />
      </DemoTile>

      <DemoTile label="Two in sync">
        <TwoInSync />
      </DemoTile>

      <DemoTile label="Derived summary">
        <DerivedSummary />
      </DemoTile>
    </div>
  );
}
