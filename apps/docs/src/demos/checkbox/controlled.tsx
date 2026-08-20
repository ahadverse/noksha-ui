'use client';

import { Button, Checkbox, FieldLabel, FieldRoot } from '@noksha-ui/react';
import * as React from 'react';

const FILES = ['index.ts', 'button.tsx', 'button.test.tsx', 'button.stories.tsx'];

export default function CheckboxControlled() {
  const [checked, setChecked] = React.useState<boolean[]>(FILES.map(() => false));

  function set(index: number, value: boolean) {
    setChecked((current) => current.map((v, i) => (i === index ? value : v)));
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-2">
        {FILES.map((file, index) => (
          <FieldRoot key={file} orientation="horizontal">
            <Checkbox checked={checked[index]} onCheckedChange={(value) => set(index, value)} />
            <FieldLabel>{file}</FieldLabel>
          </FieldRoot>
        ))}
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setChecked(FILES.map(() => true))}>
          Select all
        </Button>
        <Button size="sm" variant="outline" onClick={() => setChecked(FILES.map(() => false))}>
          Clear
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setChecked((current) => current.map((v) => !v))}
        >
          Invert
        </Button>
      </div>
    </div>
  );
}
