'use client';

import { FieldLabel, FieldRoot, Radio } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function RadioDisabled() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Disabled unchecked" className="items-center">
        <Radio value="off" disabled aria-label="Disabled unchecked" />
      </DemoTile>

      <DemoTile label="Disabled checked" className="items-center">
        <Radio value="on" disabled defaultChecked aria-label="Disabled checked" />
      </DemoTile>

      <DemoTile label="Disabled field" className="items-center">
        <FieldRoot orientation="horizontal" disabled>
          <Radio value="renew" defaultChecked />
          <FieldLabel>Auto-renew subscription</FieldLabel>
        </FieldRoot>
      </DemoTile>
    </div>
  );
}
