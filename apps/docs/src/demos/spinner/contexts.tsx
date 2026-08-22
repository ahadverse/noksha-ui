'use client';

import { Button, Skeleton, Spinner } from '@noksha-ui/react';
import * as React from 'react';

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </div>
  );
}

export default function SpinnerContexts() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <Cell label="Gradient card">
        <div
          className="flex size-24 items-center justify-center rounded-2xl"
          style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))' }}
        >
          <Spinner variant="ring" size="lg" className="text-white" label="Loading" />
        </div>
      </Cell>

      <Cell label="Glass panel">
        <div
          className="flex size-24 items-center justify-center rounded-2xl p-3"
          style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))' }}
        >
          <div className="flex size-full items-center justify-center rounded-xl border border-white/25 bg-white/10 backdrop-blur-md">
            <Spinner variant="dual" size="lg" className="text-white" label="Loading" />
          </div>
        </div>
      </Cell>

      <Cell label="Neon glow">
        <div className="flex size-24 items-center justify-center rounded-2xl bg-(--noksha-bg-inverse) shadow-[0_0_20px_-4px_var(--noksha-accent-solid)]">
          <Spinner variant="halo" size="lg" className="text-(--noksha-accent-solid)" label="Loading" />
        </div>
      </Cell>

      <Cell label="Badge">
        <span className="flex size-12 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg)">
          <Spinner variant="dots" size="sm" label="Loading" />
        </span>
      </Cell>

      <Cell label="Progress row">
        <div className="flex w-32 items-center gap-2.5 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2">
          <Spinner variant="ring" size="sm" className="text-(--noksha-accent-fg)" label="Loading" />
          <span className="text-(--noksha-fg-muted) text-xs">Syncing…</span>
        </div>
      </Cell>

      <Cell label="Solid button">
        <Button type="button" tone="accent" loading loadingLabel="Saving">
          Save
        </Button>
      </Cell>

      <Cell label="Gradient button">
        <Button type="button" variant="gradient" tone="accent" loading loadingPlacement="icon" loadingLabel="Sending">
          Send
        </Button>
      </Cell>

      <Cell label="Avatar overlay">
        <span className="relative flex size-14 items-center justify-center rounded-full bg-(--noksha-bg-subtle) text-(--noksha-fg-muted)">
          <span className="text-lg">JD</span>
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/45">
            <Spinner variant="ring" size="sm" className="text-white" label="Uploading photo" />
          </span>
        </span>
      </Cell>

      <Cell label="Skeleton + spinner">
        <div className="relative w-28">
          <Skeleton variant="shimmer" shape="rounded" size="lg" className="h-16 w-28" />
          <span className="absolute right-1.5 bottom-1.5 flex size-5 items-center justify-center rounded-full bg-(--noksha-bg-surface) shadow-(--noksha-shadow-sm)">
            <Spinner variant="ring" size="xs" className="text-(--noksha-accent-fg)" label="Loading" />
          </span>
        </div>
      </Cell>

      <Cell label="Toast">
        <div className="flex w-40 items-center gap-2.5 rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2.5 shadow-(--noksha-shadow-md)">
          <Spinner variant="arc" size="sm" className="text-(--noksha-accent-fg)" label="Loading" />
          <span className="text-(--noksha-fg-default) text-xs">Uploading file…</span>
        </div>
      </Cell>

      <Cell label="Typing indicator">
        <div className="flex items-center gap-1.5 rounded-full bg-(--noksha-bg-subtle) px-3.5 py-2.5">
          <Spinner variant="bounce" size="sm" className="text-(--noksha-fg-muted)" label="Someone is typing" />
        </div>
      </Cell>

      <Cell label="Buffering overlay">
        <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-2xl bg-(--noksha-bg-inverse)">
          <span className="absolute inset-0 bg-black/40" />
          <Spinner variant="ring" size="lg" className="relative text-white" label="Buffering" />
        </div>
      </Cell>

      <Cell label="Search field">
        <div className="flex w-36 items-center gap-2 rounded-full border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-1.5">
          <Spinner variant="ring" size="xs" className="text-(--noksha-fg-muted)" label="Searching" />
          <span className="text-(--noksha-fg-subtle) text-xs">Searching…</span>
        </div>
      </Cell>

      <Cell label="Full page">
        <div className="flex size-24 flex-col items-center justify-center gap-2 rounded-2xl border border-(--noksha-border-default) bg-(--noksha-bg-surface) shadow-(--noksha-shadow-sm)">
          <Spinner variant="ring" size="md" className="text-(--noksha-accent-fg)" label="Loading" />
          <span className="text-(--noksha-fg-muted) text-[0.65rem]">Loading Noksha UI…</span>
        </div>
      </Cell>

      <Cell label="Floating action">
        <span className="flex size-12 items-center justify-center rounded-full bg-(--noksha-accent-solid) shadow-(--noksha-shadow-md)">
          <Spinner variant="ring" size="sm" className="text-(--noksha-accent-on-solid)" label="Loading" />
        </span>
      </Cell>

      <Cell label="Race">
        <div className="flex items-center gap-3 rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2.5">
          <Spinner variant="ring" size="sm" className="text-(--noksha-accent-fg)" label="Loading" />
          <Spinner variant="orbit" size="sm" className="text-(--noksha-info-fg)" label="Loading" />
          <Spinner variant="comet" size="sm" className="text-(--noksha-success-fg)" label="Loading" />
        </div>
      </Cell>

      <Cell label="Warm ring">
        <div className="flex size-24 items-center justify-center rounded-full border-2 border-(--noksha-warning-subtle)">
          <Spinner variant="segment" size="lg" className="text-(--noksha-warning-solid)" label="Loading" />
        </div>
      </Cell>

      <Cell label="Bottom sheet">
        <div className="flex w-40 flex-col items-center gap-2 rounded-t-2xl border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-4 pt-4 pb-3 shadow-(--noksha-shadow-lg)">
          <Spinner variant="wave" size="md" className="text-(--noksha-accent-fg)" label="Loading" />
          <span className="text-(--noksha-fg-muted) text-xs">Please wait…</span>
        </div>
      </Cell>

      <Cell label="Stat tile">
        <div className="flex w-28 flex-col gap-1 rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) p-3">
          <span className="text-(--noksha-fg-subtle) text-[0.65rem] uppercase tracking-wide">Revenue</span>
          <Spinner variant="bars" size="md" className="text-(--noksha-fg-muted)" label="Loading revenue" />
        </div>
      </Cell>

      <Cell label="Danger action">
        <Button type="button" tone="danger" variant="soft" loading loadingLabel="Deleting">
          Delete
        </Button>
      </Cell>

      <Cell label="Dashed ring">
        <div className="flex size-24 items-center justify-center rounded-full border-2 border-(--noksha-border-default) border-dashed">
          <Spinner variant="spokes" size="lg" className="text-(--noksha-fg-default)" label="Loading" />
        </div>
      </Cell>

      <Cell label="Confirm ripple">
        <div className="flex size-24 items-center justify-center rounded-full bg-(--noksha-success-subtle)">
          <Spinner variant="ripple" size="lg" className="text-(--noksha-success-fg)" label="Loading" />
        </div>
      </Cell>
    </div>
  );
}
