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

export default function SpinnerBasic() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Sizes">
        <DemoTile label="XS" className="items-center">
          <Spinner size="xs" className="text-accent" />
        </DemoTile>
        <DemoTile label="SM" className="items-center">
          <Spinner size="sm" className="text-accent" />
        </DemoTile>
        <DemoTile label="MD" className="items-center">
          <Spinner size="md" className="text-accent" />
        </DemoTile>
        <DemoTile label="LG" className="items-center">
          <Spinner size="lg" className="text-accent" />
        </DemoTile>
        <DemoTile label="XL" className="items-center">
          <Spinner size="xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="2XL" className="items-center">
          <Spinner size="2xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="3XL" className="items-center">
          <Spinner size="3xl" className="text-accent" />
        </DemoTile>
        <DemoTile label="4XL" className="items-center">
          <Spinner size="4xl" className="text-accent" />
        </DemoTile>
      </Group>

      <Group title="Token colours">
        <DemoTile label="Accent" className="items-center">
          <Spinner variant="pulse" size="2xl" className="text-accent" label={null} />
        </DemoTile>
        <DemoTile label="Danger" className="items-center">
          <Spinner variant="pulse" size="2xl" className="text-danger" label={null} />
        </DemoTile>
        <DemoTile label="Success" className="items-center">
          <Spinner variant="pulse" size="2xl" className="text-success" label={null} />
        </DemoTile>
        <DemoTile label="Warning" className="items-center">
          <Spinner variant="pulse" size="2xl" className="text-warning" label={null} />
        </DemoTile>
        <DemoTile label="Info" className="items-center">
          <Spinner variant="pulse" size="2xl" className="text-info" label={null} />
        </DemoTile>
        <DemoTile label="Foreground" className="items-center">
          <Spinner variant="pulse" size="2xl" className="text-fg" label={null} />
        </DemoTile>
        <DemoTile label="Foreground muted" className="items-center">
          <Spinner variant="pulse" size="2xl" className="text-fg-muted" label={null} />
        </DemoTile>
        <DemoTile label="Foreground subtle" className="items-center">
          <Spinner variant="pulse" size="2xl" className="text-fg-subtle" label={null} />
        </DemoTile>
      </Group>

      <Group title="Any CSS colour">
        <DemoTile label="Rose #f43f5e" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#f43f5e' }} label={null} />
        </DemoTile>
        <DemoTile label="Rose #fb7185" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#fb7185' }} label={null} />
        </DemoTile>
        <DemoTile label="Orange #f97316" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#f97316' }} label={null} />
        </DemoTile>
        <DemoTile label="Orange #fb923c" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#fb923c' }} label={null} />
        </DemoTile>
        <DemoTile label="Amber #f59e0b" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#f59e0b' }} label={null} />
        </DemoTile>
        <DemoTile label="Yellow #eab308" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#eab308' }} label={null} />
        </DemoTile>
        <DemoTile label="Lime #a3e635" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#a3e635' }} label={null} />
        </DemoTile>
        <DemoTile label="Lime #84cc16" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#84cc16' }} label={null} />
        </DemoTile>
        <DemoTile label="Green #22c55e" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#22c55e' }} label={null} />
        </DemoTile>
        <DemoTile label="Emerald #10b981" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#10b981' }} label={null} />
        </DemoTile>
        <DemoTile label="Teal #14b8a6" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#14b8a6' }} label={null} />
        </DemoTile>
        <DemoTile label="Cyan #06b6d4" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#06b6d4' }} label={null} />
        </DemoTile>
        <DemoTile label="Sky #0ea5e9" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#0ea5e9' }} label={null} />
        </DemoTile>
        <DemoTile label="Blue #3b82f6" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#3b82f6' }} label={null} />
        </DemoTile>
        <DemoTile label="Indigo #6366f1" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#6366f1' }} label={null} />
        </DemoTile>
        <DemoTile label="Violet #8b5cf6" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#8b5cf6' }} label={null} />
        </DemoTile>
        <DemoTile label="Purple #a855f7" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#a855f7' }} label={null} />
        </DemoTile>
        <DemoTile label="Fuchsia #d946ef" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#d946ef' }} label={null} />
        </DemoTile>
        <DemoTile label="Pink #ec4899" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#ec4899' }} label={null} />
        </DemoTile>
        <DemoTile label="Pink #f472b6" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#f472b6' }} label={null} />
        </DemoTile>
        <DemoTile label="Crimson #be123c" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#be123c' }} label={null} />
        </DemoTile>
        <DemoTile label="Brown #78350f" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#78350f' }} label={null} />
        </DemoTile>
        <DemoTile label="Deep teal #0f766e" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#0f766e' }} label={null} />
        </DemoTile>
        <DemoTile label="Navy #1e3a8a" className="items-center">
          <Spinner variant="pulse" size="2xl" style={{ color: '#1e3a8a' }} label="Ahad" />
        </DemoTile>
      </Group>
    </div>
  );
}
