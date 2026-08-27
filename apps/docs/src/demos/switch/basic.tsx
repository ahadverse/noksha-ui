'use client';

import { Field, Switch } from '@noksha-ui/react';
import * as React from 'react';

export default function SwitchBasic() {
  const [notify, setNotify] = React.useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field.Root orientation="horizontal">
        <Switch checked={notify} onCheckedChange={setNotify} />
        <div>
          <Field.Label>Deploy notifications</Field.Label>
          <Field.Description>Applies the moment you flip it — no Save button.</Field.Description>
        </div>
      </Field.Root>

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
