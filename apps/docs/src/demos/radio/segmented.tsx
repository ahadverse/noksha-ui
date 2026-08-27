'use client';

import { Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const HIDE = 'absolute inset-0 z-10 size-full cursor-pointer opacity-0';

function useSegment(options: string[]) {
  const [value, setValue] = React.useState(options[0] ?? '');
  return { value, setValue, index: options.indexOf(value) };
}

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-fg-muted text-xs">{label}</span>
      {children}
    </div>
  );
}

function PillTabs() {
  const TABS = ['Hello', 'UI', 'World'];
  const { value, setValue, index } = useSegment(TABS);

  return (
    <div className="relative inline-flex rounded-full bg-white p-3 shadow-[0_0_1px_0_rgba(24,94,224,0.15),0_6px_12px_0_rgba(24,94,224,0.15)]">
      <span
        aria-hidden="true"
        className="absolute top-3 left-3 h-[30px] w-[50px] rounded-full bg-[#e6eef9] transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${index * 50}px)` }}
      />
      <RadioGroup
        value={value}
        onValueChange={setValue}
        orientation="horizontal"
        className="relative gap-0"
      >
        {TABS.map((tab) => (
          <label
            key={tab}
            className="group relative flex h-[30px] w-[50px] cursor-pointer items-center justify-center font-medium text-[13px] text-black transition-colors has-[:checked]:text-[#185ee0]"
          >
            <Radio value={tab} containerClassName={HIDE} />
            {tab}
            {tab === 'Hello' ? (
              <span className="-top-1 -right-1 absolute flex size-3.5 items-center justify-center rounded-full bg-[#e6eef9] text-[9px] group-has-[:checked]:bg-[#185ee0] group-has-[:checked]:text-white">
                2
              </span>
            ) : null}
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}

function DarkBlocks() {
  const OPTIONS = ['Play', 'Stop', 'Reset'];
  const [value, setValue] = React.useState(OPTIONS[0]);

  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      orientation="horizontal"
      className="gap-0.5 rounded-lg bg-black p-1"
    >
      {OPTIONS.map((option) => (
        <label
          key={option}
          className="relative flex h-[60px] w-[90px] cursor-pointer flex-col items-center justify-center bg-neutral-800 font-extrabold text-[15px] text-neutral-300 uppercase shadow-[0_17px_5px_1px_rgba(0,0,0,0.2)] transition-all first:rounded-l-md last:rounded-r-md has-[:checked]:bg-neutral-900 has-[:checked]:text-[#cae2fd] has-[:checked]:shadow-none"
        >
          <Radio value={option} containerClassName={HIDE} />
          {option}
        </label>
      ))}
    </RadioGroup>
  );
}

function GlassTiers() {
  const TIERS = ['Silver', 'Gold', 'Platinum'] as const;
  const GRADIENTS: Record<string, string> = {
    Silver: 'linear-gradient(135deg, #c0c0c055, #e0e0e0)',
    Gold: 'linear-gradient(135deg, #ffd70055, #ffcc00)',
    Platinum: 'linear-gradient(135deg, #d0e7ff55, #a0d8ff)',
  };
  const { value, setValue, index } = useSegment([...TIERS]);

  return (
    <div className="rounded-2xl bg-neutral-950 p-6">
      <div className="relative flex w-fit overflow-hidden rounded-2xl bg-white/[0.06] shadow-[inset_1px_1px_4px_rgba(255,255,255,0.2),inset_-1px_-1px_6px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/3 rounded-2xl transition-transform duration-500 [transition-timing-function:cubic-bezier(0.37,1.95,0.66,0.56)]"
          style={{ transform: `translateX(${index * 100}%)`, background: GRADIENTS[value] }}
        />
        <RadioGroup
          value={value}
          onValueChange={setValue}
          orientation="horizontal"
          className="relative z-10 gap-0"
        >
          {TIERS.map((tier) => (
            <label
              key={tier}
              className="relative flex min-w-20 cursor-pointer items-center justify-center px-6 py-3 font-semibold text-[14px] text-neutral-200 transition-colors has-[:checked]:text-white hover:text-white"
            >
              <Radio value={tier} containerClassName={HIDE} />
              {tier}
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

function VerticalGlow() {
  const PLANS = ['Free', 'Basic', 'Premium'];
  const { value, setValue, index } = useSegment(PLANS);

  return (
    <div className="relative flex flex-col pl-2">
      <span
        aria-hidden="true"
        className="absolute left-0 h-1/3 w-px bg-gradient-to-b from-transparent via-[#f7e479] to-transparent transition-transform duration-500 [transition-timing-function:cubic-bezier(0.37,1.95,0.66,0.56)]"
        style={{ transform: `translateY(${index * 100}%)` }}
      />
      <RadioGroup value={value} onValueChange={setValue} className="gap-0">
        {PLANS.map((plan) => (
          <label
            key={plan}
            className="relative cursor-pointer px-4 py-3 text-fg-muted transition-colors has-[:checked]:text-[#b8960c]"
          >
            <Radio value={plan} containerClassName={HIDE} />
            {plan}
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}

function GlassBall() {
  const NUMBERS = ['1', '2', '3'];
  const { value, setValue, index } = useSegment(NUMBERS);

  return (
    <div className="flex items-center gap-6">
      <div className="relative grid size-[95px] place-items-center rounded-[35px] bg-neutral-400/50 p-2 shadow-[0_25px_50px_-10px_rgba(50,50,93,0.2),0_10px_30px_-15px_rgba(0,0,0,0.25)] backdrop-blur-md">
        <div className="size-full rounded-[30px] border-9 border-white/45" />
      </div>
      <div className="relative flex flex-col">
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 size-[41px] rounded-full bg-neutral-200 shadow-[0_-1px_15px_-8px_rgba(0,0,0,0.09)] transition-transform duration-700 [transition-timing-function:cubic-bezier(1,-0.4,0,1.4)]"
          style={{ transform: `translateY(${index * 51}px)` }}
        />
        <RadioGroup value={value} onValueChange={setValue} className="relative gap-0">
          {NUMBERS.map((number) => (
            <label
              key={number}
              className="relative flex h-[41px] w-[41px] cursor-pointer items-center justify-center font-black font-mono text-[22px] text-neutral-400"
            >
              <Radio value={number} containerClassName={HIDE} />
              <span className="relative z-10">{number}</span>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default function RadioSegmented() {
  return (
    <div className="flex flex-wrap gap-8">
      <Frame label="Pill tabs">
        <PillTabs />
      </Frame>
      <Frame label="Dark blocks">
        <DarkBlocks />
      </Frame>
      <Frame label="Glass tiers">
        <GlassTiers />
      </Frame>
      <Frame label="Vertical glow">
        <VerticalGlow />
      </Frame>
      <Frame label="Glass ball">
        <GlassBall />
      </Frame>
    </div>
  );
}
