'use client';

import { Button, Input } from '@noksha-ui/react';
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

const OTP_SLOTS = ['first', 'second', 'third', 'fourth'];
const OTP_LENGTH = OTP_SLOTS.length;
const UNDERLINE_OTP_SLOTS = ['u0', 'u1', 'u2', 'u3', 'u4', 'u5'];
const PILL_OTP_SLOTS = ['p0', 'p1', 'p2', 'p3'];
const GROUPED_OTP_SLOTS = ['g0', 'g1', 'g2', 'g3', 'g4', 'g5'];
const GROUPED_OTP_CELL_CLASSES =
  'h-11 w-9 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) text-center font-semibold text-lg outline-none focus:border-(--noksha-accent-solid)';
const AUTOFILL_OTP_LENGTH = 6;
const AUTOFILL_OTP_SLOTS = ['a0', 'a1', 'a2', 'a3', 'a4', 'a5'];
const TYPEWRITER_WORDS = ['Search components…', 'Search demos…', 'Search the docs…'];

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-2.5">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </div>
  );
}

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m16.5 16.5 4 4" strokeLinecap="round" />
  </svg>
);

const MicIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);

function useOtpDigits(length: number) {
  const [values, setValues] = React.useState<string[]>(() => Array(length).fill(''));
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1);
    setValues((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });
    if (digit && index < length - 1) refs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace' && !values[index] && index > 0) refs.current[index - 1]?.focus();
  }

  function bindRef(index: number) {
    return (el: HTMLInputElement | null) => {
      refs.current[index] = el;
    };
  }

  return { values, handleChange, handleKeyDown, bindRef };
}

function OtpField() {
  const { values, handleChange, handleKeyDown, bindRef } = useOtpDigits(OTP_LENGTH);

  return (
    <Cell label="Verification code">
      <div className="flex gap-2">
        {values.map((digit, index) => (
          <Input
            key={OTP_SLOTS[index]}
            ref={bindRef(index)}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${index + 1}`}
            className="w-11 text-center text-lg font-semibold"
          />
        ))}
      </div>
    </Cell>
  );
}

function UnderlineOtpField() {
  const { values, handleChange, handleKeyDown, bindRef } = useOtpDigits(UNDERLINE_OTP_SLOTS.length);

  return (
    <Cell label="Underline OTP">
      <div className="flex gap-3">
        {values.map((digit, index) => (
          <input
            key={UNDERLINE_OTP_SLOTS[index]}
            ref={bindRef(index)}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${index + 1}`}
            className="h-9 w-6 border-0 border-b-2 border-(--noksha-border-default) bg-transparent text-center font-semibold text-(--noksha-fg-default) text-lg outline-none transition-colors focus:border-(--noksha-accent-solid)"
          />
        ))}
      </div>
    </Cell>
  );
}

