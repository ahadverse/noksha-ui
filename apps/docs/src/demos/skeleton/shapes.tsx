'use client';

import { Skeleton } from '@noksha-ui/react';
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

export default function SkeletonShapes() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Shapes">
        <DemoTile label="circle" className="items-center">
          <Skeleton variant="shimmer" shape="circle" />
        </DemoTile>
        <DemoTile label="pill" className="items-center">
          <Skeleton variant="shimmer" shape="pill" />
        </DemoTile>
        <DemoTile label="text">
          <Skeleton variant="shimmer" shape="text" />
        </DemoTile>
        <DemoTile label="rect">
          <Skeleton variant="shimmer" shape="rect" size="xs" />
        </DemoTile>
        <DemoTile label="rounded">
          <Skeleton variant="shimmer" shape="rounded" size="xs" />
        </DemoTile>
      </Group>

      <Group title="Lines">
        <DemoTile label="lines={2}">
          <Skeleton variant="shimmer" lines={2} />
        </DemoTile>
        <DemoTile label="lines={3}">
          <Skeleton variant="shimmer" lines={3} />
        </DemoTile>
        <DemoTile label="lines={5}">
          <Skeleton variant="shimmer" lines={5} />
        </DemoTile>
      </Group>
    </div>
  );
}
