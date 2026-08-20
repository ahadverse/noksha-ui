'use client';

import { Button, Checkbox, FieldError, FieldLabel, FieldRoot } from '@noksha-ui/react';
import * as React from 'react';

export default function CheckboxInvalid() {
  const [checked, setChecked] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const invalid = submitted && !checked;

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <FieldRoot invalid={invalid} required>
        <div className="flex items-start gap-2.5">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <FieldLabel>I agree to the terms of service</FieldLabel>
        </div>
        <FieldError>You must accept the terms before continuing.</FieldError>
      </FieldRoot>
      <Button type="submit" fullWidth>
        Continue
      </Button>
    </form>
  );
}
