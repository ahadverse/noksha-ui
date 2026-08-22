'use client';

import { Button, FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

function formatUsPhone(digits: string) {
  const d = digits.slice(0, 10);
  const parts = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 10)].filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return `(${parts[0]}`;
  if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`;
  return `(${parts[0]}) ${parts[1]}-${parts[2]}`;
}

const RESEND_SECONDS = 30;
const CODE_LENGTH = 6;

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-info-subtle) text-(--noksha-info-fg) [&>svg]:size-3.5';
const GROUP_CLASSES = [
  'flex items-stretch overflow-hidden rounded-(--noksha-radius-md)',
  'border border-(--noksha-border-default) bg-(--noksha-bg-surface)',
  'focus-within:border-(--noksha-border-focus)',
  'focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset)',
  'focus-within:outline-(--noksha-ring)',
].join(' ');
const PHONE_INPUT_CLASSES = 'border-0 bg-transparent focus-visible:outline-none';

const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-info-solid) bg-(--noksha-info-subtle)/25 hover:border-(--noksha-info-solid) hover:bg-(--noksha-info-subtle)/40';
const OTP_BOX_CLASSES = [
  'w-9 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface)',
  'text-center text-lg font-semibold tabular-nums',
  '[appearance:textfield] focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset) focus-visible:outline-(--noksha-ring) focus-visible:border-(--noksha-border-focus)',
  '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
].join(' ');

const MessageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 5h16v11H8l-4 4Z" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
);

const PhoneCallIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 3h4l1.5 4.5L9 9.5a12 12 0 0 0 5.5 5.5l2-2.5L21 14v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" />
  </svg>
);

const BellIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 13.5 6 9Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

function useCountdown() {
  const [secondsLeft, setSecondsLeft] = React.useState(0);
  React.useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);
  return [secondsLeft, setSecondsLeft] as const;
}

export default function FieldVerify() {
  const [value, setValue] = React.useState('');
  const [secondsLeft, setSecondsLeft] = useCountdown();
  const digits = value.replace(/\D/g, '');
  const canSend = digits.length === 10 && secondsLeft === 0;

  const [email, setEmail] = React.useState('');
  const [emailSent, setEmailSent] = React.useState(false);
  const [code, setCode] = React.useState<string[]>(Array(CODE_LENGTH).fill(''));
  const codeRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const emailValid = email.includes('@') && email.split('@')[1]?.includes('.');

  const [callValue, setCallValue] = React.useState('');
  const [callSecondsLeft, setCallSecondsLeft] = useCountdown();
  const callDigits = callValue.replace(/\D/g, '');
  const canCall = callDigits.length === 10 && callSecondsLeft === 0;
  const callPercent = callSecondsLeft > 0 ? (callSecondsLeft / RESEND_SECONDS) * 100 : 0;

  const [pushSecondsLeft, setPushSecondsLeft] = useCountdown();

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <MessageIcon />
          </span>
          <FieldLabel>Verify by text</FieldLabel>
        </div>
        <div className={GROUP_CLASSES}>
          <Input
            type="tel"
            value={value}
            placeholder="(555) 000-0000"
            onChange={(event) => setValue(formatUsPhone(event.target.value.replace(/\D/g, '')))}
            className={PHONE_INPUT_CLASSES}
          />
          <Button
            type="button"
            tone="info"
            disabled={!canSend}
            onClick={() => setSecondsLeft(RESEND_SECONDS)}
            className="rounded-none"
          >
            {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : 'Send code'}
          </Button>
        </div>
        <FieldDescription>
          {secondsLeft > 0 ? `A code was sent to ${value}.` : 'Enter 10 digits to unlock the send button.'}
        </FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <MailIcon />
          </span>
          <FieldLabel htmlFor="verify-email">Verify by email</FieldLabel>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            id="verify-email"
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(event) => setEmail(event.target.value)}
            className={ACCENT_INPUT_CLASSES}
          />
          <Button
            type="button"
            variant="solid"
            tone="info"
            fullWidth
            disabled={!emailValid}
            onClick={() => {
              setEmailSent(true);
              setCode(Array(CODE_LENGTH).fill(''));
              codeRefs.current[0]?.focus();
            }}
          >
            Send code
          </Button>
          {emailSent ? (
            <div className="flex gap-2">
              {code.map((digit, index) => (
                <Input
                  // biome-ignore lint/suspicious/noArrayIndexKey: the boxes never reorder
                  key={index}
                  ref={(el) => {
                    codeRefs.current[index] = el;
                  }}
                  id={`verify-email-code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
                  onChange={(event) => {
                    const next = event.target.value.replace(/\D/g, '').slice(-1);
                    setCode((current) => current.map((c, i) => (i === index ? next : c)));
                    if (next && index < CODE_LENGTH - 1) codeRefs.current[index + 1]?.focus();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Backspace' && !digit && index > 0) {
                      codeRefs.current[index - 1]?.focus();
                    }
                  }}
                  className={OTP_BOX_CLASSES}
                />
              ))}
            </div>
          ) : null}
        </div>
        <FieldDescription>
          {emailSent ? 'Enter the 6-digit code — each box moves focus to the next.' : 'A valid address unlocks the send button.'}
        </FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PhoneCallIcon />
          </span>
          <FieldLabel htmlFor="verify-call-digits">Verify by call</FieldLabel>
        </div>
        <div className="flex items-center gap-3">
          <Input
            id="verify-call-digits"
            type="tel"
            value={callValue}
            placeholder="(555) 000-0000"
            onChange={(event) => setCallValue(formatUsPhone(event.target.value.replace(/\D/g, '')))}
            className="w-40"
          />
          <div
            className="shrink-0 rounded-full p-[3px]"
            style={{
              background:
                callSecondsLeft > 0
                  ? `conic-gradient(var(--noksha-warning-solid) ${callPercent}%, var(--noksha-bg-subtle) ${callPercent}% 100%)`
                  : 'var(--noksha-bg-subtle)',
            }}
          >
            <Button
              type="button"
              shape="circle"
              variant="solid"
              tone="neutral"
              iconOnly
              icon={<PhoneCallIcon />}
              aria-label="Call me with a code"
              disabled={!canCall}
              onClick={() => setCallSecondsLeft(RESEND_SECONDS)}
            />
          </div>
        </div>
        <FieldDescription>
          {callSecondsLeft > 0 ? `Calling in — ${callSecondsLeft}s left on the ring.` : 'The ring around the button is the countdown.'}
        </FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <BellIcon />
          </span>
          <FieldLabel>Verify by app</FieldLabel>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-(--noksha-fg-default) text-sm">iPhone 16 Pro · ending in 04</span>
          <Button
            type="button"
            variant="link"
            tone="info"
            disabled={pushSecondsLeft > 0}
            onClick={() => setPushSecondsLeft(RESEND_SECONDS)}
          >
            {pushSecondsLeft > 0 ? `Sent — retry in ${pushSecondsLeft}s` : 'Send a push notification'}
          </Button>
        </div>
        <FieldDescription>No input at all — the device is already known.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
