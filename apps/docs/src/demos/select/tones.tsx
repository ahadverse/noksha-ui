'use client';

import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@noksha-ui/react';
import type * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const LEVELS = [
  { value: 'none', label: 'None' },
  { value: 'basic', label: 'Basic' },
  { value: 'standard', label: 'Standard' },
  { value: 'strict', label: 'Strict' },
];

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

function renderOptions() {
  return LEVELS.map((level) => (
    <SelectItem key={level.value} value={level.value}>
      {level.label}
    </SelectItem>
  ));
}

export default function SelectTones() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Subtle and solid">
        <DemoTile label="Accent subtle">
          <SelectRoot defaultValue="standard">
            <SelectTrigger
              className="border-(--noksha-accent-solid) bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) hover:border-(--noksha-accent-solid)"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Accent solid">
          <SelectRoot defaultValue="strict">
            <SelectTrigger
              className="border-transparent bg-(--noksha-accent-solid) text-(--noksha-accent-on-solid) hover:border-transparent hover:bg-(--noksha-accent-solid-hover) [&>svg]:text-(--noksha-accent-on-solid)"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Success subtle">
          <SelectRoot defaultValue="standard">
            <SelectTrigger
              className="border-(--noksha-success-solid) bg-(--noksha-success-subtle) text-(--noksha-success-fg) hover:border-(--noksha-success-solid)"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Success solid">
          <SelectRoot defaultValue="strict">
            <SelectTrigger
              className="border-transparent bg-(--noksha-success-solid) text-(--noksha-success-on-solid) hover:border-transparent hover:bg-(--noksha-success-solid-hover) [&>svg]:text-(--noksha-success-on-solid)"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Warning subtle">
          <SelectRoot defaultValue="basic">
            <SelectTrigger
              className="border-(--noksha-warning-solid) bg-(--noksha-warning-subtle) text-(--noksha-warning-fg) hover:border-(--noksha-warning-solid)"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Warning solid">
          <SelectRoot defaultValue="none">
            <SelectTrigger
              className="border-transparent bg-(--noksha-warning-solid) text-(--noksha-warning-on-solid) hover:border-transparent hover:bg-(--noksha-warning-solid-hover) [&>svg]:text-(--noksha-warning-on-solid)"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Danger subtle">
          <SelectRoot invalid defaultValue="none">
            <SelectTrigger
              className="border-(--noksha-danger-solid) bg-(--noksha-danger-subtle) text-(--noksha-danger-fg) hover:border-(--noksha-danger-solid)"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Danger solid">
          <SelectRoot defaultValue="none">
            <SelectTrigger
              className="border-transparent bg-(--noksha-danger-solid) text-(--noksha-danger-on-solid) hover:border-transparent hover:bg-(--noksha-danger-solid-hover) [&>svg]:text-(--noksha-danger-on-solid)"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>
      </Group>

      <Group title="Neutral, edges and rings">
        <DemoTile label="Neutral">
          <SelectRoot defaultValue="basic">
            <SelectTrigger aria-label="Enforcement" placeholder="Enforcement" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Success ring">
          <SelectRoot defaultValue="strict">
            <SelectTrigger
              variant="ghost"
              className="ring-2 ring-(--noksha-success-subtle)"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Accent left edge">
          <SelectRoot defaultValue="standard">
            <SelectTrigger
              variant="soft"
              className="rounded-s-none border-s-4 border-s-(--noksha-accent-solid) ps-3"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Danger left edge">
          <SelectRoot defaultValue="none">
            <SelectTrigger
              variant="soft"
              className="rounded-s-none border-s-4 border-s-(--noksha-danger-solid) ps-3"
              aria-label="Enforcement"
              placeholder="Enforcement"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>
      </Group>
    </div>
  );
}
