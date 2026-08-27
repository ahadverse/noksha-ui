import type { ReactNode } from 'react';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </div>
  );
}

function LockToggle() {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" className="peer sr-only" aria-label="Lock" />
      <div className="h-12 w-24 rounded-full bg-rose-400 shadow-md outline-none duration-300 after:absolute after:top-1 after:left-1 after:flex after:size-10 after:items-center after:justify-center after:rounded-full after:bg-gray-50 after:outline-none after:duration-300 after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-12 peer-hover:after:scale-95 peer-focus:outline-none">
        <svg viewBox="0 0 100 100" className="absolute top-1 left-12 size-10 stroke-gray-900" aria-hidden="true">
          <path d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z" />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute top-1 left-1 size-10 stroke-gray-900" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z"
          />
        </svg>
      </div>
    </label>
  );
}

function PlayToggle() {
  return (
    <label className="group relative inline-flex h-[50px] w-[100px] cursor-pointer items-center rounded-full bg-neutral-800 p-1.5 shadow-[0_0_16px_-8px_#fefefe]">
      <input type="checkbox" className="peer sr-only" aria-label="Play or pause" />
      <span className="relative aspect-square w-[38px] rounded-full bg-neutral-600 transition-all duration-500 [transition-timing-function:cubic-bezier(1,0,0,1)] peer-checked:translate-x-[50px] peer-checked:bg-rose-500">
        <span className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 aspect-square w-6 rounded-[4px] bg-neutral-50 transition-all duration-500 [clip-path:polygon(25%_0,75%_50%,25%_100%,25%_51%)] [transition-timing-function:cubic-bezier(1,0,0,1)] group-has-[:checked]:w-5 group-has-[:checked]:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]" />
      </span>
    </label>
  );
}

function SpeakerToggle() {
  return (
    <label className="relative flex size-[50px] cursor-pointer items-center justify-center rounded-full bg-neutral-800 shadow-[2px_2px_10px_rgba(0,0,0,0.13)] transition-colors duration-300 active:scale-[0.85] hover:bg-neutral-700">
      <input type="checkbox" className="peer sr-only" aria-label="Mute" />
      <svg
        viewBox="0 0 75 75"
        stroke="#fff"
        strokeWidth="5"
        className="absolute size-[18px] fill-white transition-opacity duration-300 peer-checked:opacity-0"
        aria-hidden="true"
      >
        <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z" strokeLinejoin="round" />
        <path
          d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <svg
        viewBox="0 0 75 75"
        stroke="#fff"
        strokeWidth="5"
        className="absolute size-[18px] fill-white opacity-0 transition-opacity duration-300 peer-checked:opacity-100"
        aria-hidden="true"
      >
        <path d="m39,14-17,15H6V48H22l17,15z" strokeLinejoin="round" />
        <path d="m49,26 20,24m0-24-20,24" fill="none" strokeLinecap="round" />
      </svg>
    </label>
  );
}

function PowerToggle() {
  return (
    <label className="relative flex size-[70px] cursor-pointer items-center justify-center rounded-full border-2 border-neutral-600 bg-neutral-700 shadow-[0_0_3px_black_inset] transition-shadow duration-300 has-[:checked]:border-white has-[:checked]:bg-[#92b4b8] has-[:checked]:shadow-[0_0_1px_#97f3ff_inset,0_0_2px_#97f3ff_inset,0_0_10px_#97f3ff_inset,0_0_40px_#97f3ff,0_0_100px_#97f3ff,0_0_5px_#97f3ff]">
      <input type="checkbox" className="peer sr-only" aria-label="Power" defaultChecked />
      <svg
        viewBox="0 0 512 512"
        className="size-5 fill-neutral-800 transition-[fill,filter] duration-300 peer-checked:fill-white peer-checked:drop-shadow-[0_0_5px_#97f3ff]"
        aria-hidden="true"
      >
        <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
      </svg>
    </label>
  );
}

function BubbleToggle() {
  return (
    <label className="relative flex size-12 cursor-pointer items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff,#f43f5e_60%)] shadow-[0_0.1em_0.4em_rgba(244,63,94,0.6)_inset,0_-0.15em_0.4em_rgba(255,255,255,0.5)_inset] transition-transform duration-200 has-[:checked]:bg-[radial-gradient(circle_at_30%_30%,#fff,#22c55e_60%)] has-[:checked]:shadow-[0_0.1em_0.4em_rgba(34,197,94,0.6)_inset,0_-0.15em_0.4em_rgba(255,255,255,0.5)_inset] hover:scale-110">
      <input type="checkbox" className="peer sr-only" aria-label="Bubble" />
    </label>
  );
}

export default function SwitchIconToggles() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <Cell label="Lock">
        <LockToggle />
      </Cell>
      <Cell label="Play / pause">
        <PlayToggle />
      </Cell>
      <Cell label="Speaker">
        <SpeakerToggle />
      </Cell>
      <Cell label="Power">
        <PowerToggle />
      </Cell>
      <Cell label="Bubble">
        <BubbleToggle />
      </Cell>
    </div>
  );
}
