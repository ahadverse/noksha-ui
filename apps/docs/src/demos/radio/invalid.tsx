'use client';

import { Button, FieldError, FieldLabel, FieldRoot, Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const PLANS = ['hobby', 'pro', 'team'];

export default function RadioInvalid() {
  const [plan, setPlan] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const invalid = submitted && plan === '';

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <FieldRoot invalid={invalid} required>
        <FieldLabel>Choose a plan</FieldLabel>
        <RadioGroup value={plan} onValueChange={setPlan} className="gap-2 pt-1">
          {PLANS.map((option) => (
            <div key={option} className="flex items-center gap-2.5">
              <Radio value={option} />
              <span className="text-fg text-sm capitalize">{option}</span>
            </div>
          ))}
        </RadioGroup>
        <FieldError>Pick a plan before continuing.</FieldError>
      </FieldRoot>
      <Button type="submit" fullWidth>
        Continue
      </Button>
    </form>
  );
}
