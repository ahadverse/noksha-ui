'use client';

import { Button } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function ButtonSizes() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="XS" className="items-center">
        <Button size="xs">Extra small</Button>
      </DemoTile>

      <DemoTile label="SM" className="items-center">
        <Button size="sm">Small</Button>
      </DemoTile>

      <DemoTile label="MD" className="items-center">
        <Button size="md">Medium</Button>
      </DemoTile>

      <DemoTile label="LG" className="items-center">
        <Button size="lg">Large</Button>
      </DemoTile>

      <DemoTile label="XL" className="items-center">
        <Button size="xl">Extra large</Button>
      </DemoTile>
    </div>
  );
}
