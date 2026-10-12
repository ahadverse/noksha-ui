'use client';

import { Switch } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function SwitchBoldStyles() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Neon" className="items-center">
        <Switch
          containerClassName="[--sw-solid:#39ff88]"
          className="border border-neutral-700 bg-neutral-900 peer-checked:shadow-[0_0_10px_1px_#39ff88]"
          defaultChecked
          aria-label="Neon"
        />
      </DemoTile>

      <DemoTile label="Oversized" className="items-center">
        <Switch
          containerClassName="h-8 w-14 [--sw-w:3.5rem] [--sw-h:2rem] [--sw-gap:0.25rem]"
          defaultChecked
          aria-label="Oversized"
        />
      </DemoTile>

      <DemoTile label="Gradient track" className="items-center">
        <Switch
          className="peer-checked:bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-info-solid))]"
          defaultChecked
          aria-label="Gradient track"
        />
      </DemoTile>

      <DemoTile label="Outline" className="items-center">
        <Switch
          className="border-2 border-(--noksha-border-default) bg-transparent peer-checked:border-(--sw-solid) peer-checked:bg-transparent"
          defaultChecked
          aria-label="Outline"
        />
      </DemoTile>

      <DemoTile label="Thick brand" className="items-center">
        <Switch
          containerClassName="[--sw-solid:#f59e0b]"
          className="border-4 border-(--sw-solid)"
          defaultChecked
          aria-label="Thick brand"
        />
      </DemoTile>

      <DemoTile label="Elevated" className="items-center">
        <Switch
          className="shadow-(--noksha-shadow-sm) peer-checked:shadow-(--noksha-shadow-md)"
          defaultChecked
          aria-label="Elevated"
        />
      </DemoTile>

      <DemoTile label="Glass" className="items-center">
        <span className="inline-flex rounded-full bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-danger-solid))] p-2.5">
          <Switch
            containerClassName="[--sw-solid:#ffffff]"
            className="border border-white/40 bg-white/10 backdrop-blur-md"
            defaultChecked
            aria-label="Glass"
          />
        </span>
      </DemoTile>

      <DemoTile label="Ring offset" className="items-center">
        <Switch
          className="ring-2 ring-(--noksha-accent-subtle) ring-offset-2 ring-offset-(--noksha-bg-surface) peer-checked:ring-(--noksha-accent-solid)"
          defaultChecked
          aria-label="Ring offset"
        />
      </DemoTile>

      <DemoTile label="Bounce" className="items-center">
        <Switch
          containerClassName="transition-transform duration-150 ease-out active:scale-90"
          defaultChecked
          aria-label="Bounce"
        />
      </DemoTile>

      <DemoTile label="Square" className="items-center">
        <Switch className="rounded-md" defaultChecked aria-label="Square" />
      </DemoTile>

      <DemoTile label="Soft halo" className="items-center">
        <Switch
          tone="danger"
          className="peer-checked:shadow-[0_0_0_4px_var(--noksha-danger-subtle)]"
          defaultChecked
          aria-label="Soft halo"
        />
      </DemoTile>

      <DemoTile label="Half split" className="items-center">
        <Switch
          className="rounded-md bg-neutral-100 peer-checked:bg-neutral-900"
          thumbClassName="rounded-sm bg-neutral-900 peer-checked:bg-neutral-100"
          aria-label="Half split"
        />
      </DemoTile>

      <DemoTile label="On / Off text" className="items-center">
        <Switch
          className="before:absolute before:inset-y-0 before:left-1.5 before:flex before:items-center before:font-bold before:text-(--noksha-fg-muted) before:text-[8px] before:opacity-100 before:content-['OFF'] after:absolute after:inset-y-0 after:right-1.5 after:flex after:items-center after:font-bold after:text-[8px] after:text-white after:opacity-0 after:content-['ON'] peer-checked:before:opacity-0 peer-checked:after:opacity-100"
          defaultChecked
          aria-label="On or off"
        />
      </DemoTile>

      <DemoTile label="Status ring" className="items-center">
        <Switch
          className="ring-2 ring-(--noksha-danger-solid)/60 peer-checked:shadow-[0_0_12px_2px_var(--noksha-success-solid)] peer-checked:ring-(--noksha-success-solid)/70"
          aria-label="Status ring"
        />
      </DemoTile>

      <DemoTile label="Crescent moon" className="items-center">
        <Switch
          containerClassName="[--sw-solid:#522ba7]"
          className="bg-[#28096b]"
          thumbClassName="bg-[#28096b] shadow-[inset_6px_-3px_0_0_#fde047] peer-checked:bg-(--sw-solid) peer-checked:shadow-[inset_10px_-3px_0_10px_#fde047]"
          defaultChecked
          aria-label="Crescent moon"
        />
      </DemoTile>

      <DemoTile label="Traffic dot" className="items-center">
        <Switch
          className="bg-(--noksha-danger-solid) peer-checked:bg-(--noksha-success-solid)"
          aria-label="Traffic dot"
        />
      </DemoTile>
    </div>
  );
}
