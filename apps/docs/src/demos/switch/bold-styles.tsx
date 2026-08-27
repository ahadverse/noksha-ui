import { Switch } from '@noksha-ui/react';
import type { ReactNode } from 'react';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer flex-col items-center gap-2">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </label>
  );
}

export default function SwitchBoldStyles() {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
      <Cell label="Neon">
        <Switch
          containerClassName="[--sw-solid:#39ff88]"
          className="border border-neutral-700 bg-neutral-900 peer-checked:shadow-[0_0_10px_1px_#39ff88]"
          defaultChecked
          aria-label="Neon"
        />
      </Cell>

      <Cell label="Oversized">
        <Switch
          containerClassName="h-8 w-14 [--sw-w:3.5rem] [--sw-h:2rem] [--sw-gap:0.25rem]"
          defaultChecked
          aria-label="Oversized"
        />
      </Cell>

      <Cell label="Gradient track">
        <Switch
          className="peer-checked:bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-info-solid))]"
          defaultChecked
          aria-label="Gradient track"
        />
      </Cell>

      <Cell label="Outline">
        <Switch
          className="border-2 border-(--noksha-border-default) bg-transparent peer-checked:border-(--sw-solid) peer-checked:bg-transparent"
          defaultChecked
          aria-label="Outline"
        />
      </Cell>

      <Cell label="Thick brand">
        <Switch
          containerClassName="[--sw-solid:#f59e0b]"
          className="border-4 border-(--sw-solid)"
          defaultChecked
          aria-label="Thick brand"
        />
      </Cell>

      <Cell label="Elevated">
        <Switch
          className="shadow-(--noksha-shadow-sm) peer-checked:shadow-(--noksha-shadow-md)"
          defaultChecked
          aria-label="Elevated"
        />
      </Cell>

      <Cell label="Glass">
        <span className="inline-flex rounded-full bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-danger-solid))] p-2.5">
          <Switch
            containerClassName="[--sw-solid:#ffffff]"
            className="border border-white/40 bg-white/10 backdrop-blur-md"
            defaultChecked
            aria-label="Glass"
          />
        </span>
      </Cell>

      <Cell label="Ring offset">
        <Switch
          className="ring-2 ring-(--noksha-accent-subtle) ring-offset-2 ring-offset-(--noksha-bg-surface) peer-checked:ring-(--noksha-accent-solid)"
          defaultChecked
          aria-label="Ring offset"
        />
      </Cell>

      <Cell label="Bounce">
        <Switch
          containerClassName="transition-transform duration-150 ease-out active:scale-90"
          defaultChecked
          aria-label="Bounce"
        />
      </Cell>

      <Cell label="Square">
        <Switch className="rounded-md" defaultChecked aria-label="Square" />
      </Cell>

      <Cell label="Soft halo">
        <Switch
          tone="danger"
          className="peer-checked:shadow-[0_0_0_4px_var(--noksha-danger-subtle)]"
          defaultChecked
          aria-label="Soft halo"
        />
      </Cell>

      <Cell label="Half split">
        <Switch
          className="rounded-md bg-neutral-100 peer-checked:bg-neutral-900"
          thumbClassName="rounded-sm bg-neutral-900 peer-checked:bg-neutral-100"
          aria-label="Half split"
        />
      </Cell>

      <Cell label="On / Off text">
        <Switch
          className="before:absolute before:inset-y-0 before:left-1.5 before:flex before:items-center before:font-bold before:text-(--noksha-fg-muted) before:text-[8px] before:opacity-100 before:content-['OFF'] after:absolute after:inset-y-0 after:right-1.5 after:flex after:items-center after:font-bold after:text-[8px] after:text-white after:opacity-0 after:content-['ON'] peer-checked:before:opacity-0 peer-checked:after:opacity-100"
          defaultChecked
          aria-label="On or off"
        />
      </Cell>

      <Cell label="Status ring">
        <Switch
          className="ring-2 ring-(--noksha-danger-solid)/60 peer-checked:shadow-[0_0_12px_2px_var(--noksha-success-solid)] peer-checked:ring-(--noksha-success-solid)/70"
          aria-label="Status ring"
        />
      </Cell>

      <Cell label="Crescent moon">
        <Switch
          containerClassName="[--sw-solid:#522ba7]"
          className="bg-[#28096b]"
          thumbClassName="bg-[#28096b] shadow-[inset_6px_-3px_0_0_#fde047] peer-checked:bg-(--sw-solid) peer-checked:shadow-[inset_10px_-3px_0_10px_#fde047]"
          defaultChecked
          aria-label="Crescent moon"
        />
      </Cell>

      <Cell label="Traffic dot">
        <Switch
          className="bg-(--noksha-danger-solid) peer-checked:bg-(--noksha-success-solid)"
          aria-label="Traffic dot"
        />
      </Cell>
    </div>
  );
}
