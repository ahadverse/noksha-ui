'use client';

import {
  composeRefs,
  cx,
  FocusScope,
  Portal,
  useAnchorPosition,
  useDismissable,
  usePresence,
} from '@noksha-ui/core';
import { FieldDescription, FieldLabel, FieldRoot } from '@noksha-ui/react';
import * as React from 'react';

const DAY = 24 * 60 * 60 * 1000;
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_LABEL = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
const TRIGGER_LABEL = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});
const FULL_LABEL = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});
const DAY_LABEL = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
const MONTH_SHORT_LABEL = new Intl.DateTimeFormat('en-US', { month: 'short' });

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, delta: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta);
}

function addMonthsKeepDay(date: Date, delta: number) {
  const day = date.getDate();
  const target = new Date(date.getFullYear(), date.getMonth() + delta, 1);
  const daysInTarget = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(day, daysInTarget));
  return target;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  );
}

function toISODate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function buildMonthGrid(viewMonth: Date) {
  const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const gridStart = addDays(first, -first.getDay());
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
}

/** All the state, positioning, focus-trapping and keyboard handling shared by every variant below — only the rendering differs. */
function useCalendar(defaultOffsetDays: number, maxOffsetDays: number) {
  const today = React.useMemo(() => startOfDay(new Date()), []);
  const min = today;
  const max = React.useMemo(() => addDays(today, maxOffsetDays), [today, maxOffsetDays]);

  const [selected, setSelected] = React.useState(() => addDays(today, defaultOffsetDays));
  const [viewMonth, setViewMonth] = React.useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  );
  const [focusedDate, setFocusedDate] = React.useState(selected);
  const [open, setOpen] = React.useState(false);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const present = usePresence(open, contentRef);
  const position = useAnchorPosition({
    open: present,
    placement: 'bottom-start',
    offset: 8,
    collisionPadding: 8,
  });

  useDismissable({
    ref: contentRef,
    enabled: open,
    extraRefs: [triggerRef],
    onDismiss: () => setOpen(false),
  });

  const isDisabled = (date: Date) => date < min || date > max;

  const selectIfEnabled = (date: Date) => {
    if (isDisabled(date)) return;
    setSelected(date);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const openPicker = () => {
    setFocusedDate(selected);
    setViewMonth(new Date(selected.getFullYear(), selected.getMonth(), 1));
    setOpen(true);
  };

  const moveFocus = (deltaDays: number) => {
    setFocusedDate((current) => {
      const next = addDays(current, deltaDays);
      setViewMonth((view) =>
        next.getMonth() === view.getMonth() && next.getFullYear() === view.getFullYear()
          ? view
          : new Date(next.getFullYear(), next.getMonth(), 1),
      );
      return next;
    });
  };

  const moveMonth = (deltaMonths: number) => {
    setFocusedDate((current) => {
      const next = addMonthsKeepDay(current, deltaMonths);
      setViewMonth(new Date(next.getFullYear(), next.getMonth(), 1));
      return next;
    });
  };

  const handleGridKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        moveFocus(-1);
        return;
      case 'ArrowRight':
        event.preventDefault();
        moveFocus(1);
        return;
      case 'ArrowUp':
        event.preventDefault();
        moveFocus(-7);
        return;
      case 'ArrowDown':
        event.preventDefault();
        moveFocus(7);
        return;
      case 'Home':
        event.preventDefault();
        setFocusedDate((current) => addDays(current, -current.getDay()));
        return;
      case 'End':
        event.preventDefault();
        setFocusedDate((current) => addDays(current, 6 - current.getDay()));
        return;
      case 'PageUp':
        event.preventDefault();
        moveMonth(event.shiftKey ? -12 : -1);
        return;
      case 'PageDown':
        event.preventDefault();
        moveMonth(event.shiftKey ? 12 : 1);
        return;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectIfEnabled(focusedDate);
        return;
      default:
        return;
    }
  };

  const grid = buildMonthGrid(viewMonth);
  const daysOut = Math.round((selected.getTime() - min.getTime()) / DAY);

  return {
    today,
    min,
    max,
    selected,
    viewMonth,
    setViewMonth,
    focusedDate,
    setFocusedDate,
    open,
    triggerRef,
    contentRef,
    gridRef,
    present,
    position,
    isDisabled,
    selectIfEnabled,
    openPicker,
    setOpen,
    moveMonth,
    handleGridKeyDown,
    grid,
    daysOut,
  };
}

