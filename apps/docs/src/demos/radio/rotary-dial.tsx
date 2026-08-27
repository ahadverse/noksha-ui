'use client';

import { Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const HIDE = 'absolute inset-0 z-10 size-full cursor-pointer opacity-0';
const POSITIONS = ['OFF', '1', '2', '3', '4', '5'];

export default function RadioRotaryDial() {
  const [value, setValue] = React.useState('OFF');
  const index = POSITIONS.indexOf(value);
  const angle = -90 + index * 60;

  return (
    <div className="relative grid size-[230px] place-items-center rounded-full bg-gradient-to-br from-neutral-400 to-neutral-700 shadow-[0_0_25px_rgba(0,0,0,0.4)]">
      <div className="relative size-[190px] rounded-full bg-gradient-to-br from-neutral-300 to-neutral-800 shadow-[inset_0_3px_10px_rgba(0,0,0,0.6)]">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 h-[3px] w-[45%] origin-left rounded-full bg-[#f50] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.3,1.5,0.5,1)]"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-[30%] rounded-full bg-gradient-to-b from-neutral-100 to-neutral-400 shadow-[0_3px_13px_rgba(0,0,0,0.7)]"
        />
        <RadioGroup value={value} onValueChange={setValue} className="absolute inset-0">
          {POSITIONS.map((position, i) => {
            const a = -90 + i * 60;
            return (
              <label
                key={position}
                className="absolute top-1/2 left-1/2 flex size-9 cursor-pointer items-center justify-center font-bold text-[13px] text-white/80 transition-colors has-[:checked]:text-white"
                style={{ transform: `translate(-50%, -50%) rotate(${a}deg) translate(78px) rotate(${-a}deg)` }}
              >
                <Radio value={position} containerClassName={HIDE} />
                {position}
              </label>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
