'use client';

import { Field, Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const PLANS = [
  { value: 'hobby', label: 'Hobby', hint: 'Free forever, 1 project' },
  { value: 'pro', label: 'Pro', hint: '$20/month, unlimited projects' },
  { value: 'team', label: 'Team', hint: '$60/month, shared workspaces' },
];

export default function RadioBasic() {
  const [plan, setPlan] = React.useState('pro');

  return (
    <RadioGroup value={plan} onValueChange={setPlan} className="w-full max-w-sm gap-3">
      {PLANS.map((option) => (
        <Field.Root key={option.value} orientation="horizontal">
          <Radio value={option.value} />
          <div>
            <Field.Label>{option.label}</Field.Label>
            <Field.Description>{option.hint}</Field.Description>
          </div>
        </Field.Root>
      ))}
    </RadioGroup>
  );
}