type Calendar = ReturnType<typeof useCalendar>;

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M16 3v3M8 3v3M3 9.5h18" />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';

/**
 * The day grid, shared by every variant. `dayClassName` gets each date's
 * state (selected / today / disabled / outside-month) and returns just the
 * classes that differ between variants — the layout and a11y wiring stay
 * identical everywhere.
 */
function CalendarGrid({
  calendar,
  dayClassName,
  weekdayClassName,
}: {
  calendar: Calendar;
  dayClassName: (state: { selected: boolean; today: boolean; disabled: boolean; outsideMonth: boolean }) => string;
  weekdayClassName?: string;
}) {
  return (
    <div className="p-3">
      <div className={cx('grid grid-cols-7 gap-1 text-center text-xs', weekdayClassName ?? 'text-(--noksha-fg-muted)')}>
        {WEEKDAYS.map((day, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: a fixed 7-day header never reorders
          <span key={i}>{day}</span>
        ))}
      </div>

      {/* biome-ignore lint/a11y/useSemanticElements: a CSS-grid of buttons, not a data table */}
      <div
        ref={calendar.gridRef}
        role="grid"
        aria-label="Choose a date"
        onKeyDown={calendar.handleGridKeyDown}
        className="grid grid-cols-7 gap-1 pt-1"
      >
        {calendar.grid.map((date) => {
          const disabled = calendar.isDisabled(date);
          const outsideMonth = date.getMonth() !== calendar.viewMonth.getMonth();
          const selected = isSameDay(date, calendar.selected);
          const today = isSameDay(date, calendar.today);

          return (
            <button
              key={toISODate(date)}
              type="button"
              data-date={toISODate(date)}
              tabIndex={isSameDay(date, calendar.focusedDate) ? 0 : -1}
              aria-label={FULL_LABEL.format(date)}
              aria-pressed={selected}
              aria-current={today ? 'date' : undefined}
              disabled={disabled}
              onClick={() => calendar.selectIfEnabled(date)}
              onFocus={() => calendar.setFocusedDate(date)}
              className={cx(
                'flex size-8 items-center justify-center rounded-(--noksha-radius-sm) text-sm outline-none transition-colors',
                dayClassName({ selected, today, disabled, outsideMonth }),
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function autoFocusGrid(calendar: Calendar) {
  return (event: Event) => {
    event.preventDefault();
    calendar.gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-date="${toISODate(calendar.focusedDate)}"]`)
      ?.focus({ preventScroll: true });
  };
}

export default function FieldDate() {
  const plain = useCalendar(7, 90);
  const gradient = useCalendar(3, 60);
  const glass = useCalendar(5, 60);
  const neon = useCalendar(10, 45);
  const ticket = useCalendar(14, 120);
  const minimal = useCalendar(2, 30);
  const circle = useCalendar(6, 90);
  const countdown = useCalendar(4, 60);

  const circlePercent =
    circle.max.getTime() === circle.min.getTime()
      ? 0
      : Math.round(((circle.selected.getTime() - circle.min.getTime()) / (circle.max.getTime() - circle.min.getTime())) * 100);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {/* 1. Plain — the original: accent header, bordered trigger. */}
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CalendarIcon />
          </span>
          <FieldLabel htmlFor="date-plain">Departure date</FieldLabel>
        </div>
        <button
          ref={composeRefs(plain.triggerRef, plain.position.setAnchor)}
          type="button"
          id="date-plain"
          aria-haspopup="dialog"
          aria-expanded={plain.open}
          className={cx(
            'flex h-(--noksha-control-h-md) w-full cursor-default items-center justify-between gap-2 px-(--noksha-control-px-md) text-start text-sm',
            'rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) text-(--noksha-fg-default)',
            'hover:border-(--noksha-border-strong) outline-none',
            'focus-visible:border-(--noksha-border-focus) focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset) focus-visible:outline-(--noksha-ring)',
            '[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-(--noksha-fg-muted)',
          )}
          onClick={() => (plain.open ? plain.setOpen(false) : plain.openPicker())}
        >
          <span>{TRIGGER_LABEL.format(plain.selected)}</span>
          <CalendarIcon />
        </button>
        <FieldDescription>
          {plain.daysOut} days from today — bookable up to 90 days out.
        </FieldDescription>
      </FieldRoot>

      {plain.present ? (
        <Portal>
          <FocusScope
            ref={composeRefs(plain.contentRef, plain.position.setFloating)}
            trapped
            autoFocus
            restoreFocus
            onMountAutoFocus={autoFocusGrid(plain)}
            style={plain.position.floatingStyles}
            className="z-(--noksha-z-dropdown) w-64 overflow-hidden rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle) bg-(--noksha-bg-surface) text-(--noksha-fg-default) shadow-(--noksha-shadow-lg) outline-none"
          >
            <div className="flex items-center justify-between gap-2 bg-(--noksha-accent-solid) px-3 py-2.5 text-(--noksha-accent-ink)">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => plain.moveMonth(-1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-accent-ink) outline-none hover:bg-(--noksha-accent-ink)/15 active:bg-(--noksha-accent-ink)/25"
              >
                <ChevronIcon className="size-4 rotate-90" />
              </button>
              <span className="font-semibold text-sm">{MONTH_LABEL.format(plain.viewMonth)}</span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => plain.moveMonth(1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-accent-ink) outline-none hover:bg-(--noksha-accent-ink)/15 active:bg-(--noksha-accent-ink)/25"
              >
                <ChevronIcon className="size-4 -rotate-90" />
              </button>
            </div>
            <CalendarGrid
              calendar={plain}
              dayClassName={({ selected, today, disabled, outsideMonth }) =>
                cx(
                  'hover:bg-(--noksha-accent-subtle) focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-1',
                  outsideMonth && 'text-(--noksha-fg-subtle)',
                  today && !selected && 'font-semibold text-(--noksha-accent-fg)',
                  selected &&
                    'rounded-full bg-(--noksha-accent-solid) font-semibold text-(--noksha-accent-ink) hover:bg-(--noksha-accent-solid)',
                  disabled && 'pointer-events-none opacity-40',
                )
              }
            />
          </FocusScope>
        </Portal>
      ) : null}

      {/* 2. Gradient hero — a gradient-ring trigger and a gradient header. */}
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CalendarIcon />
          </span>
          <FieldLabel htmlFor="date-gradient">Check-in</FieldLabel>
        </div>
        <div
          className="rounded-full p-[2px]"
          style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))' }}
        >
          <button
            ref={composeRefs(gradient.triggerRef, gradient.position.setAnchor)}
            type="button"
            id="date-gradient"
            aria-haspopup="dialog"
            aria-expanded={gradient.open}
            className="flex h-11 w-full cursor-default items-center justify-between gap-2 rounded-full bg-(--noksha-bg-surface) px-4 text-(--noksha-fg-default) text-sm outline-none"
            onClick={() => (gradient.open ? gradient.setOpen(false) : gradient.openPicker())}
          >
            <span className="font-medium">{TRIGGER_LABEL.format(gradient.selected)}</span>
            <span className="text-(--noksha-accent-fg) [&>svg]:size-4">
              <CalendarIcon />
            </span>
          </button>
        </div>
        <FieldDescription>{gradient.daysOut} days out — the ring matches the selected day.</FieldDescription>
      </FieldRoot>

      {gradient.present ? (
        <Portal>
          <FocusScope
            ref={composeRefs(gradient.contentRef, gradient.position.setFloating)}
            trapped
            autoFocus
            restoreFocus
            onMountAutoFocus={autoFocusGrid(gradient)}
            style={gradient.position.floatingStyles}
            className="z-(--noksha-z-dropdown) w-64 overflow-hidden rounded-(--noksha-radius-lg) shadow-(--noksha-shadow-lg) outline-none"
          >
            <div
              className="flex items-center justify-between gap-2 px-3 py-3 text-white"
              style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))' }}
            >
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => gradient.moveMonth(-1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-white outline-none hover:bg-white/15 active:bg-white/25"
              >
                <ChevronIcon className="size-4 rotate-90" />
              </button>
              <span className="font-semibold text-sm">{MONTH_LABEL.format(gradient.viewMonth)}</span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => gradient.moveMonth(1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-white outline-none hover:bg-white/15 active:bg-white/25"
              >
                <ChevronIcon className="size-4 -rotate-90" />
              </button>
            </div>
            <div className="bg-(--noksha-bg-surface) text-(--noksha-fg-default)">
              <CalendarGrid
                calendar={gradient}
                dayClassName={({ selected, today, disabled, outsideMonth }) =>
                  cx(
                    'hover:bg-(--noksha-accent-subtle) focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-1',
                    outsideMonth && 'text-(--noksha-fg-subtle)',
                    today && !selected && 'font-semibold text-(--noksha-accent-fg)',
                    selected && 'rounded-full font-semibold text-white',
                    disabled && 'pointer-events-none opacity-40',
                  )
                }
              />
            </div>
          </FocusScope>
        </Portal>
      ) : null}

      {/* 3. Glass — a frosted trigger over a gradient card, a blurred panel. */}
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CalendarIcon />
          </span>
          <FieldLabel htmlFor="date-glass">Move-in date</FieldLabel>
        </div>
        <div
          className="rounded-2xl p-3"
          style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))' }}
        >
          <button
            ref={composeRefs(glass.triggerRef, glass.position.setAnchor)}
            type="button"
            id="date-glass"
            aria-haspopup="dialog"
            aria-expanded={glass.open}
            className="flex w-full cursor-default items-center justify-between gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-sm text-white outline-none backdrop-blur-md transition-colors hover:border-white/50"
            onClick={() => (glass.open ? glass.setOpen(false) : glass.openPicker())}
          >
            <span>{TRIGGER_LABEL.format(glass.selected)}</span>
            <span className="[&>svg]:size-4">
              <CalendarIcon />
            </span>
          </button>
        </div>
        <FieldDescription>Frosted glass over a gradient — the trigger, not just a card.</FieldDescription>
      </FieldRoot>

      {glass.present ? (
        <Portal>
          <FocusScope
            ref={composeRefs(glass.contentRef, glass.position.setFloating)}
            trapped
            autoFocus
            restoreFocus
            onMountAutoFocus={autoFocusGrid(glass)}
            style={glass.position.floatingStyles}
            className="z-(--noksha-z-dropdown) w-64 overflow-hidden rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle) bg-(--noksha-bg-surface)/90 text-(--noksha-fg-default) shadow-(--noksha-shadow-lg) outline-none backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => glass.moveMonth(-1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-muted) outline-none hover:bg-(--noksha-bg-subtle)"
              >
                <ChevronIcon className="size-4 rotate-90" />
              </button>
              <span className="font-semibold text-sm">{MONTH_LABEL.format(glass.viewMonth)}</span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => glass.moveMonth(1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-muted) outline-none hover:bg-(--noksha-bg-subtle)"
              >
                <ChevronIcon className="size-4 -rotate-90" />
              </button>
            </div>
            <CalendarGrid
              calendar={glass}
              dayClassName={({ selected, today, disabled, outsideMonth }) =>
                cx(
                  'hover:bg-(--noksha-accent-subtle) focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-1',
                  outsideMonth && 'text-(--noksha-fg-subtle)',
                  today && !selected && 'font-semibold text-(--noksha-accent-fg)',
                  selected &&
                    'rounded-full bg-(--noksha-accent-solid) font-semibold text-(--noksha-accent-ink)',
                  disabled && 'pointer-events-none opacity-40',
                )
              }
            />
          </FocusScope>
        </Portal>
      ) : null}

      {/* 4. Neon — dark, theme-adjustable chrome with a glow that switches on with focus. */}
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CalendarIcon />
          </span>
          <FieldLabel htmlFor="date-neon">Event date</FieldLabel>
        </div>
        <button
          ref={composeRefs(neon.triggerRef, neon.position.setAnchor)}
          type="button"
          id="date-neon"
          aria-haspopup="dialog"
          aria-expanded={neon.open}
          className={cx(
            'flex h-11 w-full cursor-default items-center justify-between gap-2 rounded-(--noksha-radius-lg) px-4 text-sm outline-none',
            'border border-transparent bg-(--noksha-bg-inverse) text-(--noksha-fg-inverse) transition-[box-shadow,border-color]',
            'focus-visible:border-(--noksha-accent-solid) focus-visible:shadow-[0_0_20px_-2px_var(--noksha-accent-solid)]',
            '[&>svg]:size-4 [&>svg]:text-(--noksha-accent-solid)',
          )}
          onClick={() => (neon.open ? neon.setOpen(false) : neon.openPicker())}
        >
          <span>{TRIGGER_LABEL.format(neon.selected)}</span>
          <CalendarIcon />
        </button>
        <FieldDescription>Focus the trigger and the border lights up — dark in both themes.</FieldDescription>
      </FieldRoot>

      {neon.present ? (
        <Portal>
          <FocusScope
            ref={composeRefs(neon.contentRef, neon.position.setFloating)}
            trapped
            autoFocus
            restoreFocus
            onMountAutoFocus={autoFocusGrid(neon)}
            style={neon.position.floatingStyles}
            className="z-(--noksha-z-dropdown) w-64 overflow-hidden rounded-(--noksha-radius-lg) bg-(--noksha-bg-inverse) text-(--noksha-fg-inverse) shadow-(--noksha-shadow-lg) outline-none"
          >
            <div className="flex items-center justify-between gap-2 border-(--noksha-fg-inverse)/10 border-b px-3 py-2.5">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => neon.moveMonth(-1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-inverse)/70 outline-none hover:bg-(--noksha-fg-inverse)/10"
              >
                <ChevronIcon className="size-4 rotate-90" />
              </button>
              <span className="font-semibold text-sm">{MONTH_LABEL.format(neon.viewMonth)}</span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => neon.moveMonth(1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-inverse)/70 outline-none hover:bg-(--noksha-fg-inverse)/10"
              >
                <ChevronIcon className="size-4 -rotate-90" />
              </button>
            </div>
            <CalendarGrid
              calendar={neon}
              weekdayClassName="text-(--noksha-fg-inverse)/50"
              dayClassName={({ selected, today, disabled, outsideMonth }) =>
                cx(
                  'hover:bg-(--noksha-fg-inverse)/10 focus-visible:outline-2 focus-visible:outline-(--noksha-accent-solid) focus-visible:outline-offset-1',
                  outsideMonth && 'text-(--noksha-fg-inverse)/35',
                  today && !selected && 'font-semibold text-(--noksha-accent-solid)',
                  selected &&
                    'rounded-full bg-(--noksha-accent-solid) font-semibold text-white shadow-[0_0_14px_-2px_var(--noksha-accent-solid)]',
                  disabled && 'pointer-events-none opacity-30',
                )
              }
            />
          </FocusScope>
        </Portal>
      ) : null}

      {/* 5. Ticket — a boarding-pass tile instead of a text row. */}
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CalendarIcon />
          </span>
          <FieldLabel htmlFor="date-ticket">Travel date</FieldLabel>
        </div>
        <button
          ref={composeRefs(ticket.triggerRef, ticket.position.setAnchor)}
          type="button"
          id="date-ticket"
          aria-haspopup="dialog"
          aria-expanded={ticket.open}
          className="flex w-fit cursor-default items-stretch overflow-hidden rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) text-start shadow-(--noksha-shadow-sm) outline-none focus-visible:border-(--noksha-border-focus) focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset) focus-visible:outline-(--noksha-ring)"
          onClick={() => (ticket.open ? ticket.setOpen(false) : ticket.openPicker())}
        >
          <span className="flex w-16 flex-col items-center justify-center gap-0.5 bg-(--noksha-accent-solid) py-2 text-(--noksha-accent-ink)">
            <span className="font-bold text-2xl leading-none tabular-nums">{ticket.selected.getDate()}</span>
            <span className="font-medium text-[0.65rem] uppercase tracking-wide">
              {MONTH_SHORT_LABEL.format(ticket.selected)}
            </span>
          </span>
          <span className="flex flex-col justify-center gap-0.5 px-4 py-2">
            <span className="font-semibold text-(--noksha-fg-default) text-sm">{DAY_LABEL.format(ticket.selected)}</span>
            <span className="text-(--noksha-fg-muted) text-xs">{ticket.daysOut} days out</span>
          </span>
        </button>
        <FieldDescription>The date itself is the icon — no separate calendar glyph.</FieldDescription>
      </FieldRoot>

      {ticket.present ? (
        <Portal>
          <FocusScope
            ref={composeRefs(ticket.contentRef, ticket.position.setFloating)}
            trapped
            autoFocus
            restoreFocus
            onMountAutoFocus={autoFocusGrid(ticket)}
            style={ticket.position.floatingStyles}
            className="z-(--noksha-z-dropdown) w-64 overflow-hidden rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle) bg-(--noksha-bg-surface) text-(--noksha-fg-default) shadow-(--noksha-shadow-lg) outline-none"
          >
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => ticket.moveMonth(-1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-muted) outline-none hover:bg-(--noksha-bg-subtle)"
              >
                <ChevronIcon className="size-4 rotate-90" />
              </button>
              <span className="font-semibold text-sm">{MONTH_LABEL.format(ticket.viewMonth)}</span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => ticket.moveMonth(1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-muted) outline-none hover:bg-(--noksha-bg-subtle)"
              >
                <ChevronIcon className="size-4 -rotate-90" />
              </button>
            </div>
            <CalendarGrid
              calendar={ticket}
              dayClassName={({ selected, today, disabled, outsideMonth }) =>
                cx(
                  'hover:bg-(--noksha-accent-subtle) focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-1',
                  outsideMonth && 'text-(--noksha-fg-subtle)',
                  today && !selected && 'font-semibold text-(--noksha-accent-fg)',
                  selected &&
                    'rounded-(--noksha-radius-sm) bg-(--noksha-accent-solid) font-semibold text-(--noksha-accent-ink)',
                  disabled && 'pointer-events-none opacity-40',
                )
              }
            />
          </FocusScope>
        </Portal>
      ) : null}

      {/* 6. Minimal — borderless trigger, a heavy-shadow floating panel. */}
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CalendarIcon />
          </span>
          <FieldLabel htmlFor="date-minimal">Reminder date</FieldLabel>
        </div>
        <button
          ref={composeRefs(minimal.triggerRef, minimal.position.setAnchor)}
          type="button"
          id="date-minimal"
          aria-haspopup="dialog"
          aria-expanded={minimal.open}
          className="flex w-fit cursor-default items-center gap-2 border-(--noksha-border-default) border-b-2 pb-1.5 text-(--noksha-fg-default) text-lg outline-none [&>svg]:size-4 [&>svg]:text-(--noksha-fg-muted)"
          onClick={() => (minimal.open ? minimal.setOpen(false) : minimal.openPicker())}
        >
          <CalendarIcon />
          <span>{TRIGGER_LABEL.format(minimal.selected)}</span>
        </button>
        <FieldDescription>No box, no fill — just a rule and a heavy shadow when it opens.</FieldDescription>
      </FieldRoot>

      {minimal.present ? (
        <Portal>
          <FocusScope
            ref={composeRefs(minimal.contentRef, minimal.position.setFloating)}
            trapped
            autoFocus
            restoreFocus
            onMountAutoFocus={autoFocusGrid(minimal)}
            style={minimal.position.floatingStyles}
            className="z-(--noksha-z-dropdown) w-64 overflow-hidden rounded-3xl bg-(--noksha-bg-surface) text-(--noksha-fg-default) shadow-(--noksha-shadow-lg) outline-none"
          >
            <div className="flex items-center justify-between gap-2 px-4 py-3">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => minimal.moveMonth(-1)}
                className="flex size-7 items-center justify-center rounded-full text-(--noksha-fg-muted) outline-none hover:bg-(--noksha-bg-subtle)"
              >
                <ChevronIcon className="size-4 rotate-90" />
              </button>
              <span className="font-semibold text-sm">{MONTH_LABEL.format(minimal.viewMonth)}</span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => minimal.moveMonth(1)}
                className="flex size-7 items-center justify-center rounded-full text-(--noksha-fg-muted) outline-none hover:bg-(--noksha-bg-subtle)"
              >
                <ChevronIcon className="size-4 -rotate-90" />
              </button>
            </div>
            <CalendarGrid
              calendar={minimal}
              dayClassName={({ selected, today, disabled, outsideMonth }) =>
                cx(
                  'hover:bg-(--noksha-accent-subtle) focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-1',
                  outsideMonth && 'text-(--noksha-fg-subtle)',
                  today && !selected && 'font-semibold text-(--noksha-accent-fg)',
                  selected &&
                    'rounded-full bg-(--noksha-accent-solid) font-semibold text-(--noksha-accent-ink)',
                  disabled && 'pointer-events-none opacity-40',
                )
              }
            />
          </FocusScope>
        </Portal>
      ) : null}

      {/* 7. Circle — a radial trigger; the ring is a progress bar through the bookable window. */}
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CalendarIcon />
          </span>
          <FieldLabel htmlFor="date-circle">Renewal date</FieldLabel>
        </div>
        <button
          ref={composeRefs(circle.triggerRef, circle.position.setAnchor)}
          type="button"
          id="date-circle"
          aria-haspopup="dialog"
          aria-expanded={circle.open}
          className="relative flex size-16 shrink-0 cursor-default items-center justify-center rounded-full p-1 outline-none focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
          style={{
            background: `conic-gradient(var(--noksha-accent-solid) ${circlePercent}%, var(--noksha-bg-subtle) ${circlePercent}% 100%)`,
          }}
          onClick={() => (circle.open ? circle.setOpen(false) : circle.openPicker())}
        >
          <span className="flex size-full flex-col items-center justify-center rounded-full bg-(--noksha-bg-surface)">
            <span className="font-bold text-lg text-(--noksha-fg-default) leading-none tabular-nums">
              {circle.selected.getDate()}
            </span>
            <span className="text-(--noksha-fg-muted) text-[0.6rem] uppercase tracking-wide">
              {MONTH_SHORT_LABEL.format(circle.selected)}
            </span>
          </span>
        </button>
        <FieldDescription>
          {circlePercent}% of the way through the window — the ring is a progress bar, not decoration.
        </FieldDescription>
      </FieldRoot>

      {circle.present ? (
        <Portal>
          <FocusScope
            ref={composeRefs(circle.contentRef, circle.position.setFloating)}
            trapped
            autoFocus
            restoreFocus
            onMountAutoFocus={autoFocusGrid(circle)}
            style={circle.position.floatingStyles}
            className="z-(--noksha-z-dropdown) w-64 overflow-hidden rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle) bg-(--noksha-bg-surface) text-(--noksha-fg-default) shadow-(--noksha-shadow-lg) outline-none"
          >
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => circle.moveMonth(-1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-muted) outline-none hover:bg-(--noksha-bg-subtle)"
              >
                <ChevronIcon className="size-4 rotate-90" />
              </button>
              <span className="font-semibold text-sm">{MONTH_LABEL.format(circle.viewMonth)}</span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => circle.moveMonth(1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-muted) outline-none hover:bg-(--noksha-bg-subtle)"
              >
                <ChevronIcon className="size-4 -rotate-90" />
              </button>
            </div>
            <CalendarGrid
              calendar={circle}
              dayClassName={({ selected, today, disabled, outsideMonth }) =>
                cx(
                  'hover:bg-(--noksha-accent-subtle) focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-1',
                  outsideMonth && 'text-(--noksha-fg-subtle)',
                  today && !selected && 'font-semibold text-(--noksha-accent-fg)',
                  selected &&
                    'rounded-full bg-(--noksha-accent-solid) font-semibold text-(--noksha-accent-ink)',
                  disabled && 'pointer-events-none opacity-40',
                )
              }
            />
          </FocusScope>
        </Portal>
      ) : null}

      {/* 8. Countdown — the days remaining lead, the date follows. */}
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CalendarIcon />
          </span>
          <FieldLabel htmlFor="date-countdown">Deadline</FieldLabel>
        </div>
        <button
          ref={composeRefs(countdown.triggerRef, countdown.position.setAnchor)}
          type="button"
          id="date-countdown"
          aria-haspopup="dialog"
          aria-expanded={countdown.open}
          className="flex w-fit cursor-default items-center gap-3 rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface) py-2 pr-4 pl-3 text-start shadow-(--noksha-shadow-sm) outline-none focus-visible:border-(--noksha-border-focus) focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset) focus-visible:outline-(--noksha-ring)"
          onClick={() => (countdown.open ? countdown.setOpen(false) : countdown.openPicker())}
        >
          <span className="flex flex-col items-center">
            <span className="font-bold text-2xl text-(--noksha-accent-fg) leading-none tabular-nums">
              {countdown.daysOut}
            </span>
            <span className="text-(--noksha-fg-muted) text-[0.6rem] uppercase tracking-wide">days</span>
          </span>
          <span className="h-8 w-px bg-(--noksha-border-default)" />
          <span className="flex flex-col">
            <span className="font-medium text-(--noksha-fg-default) text-sm">{TRIGGER_LABEL.format(countdown.selected)}</span>
            <span className="text-(--noksha-fg-subtle) text-xs">Tap to change</span>
          </span>
        </button>
        <FieldDescription>The countdown is the headline — the calendar date is secondary.</FieldDescription>
      </FieldRoot>

      {countdown.present ? (
        <Portal>
          <FocusScope
            ref={composeRefs(countdown.contentRef, countdown.position.setFloating)}
            trapped
            autoFocus
            restoreFocus
            onMountAutoFocus={autoFocusGrid(countdown)}
            style={countdown.position.floatingStyles}
            className="z-(--noksha-z-dropdown) w-64 overflow-hidden rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle) bg-(--noksha-bg-surface) text-(--noksha-fg-default) shadow-(--noksha-shadow-lg) outline-none"
          >
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => countdown.moveMonth(-1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-muted) outline-none hover:bg-(--noksha-bg-subtle)"
              >
                <ChevronIcon className="size-4 rotate-90" />
              </button>
              <span className="font-semibold text-sm">{MONTH_LABEL.format(countdown.viewMonth)}</span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => countdown.moveMonth(1)}
                className="flex size-7 items-center justify-center rounded-(--noksha-radius-sm) text-(--noksha-fg-muted) outline-none hover:bg-(--noksha-bg-subtle)"
              >
                <ChevronIcon className="size-4 -rotate-90" />
              </button>
            </div>
            <CalendarGrid
              calendar={countdown}
              dayClassName={({ selected, today, disabled, outsideMonth }) =>
                cx(
                  'hover:bg-(--noksha-accent-subtle) focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-1',
                  outsideMonth && 'text-(--noksha-fg-subtle)',
                  today && !selected && 'font-semibold text-(--noksha-accent-fg)',
                  selected &&
                    'rounded-full bg-(--noksha-accent-solid) font-semibold text-(--noksha-accent-ink)',
                  disabled && 'pointer-events-none opacity-40',
                )
              }
            />
          </FocusScope>
        </Portal>
      ) : null}
    </div>
  );
}
