'use client';

import { Checkbox } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function CheckboxCustom() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Pill" className="items-center">
        <Checkbox className="rounded-full" defaultChecked aria-label="Pill" />
      </DemoTile>

      <DemoTile label="Brand pink" className="items-center">
        <Checkbox
          containerClassName="[--cb-solid:#ec4899] [--cb-ink:#ffffff]"
          defaultChecked
          aria-label="Brand pink"
        />
      </DemoTile>

      <DemoTile label="Thick border" className="items-center">
        <Checkbox className="border-4" defaultChecked aria-label="Thick border" />
      </DemoTile>

      <DemoTile label="Oversized" className="items-center">
        <Checkbox containerClassName="size-7" defaultChecked aria-label="Oversized" />
      </DemoTile>
    </div>
  );
}
