'use client';

import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

const TIMEZONES = [
  'Africa/Cairo',
  'Africa/Lagos',
  'America/Bogota',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/New_York',
  'America/Sao_Paulo',
  'Asia/Dhaka',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Europe/Amsterdam',
  'Europe/Berlin',
  'Europe/Lisbon',
  'Europe/London',
  'Europe/Madrid',
  'Europe/Paris',
  'Europe/Warsaw',
  'Pacific/Auckland',
];

const YEARS = Array.from({ length: 30 }, (_, index) => String(2026 - index));
const PORTS = Array.from({ length: 24 }, (_, index) => String(3000 + index));
const WEIGHTS = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

function renderItems(values: string[]) {
  return values.map((value) => (
    <SelectItem key={value} value={value}>
      {value}
    </SelectItem>
  ));
}

export default function SelectLongLists() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="24 timezones">
        <SelectRoot defaultValue="Asia/Dhaka">
          <SelectTrigger aria-label="Timezone" placeholder="Timezone" />
          <SelectContent matchTriggerWidth>{renderItems(TIMEZONES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="30 years">
        <SelectRoot defaultValue="2026">
          <SelectTrigger variant="soft" aria-label="Year" placeholder="Year" />
          <SelectContent matchTriggerWidth>{renderItems(YEARS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Capped height">
        <SelectRoot defaultValue="Europe/Berlin">
          <SelectTrigger aria-label="Timezone" placeholder="Timezone" />
          <SelectContent className="max-h-48" matchTriggerWidth>
            {renderItems(TIMEZONES)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Tall list">
        <SelectRoot defaultValue="Europe/London">
          <SelectTrigger aria-label="Timezone" placeholder="Timezone" />
          <SelectContent className="max-h-96" matchTriggerWidth>
            {renderItems(TIMEZONES)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Monospace ports">
        <SelectRoot defaultValue="3100">
          <SelectTrigger size="xs" className="font-mono" aria-label="Port" placeholder="Port" />
          <SelectContent className="font-mono" matchTriggerWidth>
            {renderItems(PORTS)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Font weights">
        <SelectRoot defaultValue="400">
          <SelectTrigger variant="ghost" aria-label="Font weight" placeholder="Weight" />
          <SelectContent matchTriggerWidth>{renderItems(WEIGHTS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Opens upward">
        <SelectRoot defaultValue="Asia/Tokyo">
          <SelectTrigger aria-label="Timezone" placeholder="Timezone" />
          <SelectContent side="top" className="max-h-56" matchTriggerWidth>
            {renderItems(TIMEZONES)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Narrow trigger">
        <SelectRoot defaultValue="2020">
          <SelectTrigger size="xs" className="w-24" aria-label="Year" placeholder="Year" />
          <SelectContent className="max-h-56 min-w-40">{renderItems(YEARS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Large rows">
        <SelectRoot defaultValue="America/New_York">
          <SelectTrigger size="lg" aria-label="Timezone" placeholder="Timezone" />
          <SelectContent className="max-h-64" matchTriggerWidth>
            {renderItems(TIMEZONES)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Disabled entries">
        <SelectRoot defaultValue="3100">
          <SelectTrigger className="font-mono" aria-label="Port" placeholder="Port" />
          <SelectContent className="max-h-56 font-mono" matchTriggerWidth>
            {PORTS.map((port) => (
              <SelectItem key={port} value={port} disabled={Number(port) % 5 === 0}>
                {port}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Pill trigger">
        <SelectRoot defaultValue="Europe/Paris">
          <SelectTrigger
            variant="soft"
            className="rounded-full px-4"
            aria-label="Timezone"
            placeholder="Timezone"
          />
          <SelectContent className="max-h-56 rounded-2xl" matchTriggerWidth>
            {renderItems(TIMEZONES)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Elevated surface">
        <SelectRoot defaultValue="Australia/Sydney">
          <SelectTrigger
            className="border-transparent shadow-md hover:border-transparent"
            aria-label="Timezone"
            placeholder="Timezone"
          />
          <SelectContent className="max-h-56 shadow-xl" matchTriggerWidth>
            {renderItems(TIMEZONES)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>
    </div>
  );
}
