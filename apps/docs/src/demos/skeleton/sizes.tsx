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

export default function SkeletonSizes() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Circle">
        <DemoTile label="circle · xs" className="items-center">
          <Skeleton variant="shimmer" shape="circle" size="xs" />
        </DemoTile>
        <DemoTile label="circle · sm" className="items-center">
          <Skeleton variant="shimmer" shape="circle" size="sm" />
        </DemoTile>
        <DemoTile label="circle · md" className="items-center">
          <Skeleton variant="shimmer" shape="circle" size="md" />
        </DemoTile>
        <DemoTile label="circle · lg" className="items-center">
          <Skeleton variant="shimmer" shape="circle" size="lg" />
        </DemoTile>
        <DemoTile label="circle · xl" className="items-center">
          <Skeleton variant="shimmer" shape="circle" size="xl" />
        </DemoTile>
      </Group>

      <Group title="Text">
        <DemoTile label="text · xs">
          <Skeleton variant="wave" size="xs" />
        </DemoTile>
        <DemoTile label="text · sm">
          <Skeleton variant="wave" size="sm" />
        </DemoTile>
        <DemoTile label="text · md">
          <Skeleton variant="wave" size="md" />
        </DemoTile>
        <DemoTile label="text · lg">
          <Skeleton variant="wave" size="lg" />
        </DemoTile>
        <DemoTile label="text · xl">
          <Skeleton variant="wave" size="xl" />
        </DemoTile>
      </Group>

      <Group title="Pill">
        <DemoTile label="pill · xs" className="items-center">
          <Skeleton variant="wave" shape="pill" size="xs" />
        </DemoTile>
        <DemoTile label="pill · sm" className="items-center">
          <Skeleton variant="wave" shape="pill" size="sm" />
        </DemoTile>
        <DemoTile label="pill · md" className="items-center">
          <Skeleton variant="wave" shape="pill" size="md" />
        </DemoTile>
        <DemoTile label="pill · lg" className="items-center">
          <Skeleton variant="wave" shape="pill" size="lg" />
        </DemoTile>
        <DemoTile label="pill · xl" className="items-center">
          <Skeleton variant="wave" shape="pill" size="xl" />
        </DemoTile>
      </Group>

      <Group title="Rounded">
        <DemoTile label="rounded · xs">
          <Skeleton variant="sheen" shape="rounded" size="xs" />
        </DemoTile>
        <DemoTile label="rounded · md">
          <Skeleton variant="sheen" shape="rounded" size="md" />
        </DemoTile>
        <DemoTile label="rounded · xl">
          <Skeleton variant="sheen" shape="rounded" size="xl" />
        </DemoTile>
      </Group>
    </div>
  );
}
