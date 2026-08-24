import { Input, Spinner } from '@noksha-ui/react';
import type { ReactNode } from 'react';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </div>
  );
}

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export default function InputStates() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2">
      <Cell label="Default">
        <Input placeholder="Default" className="w-56" />
      </Cell>

      <Cell label="Hover (try it)">
        <Input placeholder="Hover me" className="w-56" />
      </Cell>

      <Cell label="Focus (simulated)">
        <Input
          placeholder="Focused"
          className="w-56 border-(--noksha-border-focus) outline-(length:--noksha-ring-width) outline-offset-(--noksha-ring-offset) outline-(--noksha-ring)"
        />
      </Cell>

      <Cell label="Disabled">
        <Input placeholder="Disabled" disabled className="w-56" />
      </Cell>

      <Cell label="Read-only">
        <Input readOnly defaultValue="Can't edit this" className="w-56" />
      </Cell>

      <Cell label="Invalid">
        <Input invalid defaultValue="not-an-email" className="w-56" />
      </Cell>

      <Cell label="Loading">
        <Input
          readOnly
          placeholder="Checking…"
          endIcon={<Spinner variant="ring" size="xs" />}
          className="w-56"
        />
      </Cell>

      <Cell label="Success">
        <Input
          readOnly
          defaultValue="jane@doe.com"
          endIcon={
            <span className="text-(--noksha-success-solid)">
              <CheckIcon />
            </span>
          }
          className="w-56"
        />
      </Cell>
    </div>
  );
}
