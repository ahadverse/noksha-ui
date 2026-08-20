'use client';

import { Button, Checkbox, FieldLabel, FieldRoot } from '@noksha-ui/react';
import * as React from 'react';

const TOPICS = ['Releases', 'Security', 'Community'];

export default function CheckboxForm() {
  const [result, setResult] = React.useState<string[] | null>(null);

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setResult(data.getAll('topics') as string[]);
      }}
    >
      <div className="flex flex-col gap-2">
        {TOPICS.map((topic) => (
          <FieldRoot key={topic} orientation="horizontal">
            <Checkbox name="topics" value={topic} defaultChecked={topic === 'Releases'} />
            <FieldLabel>{topic}</FieldLabel>
          </FieldRoot>
        ))}
      </div>
      <Button type="submit">Save preferences</Button>
      {result ? (
        <p className="text-fg-muted text-sm">
          Submitted: {result.length > 0 ? result.join(', ') : 'none'}
        </p>
      ) : null}
    </form>
  );
}
