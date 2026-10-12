'use client';

import { Button } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function ButtonTones() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Accent" className="items-center">
        <Button tone="accent">Accent</Button>
      </DemoTile>

      <DemoTile label="Neutral" className="items-center">
        <Button tone="neutral">Neutral</Button>
      </DemoTile>

      <DemoTile label="Danger" className="items-center">
        <Button tone="danger">Danger</Button>
      </DemoTile>

      <DemoTile label="Success" className="items-center">
        <Button tone="success">Success</Button>
      </DemoTile>

      <DemoTile label="Warning" className="items-center">
        <Button tone="warning">Warning</Button>
      </DemoTile>

      <DemoTile label="Info" className="items-center">
        <Button tone="info">Info</Button>
      </DemoTile>
    </div>
  );
}
