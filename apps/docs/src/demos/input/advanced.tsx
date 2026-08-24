'use client';

import {
  Button,
  CopyButton,
  FieldDescription,
  FieldLabel,
  FieldRoot,
  Input,
  Spinner,
} from '@noksha-ui/react';
import * as React from 'react';

const GROUP_CLASSES = [
  'flex w-full items-stretch overflow-hidden rounded-(--noksha-radius-md)',
  'border border-(--noksha-border-default) bg-(--noksha-bg-surface)',
  'focus-within:border-(--noksha-border-focus)',
  'focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset)',
  'focus-within:outline-(--noksha-ring)',
].join(' ');
const GROUP_INPUT_CLASSES = 'border-0 bg-transparent focus-visible:outline-none';
const GROUP_BUTTON_CLASSES = 'shrink-0 rounded-none';

const MAX_BIO_LENGTH = 80;

const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 3l18 18" />
    <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17.5 17.5 0 0 1-3.2 4.1M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7c1.4 0 2.7-.3 3.8-.8" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
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

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m16.5 16.5 4 4" strokeLinecap="round" />
  </svg>
);

function PasswordField() {
  const [visible, setVisible] = React.useState(false);
  return (
    <FieldRoot>
      <FieldLabel>Password</FieldLabel>
      <div className={GROUP_CLASSES}>
        <Input
          type={visible ? 'text' : 'password'}
          defaultValue="hunter2blaze"
          className={GROUP_INPUT_CLASSES}
        />
        <Button
          type="button"
          variant="ghost"
          tone="neutral"
          iconOnly
          icon={visible ? <EyeOffIcon /> : <EyeIcon />}
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((value) => !value)}
          className={GROUP_BUTTON_CLASSES}
        />
      </div>
      <FieldDescription>The eye toggles the input's type, nothing else moves.</FieldDescription>
    </FieldRoot>
  );
}

function ClearableField() {
  const [value, setValue] = React.useState('Noksha UI');
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <FieldRoot>
      <FieldLabel>Project name</FieldLabel>
      <div className={GROUP_CLASSES}>
        <Input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={GROUP_INPUT_CLASSES}
        />
        <Button
          type="button"
          variant="ghost"
          tone="neutral"
          iconOnly
          icon={<XIcon />}
          aria-label="Clear"
          onClick={() => {
            setValue('');
            inputRef.current?.focus();
          }}
          className={`${GROUP_BUTTON_CLASSES} transition-opacity ${value ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        />
      </div>
      <FieldDescription>
        The clear button fades in only once there is something to clear.
      </FieldDescription>
    </FieldRoot>
  );
}

function CounterField() {
  const [value, setValue] = React.useState('Building interfaces, one component at a time.');
  const remaining = MAX_BIO_LENGTH - value.length;
  const nearLimit = remaining <= 15;

  return (
    <FieldRoot invalid={remaining < 0}>
      <FieldLabel>Bio</FieldLabel>
      <Input
        value={value}
        maxLength={MAX_BIO_LENGTH + 20}
        onChange={(event) => setValue(event.target.value)}
      />
      <div className="mt-1.5 flex justify-end">
        <span
          className={`text-xs tabular-nums transition-colors ${
            remaining < 0
              ? 'text-(--noksha-danger-fg)'
              : nearLimit
                ? 'text-(--noksha-warning-fg)'
                : 'text-(--noksha-fg-muted)'
          }`}
        >
          {remaining}
        </span>
      </div>
    </FieldRoot>
  );
}

function AvailabilityField() {
  const [value, setValue] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(next: string) {
    setValue(next);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!next) {
      setStatus('idle');
      return;
    }
    setStatus('checking');
    timerRef.current = setTimeout(() => {
      setStatus(next.toLowerCase() === 'noksha' ? 'taken' : 'available');
    }, 900);
  }

  return (
    <FieldRoot invalid={status === 'taken'}>
      <FieldLabel>Username</FieldLabel>
      <Input
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="noksha-ui"
        endIcon={
          status === 'checking' ? (
            <Spinner variant="ring" size="xs" />
          ) : status === 'available' ? (
            <span className="text-(--noksha-success-solid)">
              <CheckIcon />
            </span>
          ) : status === 'taken' ? (
            <span className="text-(--noksha-danger-solid)">
              <XIcon />
            </span>
          ) : null
        }
      />
      <FieldDescription>
        {status === 'checking'
          ? 'Checking availability…'
          : status === 'available'
            ? 'That username is free.'
            : status === 'taken'
              ? 'Already taken — try another.'
              : 'Debounced by 900ms, so a fast typist never sees it flicker.'}
      </FieldDescription>
    </FieldRoot>
  );
}

function CopyField() {
  return (
    <FieldRoot>
      <FieldLabel>API key</FieldLabel>
      <div className={GROUP_CLASSES}>
        <Input
          readOnly
          value="sk_live_51Hc9F2eZvKYlo2C"
          className={`${GROUP_INPUT_CLASSES} font-mono`}
        />
        <CopyButton
          value="sk_live_51Hc9F2eZvKYlo2C"
          label="Copy API key"
          variant="ghost"
          tone="neutral"
          className={GROUP_BUTTON_CLASSES}
        />
      </div>
      <FieldDescription>
        Read-only, with its own button rather than a click handler buried in an icon.
      </FieldDescription>
    </FieldRoot>
  );
}

const COMPONENTS = [
  'Button',
  'Checkbox',
  'Field',
  'Input',
  'Select',
  'Slider',
  'Spinner',
  'Switch',
];

function SearchField() {
  const [value, setValue] = React.useState('');
  const matches = value
    ? COMPONENTS.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : COMPONENTS;

  return (
    <FieldRoot>
      <FieldLabel>Search components</FieldLabel>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        startIcon={<SearchIcon />}
        placeholder="Search…"
      />
      <FieldDescription>
        {value
          ? `${matches.length} of ${COMPONENTS.length} match`
          : `${COMPONENTS.length} components`}
      </FieldDescription>
    </FieldRoot>
  );
}

export default function InputAdvanced() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <PasswordField />
      <ClearableField />
      <CounterField />
      <AvailabilityField />
      <CopyField />
      <SearchField />
    </div>
  );
}