function PillOtpField() {
  const { values, handleChange, handleKeyDown, bindRef } = useOtpDigits(PILL_OTP_SLOTS.length);

  return (
    <Cell label="Pill OTP">
      <div className="flex gap-2.5">
        {values.map((digit, index) => (
          <input
            key={PILL_OTP_SLOTS[index]}
            ref={bindRef(index)}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${index + 1}`}
            className={`size-11 rounded-full border text-center font-semibold text-lg outline-none transition-all duration-200 ${
              digit
                ? 'scale-110 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) shadow-[0_0_0_4px_var(--noksha-accent-subtle)]'
                : 'border-(--noksha-border-default) bg-(--noksha-bg-surface) text-(--noksha-fg-default) focus:border-(--noksha-accent-solid)'
            }`}
          />
        ))}
      </div>
    </Cell>
  );
}

function AutofillOtpField() {
  const [value, setValue] = React.useState('');
  const digits = Array.from({ length: AUTOFILL_OTP_LENGTH }, (_, i) => value[i] ?? '');

  return (
    <Cell label="Autofill OTP">
      <div className="relative flex gap-2">
        {digits.map((digit, index) => (
          <span
            key={AUTOFILL_OTP_SLOTS[index]}
            className={`flex size-10 items-center justify-center gap-px rounded-(--noksha-radius-md) border font-semibold text-lg ${
              index === value.length
                ? 'border-(--noksha-accent-solid) shadow-[0_0_0_3px_var(--noksha-accent-subtle)]'
                : 'border-(--noksha-border-default)'
            } bg-(--noksha-bg-surface) text-(--noksha-fg-default)`}
          >
            {digit}
            {index === value.length ? (
              <span className="h-5 w-px animate-pulse bg-(--noksha-accent-solid)" />
            ) : null}
          </span>
        ))}
        <input
          value={value}
          onChange={(event) =>
            setValue(event.target.value.replace(/\D/g, '').slice(0, AUTOFILL_OTP_LENGTH))
          }
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={AUTOFILL_OTP_LENGTH}
          aria-label="Verification code"
          className="absolute inset-0 h-full w-full cursor-text opacity-0"
        />
      </div>
    </Cell>
  );
}

function GroupedOtpField() {
  const { values, handleChange, handleKeyDown, bindRef } = useOtpDigits(GROUPED_OTP_SLOTS.length);
  const filledCount = values.filter(Boolean).length;

  return (
    <Cell label="Grouped OTP">
      <div className="flex flex-col items-center gap-2.5">
        <div className="flex items-center gap-2">
          {values.slice(0, 3).map((digit, index) => (
            <input
              key={GROUPED_OTP_SLOTS[index]}
              ref={bindRef(index)}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit ${index + 1}`}
              className={GROUPED_OTP_CELL_CLASSES}
            />
          ))}
          <span className="text-(--noksha-fg-subtle)">–</span>
          {values.slice(3).map((digit, i) => {
            const index = i + 3;
            return (
              <input
                key={GROUPED_OTP_SLOTS[index]}
                ref={bindRef(index)}
                value={digit}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                inputMode="numeric"
                maxLength={1}
                aria-label={`Digit ${index + 1}`}
                className={GROUPED_OTP_CELL_CLASSES}
              />
            );
          })}
        </div>
        <div className="h-1 w-full max-w-52 overflow-hidden rounded-full bg-(--noksha-bg-subtle)">
          <div
            className="h-full rounded-full bg-(--noksha-accent-solid) transition-[width] duration-200 ease-out"
            style={{ width: `${(filledCount / GROUPED_OTP_SLOTS.length) * 100}%` }}
          />
        </div>
      </div>
    </Cell>
  );
}

function ShortcutField() {
  return (
    <Cell label="Shortcut hint">
      <Input
        placeholder="Quick search"
        startIcon={<SearchIcon />}
        endIcon={
          <kbd className="rounded border border-(--noksha-border-default) bg-(--noksha-bg-subtle) px-1.5 py-0.5 font-mono text-[0.65rem] text-(--noksha-fg-muted)">
            ⌘K
          </kbd>
        }
        className="w-full"
      />
    </Cell>
  );
}

function LiquidMeterField() {
  const max = 60;
  const [value, setValue] = React.useState('Ship something small today.');
  const percent = Math.min(100, (value.length / max) * 100);

  return (
    <Cell label="Length meter">
      <div className="w-full">
        <Input
          value={value}
          maxLength={max + 20}
          onChange={(event) => setValue(event.target.value)}
          className="rounded-b-none border-b-0"
        />
        <div className="h-1 w-full overflow-hidden rounded-b-(--noksha-radius-md) bg-(--noksha-bg-subtle)">
          <div
            className="h-full rounded-b-(--noksha-radius-md) bg-(--noksha-accent-solid) transition-[width] duration-200 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </Cell>
  );
}

