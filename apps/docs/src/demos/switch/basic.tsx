'use client';

import { FieldDescription, FieldLabel, FieldRoot, Switch } from '@noksha-ui/react';
import * as React from 'react';

export default function SwitchBasic() {
  const [notify, setNotify] = React.useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot orientation="horizontal">
        <Switch checked={notify} onCheckedChange={setNotify} />
        <div>
          <FieldLabel>Deploy notifications</FieldLabel>
          <FieldDescription>Applies the moment you flip it — no Save button.</FieldDescription>
        </div>
      </FieldRoot>

      <div className="flex items-center gap-4">
        <Switch size="sm" defaultChecked />
        <Switch size="md" defaultChecked />
        <Switch size="lg" defaultChecked />
        <Switch size="lg" defaultChecked tone="success" />
        <Switch size="lg" disabled defaultChecked />
      </div>
    </div>
  );
}
