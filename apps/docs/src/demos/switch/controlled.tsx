'use client';

import { Button, FieldLabel, FieldRoot, Switch } from '@noksha-ui/react';
import * as React from 'react';

const PERMISSIONS = ['Read', 'Write', 'Delete', 'Admin'];

export default function SwitchControlled() {
  const [enabled, setEnabled] = React.useState<boolean[]>(PERMISSIONS.map((_, i) => i === 0));

  function set(index: number, value: boolean) {
    setEnabled((current) => current.map((v, i) => (i === index ? value : v)));
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-2">
        {PERMISSIONS.map((permission, index) => (
          <FieldRoot key={permission} orientation="horizontal">
            <Switch checked={enabled[index]} onCheckedChange={(value) => set(index, value)} />
            <FieldLabel>{permission}</FieldLabel>
          </FieldRoot>
        ))}
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setEnabled(PERMISSIONS.map(() => true))}>
          Enable all
        </Button>
        <Button size="sm" variant="outline" onClick={() => setEnabled(PERMISSIONS.map(() => false))}>
          Clear
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setEnabled((current) => current.map((v) => !v))}
        >
          Invert
        </Button>
      </div>
    </div>
  );
}
