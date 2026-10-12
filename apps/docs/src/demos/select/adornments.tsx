'use client';

import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

interface Row {
  value: string;
  label: string;
  meta?: string;
}

const COUNTRIES: Row[] = [
  { value: 'bd', label: 'Bangladesh', meta: '+880' },
  { value: 'de', label: 'Germany', meta: '+49' },
  { value: 'jp', label: 'Japan', meta: '+81' },
  { value: 'br', label: 'Brazil', meta: '+55' },
];

const PEOPLE: Row[] = [
  { value: 'ah', label: 'Ahad Hossain', meta: 'AH' },
  { value: 'mr', label: 'Maya Rahman', meta: 'MR' },
  { value: 'ki', label: 'Kenji Ito', meta: 'KI' },
  { value: 'ls', label: 'Lucia Santos', meta: 'LS' },
];

const INBOXES: Row[] = [
  { value: 'all', label: 'All mail', meta: '1284' },
  { value: 'unread', label: 'Unread', meta: '37' },
  { value: 'flagged', label: 'Flagged', meta: '6' },
  { value: 'archive', label: 'Archive', meta: '912' },
];

const PRICES: Row[] = [
  { value: 'hobby', label: 'Hobby', meta: '$0' },
  { value: 'pro', label: 'Pro', meta: '$20' },
  { value: 'team', label: 'Team', meta: '$60' },
  { value: 'scale', label: 'Scale', meta: '$240' },
];

