'use client';

import { Button } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function ButtonVariants() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Solid" className="items-center">
        <Button variant="solid">Solid</Button>
      </DemoTile>

      <DemoTile label="Soft" className="items-center">
        <Button variant="soft">Soft</Button>
      </DemoTile>

      <DemoTile label="Outline" className="items-center">
        <Button variant="outline">Outline</Button>
      </DemoTile>

      <DemoTile label="Ghost" className="items-center">
        <Button variant="ghost">Ghost</Button>
      </DemoTile>

      <DemoTile label="Link" className="items-center">
        <Button variant="link">Link</Button>
      </DemoTile>
    </div>
  );
}
