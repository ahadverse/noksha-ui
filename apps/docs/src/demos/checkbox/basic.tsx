'use client';

import { Checkbox, FieldLabel, FieldRoot } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function CheckboxBasic() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Unchecked" className="items-center">
        <FieldRoot orientation="horizontal" className="w-auto">
          <Checkbox />
          <FieldLabel>Unchecked</FieldLabel>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Checked" className="items-center">
        <FieldRoot orientation="horizontal" className="w-auto">
          <Checkbox defaultChecked />
          <FieldLabel>Checked</FieldLabel>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Indeterminate" className="items-center">
        <FieldRoot orientation="horizontal" className="w-auto">
          <Checkbox indeterminate />
          <FieldLabel>Indeterminate</FieldLabel>
        </FieldRoot>
      </DemoTile>
    </div>
  );
}
