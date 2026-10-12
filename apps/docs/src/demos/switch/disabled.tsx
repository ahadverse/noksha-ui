'use client';

import { FieldLabel, FieldRoot, Switch } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function SwitchDisabled() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Disabled off" className="items-center">
        <Switch disabled aria-label="Disabled off" />
      </DemoTile>

      <DemoTile label="Disabled on" className="items-center">
        <Switch disabled defaultChecked aria-label="Disabled on" />
      </DemoTile>

      <DemoTile label="Disabled field" className="items-center">
        <FieldRoot orientation="horizontal" disabled>
          <Switch defaultChecked />
          <FieldLabel>Auto-renew subscription</FieldLabel>
        </FieldRoot>
      </DemoTile>
    </div>
  );
}
