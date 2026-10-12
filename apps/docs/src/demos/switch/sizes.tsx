'use client';

import { Switch } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function SwitchSizes() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Small" className="items-center">
        <Switch size="sm" defaultChecked aria-label="Small" />
      </DemoTile>

      <DemoTile label="Medium" className="items-center">
        <Switch size="md" defaultChecked aria-label="Medium" />
      </DemoTile>

      <DemoTile label="Large" className="items-center">
        <Switch size="lg" defaultChecked aria-label="Large" />
      </DemoTile>
    </div>
  );
}