function TiltField() {
  return (
    <Cell label="Tilts on focus">
      <div className="w-full [perspective:600px]">
        <div className="w-full rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) p-4 shadow-(--noksha-shadow-sm) transition-transform duration-300 [transform-style:preserve-3d] focus-within:[transform:rotateX(6deg)_rotateY(-6deg)] focus-within:shadow-(--noksha-shadow-lg)">
          <Input
            placeholder="Focus me"
            className="border-0 bg-transparent px-0 focus-visible:outline-none"
          />
        </div>
      </div>
    </Cell>
  );
}

function VoiceField() {
  const [listening, setListening] = React.useState(false);
  return (
    <Cell label="Voice input">
      <div className={GROUP_CLASSES}>
        <Input
          readOnly
          placeholder={listening ? 'Listening…' : 'Tap the mic to speak'}
          className={GROUP_INPUT_CLASSES}
        />
        <span className="relative inline-flex">
          <Button
            type="button"
            variant="ghost"
            tone={listening ? 'accent' : 'neutral'}
            iconOnly
            icon={<MicIcon />}
            aria-label={listening ? 'Stop voice input' : 'Start voice input'}
            onClick={() => setListening((value) => !value)}
            className={GROUP_BUTTON_CLASSES}
          />
          {listening ? (
            <span className="pointer-events-none absolute top-1.5 right-1.5 size-2 animate-ping rounded-full bg-(--noksha-accent-solid)" />
          ) : null}
        </span>
      </div>
    </Cell>
  );
}

function TypewriterField() {
  const [index, setIndex] = React.useState(0);
  const [focused, setFocused] = React.useState(false);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % TYPEWRITER_WORDS.length),
      2200,
    );
    return () => clearInterval(timer);
  }, []);

  const showHint = !focused && value === '';

  return (
    <Cell label="Rotating placeholder">
      <div className="relative w-full">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          startIcon={<SearchIcon />}
        />
        <span
          className={`pointer-events-none absolute inset-y-0 left-9 flex items-center text-(--noksha-fg-subtle) text-sm transition-opacity duration-300 ${
            showHint ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {TYPEWRITER_WORDS[index]}
        </span>
      </div>
    </Cell>
  );
}

function VolumeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z"
      />
      <path
        fill="currentColor"
        d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z"
      />
    </svg>
  );
}

const THUMB_FILL_CLASSES =
  '[&::-moz-range-thumb]:h-0 [&::-moz-range-thumb]:w-0 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[-200px_0_0_200px_var(--noksha-accent-solid)] [&::-webkit-slider-thumb]:h-0 [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[-200px_0_0_200px_var(--noksha-accent-solid)]';

function VolumeSliderField() {
  return (
    <Cell label="Volume dial">
      <label className="relative flex h-36 w-10 items-center justify-center">
        <input
          type="range"
          aria-label="Volume"
          defaultValue={40}
          className={`h-10 w-36 shrink-0 -rotate-90 cursor-pointer appearance-none overflow-hidden rounded-(--noksha-radius-md) bg-neutral-800 outline-none ${THUMB_FILL_CLASSES}`}
        />
        <VolumeIcon className="pointer-events-none absolute inset-0 m-auto size-5 text-neutral-800" />
      </label>
    </Cell>
  );
}

function VolumeBarField() {
  return (
    <Cell label="Volume bar">
      <label className="group flex w-full cursor-pointer flex-row-reverse items-center">
        <VolumeIcon className="mr-3 size-5 shrink-0 text-neutral-500" />
        <input
          type="range"
          aria-label="Volume"
          defaultValue={65}
          className={`h-1.5 w-full cursor-pointer appearance-none overflow-hidden rounded-full bg-neutral-800 outline-none transition-[height] duration-100 group-hover:h-3 ${THUMB_FILL_CLASSES}`}
        />
      </label>
    </Cell>
  );
}

export default function InputUnique() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">
      <OtpField />
      <UnderlineOtpField />
      <PillOtpField />
      <AutofillOtpField />
      <GroupedOtpField />
      <ShortcutField />
      <LiquidMeterField />
      <TiltField />
      <VoiceField />
      <TypewriterField />
      <VolumeSliderField />
      <VolumeBarField />
    </div>
  );
}
