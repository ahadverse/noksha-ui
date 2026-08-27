import type { ReactNode } from 'react';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </div>
  );
}

function HamburgerToggle() {
  return (
    <label className="relative inline-block h-[58px] w-[70px] cursor-pointer overflow-hidden bg-neutral-900">
      <input type="checkbox" className="peer sr-only" aria-label="Menu" autoComplete="off" />
      <span className="absolute inset-x-0 top-0 h-1.5 bg-white transition-all duration-300 peer-checked:[transform:rotate(35deg)_scaleX(.55)_translate(39px,-4.5px)] peer-checked:rounded-[50px_50px_50px_0]" />
      <span className="absolute inset-x-0 top-[18px] h-1.5 bg-white transition-all duration-300 peer-checked:w-[45px] peer-checked:rounded-tr-[50px] peer-checked:rounded-br-[50px]" />
      <span className="absolute inset-x-0 top-[36px] h-1.5 bg-white transition-all duration-300 peer-checked:[transform:rotate(-35deg)_scaleX(.55)_translate(39px,4.5px)] peer-checked:rounded-[0_50px_50px_50px]" />
    </label>
  );
}

function ArrowToggle() {
  return (
    <label className="relative flex size-20 cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl bg-neutral-900 p-6 transition-transform duration-300 has-[:checked]:-rotate-90">
      <input type="checkbox" className="peer sr-only" aria-label="Collapse" autoComplete="off" />
      <span className="h-1 w-full origin-left rounded bg-[#fdfff3] transition-transform duration-300 peer-checked:translate-y-[28px] peer-checked:rotate-[-60deg]" />
      <span className="h-1 w-full origin-right rounded bg-[#fdfff3] transition-transform duration-300 peer-checked:translate-y-[14px] peer-checked:rotate-[60deg]" />
      <span className="h-1 w-full rounded bg-[#fdfff3]" />
    </label>
  );
}

export default function SwitchMenuToggle() {
  return (
    <div className="flex flex-wrap items-end gap-10">
      <Cell label="Hamburger">
        <HamburgerToggle />
      </Cell>
      <Cell label="Collapse arrow">
        <ArrowToggle />
      </Cell>
    </div>
  );
}
