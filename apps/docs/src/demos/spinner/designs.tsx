'use client';

import { Spinner } from '@noksha-ui/react';
import type * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h4 className="flex items-center gap-3 font-medium text-(--noksha-fg-subtle) text-xs uppercase tracking-wide after:h-px after:flex-1 after:bg-(--noksha-border-subtle)">
        {title}
      </h4>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

export default function SpinnerDesigns() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Rings">
        <DemoTile label="ring" className="items-center">
          <Spinner variant="ring" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="arc" className="items-center">
          <Spinner variant="arc" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="dual" className="items-center">
          <Spinner variant="dual" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="dash" className="items-center">
          <Spinner variant="dash" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="segment" className="items-center">
          <Spinner variant="segment" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="comet" className="items-center">
          <Spinner variant="comet" className="size-8 text-accent" label={null} />
        </DemoTile>
      </Group>

      <Group title="Dots">
        <DemoTile label="dots" className="items-center">
          <Spinner variant="dots" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="bounce" className="items-center">
          <Spinner variant="bounce" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="beat" className="items-center">
          <Spinner variant="beat" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="orbit" className="items-center">
          <Spinner variant="orbit" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="halo" className="items-center">
          <Spinner variant="halo" className="size-8 text-accent" label={null} />
        </DemoTile>
      </Group>

      <Group title="Bars">
        <DemoTile label="bars" className="items-center">
          <Spinner variant="bars" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="wave" className="items-center">
          <Spinner variant="wave" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="spokes" className="items-center">
          <Spinner variant="spokes" className="size-8 text-accent" label={null} />
        </DemoTile>
      </Group>

      <Group title="Shapes">
        <DemoTile label="pulse" className="items-center">
          <Spinner variant="pulse" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="ripple" className="items-center">
          <Spinner variant="ripple" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="grid" className="items-center">
          <Spinner variant="grid" className="size-8 text-accent" label={null} />
        </DemoTile>
        <DemoTile label="flip" className="items-center">
          <Spinner variant="flip" className="size-8 text-accent" label={null} />
        </DemoTile>
      </Group>
    </div>
  );
}
