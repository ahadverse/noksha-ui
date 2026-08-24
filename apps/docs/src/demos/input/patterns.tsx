'use client';

import {
  Button,
  FieldDescription,
  FieldLabel,
  FieldRoot,
  Input,
  PopoverClose,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
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
const LEADING_TRIGGER_CLASSES = [
  'w-auto shrink-0 rounded-none border-0 border-e border-(--noksha-border-default)',
  'bg-(--noksha-bg-subtle) px-3 font-medium hover:bg-(--noksha-bg-muted) focus-visible:outline-none',
].join(' ');
const TRAILING_TRIGGER_CLASSES = [
  'w-auto shrink-0 rounded-none border-0 border-s border-(--noksha-border-default)',
  'bg-(--noksha-bg-subtle) px-3 font-medium hover:bg-(--noksha-bg-muted) focus-visible:outline-none',
].join(' ');

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m16.5 16.5 4 4" strokeLinecap="round" />
  </svg>
);

const FilterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 5h16M7 12h10M10 19h4" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
    className="size-2.5"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 20h4L18 10a2.8 2.8 0 0 0-4-4L4 16v4Z" />
    </svg>
  );
}

const DEFAULT_RANGE_START = new Date(2026, 7, 1);
const DEFAULT_RANGE_END = new Date(2026, 7, 31);

function formatShortDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDayNum(date: Date) {
  return String(date.getDate());
}

function formatMonthAbbr(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short' });
}

