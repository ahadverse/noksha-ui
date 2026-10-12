'use client';

import { Input, Spinner } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

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
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Default">
        <Input aria-label="Default" placeholder="Default" />
      </DemoTile>

      <DemoTile label="Hover (try it)">
        <Input aria-label="Hover" placeholder="Hover me" />
      </DemoTile>

      <DemoTile label="Focus (simulated)">
        <Input
          aria-label="Focused"
          placeholder="Focused"
          className="border-(--noksha-border-focus) outline-(length:--noksha-ring-width) outline-offset-(--noksha-ring-offset) outline-(--noksha-ring)"
        />
      </DemoTile>

      <DemoTile label="Disabled">
        <Input aria-label="Disabled" placeholder="Disabled" disabled />
      </DemoTile>

      <DemoTile label="Read-only">
        <Input aria-label="Read-only" readOnly defaultValue="Can't edit this" />
      </DemoTile>

      <DemoTile label="Invalid">
        <Input aria-label="Email" invalid defaultValue="not-an-email" />
      </DemoTile>

      <DemoTile label="Loading">
        <Input
          aria-label="Username"
          readOnly
          placeholder="Checking…"
          endIcon={<Spinner variant="ring" size="xs" />}
        />
      </DemoTile>

      <DemoTile label="Success">
        <Input
          aria-label="Email"
          readOnly
          defaultValue="jane@doe.com"
          endIcon={
            <span className="text-(--noksha-success-solid)">
              <CheckIcon />
            </span>
          }
        />
      </DemoTile>
    </div>
  );
}
