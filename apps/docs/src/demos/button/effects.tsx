'use client';

import { Button } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function ButtonEffects() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Lift" className="items-center">
        <Button effect="lift">Lift</Button>
      </DemoTile>

      <DemoTile label="Sheen" className="items-center">
        <Button effect="sheen">Sheen</Button>
      </DemoTile>

      <DemoTile label="Wipe" className="items-center">
        <Button effect="wipe">Wipe</Button>
      </DemoTile>

      <DemoTile label="Pulse" className="items-center">
        <Button effect="pulse">Pulse</Button>
      </DemoTile>

      <DemoTile label="Tilt" className="items-center">
        <Button effect="tilt">Tilt</Button>
      </DemoTile>
    </div>
  );
}
