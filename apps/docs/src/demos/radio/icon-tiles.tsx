'use client';

import { Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const HIDE = 'absolute inset-0 z-10 size-full cursor-pointer opacity-0';

const ICONS = {
  bicycle: (
    <>
      <circle cx="6" cy="17" r="3.5" />
      <circle cx="18" cy="17" r="3.5" />
      <path d="M6 17 10 8h5l3 9M10 8 8.5 5h-2M13 8l4 5H9" />
    </>
  ),
  motorbike: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M9 17h6l-2-6H8l-3 3h4M13 11l2-4h3M17 7h2" />
    </>
  ),
  car: (
    <>
      <path d="M4 17h16M5 17v-3l2-5h10l2 5v3M5 17a1.5 1.5 0 0 0 3 0M16 17a1.5 1.5 0 0 0 3 0" />
      <path d="M7 9h10" />
    </>
  ),
};

const ENGINES = [
  { value: 'bicycle', label: 'Bicycle', icon: ICONS.bicycle },
  { value: 'motorbike', label: 'Motorbike', icon: ICONS.motorbike },
  { value: 'car', label: 'Car', icon: ICONS.car },
];

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 shrink-0 text-neutral-500 transition-colors group-has-[:checked]:text-[#2260ff]"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function GridTiles() {
  const [value, setValue] = React.useState('motorbike');

  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      orientation="horizontal"
      className="gap-3"
    >
      {ENGINES.map((engine) => (
        <label
          key={engine.value}
          className="group relative flex min-h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-[#b5bfd9] bg-surface shadow-[0_5px_10px_rgba(0,0,0,0.1)] transition-colors has-[:checked]:border-[#2260ff] has-[:focus-visible]:border-[#2260ff]"
        >
          <Radio value={engine.value} containerClassName={HIDE} />
          <Icon>{engine.icon}</Icon>
          <span className="text-[13px] text-fg-muted transition-colors group-has-[:checked]:text-[#2260ff]">
            {engine.label}
          </span>
        </label>
      ))}
    </RadioGroup>
  );
}

function ListTiles() {
  const [value, setValue] = React.useState('motorbike');

  return (
    <RadioGroup value={value} onValueChange={setValue} className="w-[200px] gap-2.5">
      {ENGINES.map((engine) => (
        <label
          key={engine.value}
          className="group relative flex h-[50px] cursor-pointer items-center gap-2.5 rounded-full border-2 border-[#b5bfd9] bg-surface pl-4 shadow-[0_5px_10px_rgba(0,0,0,0.1)] transition-colors has-[:checked]:border-[#2260ff] has-[:focus-visible]:border-[#2260ff]"
        >
          <Radio value={engine.value} containerClassName={HIDE} />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 shrink-0 text-neutral-500 transition-colors group-has-[:checked]:text-[#2260ff]"
            aria-hidden="true"
          >
            {engine.icon}
          </svg>
          <span className="text-[13px] text-fg-muted transition-colors group-has-[:checked]:text-[#2260ff]">
            {engine.label}
          </span>
        </label>
      ))}
    </RadioGroup>
  );
}

export default function RadioIconTiles() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <GridTiles />
      <ListTiles />
    </div>
  );
}
