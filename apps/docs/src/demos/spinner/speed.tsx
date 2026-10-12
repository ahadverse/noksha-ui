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

export default function SpinnerSpeeds() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="ring">
        <DemoTile label="ring · slow" className="items-center">
          <Spinner variant="ring" speed="slow" size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="ring · normal" className="items-center">
          <Spinner variant="ring" size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="ring · fast" className="items-center">
          <Spinner variant="ring" speed="fast" size="2xl" className="text-accent" />
        </DemoTile>
      </Group>

      <Group title="dots">
        <DemoTile label="dots · slow" className="items-center">
          <Spinner variant="dots" speed="slow" size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="dots · normal" className="items-center">
          <Spinner variant="dots" size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="dots · fast" className="items-center">
          <Spinner variant="dots" speed="fast" size="2xl" className="text-accent" />
        </DemoTile>
      </Group>

      <Group title="bars">
        <DemoTile label="bars · slow" className="items-center">
          <Spinner variant="bars" speed="slow" size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="bars · normal" className="items-center">
          <Spinner variant="bars" size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="bars · fast" className="items-center">
          <Spinner variant="bars" speed="fast" size="2xl" className="text-accent" />
        </DemoTile>
      </Group>

      <Group title="ripple">
        <DemoTile label="ripple · slow" className="items-center">
          <Spinner variant="ripple" speed="slow" size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="ripple · normal" className="items-center">
          <Spinner variant="ripple" size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="ripple · fast" className="items-center">
          <Spinner variant="ripple" speed="fast" size="2xl" className="text-accent" />
        </DemoTile>
      </Group>

      <Group title="grid">
        <DemoTile label="grid · slow" className="items-center">
          <Spinner variant="grid" speed="slow" size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="grid · normal" className="items-center">
          <Spinner variant="grid" size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="grid · fast" className="items-center">
          <Spinner variant="grid" speed="fast" size="2xl" className="text-accent" />
        </DemoTile>
      </Group>
    </div>
  );
}
