'use client';

import { Button, Skeleton, Spinner } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function SpinnerContexts() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Gradient card" className="items-center">
        <div
          className="flex size-24 items-center justify-center rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))',
          }}
        >
          <Spinner variant="ring" size="lg" className="text-white" label="Loading" />
        </div>
      </DemoTile>

      <DemoTile label="Glass panel" className="items-center">
        <div
          className="flex size-24 items-center justify-center rounded-2xl p-3"
          style={{
            background:
              'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))',
          }}
        >
          <div className="flex size-full items-center justify-center rounded-xl border border-white/25 bg-white/10 backdrop-blur-md">
            <Spinner variant="dual" size="lg" className="text-white" label="Loading" />
          </div>
        </div>
      </DemoTile>

      <DemoTile label="Neon glow" className="items-center">
        <div className="flex size-24 items-center justify-center rounded-2xl bg-(--noksha-bg-inverse) shadow-[0_0_20px_-4px_var(--noksha-accent-solid)]">
          <Spinner
            variant="halo"
            size="lg"
            className="text-(--noksha-accent-solid)"
            label="Loading"
          />
        </div>
      </DemoTile>

      <DemoTile label="Badge" className="items-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg)">
          <Spinner variant="dots" size="sm" label="Loading" />
        </span>
      </DemoTile>

      <DemoTile label="Progress row" className="items-center">
        <div className="flex w-32 items-center gap-2.5 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2">
          <Spinner variant="ring" size="sm" className="text-(--noksha-accent-fg)" label="Loading" />
          <span className="text-(--noksha-fg-muted) text-xs">Syncing…</span>
        </div>
      </DemoTile>

      <DemoTile label="Solid button" className="items-center">
        <Button type="button" tone="accent" loading loadingLabel="Saving">
          Save
        </Button>
      </DemoTile>

      <DemoTile label="Gradient button" className="items-center">
        <Button
          type="button"
          variant="gradient"
          tone="accent"
          loading
          loadingPlacement="icon"
          loadingLabel="Sending"
        >
          Send
        </Button>
      </DemoTile>

      <DemoTile label="Avatar overlay" className="items-center">
        <span className="relative flex size-14 items-center justify-center rounded-full bg-(--noksha-bg-subtle) text-(--noksha-fg-muted)">
          <span className="text-lg">JD</span>
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/45">
            <Spinner variant="ring" size="sm" className="text-white" label="Uploading photo" />
          </span>
        </span>
      </DemoTile>

      <DemoTile label="Skeleton + spinner" className="items-center">
        <div className="relative w-28">
          <Skeleton variant="shimmer" shape="rounded" size="lg" className="h-16 w-28" />
          <span className="absolute right-1.5 bottom-1.5 flex size-5 items-center justify-center rounded-full bg-(--noksha-bg-surface) shadow-(--noksha-shadow-sm)">
            <Spinner
              variant="ring"
              size="xs"
              className="text-(--noksha-accent-fg)"
              label="Loading"
            />
          </span>
        </div>
      </DemoTile>

      <DemoTile label="Toast" className="items-center">
        <div className="flex w-40 items-center gap-2.5 rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2.5 shadow-(--noksha-shadow-md)">
          <Spinner variant="arc" size="sm" className="text-(--noksha-accent-fg)" label="Loading" />
          <span className="text-(--noksha-fg-default) text-xs">Uploading file…</span>
        </div>
      </DemoTile>

      <DemoTile label="Typing indicator" className="items-center">
        <div className="flex items-center gap-1.5 rounded-full bg-(--noksha-bg-subtle) px-3.5 py-2.5">
          <Spinner
            variant="bounce"
            size="sm"
            className="text-(--noksha-fg-muted)"
            label="Someone is typing"
          />
        </div>
      </DemoTile>

      <DemoTile label="Buffering overlay" className="items-center">
        <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-2xl bg-(--noksha-bg-inverse)">
          <span className="absolute inset-0 bg-black/40" />
          <Spinner variant="ring" size="lg" className="relative text-white" label="Buffering" />
        </div>
      </DemoTile>

      <DemoTile label="Search field" className="items-center">
        <div className="flex w-36 items-center gap-2 rounded-full border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-1.5">
          <Spinner
            variant="ring"
            size="xs"
            className="text-(--noksha-fg-muted)"
            label="Searching"
          />
          <span className="text-(--noksha-fg-subtle) text-xs">Searching…</span>
        </div>
      </DemoTile>

      <DemoTile label="Full page" className="items-center">
        <div className="flex size-24 flex-col items-center justify-center gap-2 rounded-2xl border border-(--noksha-border-default) bg-(--noksha-bg-surface) shadow-(--noksha-shadow-sm)">
          <Spinner variant="ring" size="md" className="text-(--noksha-accent-fg)" label="Loading" />
          <span className="text-(--noksha-fg-muted) text-[0.65rem]">Loading Noksha UI…</span>
        </div>
      </DemoTile>

      <DemoTile label="Floating action" className="items-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-(--noksha-accent-solid) shadow-(--noksha-shadow-md)">
          <Spinner
            variant="ring"
            size="sm"
            className="text-(--noksha-accent-on-solid)"
            label="Loading"
          />
        </span>
      </DemoTile>

      <DemoTile label="Race" className="items-center">
        <div className="flex items-center gap-3 rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2.5">
          <Spinner variant="ring" size="sm" className="text-(--noksha-accent-fg)" label="Loading" />
          <Spinner variant="orbit" size="sm" className="text-(--noksha-info-fg)" label="Loading" />
          <Spinner
            variant="comet"
            size="sm"
            className="text-(--noksha-success-fg)"
            label="Loading"
          />
        </div>
      </DemoTile>

      <DemoTile label="Warm ring" className="items-center">
        <div className="flex size-24 items-center justify-center rounded-full border-2 border-(--noksha-warning-subtle)">
          <Spinner
            variant="segment"
            size="lg"
            className="text-(--noksha-warning-solid)"
            label="Loading"
          />
        </div>
      </DemoTile>

      <DemoTile label="Bottom sheet" className="items-center">
        <div className="flex w-40 flex-col items-center gap-2 rounded-t-2xl border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-4 pt-4 pb-3 shadow-(--noksha-shadow-lg)">
          <Spinner variant="wave" size="md" className="text-(--noksha-accent-fg)" label="Loading" />
          <span className="text-(--noksha-fg-muted) text-xs">Please wait…</span>
        </div>
      </DemoTile>

      <DemoTile label="Stat tile" className="items-center">
        <div className="flex w-28 flex-col gap-1 rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) p-3">
          <span className="text-(--noksha-fg-subtle) text-[0.65rem] uppercase tracking-wide">
            Revenue
          </span>
          <Spinner
            variant="bars"
            size="md"
            className="text-(--noksha-fg-muted)"
            label="Loading revenue"
          />
        </div>
      </DemoTile>

      <DemoTile label="Danger action" className="items-center">
        <Button type="button" tone="danger" variant="soft" loading loadingLabel="Deleting">
          Delete
        </Button>
      </DemoTile>

      <DemoTile label="Dashed ring" className="items-center">
        <div className="flex size-24 items-center justify-center rounded-full border-2 border-(--noksha-border-default) border-dashed">
          <Spinner
            variant="spokes"
            size="lg"
            className="text-(--noksha-fg-default)"
            label="Loading"
          />
        </div>
      </DemoTile>

      <DemoTile label="Confirm ripple" className="items-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-(--noksha-success-subtle)">
          <Spinner
            variant="ripple"
            size="lg"
            className="text-(--noksha-success-fg)"
            label="Loading"
          />
        </div>
      </DemoTile>
    </div>
  );
}
