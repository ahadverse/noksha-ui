'use client';

import { Button, FieldDescription, FieldError, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

function hoursOf(value: string) {
  return Number(value.split(':')[0] ?? 0);
}

function minutesOf(value: string) {
  return Number(value.split(':')[1] ?? 0);
}

function formatReadable(value: string) {
  if (!value) return null;
  const h = hoursOf(value);
  const m = minutesOf(value);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toValue(h: number, m: number) {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Reads a click's angle and radius off the dial: the outer half sets the
 * hour hand (12 positions), the inner half sets the minute hand (snapped to
 * 5-minute marks) — the same split a real analogue-picker uses so one dial
 * can carry both hands without them fighting over the same tap.
 */
function dialClickHandler(setValue: React.Dispatch<React.SetStateAction<string>>) {
  return (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const radius = Math.hypot(dx, dy);
    let angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (angle < 0) angle += 360;

    if (radius > rect.width * 0.28) {
      const hourMod12 = Math.round(angle / 30) % 12;
      setValue((current) => {
        const isPM = hoursOf(current) >= 12;
        return toValue(hourMod12 + (isPM ? 12 : 0), minutesOf(current));
      });
    } else {
      const minute = (Math.round(angle / 30) * 5) % 60;
      setValue((current) => toValue(hoursOf(current), minute));
    }
  };
}

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES = [
  'border border-(--noksha-border-subtle)',
  'border-s-4 border-s-(--noksha-accent-solid)',
  'bg-(--noksha-accent-subtle)/25',
  'hover:border-(--noksha-border-strong) hover:border-s-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40',
].join(' ');

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </svg>
);

const AlarmIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="13" r="7" />
    <path d="M12 10v3l2 1.5M5 4 3 6M19 4l2 2M8 2h8" />
  </svg>
);

const SunMoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 15 6-6 6 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

function DigitStepper({
  value,
  onIncrement,
  onDecrement,
  label,
}: {
  value: string;
  onIncrement: () => void;
  onDecrement: () => void;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        aria-label={`Increase ${label}`}
        onClick={onIncrement}
        className="flex size-6 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-inverse)/50 outline-none hover:bg-(--noksha-fg-inverse)/10 hover:text-(--noksha-fg-inverse) focus-visible:outline-2 focus-visible:outline-(--noksha-accent-solid)"
      >
        <ChevronUpIcon />
      </button>
      <span className="font-bold font-mono text-3xl text-(--noksha-fg-inverse) tabular-nums">{value}</span>
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        onClick={onDecrement}
        className="flex size-6 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-inverse)/50 outline-none hover:bg-(--noksha-fg-inverse)/10 hover:text-(--noksha-fg-inverse) focus-visible:outline-2 focus-visible:outline-(--noksha-accent-solid)"
      >
        <ChevronDownIcon />
      </button>
    </div>
  );
}

export default function FieldTime() {
  // 1. Plain — the original, now with a visible border on all sides.
  const [time, setTime] = React.useState('02:00');
  const outsideWindow = hoursOf(time) > 5;

  // 2. Gradient pill.
  const [time2, setTime2] = React.useState('09:30');

  // 3. Glass over a gradient card.
  const [time3, setTime3] = React.useState('18:00');

  // 4. Neon — dark, theme-adjustable, glow on focus.
  const [time4, setTime4] = React.useState('23:15');

  // 5. Digital clock — a dark LCD tile with independent hour/minute steppers.
  const [hour5, setHour5] = React.useState(7);
  const [minute5, setMinute5] = React.useState(45);

  // 6. AM/PM segmented — 12-hour steppers plus a two-button period toggle.
  const [hour6, setHour6] = React.useState(6);
  const [minute6, setMinute6] = React.useState(0);
  const [period6, setPeriod6] = React.useState<'AM' | 'PM'>('PM');
  const time6 = toValue(period6 === 'PM' ? (hour6 % 12) + 12 : hour6 % 12, minute6);

  // 7. Circular clock face — an analogue dial that mirrors a native input.
  const [time7, setTime7] = React.useState('10:10');
  const hour7 = hoursOf(time7) % 12;
  const minute7 = minutesOf(time7);
  const hourDeg = hour7 * 30 + minute7 * 0.5;
  const minuteDeg = minute7 * 6;

  // 8. Clock only — the dial is the whole field, full-size, nothing beside it.
  const [time8, setTime8] = React.useState('10:10');
  const hour8 = hoursOf(time8) % 12;
  const minute8 = minutesOf(time8);
  const hourDeg8 = hour8 * 30 + minute8 * 0.5;
  const minuteDeg8 = minute8 * 6;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot invalid={outsideWindow}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ClockIcon />
          </span>
          <FieldLabel>Daily backup time</FieldLabel>
        </div>
        <Input type="time" value={time} onChange={(event) => setTime(event.target.value)} className={ACCENT_INPUT_CLASSES} />
        <FieldDescription>{formatReadable(time)} — low-traffic hours run midnight to 5am.</FieldDescription>
        <FieldError>Backups outside midnight–5am can compete with live traffic.</FieldError>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ClockIcon />
          </span>
          <FieldLabel htmlFor="time-gradient">Meeting time</FieldLabel>
        </div>
        <div
          className="rounded-full p-[2px]"
          style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))' }}
        >
          <div className="flex items-center gap-2 rounded-full bg-(--noksha-bg-surface) px-4 py-2">
            <span className="text-(--noksha-accent-fg) [&>svg]:size-4">
              <ClockIcon />
            </span>
            <input
              id="time-gradient"
              type="time"
              value={time2}
              onChange={(event) => setTime2(event.target.value)}
              className="w-full min-w-0 bg-transparent text-(--noksha-fg-default) text-sm outline-none [&::-webkit-calendar-picker-indicator]:opacity-60"
            />
          </div>
        </div>
        <FieldDescription>{formatReadable(time2)} — same gradient ring as the date pickers.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ClockIcon />
          </span>
          <FieldLabel htmlFor="time-glass">Reminder time</FieldLabel>
        </div>
        <div
          className="rounded-2xl p-3"
          style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))' }}
        >
          <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 backdrop-blur-md transition-colors focus-within:border-white/50">
            <span className="text-white/80 [&>svg]:size-4">
              <ClockIcon />
            </span>
            <input
              id="time-glass"
              type="time"
              value={time3}
              onChange={(event) => setTime3(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none [color-scheme:dark]"
            />
          </div>
        </div>
        <FieldDescription>Frosted glass over a gradient — the trigger itself, not a card behind it.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <AlarmIcon />
          </span>
          <FieldLabel htmlFor="time-neon">Alarm time</FieldLabel>
        </div>
        <div
          className={
            'flex h-11 w-full items-center gap-2 rounded-(--noksha-radius-lg) border border-transparent bg-(--noksha-bg-inverse) px-4 text-sm ' +
            'transition-[box-shadow,border-color] focus-within:border-(--noksha-accent-solid) focus-within:shadow-[0_0_20px_-2px_var(--noksha-accent-solid)]'
          }
        >
          <span className="text-(--noksha-accent-solid) [&>svg]:size-4">
            <AlarmIcon />
          </span>
          <input
            id="time-neon"
            type="time"
            value={time4}
            onChange={(event) => setTime4(event.target.value)}
            className="w-full min-w-0 bg-transparent text-(--noksha-fg-inverse) outline-none [color-scheme:dark]"
          />
        </div>
        <FieldDescription>Focus the field and the border lights up — dark in both themes.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ClockIcon />
          </span>
          <FieldLabel>Digital clock</FieldLabel>
        </div>
        <div className="inline-flex w-fit items-center gap-3 rounded-(--noksha-radius-lg) bg-(--noksha-bg-inverse) px-5 py-3 shadow-(--noksha-shadow-md)">
          <DigitStepper
            label="hours"
            value={String(hour5).padStart(2, '0')}
            onIncrement={() => setHour5((h) => (h + 1) % 24)}
            onDecrement={() => setHour5((h) => (h + 23) % 24)}
          />
          <span className="font-bold font-mono text-3xl text-(--noksha-fg-inverse)/40">:</span>
          <DigitStepper
            label="minutes"
            value={String(minute5).padStart(2, '0')}
            onIncrement={() => setMinute5((m) => (m + 1) % 60)}
            onDecrement={() => setMinute5((m) => (m + 59) % 60)}
          />
        </div>
        <FieldDescription>An LCD tile with its own steppers — no native input in sight.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <SunMoonIcon />
          </span>
          <FieldLabel>Do-not-disturb until</FieldLabel>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2">
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={12}
              value={hour6}
              onChange={(event) => setHour6(clamp(Number(event.target.value) || 1, 1, 12))}
              className="w-6 border-0 bg-transparent text-center font-semibold text-(--noksha-fg-default) text-lg tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="font-semibold text-(--noksha-fg-muted) text-lg">:</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={59}
              value={String(minute6).padStart(2, '0')}
              onChange={(event) => setMinute6(clamp(Number(event.target.value) || 0, 0, 59))}
              className="w-6 border-0 bg-transparent text-center font-semibold text-(--noksha-fg-default) text-lg tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          <div className="inline-flex overflow-hidden rounded-(--noksha-radius-md) border border-(--noksha-border-default)">
            {(['AM', 'PM'] as const).map((option) => (
              <Button
                key={option}
                type="button"
                variant={period6 === option ? 'solid' : 'ghost'}
                tone={period6 === option ? 'accent' : 'neutral'}
                size="sm"
                aria-pressed={period6 === option}
                onClick={() => setPeriod6(option)}
                className="rounded-none"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        <FieldDescription>Silences notifications until {formatReadable(time6)}.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ClockIcon />
          </span>
          <FieldLabel htmlFor="time-dial">Session start</FieldLabel>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative size-16 shrink-0 rounded-full border border-(--noksha-border-default) bg-(--noksha-bg-surface) shadow-(--noksha-shadow-xs)">
            <span className="absolute top-1 left-1/2 h-1 w-px -translate-x-1/2 bg-(--noksha-fg-subtle)" />
            <span className="absolute right-1 top-1/2 h-px w-1 -translate-y-1/2 bg-(--noksha-fg-subtle)" />
            <span className="absolute bottom-1 left-1/2 h-1 w-px -translate-x-1/2 bg-(--noksha-fg-subtle)" />
            <span className="absolute top-1/2 left-1 h-px w-1 -translate-y-1/2 bg-(--noksha-fg-subtle)" />
            <span
              className="absolute top-1/2 left-1/2 h-4.5 w-0.5 origin-bottom rounded-full bg-(--noksha-fg-default)"
              style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }}
            />
            <span
              className="absolute top-1/2 left-1/2 h-6 w-0.5 origin-bottom rounded-full bg-(--noksha-accent-solid)"
              style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)` }}
            />
            <span className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-1.5 rounded-full bg-(--noksha-accent-solid)" />
          </div>
          <input
            id="time-dial"
            type="time"
            value={time7}
            onChange={(event) => setTime7(event.target.value)}
            className="min-w-0 flex-1 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2 text-(--noksha-fg-default) text-sm outline-none focus-visible:border-(--noksha-border-focus) focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset) focus-visible:outline-(--noksha-ring)"
          />
        </div>
        <FieldDescription>The hands move live — a real analogue readout, not a static icon.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ClockIcon />
          </span>
          <FieldLabel htmlFor="time-clock-only">Standup time</FieldLabel>
        </div>
        <div className="flex flex-col items-center gap-3">
          {/* biome-ignore lint/a11y/useSemanticElements: an analogue picker has no native element to defer to — the time input beneath it is the accessible source of truth */}
          <div
            role="slider"
            aria-label="Time"
            aria-valuetext={formatReadable(time8) ?? undefined}
            tabIndex={0}
            onClick={dialClickHandler(setTime8)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
                event.preventDefault();
                setTime8((current) => toValue(hoursOf(current), (minutesOf(current) + 5) % 60));
              } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
                event.preventDefault();
                setTime8((current) => toValue(hoursOf(current), (minutesOf(current) + 55) % 60));
              }
            }}
            className="relative size-36 shrink-0 cursor-pointer rounded-full border-2 border-(--noksha-border-default) bg-(--noksha-bg-surface) shadow-(--noksha-shadow-md) outline-none focus-visible:border-(--noksha-border-focus) focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset) focus-visible:outline-(--noksha-ring)"
          >
            <span className="pointer-events-none absolute inset-[28%] rounded-full border border-(--noksha-border-subtle) border-dashed" />
            {/* Skips 12/3/6/9 — the number already marks that position, so a tick there would just sit on top of it. */}
            {Array.from({ length: 12 }, (_, i) => i)
              .filter((i) => i % 3 !== 0)
              .map((i) => (
                <span
                  key={i}
                  className="pointer-events-none absolute top-1/2 left-1/2 h-2.5 w-0.5 rounded-full bg-(--noksha-fg-subtle)"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-60px)` }}
                />
              ))}
            <span className="-translate-x-1/2 pointer-events-none absolute top-2 left-1/2 text-[0.65rem] text-(--noksha-fg-subtle)">12</span>
            <span className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-2.5 text-[0.65rem] text-(--noksha-fg-subtle)">3</span>
            <span className="-translate-x-1/2 pointer-events-none absolute bottom-2 left-1/2 text-[0.65rem] text-(--noksha-fg-subtle)">6</span>
            <span className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 text-[0.65rem] text-(--noksha-fg-subtle)">9</span>
            <span
              className="pointer-events-none absolute top-1/2 left-1/2 h-9 w-1 origin-bottom rounded-full bg-(--noksha-fg-default)"
              style={{ transform: `translate(-50%, -100%) rotate(${hourDeg8}deg)` }}
            />
            <span
              className="pointer-events-none absolute top-1/2 left-1/2 h-13 w-1 origin-bottom rounded-full bg-(--noksha-accent-solid)"
              style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg8}deg)` }}
            />
            <span className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 size-2 rounded-full bg-(--noksha-accent-solid)" />
          </div>
          <input
            id="time-clock-only"
            type="time"
            value={time8}
            onChange={(event) => setTime8(event.target.value)}
            className="border-0 bg-transparent text-center font-semibold text-(--noksha-fg-default) text-base outline-none"
          />
        </div>
        <FieldDescription>Click the outer ring for the hour, the dashed inner ring for the minute.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
