'use client';

import { Radio } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function RadioTones() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Accent" className="items-center">
        <Radio value="accent" tone="accent" defaultChecked aria-label="accent" />
      </DemoTile>

      <DemoTile label="Neutral" className="items-center">
        <Radio value="neutral" tone="neutral" defaultChecked aria-label="neutral" />
      </DemoTile>

      <DemoTile label="Danger" className="items-center">
        <Radio value="danger" tone="danger" defaultChecked aria-label="danger" />
      </DemoTile>

      <DemoTile label="Success" className="items-center">
        <Radio value="success" tone="success" defaultChecked aria-label="success" />
      </DemoTile>

      <DemoTile label="Warning" className="items-center">
        <Radio value="warning" tone="warning" defaultChecked aria-label="warning" />
      </DemoTile>

      <DemoTile label="Info" className="items-center">
        <Radio value="info" tone="info" defaultChecked aria-label="info" />
      </DemoTile>
    </div>
  );
}
