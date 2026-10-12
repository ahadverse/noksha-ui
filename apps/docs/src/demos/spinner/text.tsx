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

export default function SpinnerText() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Placement">
        <DemoTile label="placement end" className="items-center">
          <Spinner size="lg" className="text-accent">
            <span className="text-fg text-sm">Loading</span>
          </Spinner>
        </DemoTile>

        <DemoTile label="placement start" className="items-center">
          <Spinner size="lg" placement="start" className="text-accent">
            <span className="text-fg text-sm">Loading</span>
          </Spinner>
        </DemoTile>

        <DemoTile label="placement top" className="items-center">
          <Spinner size="lg" placement="top" className="text-accent">
            <span className="text-fg text-sm">Loading</span>
          </Spinner>
        </DemoTile>

        <DemoTile label="placement bottom" className="items-center">
          <Spinner size="lg" placement="bottom" className="text-accent">
            <span className="text-fg text-sm">Loading</span>
          </Spinner>
        </DemoTile>
      </Group>

      <Group title="Status lines">
        <DemoTile label="Dots, text after" className="items-center">
          <Spinner variant="dots" size="md" className="text-accent">
            <span className="text-fg text-sm">Uploading 3 files</span>
          </Spinner>
        </DemoTile>

        <DemoTile label="Bars, text before" className="items-center">
          <Spinner variant="bars" size="md" placement="start" className="text-accent">
            <span className="text-fg text-sm">Publishing the build</span>
          </Spinner>
        </DemoTile>

        <DemoTile label="Beat, label null" className="items-center">
          <Spinner variant="beat" size="sm" label={null} className="text-fg-subtle">
            <span className="text-fg-muted text-sm">Checking 214 files</span>
          </Spinner>
        </DemoTile>
      </Group>
    </div>
  );
}
