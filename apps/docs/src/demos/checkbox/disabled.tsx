'use client';

import { Checkbox, FieldLabel, FieldRoot } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function CheckboxDisabled() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Disabled unchecked" className="items-center">
        <Checkbox disabled aria-label="Disabled unchecked" />
      </DemoTile>

      <DemoTile label="Disabled checked" className="items-center">
        <Checkbox disabled defaultChecked aria-label="Disabled checked" />
      </DemoTile>

      <DemoTile label="Disabled indeterminate" className="items-center">
        <Checkbox disabled indeterminate aria-label="Disabled indeterminate" />
      </DemoTile>

      <DemoTile label="Disabled field" className="items-center">
        <FieldRoot orientation="horizontal" disabled className="w-auto">
          <Checkbox defaultChecked />
          <FieldLabel>Auto-renew subscription</FieldLabel>
        </FieldRoot>
      </DemoTile>
    </div>
  );
}
