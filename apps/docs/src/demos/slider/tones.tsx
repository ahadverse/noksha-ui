'use client';

import { Slider } from '@noksha-ui/react';
import type * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const TONES = [
  { tone: 'accent', label: 'Accent', name: 'Volume', value: 62 },
  { tone: 'neutral', label: 'Neutral', name: 'Contrast', value: 48 },
  { tone: 'success', label: 'Success', name: 'Charge limit', value: 80 },
  { tone: 'warning', label: 'Warning', name: 'Fan speed', value: 70 },
  { tone: 'danger', label: 'Danger', name: 'Overdrive', value: 88 },
  { tone: 'info', label: 'Info', name: 'Sync interval', value: 35 },
] as const;

const VARIANTS = [
  { variant: 'default', label: 'Default' },
  { variant: 'solid', label: 'Solid' },
  { variant: 'soft', label: 'Soft' },
] as const;

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

export default function SliderTones() {
  return (
    <div className="flex w-full flex-col gap-10">
      {VARIANTS.map((group) => (
        <Group key={group.variant} title={`${group.label} variant`}>
          {TONES.map((entry) => (
            <DemoTile key={entry.tone} label={`${entry.label} · ${group.label}`}>
              <Slider
                aria-label={entry.name}
                tone={entry.tone}
                variant={group.variant}
                defaultValue={entry.value}
              />
            </DemoTile>
          ))}
        </Group>
      ))}
    </div>
  );
}
