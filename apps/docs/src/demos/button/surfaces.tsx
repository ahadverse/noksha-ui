'use client';

import { Button } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function ButtonSurfaces() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Gradient" className="items-center">
        <Button variant="gradient">Gradient</Button>
      </DemoTile>

      <DemoTile label="Glow" className="items-center">
        <Button variant="glow">Glow</Button>
      </DemoTile>

      <DemoTile label="Glass" className="items-center">
        <Button variant="glass">Glass</Button>
      </DemoTile>

      <DemoTile label="Dashed" className="items-center">
        <Button variant="dashed">Dashed</Button>
      </DemoTile>

      <DemoTile label="Gradient · danger" className="items-center">
        <Button variant="gradient" tone="danger">
          Danger
        </Button>
      </DemoTile>

      <DemoTile label="Glow · success" className="items-center">
        <Button variant="glow" tone="success">
          Success
        </Button>
      </DemoTile>
    </div>
  );
}