function countNights(start: Date, end: Date) {
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
}

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfCalendarGrid(date: Date) {
  const first = startOfMonth(date);
  return addDays(first, -first.getDay());
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatCalendarDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatCalendarRange(start: Date, end: Date) {
  return `${formatCalendarDate(start)} – ${formatCalendarDate(end)}`;
}

const RANGE_PRESETS: { label: string; getRange: (today: Date) => readonly [Date, Date] }[] = [
  { label: 'Today', getRange: (today) => [today, today] },
  {
    label: 'Yesterday',
    getRange: (today) => {
      const yesterday = addDays(today, -1);
      return [yesterday, yesterday];
    },
  },
  { label: 'Last 7 days', getRange: (today) => [addDays(today, -6), today] },
  { label: 'Last 30 days', getRange: (today) => [addDays(today, -29), today] },
  { label: 'This month', getRange: (today) => [startOfMonth(today), today] },
  {
    label: 'Last month',
    getRange: (today) => {
      const lastOfPrevMonth = addDays(startOfMonth(today), -1);
      return [startOfMonth(lastOfPrevMonth), lastOfPrevMonth];
    },
  },
];

const COUNTRY_CODES = [
  { code: 'US', dial: '+1' },
  { code: 'GB', dial: '+44' },
  { code: 'BD', dial: '+880' },
  { code: 'IN', dial: '+91' },
];

function PhoneField() {
  const [country, setCountry] = React.useState('US');
  const dial = COUNTRY_CODES.find((c) => c.code === country)?.dial ?? '+1';

  return (
    <FieldRoot>
      <FieldLabel>Phone number</FieldLabel>
      <div className={GROUP_CLASSES}>
        <SelectRoot value={country} onValueChange={setCountry}>
          <SelectTrigger
            aria-label="Country code"
            className={LEADING_TRIGGER_CLASSES}
            renderValue={() => dial}
          />
          <SelectContent>
            {COUNTRY_CODES.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.code} {c.dial}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Input type="tel" placeholder="555 123 4567" className={GROUP_INPUT_CLASSES} />
      </div>
      <FieldDescription>
        The dial code lives inside the same control as the number.
      </FieldDescription>
    </FieldRoot>
  );
}

const UNITS = ['kg', 'lb', 'g'];

function UnitField() {
  const [unit, setUnit] = React.useState('kg');

  return (
    <FieldRoot>
      <FieldLabel>Weight</FieldLabel>
      <div className={GROUP_CLASSES}>
        <Input
          type="number"
          inputMode="decimal"
          placeholder="0.0"
          className={GROUP_INPUT_CLASSES}
        />
        <SelectRoot value={unit} onValueChange={setUnit}>
          <SelectTrigger
            aria-label="Unit"
            className={TRAILING_TRIGGER_CLASSES}
            renderValue={() => unit}
          />
          <SelectContent>
            {UNITS.map((u) => (
              <SelectItem key={u} value={u}>
                {u}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>
      <FieldDescription>A trailing unit picker instead of a leading code.</FieldDescription>
    </FieldRoot>
  );
}

function NewsletterField() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <FieldRoot>
      <FieldLabel>Newsletter</FieldLabel>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
        className={GROUP_CLASSES}
      >
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className={GROUP_INPUT_CLASSES}
        />
        <Button type="submit" variant="solid" tone="accent" className="rounded-none">
          Subscribe
        </Button>
      </form>
      <FieldDescription>
        {submitted ? `Subscribed as ${email || 'you@example.com'}.` : 'One control, one submit.'}
      </FieldDescription>
    </FieldRoot>
  );
}

function FilterSearchField() {
  const [active, setActive] = React.useState(false);

  return (
    <FieldRoot>
      <FieldLabel>Search results</FieldLabel>
      <div className={GROUP_CLASSES}>
        <Input startIcon={<SearchIcon />} placeholder="Search…" className={GROUP_INPUT_CLASSES} />
        <span className="relative inline-flex">
          <Button
            type="button"
            variant="ghost"
            tone={active ? 'accent' : 'neutral'}
            iconOnly
            icon={<FilterIcon />}
            aria-label="Filters"
            onClick={() => setActive((value) => !value)}
            className="rounded-none"
          />
          {active ? (
            <span className="pointer-events-none absolute top-1 right-1 size-1.5 rounded-full bg-(--noksha-accent-solid)" />
          ) : null}
        </span>
      </div>
      <FieldDescription>The filter toggle lives beside the field, not inside it.</FieldDescription>
    </FieldRoot>
  );
}

const TRIGGER_FOCUS_CLASSES =
  'focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset) focus-visible:outline-(--noksha-ring)';

function JoinedRangeField() {
  const [start, setStart] = React.useState(DEFAULT_RANGE_START);
  const [end, setEnd] = React.useState(DEFAULT_RANGE_END);

  return (
    <FieldRoot>
      <FieldLabel>Trip dates</FieldLabel>
      <RangeCalendarPopover
        variant="simple"
        start={start}
        end={end}
        onApply={(nextStart, nextEnd) => {
          setStart(nextStart);
          setEnd(nextEnd);
        }}
        trigger={
          <button type="button" className={`${GROUP_CLASSES} ${TRIGGER_FOCUS_CLASSES} text-left`}>
            <span className="flex-1 px-3 py-2 text-(--noksha-fg-default) text-sm">
              {formatShortDate(start)}
            </span>
            <span className="flex items-center px-2 text-(--noksha-fg-subtle)">→</span>
            <span className="flex-1 px-3 py-2 text-right text-(--noksha-fg-default) text-sm">
              {formatShortDate(end)}
            </span>
          </button>
        }
      />
      <FieldDescription>Two dates, one control, one calendar.</FieldDescription>
    </FieldRoot>
  );
}

function CalendarMonth({
  monthDate,
  rangeStart,
  rangeEnd,
  today,
  onSelectDay,
}: {
  monthDate: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  today: Date;
  onSelectDay: (day: Date) => void;
}) {
  const month = monthDate.getMonth();
  const gridStart = startOfCalendarGrid(monthDate);
  const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));

  return (
    <div>
      <div className="grid grid-cols-7 text-center">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className="py-1 font-medium text-(--noksha-fg-subtle) text-xs">
            {label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day) => {
          const inMonth = day.getMonth() === month;
          const isToday = isSameDay(day, today);
          const isStart = rangeStart != null && isSameDay(day, rangeStart);
          const isEnd = rangeEnd != null && isSameDay(day, rangeEnd);
          const inRange =
            rangeStart != null && rangeEnd != null && day > rangeStart && day < rangeEnd;

          return (
            <div
              key={day.toISOString()}
              className={
                inRange || isStart || isEnd
                  ? `bg-(--noksha-accent-subtle) ${isStart ? 'rounded-l-full' : ''} ${isEnd ? 'rounded-r-full' : ''}`
                  : ''
              }
            >
              <button
                type="button"
                onClick={() => onSelectDay(day)}
                disabled={!inMonth}
                className={`mx-auto flex size-8 items-center justify-center rounded-full text-sm transition-colors ${
                  isStart || isEnd
                    ? 'bg-(--noksha-accent-solid) font-semibold text-(--noksha-accent-on-solid)'
                    : inMonth
                      ? 'text-(--noksha-fg-default) hover:bg-(--noksha-bg-subtle)'
                      : 'text-(--noksha-fg-subtle)'
                } ${isToday && !isStart && !isEnd ? 'ring-1 ring-(--noksha-accent-solid) ring-inset' : ''}`}
              >
                {day.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RangeCalendarPopover({
  start,
  end,
  onApply,
  trigger,
  variant = 'full',
}: {
  start: Date;
  end: Date;
  onApply: (start: Date, end: Date) => void;
  trigger: React.ReactElement;
  variant?: 'full' | 'simple';
}) {
  const today = React.useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const [open, setOpen] = React.useState(false);
  const [draftStart, setDraftStart] = React.useState<Date | null>(start);
  const [draftEnd, setDraftEnd] = React.useState<Date | null>(end);
  const [activePreset, setActivePreset] = React.useState<string | null>(null);
  const [monthCursor, setMonthCursor] = React.useState(() => startOfMonth(start));

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setDraftStart(start);
      setDraftEnd(end);
      setMonthCursor(startOfMonth(start));
      setActivePreset(null);
    }
  }

  function applyPreset(preset: (typeof RANGE_PRESETS)[number]) {
    const [rangeStart, rangeEnd] = preset.getRange(today);
    setDraftStart(rangeStart);
    setDraftEnd(rangeEnd);
    setMonthCursor(startOfMonth(rangeStart));
    setActivePreset(preset.label);
  }

  function handleSelectDay(day: Date) {
    setActivePreset(null);
    if (!draftStart || draftEnd) {
      setDraftStart(day);
      setDraftEnd(null);
      return;
    }
    const [rangeStart, rangeEnd] = day < draftStart ? [day, draftStart] : [draftStart, day];
    setDraftStart(rangeStart);
    setDraftEnd(rangeEnd);
    if (variant === 'simple') {
      onApply(rangeStart, rangeEnd);
      setOpen(false);
    }
  }

  function handleApply() {
    if (!draftStart) return;
    onApply(draftStart, draftEnd ?? draftStart);
    setOpen(false);
  }

  return (
    <PopoverRoot open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0">
        <div className="flex">
          {variant === 'full' ? (
            <div className="flex w-36 shrink-0 flex-col gap-0.5 border-(--noksha-border-default) border-e p-2">
              {RANGE_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`rounded-(--noksha-radius-sm) px-2.5 py-1.5 text-left text-sm ${
                    activePreset === preset.label
                      ? 'bg-(--noksha-accent-solid) text-(--noksha-accent-on-solid)'
                      : 'text-(--noksha-fg-default) hover:bg-(--noksha-bg-subtle)'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setActivePreset('Custom range')}
                className={`rounded-(--noksha-radius-sm) px-2.5 py-1.5 text-left text-sm ${
                  activePreset === 'Custom range'
                    ? 'bg-(--noksha-accent-solid) text-(--noksha-accent-on-solid)'
                    : 'text-(--noksha-fg-default) hover:bg-(--noksha-bg-subtle)'
                }`}
              >
                Custom range
              </button>
            </div>
          ) : null}

          <div className="p-3">
            <div className="mb-2 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                tone="neutral"
                size="xs"
                iconOnly
                icon={<ChevronLeftIcon />}
                aria-label="Previous month"
                onClick={() => setMonthCursor((current) => addMonths(current, -1))}
              />
              <div className="flex flex-1 justify-around px-2">
                <span className="font-medium text-(--noksha-fg-default) text-sm">
                  {monthCursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <span className="font-medium text-(--noksha-fg-default) text-sm">
                  {addMonths(monthCursor, 1).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                tone="neutral"
                size="xs"
                iconOnly
                icon={<ChevronRightIcon />}
                aria-label="Next month"
                onClick={() => setMonthCursor((current) => addMonths(current, 1))}
              />
            </div>

            <div className="flex gap-4">
              <CalendarMonth
                monthDate={monthCursor}
                rangeStart={draftStart}
                rangeEnd={draftEnd}
                today={today}
                onSelectDay={handleSelectDay}
              />
              <CalendarMonth
                monthDate={addMonths(monthCursor, 1)}
                rangeStart={draftStart}
                rangeEnd={draftEnd}
                today={today}
                onSelectDay={handleSelectDay}
              />
            </div>

            {variant === 'full' ? (
              <div className="mt-3 flex items-center justify-between gap-2 border-(--noksha-border-default) border-t pt-3">
                <span className="text-(--noksha-fg-muted) text-xs">
                  {draftStart
                    ? formatCalendarRange(draftStart, draftEnd ?? draftStart)
                    : 'Pick a start date'}
                </span>
                <div className="flex gap-2">
                  <PopoverClose asChild>
                    <Button type="button" variant="ghost" tone="neutral" size="sm">
                      Cancel
                    </Button>
                  </PopoverClose>
                  <Button
                    type="button"
                    variant="solid"
                    tone="accent"
                    size="sm"
                    disabled={!draftStart}
                    onClick={handleApply}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </PopoverContent>
    </PopoverRoot>
  );
}

function CalendarRangeField() {
  const [start, setStart] = React.useState(DEFAULT_RANGE_START);
  const [end, setEnd] = React.useState(DEFAULT_RANGE_END);

  return (
    <FieldRoot>
      <FieldLabel>Date range</FieldLabel>
      <RangeCalendarPopover
        start={start}
        end={end}
        onApply={(nextStart, nextEnd) => {
          setStart(nextStart);
          setEnd(nextEnd);
        }}
        trigger={
          <button
            type="button"
            className={`flex w-full items-center justify-between gap-2 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2 text-left hover:border-(--noksha-border-strong) ${TRIGGER_FOCUS_CLASSES}`}
          >
            <span className="flex items-center gap-2 text-(--noksha-fg-default) text-sm">
              <CalendarIcon className="size-4 text-(--noksha-fg-muted)" />
              {formatCalendarRange(start, end)}
            </span>
            <ChevronDownIcon className="size-4 text-(--noksha-fg-subtle)" />
          </button>
        }
      />
      <FieldDescription>
        A single trigger opens presets and a two-month calendar; nothing changes until Apply.
      </FieldDescription>
    </FieldRoot>
  );
}

const DURATION_PRESETS = ['7D', '30D', '90D', 'Custom'];

function DurationPresetField() {
  const [preset, setPreset] = React.useState('30D');
  const [customStart, setCustomStart] = React.useState(DEFAULT_RANGE_START);
  const [customEnd, setCustomEnd] = React.useState(DEFAULT_RANGE_END);

  return (
    <FieldRoot>
      <FieldLabel>Reporting period</FieldLabel>
      <div className="flex gap-1.5 rounded-(--noksha-radius-md) bg-(--noksha-bg-subtle) p-1">
        {DURATION_PRESETS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setPreset(option)}
            className={`flex-1 rounded-(--noksha-radius-sm) px-2 py-1.5 font-medium text-xs transition-colors ${
              preset === option
                ? 'bg-(--noksha-bg-surface) text-(--noksha-fg-default) shadow-(--noksha-shadow-xs)'
                : 'text-(--noksha-fg-muted) hover:text-(--noksha-fg-default)'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {preset === 'Custom' ? (
        <div className="mt-2">
          <RangeCalendarPopover
            variant="simple"
            start={customStart}
            end={customEnd}
            onApply={(nextStart, nextEnd) => {
              setCustomStart(nextStart);
              setCustomEnd(nextEnd);
            }}
            trigger={
              <button
                type="button"
                className={`flex w-full items-center justify-between gap-2 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2 text-left hover:border-(--noksha-border-strong) ${TRIGGER_FOCUS_CLASSES}`}
              >
                <span className="text-(--noksha-fg-default) text-sm">
                  {formatCalendarRange(customStart, customEnd)}
                </span>
                <ChevronDownIcon className="size-4 text-(--noksha-fg-subtle)" />
              </button>
            }
          />
        </div>
      ) : null}
      <FieldDescription>
        {preset === 'Custom'
          ? 'Pick any range from the calendar.'
          : `Showing the last ${preset.replace('D', '')} days.`}
      </FieldDescription>
    </FieldRoot>
  );
}

function CircleDateField() {
  const [start, setStart] = React.useState(DEFAULT_RANGE_START);
  const [end, setEnd] = React.useState(DEFAULT_RANGE_END);

  return (
    <FieldRoot>
      <FieldLabel>Sprint window</FieldLabel>
      <RangeCalendarPopover
        variant="simple"
        start={start}
        end={end}
        onApply={(nextStart, nextEnd) => {
          setStart(nextStart);
          setEnd(nextEnd);
        }}
        trigger={
          <button
            type="button"
            className={`flex w-full items-center justify-center gap-3 rounded-(--noksha-radius-lg) py-1 hover:bg-(--noksha-bg-subtle) ${TRIGGER_FOCUS_CLASSES}`}
          >
            <span className="flex size-16 shrink-0 flex-col items-center justify-center rounded-full border-2 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle) text-(--noksha-accent-fg)">
              <span className="font-bold text-lg leading-none">{formatDayNum(start)}</span>
              <span className="text-[0.6rem] uppercase tracking-wide">
                {formatMonthAbbr(start)}
              </span>
            </span>
            <span className="h-0 flex-1 border-t-2 border-(--noksha-border-default) border-dashed" />
            <span className="flex size-16 shrink-0 flex-col items-center justify-center rounded-full border-2 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle) text-(--noksha-accent-fg)">
              <span className="font-bold text-lg leading-none">{formatDayNum(end)}</span>
              <span className="text-[0.6rem] uppercase tracking-wide">{formatMonthAbbr(end)}</span>
            </span>
          </button>
        }
      />
      <FieldDescription>One calendar for both ends — tap anywhere on the row.</FieldDescription>
    </FieldRoot>
  );
}

function GradientRangeField() {
  const [start, setStart] = React.useState(DEFAULT_RANGE_START);
  const [end, setEnd] = React.useState(DEFAULT_RANGE_END);
  const nights = countNights(start, end);

  return (
    <FieldRoot>
      <FieldLabel>Booking dates</FieldLabel>
      <RangeCalendarPopover
        variant="simple"
        start={start}
        end={end}
        onApply={(nextStart, nextEnd) => {
          setStart(nextStart);
          setEnd(nextEnd);
        }}
        trigger={
          <button
            type="button"
            className={`w-full rounded-2xl p-4 text-left ${TRIGGER_FOCUS_CLASSES}`}
            style={{
              background:
                'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))',
            }}
          >
            <div className="flex items-center justify-between gap-2 text-white">
              <div className="flex flex-col">
                <span className="text-[0.65rem] text-white/70 uppercase tracking-wide">
                  Check-in
                </span>
                <span className="font-semibold text-sm">{formatShortDate(start)}</span>
              </div>
              <span className="text-white/60">→</span>
              <div className="flex flex-col text-right">
                <span className="text-[0.65rem] text-white/70 uppercase tracking-wide">
                  Check-out
                </span>
                <span className="font-semibold text-sm">{formatShortDate(end)}</span>
              </div>
            </div>
            <div className="mt-3 rounded-full bg-white/15 px-3 py-1 text-center text-white text-xs">
              {nights} {nights === 1 ? 'night' : 'nights'}
            </div>
          </button>
        }
      />
      <FieldDescription>The whole card opens one calendar for both dates.</FieldDescription>
    </FieldRoot>
  );
}

function CompactRangeField() {
  const [start, setStart] = React.useState(DEFAULT_RANGE_START);
  const [end, setEnd] = React.useState(DEFAULT_RANGE_END);

  return (
    <FieldRoot>
      <FieldLabel>Vacation dates</FieldLabel>
      <RangeCalendarPopover
        variant="simple"
        start={start}
        end={end}
        onApply={(nextStart, nextEnd) => {
          setStart(nextStart);
          setEnd(nextEnd);
        }}
        trigger={
          <button
            type="button"
            className={`flex w-full items-center gap-2 rounded-full border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2 text-left hover:border-(--noksha-border-strong) ${TRIGGER_FOCUS_CLASSES}`}
          >
            <CalendarIcon className="size-4 shrink-0 text-(--noksha-fg-muted)" />
            <span className="text-(--noksha-fg-default) text-sm">{formatShortDate(start)}</span>
            <span className="text-(--noksha-fg-subtle)">·</span>
            <span className="text-(--noksha-fg-default) text-sm">{formatShortDate(end)}</span>
          </button>
        }
      />
      <FieldDescription>One pill, one calendar, no separate pickers.</FieldDescription>
    </FieldRoot>
  );
}

function InlineRangeField() {
  const [start, setStart] = React.useState(DEFAULT_RANGE_START);
  const [end, setEnd] = React.useState(DEFAULT_RANGE_END);

  return (
    <FieldRoot>
      <FieldLabel>Access window</FieldLabel>
      <RangeCalendarPopover
        variant="simple"
        start={start}
        end={end}
        onApply={(nextStart, nextEnd) => {
          setStart(nextStart);
          setEnd(nextEnd);
        }}
        trigger={
          <button
            type="button"
            className={`group flex w-full items-center justify-between rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-3 py-2 text-left hover:border-(--noksha-border-strong) ${TRIGGER_FOCUS_CLASSES}`}
          >
            <span className="text-(--noksha-fg-default) text-sm">
              {formatShortDate(start)} – {formatShortDate(end)}
            </span>
            <PencilIcon className="size-4 text-(--noksha-fg-subtle) opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        }
      />
      <FieldDescription>Picking both dates applies the range immediately.</FieldDescription>
    </FieldRoot>
  );
}

function TagsField() {
  const [tags, setTags] = React.useState(['react', 'typescript']);
  const [draft, setDraft] = React.useState('');

  function addTag() {
    const trimmed = draft.trim();
    if (trimmed && !tags.includes(trimmed)) setTags((current) => [...current, trimmed]);
    setDraft('');
  }

  return (
    <FieldRoot>
      <FieldLabel>Tags</FieldLabel>
      <div className="flex flex-wrap items-center gap-1.5 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) p-1.5 focus-within:border-(--noksha-border-focus) focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset) focus-within:outline-(--noksha-ring)">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-(--noksha-accent-subtle) py-0.5 pr-1 pl-2.5 text-(--noksha-accent-fg) text-xs"
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => setTags((current) => current.filter((t) => t !== tag))}
              className="rounded-full p-0.5 hover:bg-(--noksha-accent-solid)/20"
            >
              <CloseIcon />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ',') {
              event.preventDefault();
              addTag();
            }
          }}
          placeholder={tags.length ? '' : 'Add a tag…'}
          className="min-w-20 flex-1 bg-transparent px-1 py-1 text-(--noksha-fg-default) text-sm outline-none placeholder:text-(--noksha-fg-subtle)"
        />
      </div>
      <FieldDescription>Press Enter or comma to add a tag.</FieldDescription>
    </FieldRoot>
  );
}

export default function InputPatterns() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <PhoneField />
      <UnitField />
      <NewsletterField />
      <FilterSearchField />
      <JoinedRangeField />
      <CalendarRangeField />
      <DurationPresetField />
      <CircleDateField />
      <GradientRangeField />
      <CompactRangeField />
      <InlineRangeField />
      <TagsField />
    </div>
  );
}
