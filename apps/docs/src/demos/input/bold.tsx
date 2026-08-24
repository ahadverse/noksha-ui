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

export default function InputBold() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
      <Cell label="Neon">
        <Input
          placeholder="Type something"
          className="w-full border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-500 focus-visible:border-[#39ff88] focus-visible:shadow-[0_0_16px_1px_#39ff88] focus-visible:outline-none"
        />
      </Cell>

      <Cell label="Gradient ring">
        <span
          className="inline-flex w-full rounded-(--noksha-radius-md) p-[2px]"
          style={{
            background:
              'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))',
          }}
        >
          <Input
            placeholder="Ringed"
            className="w-full rounded-[calc(var(--noksha-radius-md)-2px)] border-0 bg-(--noksha-bg-surface) focus-visible:outline-none"
          />
        </span>
      </Cell>

      <Cell label="Glass">
        <div
          className="w-full rounded-(--noksha-radius-lg) p-3"
          style={{
            background:
              'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))',
          }}
        >
          <Input
            placeholder="Glass"
            className="border-white/30 bg-white/10 text-white placeholder:text-white/70 backdrop-blur-md focus-visible:border-white/70 focus-visible:outline-none"
          />
        </div>
      </Cell>

      <Cell label="Neumorphic">
        <Input
          placeholder="Soft UI"
          className="w-full border-0 bg-neutral-200 text-neutral-700 placeholder:text-neutral-500 shadow-[5px_5px_10px_rgba(0,0,0,0.18),-5px_-5px_10px_rgba(255,255,255,0.85)] transition-shadow focus-visible:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.18),inset_-3px_-3px_7px_rgba(255,255,255,0.85)] focus-visible:outline-none"
        />
      </Cell>

      <Cell label="Sticker">
        <Input
          placeholder="Raw"
          className="w-full rounded-(--noksha-radius-md) border-2 border-(--noksha-fg-default) bg-(--noksha-bg-surface) font-semibold shadow-[3px_3px_0_0_var(--noksha-fg-default)] transition-transform focus-visible:translate-x-[3px] focus-visible:translate-y-[3px] focus-visible:shadow-none focus-visible:outline-none"
        />
      </Cell>

      <Cell label="Heavy underline">
        <Input
          placeholder="Underlined"
          className="w-full rounded-none border-0 border-b-4 border-(--noksha-border-default) bg-transparent px-1 focus-visible:border-(--noksha-accent-solid) focus-visible:outline-none"
        />
      </Cell>

      <Cell label="Halo">
        <Input
          placeholder="Focus me"
          className="w-full transition-shadow focus-visible:border-(--noksha-accent-solid) focus-visible:shadow-[0_0_0_6px_var(--noksha-accent-subtle)] focus-visible:outline-none"
        />
      </Cell>

      <Cell label="Dashed">
        <Input
          placeholder="Dashed"
          className="w-full border-2 border-dashed border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/10 focus-visible:outline-none"
        />
      </Cell>
    </div>
  );
}
