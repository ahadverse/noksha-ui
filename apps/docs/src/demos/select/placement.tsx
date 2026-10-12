'use client';

import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@noksha-ui/react';
import type * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'az', label: 'Name A–Z' },
  { value: 'za', label: 'Name Z–A' },
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
  return SORTS.map((sort) => (
    <SelectItem key={sort.value} value={sort.value}>
      {sort.label}
    </SelectItem>
  ));
}

export default function SelectPlacement() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="side">
        <DemoTile label="Bottom">
          <SelectRoot defaultValue="newest">
            <SelectTrigger aria-label="Sort by" placeholder="Sort by" />
            <SelectContent side="bottom" matchTriggerWidth>
              {renderOptions()}
            </SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Top">
          <SelectRoot defaultValue="oldest">
            <SelectTrigger aria-label="Sort by" placeholder="Sort by" />
            <SelectContent side="top" matchTriggerWidth>
              {renderOptions()}
            </SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Right">
          <SelectRoot defaultValue="az">
            <SelectTrigger aria-label="Sort by" placeholder="Sort by" />
            <SelectContent side="right">{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Left">
          <SelectRoot defaultValue="za">
            <SelectTrigger aria-label="Sort by" placeholder="Sort by" />
            <SelectContent side="left">{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>
      </Group>

      <Group title="align">
        <DemoTile label="Start">
          <SelectRoot defaultValue="newest">
            <SelectTrigger
              variant="soft"
              className="w-40"
              aria-label="Sort by"
              placeholder="Sort by"
            />
            <SelectContent align="start" className="min-w-56">
              {renderOptions()}
            </SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Center">
          <SelectRoot defaultValue="oldest">
            <SelectTrigger
              variant="soft"
              className="w-40"
              aria-label="Sort by"
              placeholder="Sort by"
            />
            <SelectContent align="center" className="min-w-56">
              {renderOptions()}
            </SelectContent>
          </SelectRoot>
        </DemoTile>

        <div className="min-w-0 sm:col-span-2">
          <DemoTile label="End">
            <SelectRoot defaultValue="az">
              <SelectTrigger
                variant="soft"
                className="w-40"
                aria-label="Sort by"
                placeholder="Sort by"
              />
              <SelectContent align="end" className="min-w-56">
                {renderOptions()}
              </SelectContent>
            </SelectRoot>
          </DemoTile>
        </div>
      </Group>

      <Group title="sideOffset and collisionPadding">
        <DemoTile label="Offset 2">
          <SelectRoot defaultValue="za">
            <SelectTrigger variant="ghost" aria-label="Sort by" placeholder="Sort by" />
            <SelectContent sideOffset={2} matchTriggerWidth>
              {renderOptions()}
            </SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Offset 16">
          <SelectRoot defaultValue="newest">
            <SelectTrigger variant="ghost" aria-label="Sort by" placeholder="Sort by" />
            <SelectContent sideOffset={16} matchTriggerWidth>
              {renderOptions()}
            </SelectContent>
          </SelectRoot>
        </DemoTile>

        <div className="min-w-0 sm:col-span-2">
          <DemoTile label="Collision padding 32">
            <SelectRoot defaultValue="oldest">
              <SelectTrigger aria-label="Sort by" placeholder="Sort by" />
              <SelectContent collisionPadding={32} matchTriggerWidth>
                {renderOptions()}
              </SelectContent>
            </SelectRoot>
          </DemoTile>
        </div>
      </Group>

      <Group title="Width">
        <DemoTile label="Match trigger width">
          <SelectRoot defaultValue="az">
            <SelectTrigger
              size="lg"
              className="w-full"
              aria-label="Sort by"
              placeholder="Sort by"
            />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Free width">
          <SelectRoot defaultValue="za">
            <SelectTrigger size="xs" className="w-28" aria-label="Sort by" placeholder="Sort" />
            <SelectContent className="min-w-64">{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>
      </Group>
    </div>
  );
}
