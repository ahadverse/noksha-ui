import { Spinner } from '@noksha-ui/react';
import type * as React from 'react';

export default function SpinnerDesigns() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Family name="Rings">
        <Swatch name="ring">
          <Spinner variant="ring" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="arc">
          <Spinner variant="arc" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="dual">
          <Spinner variant="dual" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="dash">
          <Spinner variant="dash" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="segment">
          <Spinner variant="segment" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="comet">
          <Spinner variant="comet" className="size-8 text-accent" label={null} />
        </Swatch>
      </Family>

      <Family name="Dots">
        <Swatch name="dots">
          <Spinner variant="dots" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="bounce">
          <Spinner variant="bounce" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="beat">
          <Spinner variant="beat" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="orbit">
          <Spinner variant="orbit" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="halo">
          <Spinner variant="halo" className="size-8 text-accent" label={null} />
        </Swatch>
      </Family>

      <Family name="Bars">
        <Swatch name="bars">
          <Spinner variant="bars" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="wave">
          <Spinner variant="wave" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="spokes">
          <Spinner variant="spokes" className="size-8 text-accent" label={null} />
        </Swatch>
      </Family>

      <Family name="Shapes">
        <Swatch name="pulse">
          <Spinner variant="pulse" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="ripple">
          <Spinner variant="ripple" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="grid">
          <Spinner variant="grid" className="size-8 text-accent" label={null} />
        </Swatch>
        <Swatch name="flip">
          <Spinner variant="flip" className="size-8 text-accent" label={null} />
        </Swatch>
      </Family>
    </div>
  );
}

function Family({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h4 className="font-medium text-fg-muted text-xs uppercase tracking-wide">{name}</h4>
      <div className="flex flex-wrap gap-3">{children}</div>
    </section>
  );
}

function Swatch({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="flex w-24 flex-col items-center gap-2 rounded-lg border border-line-subtle bg-surface p-3">
      {children}
      <code className="text-fg-subtle text-xs">{name}</code>
    </div>
  );
}
