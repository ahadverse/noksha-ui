'use client';

import { Slider } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function SliderVariants() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Default">
        <Slider aria-label="Volume" variant="default" defaultValue={64} />
      </DemoTile>
      <DemoTile label="Default · success">
        <Slider aria-label="Charge limit" variant="default" tone="success" defaultValue={80} />
      </DemoTile>

      <DemoTile label="Solid">
        <Slider aria-label="Brightness" variant="solid" defaultValue={48} />
      </DemoTile>
      <DemoTile label="Solid · success">
        <Slider aria-label="Upload quota" variant="solid" tone="success" defaultValue={62} />
      </DemoTile>

      <DemoTile label="Soft">
        <Slider aria-label="Opacity" variant="soft" defaultValue={72} />
      </DemoTile>
      <DemoTile label="Soft · success">
        <Slider aria-label="Daily goal" variant="soft" tone="success" defaultValue={55} />
      </DemoTile>

      <DemoTile label="Outline">
        <Slider aria-label="Zoom" variant="outline" defaultValue={36} />
      </DemoTile>
      <DemoTile label="Outline · success">
        <Slider aria-label="Savings rate" variant="outline" tone="success" defaultValue={42} />
      </DemoTile>

      <DemoTile label="Minimal · hover for thumb">
        <Slider aria-label="Playback position" variant="minimal" defaultValue={56} />
      </DemoTile>
      <DemoTile label="Minimal · success">
        <Slider aria-label="Progress" variant="minimal" tone="success" defaultValue={68} />
      </DemoTile>
    </div>
  );
}
