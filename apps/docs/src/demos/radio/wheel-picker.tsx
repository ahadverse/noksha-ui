'use client';

import { Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const HIDE = 'absolute inset-0 z-10 size-full cursor-pointer opacity-0';
const OPTIONS = [
  { value: 'prime', num: '01', label: 'PRIME' },
  { value: 'select', num: '02', label: 'SELECT' },
  { value: 'ultra', num: '03', label: 'ULTRA' },
];

export default function RadioWheelPicker() {
  const [value, setValue] = React.useState('select');
  const index = OPTIONS.findIndex((option) => option.value === value);

  return (
    <div className="relative flex h-[240px] w-[200px] flex-col items-center justify-center overflow-hidden rounded-[30px] border-2 border-neutral-800 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_10px_rgba(0,0,0,0.8)]">
      <span
        aria-hidden="true"
        className="-translate-y-1/2 absolute top-1/2 left-4 size-1.5 rounded-full bg-[#ff3e3e] shadow-[0_0_15px_#ff3e3e,0_0_30px_#ff3e3e]"
      />
      <RadioGroup value={value} onValueChange={setValue} className="gap-0">
        {OPTIONS.map((option, i) => {
          const distance = Math.abs(i - index);
          return (
            <label
              key={option.value}
              className="relative flex cursor-pointer items-center gap-2 py-3 pl-11 transition-all duration-500"
              style={{
                opacity: distance === 0 ? 1 : distance === 1 ? 0.35 : 0.12,
                transform: `scale(${distance === 0 ? 1 : 0.75}) translateX(${distance === 0 ? 10 : 0}px)`,
                filter: distance === 0 ? 'none' : 'blur(1px)',
              }}
            >
              <Radio value={option.value} containerClassName={HIDE} />
              <span className="font-black text-[#ff3e3e] text-[11px]">{option.num}</span>
              <span className="font-black text-[28px] text-white uppercase tracking-tight">
                {option.label}
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
