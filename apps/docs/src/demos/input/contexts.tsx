'use client';

import { Button, FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
      {children}
    </div>
  );
}

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m16.5 16.5 4 4" strokeLinecap="round" />
  </svg>
);

const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12 20 4l-7 16-2.5-7L4 12Z" />
  </svg>
);

const CardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M2.5 10h19" />
  </svg>
);

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

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

function NavbarSearch() {
  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-4 py-3 shadow-(--noksha-shadow-xs)">
      <span className="font-semibold text-(--noksha-fg-default) text-sm">Noksha</span>
      <Input
        placeholder="Search"
        startIcon={<SearchIcon />}
        endIcon={
          <kbd className="rounded border border-(--noksha-border-default) bg-(--noksha-bg-subtle) px-1.5 py-0.5 font-mono text-[0.65rem] text-(--noksha-fg-muted)">
            ⌘K
          </kbd>
        }
        size="sm"
        className="max-w-56 rounded-full"
      />
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) font-medium text-(--noksha-accent-fg) text-xs">
        JD
      </span>
    </div>
  );
}

function ChatComposer() {
  const nextId = React.useRef(1);
  const [messages, setMessages] = React.useState([
    { id: 0, text: 'Got the new field docs live 🎉' },
  ]);
  const [draft, setDraft] = React.useState('');

  function send() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { id: nextId.current++, text: trimmed }]);
    setDraft('');
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) p-3">
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <span
            key={message.id}
            className="w-fit max-w-[85%] rounded-(--noksha-radius-lg) bg-(--noksha-bg-subtle) px-3 py-1.5 text-(--noksha-fg-default) text-sm"
          >
            {message.text}
          </span>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
        className="flex items-center gap-1 rounded-full border border-(--noksha-border-default) bg-(--noksha-bg-surface) p-1 focus-within:border-(--noksha-border-focus) focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset) focus-within:outline-(--noksha-ring)"
      >
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Message"
          className="border-0 bg-transparent focus-visible:outline-none"
        />
        <Button
          type="submit"
          shape="circle"
          iconOnly
          variant="solid"
          tone="accent"
          icon={<SendIcon />}
          aria-label="Send"
        />
      </form>
    </div>
  );
}

function LoginCard() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) p-5 shadow-(--noksha-shadow-sm)">
      <div>
        <h3 className="font-semibold text-(--noksha-fg-default) text-sm">Welcome back</h3>
        <p className="text-(--noksha-fg-muted) text-xs">Sign in to continue to Noksha</p>
      </div>
      <FieldRoot>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="jane@doe.com" />
      </FieldRoot>
      <FieldRoot>
        <FieldLabel>Password</FieldLabel>
        <Input type="password" placeholder="••••••••" />
      </FieldRoot>
      <Button type="submit" variant="solid" tone="accent" fullWidth>
        Sign in
      </Button>
    </div>
  );
}

function CardNumberField() {
  const [value, setValue] = React.useState('');
  const brand = value.startsWith('4') ? 'visa' : value.startsWith('5') ? 'mastercard' : null;

  return (
    <FieldRoot>
      <FieldLabel>Card number</FieldLabel>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value.replace(/[^\d\s]/g, ''))}
        placeholder="4242 4242 4242 4242"
        inputMode="numeric"
        endIcon={
          brand === 'visa' ? (
            <span className="font-bold text-(--noksha-info-solid) text-[0.65rem] italic">VISA</span>
          ) : brand === 'mastercard' ? (
            <span className="flex -space-x-1.5">
              <span className="size-3.5 rounded-full bg-(--noksha-danger-solid)" />
              <span className="size-3.5 rounded-full bg-(--noksha-warning-solid)" />
            </span>
          ) : (
            <CardIcon />
          )
        }
      />
      <FieldDescription>
        The brand mark updates as soon as the first digit matches.
      </FieldDescription>
    </FieldRoot>
  );
}

const COMMANDS = [
  'Create new project',
  'Invite teammate',
  'Open settings',
  'Switch workspace',
  'View billing',
];

function CommandPalette() {
  const [value, setValue] = React.useState('');
  const matches = value
    ? COMMANDS.filter((command) => command.toLowerCase().includes(value.toLowerCase()))
    : COMMANDS;

  return (
    <div className="w-full overflow-hidden rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) shadow-(--noksha-shadow-lg)">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type a command…"
        startIcon={<SearchIcon />}
        variant="ghost"
        className="rounded-none border-b border-(--noksha-border-default)"
      />
      <ul className="flex max-h-40 flex-col overflow-y-auto p-1.5">
        {matches.length ? (
          matches.map((command) => (
            <li
              key={command}
              className="cursor-pointer rounded-(--noksha-radius-sm) px-3 py-2 text-(--noksha-fg-default) text-sm transition-colors hover:bg-(--noksha-bg-subtle)"
            >
              {command}
            </li>
          ))
        ) : (
          <li className="px-3 py-2 text-(--noksha-fg-muted) text-sm">No matching commands</li>
        )}
      </ul>
    </div>
  );
}

function InlineEdit() {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState('Q3 Growth Roadmap');
  const [draft, setDraft] = React.useState(value);

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => {
          setDraft(value);
          setEditing(true);
        }}
        className="group flex items-center gap-2 rounded-(--noksha-radius-md) px-2 py-1.5 text-left hover:bg-(--noksha-bg-subtle)"
      >
        <span className="font-medium text-(--noksha-fg-default) text-sm">{value}</span>
        <span className="text-(--noksha-fg-subtle) text-xs opacity-0 transition-opacity group-hover:opacity-100">
          Edit
        </span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        autoFocus
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        size="sm"
        className="w-48"
      />
      <Button
        type="button"
        variant="solid"
        tone="accent"
        size="sm"
        iconOnly
        icon={<CheckIcon />}
        aria-label="Save"
        onClick={() => {
          setValue(draft);
          setEditing(false);
        }}
      />
      <Button
        type="button"
        variant="ghost"
        tone="neutral"
        size="sm"
        iconOnly
        icon={<XIcon />}
        aria-label="Cancel"
        onClick={() => setEditing(false)}
      />
    </div>
  );
}

export default function InputContexts() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Section label="Navbar search">
        <NavbarSearch />
      </Section>
      <Section label="Chat composer">
        <ChatComposer />
      </Section>
      <Section label="Login card">
        <LoginCard />
      </Section>
      <Section label="Credit card">
        <CardNumberField />
      </Section>
      <Section label="Command palette">
        <CommandPalette />
      </Section>
      <Section label="Inline edit">
        <InlineEdit />
      </Section>
    </div>
  );
}
