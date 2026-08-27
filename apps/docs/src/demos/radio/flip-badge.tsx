'use client';

import { Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const HIDE = 'absolute inset-0 z-10 size-full cursor-pointer opacity-0';
const LEVELS = ['Easy', 'Normal', 'Hard'];

export default function RadioFlipBadge() {
  const [value, setValue] = React.useState('Normal');

  return (
    <RadioGroup value={value} onValueChange={setValue} className="gap-3">
      {LEVELS.map((level) => (
        <label
          key={level}
          className="group relative flex cursor-pointer items-center gap-3 text-[16px] text-fg"
        >
          <Radio value={level} containerClassName={HIDE} />
          <span className="relative h-9 w-14 [perspective:100px]">
            <span className="absolute inset-0 rounded-full transition-transform duration-500 [transform-style:preserve-3d] [transform:rotateY(180deg)] group-has-[:checked]:[transform:rotateY(0deg)]">
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-neutral-900 font-semibold text-[11px] text-emerald-500 shadow-[inset_2px_2px_2px_rgba(255,255,255,0.35)] [backface-visibility:hidden]">
                Yes
              </span>
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-neutral-900 font-semibold text-[11px] text-red-500 shadow-[inset_-2px_2px_2px_rgba(255,255,255,0.35)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                No
              </span>
            </span>
          </span>
          {level}
        </label>
      ))}
    </RadioGroup>
  );
}
