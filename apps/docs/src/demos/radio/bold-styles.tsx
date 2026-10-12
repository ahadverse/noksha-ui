'use client';

import { Radio } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function RadioBoldStyles() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Square" className="items-center">
        <Radio value="square" className="rounded-md" defaultChecked aria-label="Square" />
      </DemoTile>

      <DemoTile label="Neon" className="items-center">
        <Radio
          value="neon"
          containerClassName="[--rd-solid:#39ff88]"
          className="border-neutral-600 bg-neutral-900 peer-checked:shadow-[0_0_10px_1px_#39ff88]"
          defaultChecked
          aria-label="Neon"
        />
      </DemoTile>

      <DemoTile label="Oversized" className="items-center">
        <Radio
          value="oversized"
          containerClassName="size-8"
          className="border-2"
          defaultChecked
          aria-label="Oversized"
        />
      </DemoTile>

      <DemoTile label="Diamond" className="items-center">
        <Radio value="diamond" containerClassName="rotate-45" defaultChecked aria-label="Diamond" />
      </DemoTile>

      <DemoTile label="Gradient ring" className="items-center">
        <span
          className="inline-flex rounded-full p-[2px]"
          style={{
            background:
              'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))',
          }}
        >
          <Radio value="gradient-ring" defaultChecked aria-label="Gradient ring" />
        </span>
      </DemoTile>

      <DemoTile label="Dashed" className="items-center">
        <Radio value="dashed" className="border-dashed" aria-label="Dashed" />
      </DemoTile>

      <DemoTile label="Thick brand" className="items-center">
        <Radio
          value="thick-brand"
          containerClassName="[--rd-solid:#f59e0b]"
          className="border-4"
          defaultChecked
          aria-label="Thick brand"
        />
      </DemoTile>

      <DemoTile label="Elevated" className="items-center">
        <Radio
          value="elevated"
          className="shadow-(--noksha-shadow-sm) peer-checked:shadow-(--noksha-shadow-md)"
          defaultChecked
          aria-label="Elevated"
        />
      </DemoTile>

      <DemoTile label="Bounce" className="items-center">
        <Radio
          value="bounce"
          className="transition-transform duration-150 ease-out active:scale-90 peer-checked:scale-110"
          defaultChecked
          aria-label="Bounce"
        />
      </DemoTile>

      <DemoTile label="Glass" className="items-center">
        <span className="inline-flex rounded-lg bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-danger-solid))] p-2.5">
          <Radio
            value="glass"
            containerClassName="[--rd-solid:#ffffff]"
            className="border-white/40 bg-white/10 backdrop-blur-md peer-checked:border-white/70"
            defaultChecked
            aria-label="Glass"
          />
        </span>
      </DemoTile>

      <DemoTile label="Ring offset" className="items-center">
        <Radio
          value="ring-offset"
          className="ring-2 ring-(--noksha-accent-subtle) ring-offset-2 ring-offset-(--noksha-bg-surface) transition-shadow peer-checked:ring-(--noksha-accent-solid)"
          defaultChecked
          aria-label="Ring offset"
        />
      </DemoTile>

      <DemoTile label="Pixel" className="items-center">
        <Radio
          value="pixel"
          className="rounded-none border-4 border-black bg-orange-500 shadow-[0_0_0_3px_#fff,0_0_0_6px_#000] peer-checked:bg-orange-500"
          dotClassName="rounded-none bg-white"
          defaultChecked
          aria-label="Pixel"
        />
      </DemoTile>
    </div>
  );
}
