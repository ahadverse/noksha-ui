'use client';

import { Button, Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const THEMES = ['light', 'dark', 'system'];

export default function RadioControlled() {
  const [theme, setTheme] = React.useState('system');

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <RadioGroup value={theme} onValueChange={setTheme} orientation="horizontal">
        {THEMES.map((option) => (
          <label
            key={option}
            htmlFor={`theme-${option}`}
            className="flex cursor-pointer items-center gap-2 text-fg text-sm capitalize"
          >
            <Radio id={`theme-${option}`} value={option} />
            {option}
          </label>
        ))}
      </RadioGroup>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setTheme('light')}>
          Light
        </Button>
        <Button size="sm" variant="outline" onClick={() => setTheme('dark')}>
          Dark
        </Button>
        <Button size="sm" variant="outline" onClick={() => setTheme('system')}>
          Reset
        </Button>
      </div>
    </div>
  );
}
