'use client';

import { Checkbox } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function CheckboxTones() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Accent" className="items-center">
        <Checkbox tone="accent" defaultChecked aria-label="accent" />
      </DemoTile>

      <DemoTile label="Neutral" className="items-center">
        <Checkbox tone="neutral" defaultChecked aria-label="neutral" />
      </DemoTile>

      <DemoTile label="Danger" className="items-center">
        <Checkbox tone="danger" defaultChecked aria-label="danger" />
      </DemoTile>

      <DemoTile label="Success" className="items-center">
        <Checkbox tone="success" defaultChecked aria-label="success" />
      </DemoTile>

      <DemoTile label="Warning" className="items-center">
        <Checkbox tone="warning" defaultChecked aria-label="warning" />
      </DemoTile>

      <DemoTile label="Info" className="items-center">
        <Checkbox tone="info" defaultChecked aria-label="info" />
      </DemoTile>
    </div>
  );
}
