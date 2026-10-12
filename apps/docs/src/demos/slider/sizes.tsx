'use client';

import { Slider } from '@noksha-ui/react';
import type * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h4 className="flex items-center gap-3 font-medium text-(--noksha-fg-subtle) text-xs uppercase tracking-wide after:h-px after:flex-1 after:bg-(--noksha-border-subtle)">
        {title}
      </h4>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export default function SliderSizes() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Scale">
        <DemoTile label="XS">
          <Slider aria-label="Line height" size="xs" defaultValue={30} showValue />
        </DemoTile>
        <DemoTile label="SM">
          <Slider aria-label="Letter spacing" size="sm" defaultValue={45} showValue />
        </DemoTile>
        <DemoTile label="MD">
          <Slider aria-label="Font weight" size="md" defaultValue={60} showValue />
        </DemoTile>
        <DemoTile label="LG">
          <Slider aria-label="Font size" size="lg" defaultValue={75} showValue />
        </DemoTile>
        <div className="min-w-0 sm:col-span-2">
          <DemoTile label="XL">
            <Slider aria-label="Canvas zoom" size="xl" defaultValue={90} showValue />
          </DemoTile>
        </div>
      </Group>

      <Group title="Sizes with thumb shapes">
        <DemoTile label="XS · square">
          <Slider aria-label="Grid gap" size="xs" thumb="square" defaultValue={24} />
        </DemoTile>
        <DemoTile label="SM · bar">
          <Slider aria-label="Border width" size="sm" thumb="bar" defaultValue={40} />
        </DemoTile>
        <DemoTile label="MD · pill">
          <Slider aria-label="Corner radius" size="md" thumb="pill" defaultValue={55} />
        </DemoTile>
        <DemoTile label="LG · square">
          <Slider aria-label="Shadow blur" size="lg" thumb="square" defaultValue={68} showValue />
        </DemoTile>
        <DemoTile label="XL · bar">
          <Slider aria-label="Exposure" size="xl" thumb="bar" defaultValue={42} showValue />
        </DemoTile>
        <DemoTile label="XL · pill">
          <Slider aria-label="Saturation" size="xl" thumb="pill" defaultValue={80} />
        </DemoTile>
      </Group>
    </div>
  );
}
