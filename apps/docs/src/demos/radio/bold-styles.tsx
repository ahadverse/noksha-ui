import { Radio } from '@noksha-ui/react';
import type { ReactNode } from 'react';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer flex-col items-center gap-2">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </label>
  );
}

export default function RadioBoldStyles() {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
      <Cell label="Square">
        <Radio value="square" className="rounded-md" defaultChecked aria-label="Square" />
      </Cell>

      <Cell label="Neon">
        <Radio
          value="neon"
          containerClassName="[--rd-solid:#39ff88]"
          className="border-neutral-600 bg-neutral-900 peer-checked:shadow-[0_0_10px_1px_#39ff88]"
          defaultChecked
          aria-label="Neon"
        />
      </Cell>

      <Cell label="Oversized">
        <Radio
          value="oversized"
          containerClassName="size-8"
          className="border-2"
          defaultChecked
          aria-label="Oversized"
        />
      </Cell>

      <Cell label="Diamond">
        <Radio
          value="diamond"
          containerClassName="rotate-45"
          defaultChecked
          aria-label="Diamond"
        />
      </Cell>

      <Cell label="Gradient ring">
        <span
          className="inline-flex rounded-full p-[2px]"
          style={{
            background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))',
          }}
        >
          <Radio value="gradient-ring" defaultChecked aria-label="Gradient ring" />
        </span>
      </Cell>

      <Cell label="Dashed">
        <Radio value="dashed" className="border-dashed" aria-label="Dashed" />
      </Cell>

      <Cell label="Thick brand">
        <Radio
          value="thick-brand"
          containerClassName="[--rd-solid:#f59e0b]"
          className="border-4"
          defaultChecked
          aria-label="Thick brand"
        />
      </Cell>

      <Cell label="Elevated">
        <Radio
          value="elevated"
          className="shadow-(--noksha-shadow-sm) peer-checked:shadow-(--noksha-shadow-md)"
          defaultChecked
          aria-label="Elevated"
        />
      </Cell>

      <Cell label="Bounce">
        <Radio
          value="bounce"
          className="transition-transform duration-150 ease-out active:scale-90 peer-checked:scale-110"
          defaultChecked
          aria-label="Bounce"
        />
      </Cell>

      <Cell label="Glass">
        <span className="inline-flex rounded-lg bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-danger-solid))] p-2.5">
          <Radio
            value="glass"
            containerClassName="[--rd-solid:#ffffff]"
            className="border-white/40 bg-white/10 backdrop-blur-md peer-checked:border-white/70"
            defaultChecked
            aria-label="Glass"
          />
        </span>
      </Cell>

      <Cell label="Ring offset">
        <Radio
          value="ring-offset"
          className="ring-2 ring-(--noksha-accent-subtle) ring-offset-2 ring-offset-(--noksha-bg-surface) transition-shadow peer-checked:ring-(--noksha-accent-solid)"
          defaultChecked
          aria-label="Ring offset"
        />
      </Cell>

      <Cell label="Pixel">
        <Radio
          value="pixel"
          className="rounded-none border-4 border-black bg-orange-500 shadow-[0_0_0_3px_#fff,0_0_0_6px_#000] peer-checked:bg-orange-500"
          dotClassName="rounded-none bg-white"
          defaultChecked
          aria-label="Pixel"
        />
      </Cell>
    </div>
  );
}
