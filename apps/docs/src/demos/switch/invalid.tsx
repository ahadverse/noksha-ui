'use client';

import { Button, FieldError, FieldLabel, FieldRoot, Switch } from '@noksha-ui/react';
import * as React from 'react';

export default function SwitchInvalid() {
  const [enabled, setEnabled] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const invalid = submitted && !enabled;

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <FieldRoot invalid={invalid} required>
        <div className="flex items-center gap-2.5">
          <Switch checked={enabled} onCheckedChange={setEnabled} />
          <FieldLabel>Two-factor authentication</FieldLabel>
        </div>
        <FieldError>Turn this on before continuing.</FieldError>
      </FieldRoot>
      <Button type="submit" fullWidth>
        Continue
      </Button>
    </form>
  );
}
