import { Input } from '@noksha-ui/react';
import type { ReactNode } from 'react';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </div>
  );
}

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M11 2c.6 3.4 2.6 5.4 6 6-3.4.6-5.4 2.6-6 6-.6-3.4-2.6-5.4-6-6 3.4-.6 5.4-2.6 6-6Z" />
  </svg>
);

export default function InputModern() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
      <Cell label="Frosted panel">
        <div className="noksha-canvas-bg w-full rounded-(--noksha-radius-lg) p-3">
          <Input
            placeholder="Frosted"
            className="border-white/40 bg-white/40 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
          />
        </div>
      </Cell>

      <Cell label="Minimal underline">
        <Input
          placeholder="Minimal"
          className="w-full rounded-none border-0 border-b bg-transparent px-0 transition-colors focus-visible:border-b-2 focus-visible:border-(--noksha-accent-solid) focus-visible:outline-none"
        />
      </Cell>

      <Cell label="Floating card">
        <Input
          placeholder="Elevated"
          className="w-full rounded-2xl border-0 bg-(--noksha-bg-surface) shadow-(--noksha-shadow-lg) transition-shadow focus-visible:shadow-(--noksha-shadow-xl) focus-visible:outline-none"
        />
      </Cell>

      <Cell label="Icon pill">
        <Input
          variant="soft"
          placeholder="Ask anything"
          startIcon={<SparkleIcon />}
          className="w-full rounded-full"
        />
      </Cell>

      <Cell label="Inverse pill">
        <Input
          placeholder="Dark pill"
          className="w-full rounded-full border-transparent bg-(--noksha-bg-inverse) text-(--noksha-fg-inverse) placeholder:text-(--noksha-fg-inverse)/50 focus-visible:shadow-[0_0_0_4px_var(--noksha-bg-subtle)] focus-visible:outline-none"
        />
      </Cell>

      <Cell label="Rotating border">
        <span className="relative inline-flex w-full overflow-hidden rounded-(--noksha-radius-md) p-[2px]">
          <span
            className="absolute inset-[-40%] animate-spin"
            style={{
              animationDuration: '3s',
              background:
                'conic-gradient(from 0deg, var(--noksha-accent-solid), var(--noksha-info-solid), var(--noksha-danger-solid), var(--noksha-accent-solid))',
            }}
          />
          <Input
            placeholder="Techy"
            className="relative w-full rounded-[calc(var(--noksha-radius-md)-2px)] border-0 bg-(--noksha-bg-surface) focus-visible:outline-none"
          />
        </span>
      </Cell>

      <Cell label="Floating label">
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
      </Cell>
    </div>
  );
}
