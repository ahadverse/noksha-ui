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

export default function SliderThumbs() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Shapes">
        <DemoTile label="Circle">
          <Slider aria-label="Volume" thumb="circle" defaultValue={55} />
        </DemoTile>
        <DemoTile label="Square">
          <Slider aria-label="Treble" thumb="square" defaultValue={40} />
        </DemoTile>
        <DemoTile label="Bar">
          <Slider aria-label="Bass" thumb="bar" defaultValue={65} />
        </DemoTile>
        <DemoTile label="Pill">
          <Slider aria-label="Mid range" thumb="pill" defaultValue={30} />
        </DemoTile>
      </Group>

      <Group title="Across sizes and variants">
        <DemoTile label="Square · XL · solid">
          <Slider
            aria-label="Exposure"
            thumb="square"
            size="xl"
            variant="solid"
            defaultValue={60}
          />
        </DemoTile>
        <DemoTile label="Bar · LG · soft">
          <Slider
            aria-label="Gain"
            thumb="bar"
            size="lg"
            variant="soft"
            tone="success"
            defaultValue={45}
          />
        </DemoTile>
        <DemoTile label="Pill · SM · outline">
          <Slider
            aria-label="Highlights"
            thumb="pill"
            size="sm"
            variant="outline"
            defaultValue={70}
          />
        </DemoTile>
        <DemoTile label="Circle · XS · solid">
          <Slider aria-label="Shadows" thumb="circle" size="xs" variant="solid" defaultValue={25} />
        </DemoTile>
        <DemoTile label="Bar · XL · outline">
          <Slider aria-label="Warmth" thumb="bar" size="xl" variant="outline" defaultValue={52} />
        </DemoTile>
        <DemoTile label="Pill · LG · soft">
          <Slider
            aria-label="Clarity"
            thumb="pill"
            size="lg"
            variant="soft"
            tone="info"
            defaultValue={38}
          />
        </DemoTile>
      </Group>

      <Group title="Custom with CSS variables">
        <DemoTile label="Wide flat key">
          <Slider
            aria-label="Crossfade"
            defaultValue={50}
            className="[--sl-thumb-w:2.5rem] [--sl-thumb-radius:0.375rem]"
          />
        </DemoTile>
        <DemoTile label="Hollow ring">
          <Slider
            aria-label="Focus distance"
            size="lg"
            defaultValue={50}
            className="[--sl-thumb-bg:transparent] [--sl-thumb-border-width:3px] [--sl-thumb-shadow:none]"
          />
        </DemoTile>
        <DemoTile label="Big knob, thick track">
          <Slider
            aria-label="Intensity"
            variant="solid"
            defaultValue={62}
            className="[--sl-track:0.875rem] [--sl-thumb:2.25rem]"
          />
        </DemoTile>
        <DemoTile label="Inset knob">
          <Slider
            aria-label="Screen brightness"
            variant="solid"
            defaultValue={58}
            className="[--sl-track:1.5rem] [--sl-thumb:1.125rem] [--sl-thumb-bg:white] [--sl-thumb-border-width:0px] [--sl-thumb-shadow:var(--noksha-shadow-sm)]"
          />
        </DemoTile>
        <DemoTile label="Glow">
          <Slider
            aria-label="Signal strength"
            variant="solid"
            tone="info"
            defaultValue={66}
            className="[--sl-thumb-shadow:0_0_14px_2px_var(--sl-solid)]"
          />
        </DemoTile>
        <DemoTile label="Brutalist">
          <Slider
            aria-label="Contrast"
            thumb="square"
            size="lg"
            variant="solid"
            defaultValue={44}
            className="[--sl-thumb-radius:0px] [--sl-track-radius:0px] [--sl-thumb-border:var(--noksha-fg-default)] [--sl-thumb-shadow:3px_3px_0_var(--noksha-fg-default)]"
          />
        </DemoTile>
      </Group>
    </div>
  );
}
