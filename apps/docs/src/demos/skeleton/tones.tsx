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

export default function SkeletonTones() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Semantic tones">
        <DemoTile label="neutral">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="neutral" />
        </DemoTile>
        <DemoTile label="accent">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="accent" />
        </DemoTile>
        <DemoTile label="danger">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="danger" />
        </DemoTile>
        <DemoTile label="success">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="success" />
        </DemoTile>
        <DemoTile label="warning">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="warning" />
        </DemoTile>
        <DemoTile label="info">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="info" />
        </DemoTile>
      </Group>

      <Group title="Plain hex values">
        <DemoTile label="Rose">
          <Skeleton
            variant="wave"
            shape="rounded"
            size="sm"
            className="[--sk-subtle-hover:#fda4af] [--sk-subtle:#fecdd3]"
          />
        </DemoTile>
        <DemoTile label="Orange">
          <Skeleton
            variant="wave"
            shape="rounded"
            size="sm"
            className="[--sk-subtle-hover:#fdba74] [--sk-subtle:#fed7aa]"
          />
        </DemoTile>
        <DemoTile label="Green">
          <Skeleton
            variant="wave"
            shape="rounded"
            size="sm"
            className="[--sk-subtle-hover:#86efac] [--sk-subtle:#bbf7d0]"
          />
        </DemoTile>
        <DemoTile label="Sky">
          <Skeleton
            variant="wave"
            shape="rounded"
            size="sm"
            className="[--sk-subtle-hover:#7dd3fc] [--sk-subtle:#bae6fd]"
          />
        </DemoTile>
        <DemoTile label="Violet">
          <Skeleton
            variant="wave"
            shape="rounded"
            size="sm"
            className="[--sk-subtle-hover:#c4b5fd] [--sk-subtle:#ddd6fe]"
          />
        </DemoTile>
        <DemoTile label="Fuchsia">
          <Skeleton
            variant="wave"
            shape="rounded"
            size="sm"
            className="[--sk-subtle-hover:#f0abfc] [--sk-subtle:#f5d0fe]"
          />
        </DemoTile>
      </Group>
    </div>
  );
}
