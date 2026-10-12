'use client';

import { Input } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M11 2c.6 3.4 2.6 5.4 6 6-3.4.6-5.4 2.6-6 6-.6-3.4-2.6-5.4-6-6 3.4-.6 5.4-2.6 6-6Z" />
  </svg>
);

export default function InputModern() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Frosted panel">
        <div
          className="w-full rounded-(--noksha-radius-lg) p-3"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 75% 55% at 50% 0%, var(--noksha-accent-subtle), transparent 70%), linear-gradient(to bottom, var(--noksha-bg-subtle), transparent 65%)',
          }}
        >
          <Input
            aria-label="Frosted"
            placeholder="Frosted"
            className="border-white/40 bg-white/40 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
          />
        </div>
      </DemoTile>

      <DemoTile label="Minimal underline">
        <Input
          aria-label="Minimal"
          placeholder="Minimal"
          className="w-full rounded-none border-0 border-b bg-transparent px-0 transition-colors focus-visible:border-b-2 focus-visible:border-(--noksha-accent-solid) focus-visible:outline-none"
        />
      </DemoTile>

      <DemoTile label="Floating card">
        <Input
          aria-label="Elevated"
          placeholder="Elevated"
          className="w-full rounded-2xl border-0 bg-(--noksha-bg-surface) shadow-(--noksha-shadow-lg) transition-shadow focus-visible:shadow-(--noksha-shadow-xl) focus-visible:outline-none"
        />
      </DemoTile>

      <DemoTile label="Icon pill">
        <Input
          variant="soft"
          aria-label="Ask anything"
          placeholder="Ask anything"
          startIcon={<SparkleIcon />}
          className="w-full rounded-full"
        />
      </DemoTile>

      <DemoTile label="Inverse pill">
        <Input
          aria-label="Dark pill"
          placeholder="Dark pill"
          className="w-full rounded-full border-transparent bg-(--noksha-bg-inverse) text-(--noksha-fg-inverse) placeholder:text-(--noksha-fg-inverse)/50 focus-visible:shadow-[0_0_0_4px_var(--noksha-bg-subtle)] focus-visible:outline-none"
        />
      </DemoTile>

      <DemoTile label="Rotating border">
        <span className="relative inline-flex w-full overflow-hidden rounded-(--noksha-radius-md) p-[2px]">
          <span
            className="absolute top-1/2 left-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 animate-spin"
            style={{
              animationDuration: '3s',
              background:
                'conic-gradient(from 0deg, var(--noksha-accent-solid), var(--noksha-info-solid), var(--noksha-danger-solid), var(--noksha-accent-solid))',
            }}
          />
          <Input
            aria-label="Techy"
            placeholder="Techy"
            className="relative w-full rounded-[calc(var(--noksha-radius-md)-2px)] border-0 bg-(--noksha-bg-surface) focus-visible:outline-none"
          />
        </span>
      </DemoTile>

      <div className="min-w-0 sm:col-span-2">
        <DemoTile label="Floating label">
          <div className="relative w-full pt-4">
            <Input
              id="modern-floating-label"
              placeholder=" "
              className="peer w-full rounded-none border-0 border-b-2 border-(--noksha-border-default) bg-transparent px-0 focus-visible:border-(--noksha-border-focus) focus-visible:outline-none"
            />
            <label
              htmlFor="modern-floating-label"
              className="pointer-events-none absolute top-0 left-0 -translate-y-full text-(--noksha-fg-muted) text-xs transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-(--noksha-fg-subtle) peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-full peer-focus:text-(--noksha-accent-fg) peer-focus:text-xs"
            >
              Enter text
            </label>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-(--noksha-accent-solid) transition-transform duration-300 peer-focus:scale-x-100" />
          </div>
        </DemoTile>
      </div>
    </div>
  );
}
