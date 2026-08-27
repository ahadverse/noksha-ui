'use client';

import { Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const ROLES = ['Designer', 'Student', 'Teacher'];

export default function RadioPulseList() {
  const [value, setValue] = React.useState(ROLES[0]);

  return (
    <RadioGroup value={value} onValueChange={setValue} className="w-[220px] gap-2.5">
      {ROLES.map((role) => (
        <label
          key={role}
          className="relative flex h-[50px] cursor-pointer items-center gap-4 rounded-[10px] border-2 border-transparent px-5 transition-all has-[:checked]:border-[#435dd8] has-[:checked]:bg-[#2d3750] hover:bg-[#2a2e3c]"
        >
          <Radio
            value={role}
            className="border-none bg-[#202030] peer-checked:bg-[#435dd8]"
            dotClassName="bg-white"
          />
          <span className="text-[15px] text-fg">{role}</span>
        </label>
      ))}
    </RadioGroup>
  );
}