const SEVERITY: Row[] = [
  { value: 'info', label: 'Info' },
  { value: 'low', label: 'Low' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

const SEVERITY_COLOR: Record<string, string> = {
  info: 'var(--noksha-fg-subtle)',
  low: 'var(--noksha-success-solid)',
  high: 'var(--noksha-warning-solid)',
  critical: 'var(--noksha-danger-solid)',
};

const FLAGS: Record<string, string> = { bd: '🇧🇩', de: '🇩🇪', jp: '🇯🇵', br: '🇧🇷' };

function renderRows(rows: Row[]) {
  return rows.map((row) => (
    <SelectItem key={row.value} value={row.value}>
      {row.label}
    </SelectItem>
  ));
}

function find(rows: Row[], value: string | undefined) {
  return rows.find((row) => row.value === value);
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export default function SelectAdornments() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Flag prefix">
        <SelectRoot defaultValue="bd">
          <SelectTrigger
            aria-label="Country"
            placeholder="Select a country"
            renderValue={(value) => (
              <span className="flex items-center gap-2">
                <span aria-hidden="true">{FLAGS[value ?? ''] ?? '🏳️'}</span>
                <span className="truncate">
                  {find(COUNTRIES, value)?.label ?? 'Select a country'}
                </span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(COUNTRIES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Dial code suffix">
        <SelectRoot defaultValue="de">
          <SelectTrigger
            variant="soft"
            aria-label="Country"
            placeholder="Select a country"
            renderValue={(value) => (
              <span className="flex w-full items-center justify-between gap-2">
                <span className="truncate">{find(COUNTRIES, value)?.label ?? 'Country'}</span>
                <span className="font-mono text-(--noksha-fg-muted) text-xs">
                  {find(COUNTRIES, value)?.meta}
                </span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(COUNTRIES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Avatar initials">
        <SelectRoot defaultValue="ah">
          <SelectTrigger
            aria-label="Assignee"
            placeholder="Assign to"
            renderValue={(value) => (
              <span className="flex items-center gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) font-(--noksha-weight-semibold) text-(--noksha-accent-fg) text-[10px]">
                  {find(PEOPLE, value)?.meta}
                </span>
                <span className="truncate">{find(PEOPLE, value)?.label ?? 'Assign to'}</span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(PEOPLE)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Count badge">
        <SelectRoot defaultValue="unread">
          <SelectTrigger
            variant="soft"
            aria-label="Mailbox view"
            placeholder="Select a view"
            renderValue={(value) => (
              <span className="flex w-full items-center justify-between gap-2">
                <span className="truncate">{find(INBOXES, value)?.label ?? 'View'}</span>
                <span className="rounded-full bg-(--noksha-bg-muted) px-1.5 py-0.5 font-mono text-(--noksha-fg-muted) text-[10px]">
                  {find(INBOXES, value)?.meta}
                </span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(INBOXES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Price suffix">
        <SelectRoot defaultValue="pro">
          <SelectTrigger
            size="lg"
            aria-label="Plan"
            placeholder="Select a plan"
            renderValue={(value) => (
              <span className="flex w-full items-baseline justify-between gap-2">
                <span className="truncate">{find(PRICES, value)?.label ?? 'Plan'}</span>
                <span className="font-(--noksha-weight-semibold) text-(--noksha-accent-fg)">
                  {find(PRICES, value)?.meta}
                  <span className="text-(--noksha-fg-subtle) text-xs">/mo</span>
                </span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(PRICES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Severity dot">
        <SelectRoot defaultValue="high">
          <SelectTrigger
            aria-label="Severity"
            placeholder="Select severity"
            renderValue={(value) => (
              <span className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: SEVERITY_COLOR[value ?? ''] ?? 'transparent' }}
                />
                <span className="truncate">{find(SEVERITY, value)?.label ?? 'Severity'}</span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(SEVERITY)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Leading search icon">
        <SelectRoot defaultValue="all">
          <SelectTrigger
            variant="soft"
            aria-label="Search scope"
            placeholder="Search scope"
            renderValue={(value) => (
              <span className="flex items-center gap-2">
                <span className="size-4 shrink-0 text-(--noksha-fg-muted)">
                  <SearchIcon />
                </span>
                <span className="truncate">{find(INBOXES, value)?.label ?? 'Scope'}</span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(INBOXES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Locked prefix">
        <SelectRoot disabled defaultValue="scale">
          <SelectTrigger
            aria-label="Plan"
            placeholder="Select a plan"
            renderValue={(value) => (
              <span className="flex items-center gap-2">
                <span className="size-4 shrink-0 text-(--noksha-fg-muted)">
                  <LockIcon />
                </span>
                <span className="truncate">{find(PRICES, value)?.label ?? 'Plan'}</span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(PRICES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Inline label">
        <SelectRoot defaultValue="jp">
          <SelectTrigger
            variant="outline"
            aria-label="Ships to"
            placeholder="Select a country"
            renderValue={(value) => (
              <span className="flex items-baseline gap-2">
                <span className="text-(--noksha-fg-subtle) text-xs">Ships to</span>
                <span className="truncate">{find(COUNTRIES, value)?.label ?? 'Country'}</span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(COUNTRIES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Keyboard hint">
        <SelectRoot defaultValue="flagged">
          <SelectTrigger
            variant="ghost"
            aria-label="Jump to mailbox"
            placeholder="Jump to"
            renderValue={(value) => (
              <span className="flex w-full items-center justify-between gap-2">
                <span className="truncate">{find(INBOXES, value)?.label ?? 'Jump to'}</span>
                <kbd className="rounded border border-(--noksha-border-default) px-1 font-mono text-(--noksha-fg-subtle) text-[10px]">
                  ⌘K
                </kbd>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(INBOXES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Uppercase code">
        <SelectRoot defaultValue="br">
          <SelectTrigger
            size="xs"
            variant="soft"
            className="font-mono"
            aria-label="Country code"
            placeholder="Country"
            renderValue={(value) => <span className="truncate uppercase">{value ?? 'code'}</span>}
          />
          <SelectContent matchTriggerWidth>{renderRows(COUNTRIES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Two-line trigger">
        <SelectRoot defaultValue="team">
          <SelectTrigger
            className="h-auto py-2"
            aria-label="Plan"
            placeholder="Select a plan"
            renderValue={(value) => (
              <span className="flex min-w-0 flex-col items-start">
                <span className="truncate font-(--noksha-weight-medium)">
                  {find(PRICES, value)?.label ?? 'Plan'}
                </span>
                <span className="truncate text-(--noksha-fg-subtle) text-xs">
                  {find(PRICES, value)?.meta} per month
                </span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderRows(PRICES)}</SelectContent>
        </SelectRoot>
      </DemoTile>
    </div>
  );
}
