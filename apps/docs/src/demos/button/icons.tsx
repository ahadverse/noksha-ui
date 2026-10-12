'use client';

import { Button } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ButtonIcons() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Leading icon" className="items-center">
        <Button icon={<PlusIcon />}>New project</Button>
      </DemoTile>

      <DemoTile label="Trailing icon" className="items-center">
        <Button variant="outline" trailingIcon={<ArrowIcon />}>
          Continue
        </Button>
      </DemoTile>

      <DemoTile label="Icon only" className="items-center">
        <Button iconOnly variant="soft" icon={<PlusIcon />} aria-label="Add item" />
      </DemoTile>
    </div>
  );
}
