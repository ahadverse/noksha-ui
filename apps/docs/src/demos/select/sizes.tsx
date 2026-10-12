'use client';

import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@noksha-ui/react';
import type * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const SPEEDS = [
  { value: 'eco', label: 'Eco' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'turbo', label: 'Turbo' },
  { value: 'max', label: 'Maximum' },
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
  return SPEEDS.map((speed) => (
    <SelectItem key={speed.value} value={speed.value}>
      {speed.label}
    </SelectItem>
  ));
}

export default function SelectSizes() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Scale">
        <DemoTile label="XS">
          <SelectRoot defaultValue="eco">
            <SelectTrigger size="xs" variant="outline" aria-label="Mode" placeholder="Mode" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="SM">
          <SelectRoot defaultValue="balanced">
            <SelectTrigger size="sm" variant="outline" aria-label="Mode" placeholder="Mode" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="MD">
          <SelectRoot defaultValue="turbo">
            <SelectTrigger size="md" variant="outline" aria-label="Mode" placeholder="Mode" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="LG">
          <SelectRoot defaultValue="max">
            <SelectTrigger size="lg" variant="outline" aria-label="Mode" placeholder="Mode" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <div className="min-w-0 sm:col-span-2">
          <DemoTile label="XL">
            <SelectRoot defaultValue="eco">
              <SelectTrigger size="xl" variant="outline" aria-label="Mode" placeholder="Mode" />
              <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
            </SelectRoot>
          </DemoTile>
        </div>
      </Group>

      <Group title="Sizes with shape overrides">
        <DemoTile label="XS · soft pill">
          <SelectRoot defaultValue="balanced">
            <SelectTrigger
              size="xs"
              variant="soft"
              className="rounded-full px-3"
              aria-label="Mode"
              placeholder="Mode"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="SM · ghost underline">
          <SelectRoot defaultValue="turbo">
            <SelectTrigger
              size="sm"
              variant="ghost"
              className="rounded-none border-0 border-(--noksha-border-default) border-b px-0 hover:bg-transparent"
              aria-label="Mode"
              placeholder="Mode"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="MD · squared">
          <SelectRoot defaultValue="max">
            <SelectTrigger
              size="md"
              variant="soft"
              className="rounded-none"
              aria-label="Mode"
              placeholder="Mode"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="LG · elevated">
          <SelectRoot defaultValue="eco">
            <SelectTrigger
              size="lg"
              variant="outline"
              className="border-transparent shadow-md hover:border-transparent"
              aria-label="Mode"
              placeholder="Mode"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="XL · accent ring">
          <SelectRoot defaultValue="balanced">
            <SelectTrigger
              size="xl"
              variant="soft"
              className="ring-2 ring-(--noksha-accent-subtle)"
              aria-label="Mode"
              placeholder="Mode"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="XS · full width">
          <SelectRoot defaultValue="turbo">
            <SelectTrigger
              size="xs"
              variant="outline"
              className="w-full"
              aria-label="Mode"
              placeholder="Mode"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <div className="min-w-0 sm:col-span-2">
          <DemoTile label="XL · inverse">
            <SelectRoot defaultValue="max">
              <SelectTrigger
                size="xl"
                variant="outline"
                className="border-transparent bg-(--noksha-bg-inverse) text-(--noksha-fg-inverse) hover:border-transparent [&>svg]:text-(--noksha-fg-inverse)"
                aria-label="Mode"
                placeholder="Mode"
              />
              <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
            </SelectRoot>
          </DemoTile>
        </div>
      </Group>
    </div>
  );
}
