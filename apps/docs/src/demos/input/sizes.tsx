'use client';

import { Input } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function InputSizes() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="XS">
        <Input size="xs" aria-label="Extra small" placeholder="Extra small" />
      </DemoTile>

      <DemoTile label="SM">
        <Input size="sm" aria-label="Small" placeholder="Small" />
      </DemoTile>

      <DemoTile label="MD">
        <Input size="md" aria-label="Medium" placeholder="Medium" />
      </DemoTile>

      <DemoTile label="LG">
        <Input size="lg" aria-label="Large" placeholder="Large" />
      </DemoTile>

      <div className="min-w-0 sm:col-span-2">
        <DemoTile label="XL">
          <Input size="xl" aria-label="Extra large" placeholder="Extra large" />
        </DemoTile>
      </div>
    </div>
  );
}
