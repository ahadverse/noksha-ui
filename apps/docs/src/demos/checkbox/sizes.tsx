'use client';

import { Checkbox } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function CheckboxSizes() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Small" className="items-center">
        <Checkbox size="sm" defaultChecked aria-label="Small" />
      </DemoTile>

      <DemoTile label="Medium" className="items-center">
        <Checkbox size="md" defaultChecked aria-label="Medium" />
      </DemoTile>

      <DemoTile label="Large" className="items-center">
        <Checkbox size="lg" defaultChecked aria-label="Large" />
      </DemoTile>
    </div>
  );
}
