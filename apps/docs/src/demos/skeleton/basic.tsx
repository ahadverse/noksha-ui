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

export default function SkeletonBasic() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Opacity loops">
        <DemoTile label="pulse">
          <Skeleton variant="pulse" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="breathe">
          <Skeleton variant="breathe" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="blink">
          <Skeleton variant="blink" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="fade">
          <Skeleton variant="fade" shape="rounded" size="sm" />
        </DemoTile>
      </Group>

      <Group title="Travelling highlights">
        <DemoTile label="shimmer">
          <Skeleton variant="shimmer" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="wave">
          <Skeleton variant="wave" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="sheen">
          <Skeleton variant="sheen" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="slide">
          <Skeleton variant="slide" shape="rounded" size="sm" />
        </DemoTile>
      </Group>

      <Group title="Lit shapes">
        <DemoTile label="ripple">
          <Skeleton variant="ripple" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="glow">
          <Skeleton variant="glow" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="bar">
          <Skeleton variant="bar" shape="rounded" size="sm" />
        </DemoTile>
      </Group>

      <Group title="Drifting textures">
        <DemoTile label="gradient">
          <Skeleton variant="gradient" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="stripe">
          <Skeleton variant="stripe" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="grid">
          <Skeleton variant="grid" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="dots">
          <Skeleton variant="dots" shape="rounded" size="sm" />
        </DemoTile>
      </Group>

      <Group title="Still">
        <DemoTile label="outline">
          <Skeleton variant="outline" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="dashed">
          <Skeleton variant="dashed" shape="rounded" size="sm" />
        </DemoTile>
        <DemoTile label="flat">
          <Skeleton variant="flat" shape="rounded" size="sm" />
        </DemoTile>
      </Group>
    </div>
  );
}
