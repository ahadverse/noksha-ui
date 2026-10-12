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

function ArcIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function AtomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" opacity="0.3" />
      <path d="M12 3.5 15 12H9Z" fill="currentColor" stroke="none" />
      <path d="M12 20.5 15 12H9Z" fill="currentColor" stroke="none" opacity="0.35" />
    </svg>
  );
}

function PinwheelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12V3a9 9 0 0 1 9 9Z" />
      <path d="M12 12h9a9 9 0 0 1-9 9Z" opacity="0.7" />
      <path d="M12 12v9a9 9 0 0 1-9-9Z" opacity="0.45" />
      <path d="M12 12H3a9 9 0 0 1 9-9Z" opacity="0.22" />
    </svg>
  );
}

function HexIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 2 8.66 5v10L12 22l-8.66-5V7Z" />
      <circle cx="12" cy="12" r="3.4" opacity="0.45" />
    </svg>
  );
}

function OrbitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" opacity="0.3" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="3" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M12 12V3a9 9 0 0 1 6.36 2.64Z" fill="currentColor" />
    </svg>
  );
}

function PetalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="4.5" r="3" />
      <circle cx="19.5" cy="12" r="3" opacity="0.75" />
      <circle cx="12" cy="19.5" r="3" opacity="0.5" />
      <circle cx="4.5" cy="12" r="3" opacity="0.3" />
    </svg>
  );
}

export default function SpinnerIcons() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Custom marks">
        <DemoTile label="arc" className="items-center">
          <Spinner icon={<ArcIcon />} size="2xl" className="text-accent" />
        </DemoTile>

        <DemoTile label="atom" className="items-center">
          <Spinner icon={<AtomIcon />} size="2xl" className="text-accent" />
        </DemoTile>

        <DemoTile label="compass" className="items-center">
          <Spinner icon={<CompassIcon />} size="2xl" className="text-accent" />
        </DemoTile>

        <DemoTile label="pinwheel" className="items-center">
          <Spinner icon={<PinwheelIcon />} size="2xl" className="text-accent" />
        </DemoTile>

        <DemoTile label="hex" className="items-center">
          <Spinner icon={<HexIcon />} size="2xl" className="text-accent" />
        </DemoTile>

        <DemoTile label="orbit" className="items-center">
          <Spinner icon={<OrbitIcon />} size="2xl" className="text-accent" />
        </DemoTile>

        <DemoTile label="radar" className="items-center">
          <Spinner icon={<RadarIcon />} size="2xl" className="text-accent" />
        </DemoTile>

        <DemoTile label="petals" className="items-center">
          <Spinner icon={<PetalIcon />} size="2xl" className="text-accent" />
        </DemoTile>
      </Group>

      <Group title="With text">
        <DemoTile label="hex with text" className="items-center">
          <Spinner icon={<HexIcon />} size="md" className="text-accent">
            <span className="text-fg text-sm">Building the bundle</span>
          </Spinner>
        </DemoTile>

        <DemoTile label="radar, slow, with text" className="items-center">
          <Spinner icon={<RadarIcon />} size="md" speed="slow" className="text-accent">
            <span className="text-fg text-sm">Finding the nearest region</span>
          </Spinner>
        </DemoTile>
      </Group>
    </div>
  );
}
