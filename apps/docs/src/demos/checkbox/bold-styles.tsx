import { Checkbox } from '@noksha-ui/react';
import type { ReactNode } from 'react';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer flex-col items-center gap-2">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </label>
  );
}

export default function CheckboxBoldStyles() {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
      <Cell label="Pill">
        <Checkbox className="rounded-full" defaultChecked aria-label="Pill" />
      </Cell>

      <Cell label="Gradient fill">
        <Checkbox
          className="peer-checked:border-transparent peer-checked:bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-danger-solid))] peer-indeterminate:border-transparent peer-indeterminate:bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-danger-solid))]"
          defaultChecked
          aria-label="Gradient fill"
        />
      </Cell>

      <Cell label="Soft halo">
        <Checkbox
          className="transition-shadow peer-checked:shadow-[0_0_0_4px_var(--noksha-accent-subtle)]"
          defaultChecked
          aria-label="Soft halo"
        />
      </Cell>

      <Cell label="Neon">
        <Checkbox
          containerClassName="[--cb-solid:#39ff88] [--cb-ink:#052e12]"
          className="border-neutral-600 bg-neutral-900 peer-checked:shadow-[0_0_10px_1px_#39ff88]"
          defaultChecked
          aria-label="Neon"
        />
      </Cell>

      <Cell label="Oversized">
        <Checkbox containerClassName="size-8" className="rounded-lg border-2" defaultChecked aria-label="Oversized" />
      </Cell>

      <Cell label="Diamond">
        <Checkbox containerClassName="rotate-45" defaultChecked aria-label="Diamond" />
      </Cell>

      <Cell label="Outline only">
        <Checkbox
          containerClassName="[--cb-ink:var(--noksha-accent-fg)]"
          className="peer-checked:bg-transparent peer-indeterminate:bg-transparent"
          defaultChecked
          aria-label="Outline only"
        />
      </Cell>

      <Cell label="Gradient ring">
        <span
          className="inline-flex rounded-[calc(var(--noksha-radius-xs)+2px)] p-[2px]"
          style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))' }}
        >
          <Checkbox className="rounded-(--noksha-radius-xs)" defaultChecked aria-label="Gradient ring" />
        </span>
      </Cell>

      <Cell label="Dashed">
        <Checkbox className="border-dashed" aria-label="Dashed" />
      </Cell>

      <Cell label="Thick brand">
        <Checkbox
          containerClassName="[--cb-solid:#f59e0b] [--cb-ink:#1c1300]"
          className="border-4"
          defaultChecked
          aria-label="Thick brand"
        />
      </Cell>

      <Cell label="Elevated">
        <Checkbox className="shadow-(--noksha-shadow-sm) peer-checked:shadow-(--noksha-shadow-md)" defaultChecked aria-label="Elevated" />
      </Cell>

      <Cell label="Bounce">
        <Checkbox
          className="transition-transform duration-150 ease-out active:scale-90 peer-checked:scale-110"
          defaultChecked
          aria-label="Bounce"
        />
      </Cell>

      <Cell label="Glass">
        <span className="inline-flex rounded-lg bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-danger-solid))] p-2.5">
          <Checkbox
            containerClassName="[--cb-ink:#ffffff]"
            className="border-white/40 bg-white/10 backdrop-blur-md peer-checked:border-white/70 peer-checked:bg-white/25"
            defaultChecked
            aria-label="Glass"
          />
        </span>
      </Cell>

      <Cell label="Ring offset">
        <Checkbox
          className="ring-2 ring-(--noksha-accent-subtle) ring-offset-2 ring-offset-(--noksha-bg-surface) transition-shadow peer-checked:ring-(--noksha-accent-solid)"
          defaultChecked
          aria-label="Ring offset"
        />
      </Cell>
    </div>
  );
}
