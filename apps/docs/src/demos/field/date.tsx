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
import { FieldDescription, FieldLabel, FieldRoot, useFieldControl } from '@noksha-ui/react';
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
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
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

const TRIGGER_CLASSES = cx(
  'w-full min-w-0 appearance-none',
  'rounded-(--noksha-radius-md) border',
  'text-(--noksha-fg-default)',
  'transition-[background-color,border-color,box-shadow,outline-color] duration-(--noksha-duration-fast) ease-out',
  'outline-none',
  'focus-visible:outline-(length:--noksha-ring-width) focus-visible:outline-offset-(--noksha-ring-offset) focus-visible:outline-(--noksha-ring) focus-visible:border-(--noksha-border-focus)',
  'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-(--noksha-bg-subtle)',
  'aria-invalid:border-(--noksha-danger-solid) aria-invalid:focus-visible:outline-(--noksha-danger-solid)',
  'border-(--noksha-border-default) bg-(--noksha-bg-surface) hover:border-(--noksha-border-strong)',
  'h-(--noksha-control-h-md) px-(--noksha-control-px-md) text-sm',
  'flex cursor-default items-center justify-between gap-2 text-start',
  '[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-(--noksha-fg-muted)',
);

const PANEL_CLASSES = cx(
  'z-(--noksha-z-dropdown) w-64 overflow-hidden outline-none',
  'rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle)',
  'bg-(--noksha-bg-surface) text-(--noksha-fg-default) shadow-(--noksha-shadow-lg)',
);

const HEADER_CLASSES = cx(
  'flex items-center justify-between gap-2',
  'bg-(--noksha-accent-solid) px-3 py-2.5 text-(--noksha-accent-ink)',
);

const NAV_BUTTON_CLASSES = cx(
  'flex size-7 items-center justify-center rounded-(--noksha-radius-sm) outline-none',
  'text-(--noksha-accent-ink) hover:bg-(--noksha-accent-ink)/15 active:bg-(--noksha-accent-ink)/25',
  'focus-visible:outline-2 focus-visible:outline-(--noksha-accent-ink) focus-visible:outline-offset-1',
);

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

export default function FieldDate() {
  const today = React.useMemo(() => startOfDay(new Date()), []);
  const min = today;
  const max = React.useMemo(() => addDays(today, 90), [today]);

  const [selected, setSelected] = React.useState(() => addDays(today, 7));
  const [viewMonth, setViewMonth] = React.useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  );
  const [focusedDate, setFocusedDate] = React.useState(selected);
  const [open, setOpen] = React.useState(false);

  const field = useFieldControl();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const present = usePresence(open, contentRef);
  const position = useAnchorPosition({
    open: present,
    placement: 'bottom-start',
    offset: 6,
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

  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5">
            <CalendarIcon />
          </span>
          <FieldLabel>Departure date</FieldLabel>
        </div>
        <button
          ref={composeRefs(triggerRef, position.setAnchor)}
          type="button"
          id={field.id}
          disabled={field.disabled}
          aria-invalid={field['aria-invalid']}
          aria-describedby={field['aria-describedby']}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={TRIGGER_CLASSES}
          onClick={() => (open ? setOpen(false) : openPicker())}
          onKeyDown={(event) => {
            if (
              !open &&
              (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')
            ) {
              event.preventDefault();
              openPicker();
            }
          }}
        >
          <span>{TRIGGER_LABEL.format(selected)}</span>
          <CalendarIcon />
        </button>
        <input type="hidden" name="departure" value={toISODate(selected)} />
        <FieldDescription>
          {daysOut === 0 ? 'Today' : `${daysOut} day${daysOut === 1 ? '' : 's'} from today`} —
          bookable up to 90 days out.
        </FieldDescription>
      </FieldRoot>

      {present ? (
        <Portal>
          <FocusScope
            ref={composeRefs(contentRef, position.setFloating)}
            trapped
            autoFocus
            restoreFocus
            onMountAutoFocus={(event: Event) => {
              event.preventDefault();
              gridRef.current
                ?.querySelector<HTMLButtonElement>(`[data-date="${toISODate(focusedDate)}"]`)
                ?.focus({ preventScroll: true });
            }}
            style={position.floatingStyles}
            className={PANEL_CLASSES}
          >
            <div className={HEADER_CLASSES}>
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setViewMonth((view) => addMonthsKeepDay(view, -1))}
                className={NAV_BUTTON_CLASSES}
              >
                <ChevronIcon className="size-4 rotate-90" />
              </button>
              <span className="font-semibold text-sm">{MONTH_LABEL.format(viewMonth)}</span>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setViewMonth((view) => addMonthsKeepDay(view, 1))}
                className={NAV_BUTTON_CLASSES}
              >
                <ChevronIcon className="size-4 -rotate-90" />
              </button>
            </div>

            <div className="p-3">
              <div className="grid grid-cols-7 gap-1 text-center text-fg-muted text-xs">
                {WEEKDAYS.map((day, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: a fixed 7-day header never reorders
                  <span key={i}>{day}</span>
                ))}
              </div>

              {/* biome-ignore lint/a11y/useSemanticElements: a CSS-grid of buttons, not a data table */}
              <div
                ref={gridRef}
                role="grid"
                aria-label="Choose a date"
                onKeyDown={handleGridKeyDown}
                className="grid grid-cols-7 gap-1 pt-1"
              >
                {grid.map((date) => {
                  const disabled = isDisabled(date);
                  const outsideMonth = date.getMonth() !== viewMonth.getMonth();
                  const isSelected = isSameDay(date, selected);
                  const isToday = isSameDay(date, today);

                  return (
                    <button
                      key={toISODate(date)}
                      type="button"
                      data-date={toISODate(date)}
                      tabIndex={isSameDay(date, focusedDate) ? 0 : -1}
                      aria-label={FULL_LABEL.format(date)}
                      aria-pressed={isSelected}
                      aria-current={isToday ? 'date' : undefined}
                      disabled={disabled}
                      onClick={() => selectIfEnabled(date)}
                      onFocus={() => setFocusedDate(date)}
                      className={cx(
                        'flex size-8 items-center justify-center rounded-(--noksha-radius-sm) text-sm outline-none',
                        'hover:bg-(--noksha-accent-subtle)',
                        'focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-1',
                        outsideMonth && 'text-(--noksha-fg-subtle)',
                        isToday && !isSelected && 'font-semibold text-(--noksha-accent-fg)',
                        isSelected &&
                          'rounded-full bg-(--noksha-accent-solid) font-semibold text-(--noksha-accent-ink) hover:bg-(--noksha-accent-solid)',
                        disabled && 'pointer-events-none opacity-40',
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </FocusScope>
        </Portal>
      ) : null}
    </div>
  );
}
