'use client';

import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

interface Row {
  value: string;
  title: string;
  detail: string;
  trailing?: string;
}

const PLANS: Row[] = [
  { value: 'hobby', title: 'Hobby', detail: '1 project, community support', trailing: '$0' },
  { value: 'pro', title: 'Pro', detail: '10 projects, email support', trailing: '$20' },
  { value: 'team', title: 'Team', detail: 'Unlimited projects, SSO', trailing: '$60' },
  { value: 'scale', title: 'Scale', detail: 'Dedicated infrastructure', trailing: '$240' },
];

const MEMBERS: Row[] = [
  { value: 'ah', title: 'Ahad Hossain', detail: 'ahad@noksha.dev', trailing: 'Owner' },
  { value: 'mr', title: 'Maya Rahman', detail: 'maya@noksha.dev', trailing: 'Admin' },
  { value: 'ki', title: 'Kenji Ito', detail: 'kenji@noksha.dev', trailing: 'Member' },
  { value: 'ls', title: 'Lucia Santos', detail: 'lucia@noksha.dev', trailing: 'Guest' },
];

const REPOS: Row[] = [
  { value: 'ui', title: 'noksha-ui', detail: 'TypeScript · updated 2h ago' },
  { value: 'api', title: 'noksha-api', detail: 'Go · updated yesterday' },
  { value: 'docs', title: 'noksha-docs', detail: 'MDX · updated last week' },
];

function stackedRows(rows: Row[]) {
  return rows.map((row) => (
    <SelectItem key={row.value} value={row.value} textValue={row.title}>
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-(--noksha-weight-medium)">{row.title}</span>
        <span className="truncate text-(--noksha-fg-subtle) text-xs">{row.detail}</span>
      </span>
    </SelectItem>
  ));
}

function splitRows(rows: Row[]) {
  return rows.map((row) => (
    <SelectItem key={row.value} value={row.value} textValue={row.title}>
      <span className="flex w-full min-w-0 items-center justify-between gap-3">
        <span className="truncate">{row.title}</span>
        <span className="shrink-0 text-(--noksha-fg-subtle) text-xs">{row.trailing}</span>
      </span>
    </SelectItem>
  ));
}

function avatarRows(rows: Row[]) {
  return rows.map((row) => (
    <SelectItem key={row.value} value={row.value} textValue={row.title}>
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) font-(--noksha-weight-semibold) text-(--noksha-accent-fg) text-[11px]">
          {row.title
            .split(' ')
            .map((part) => part[0])
            .join('')}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate">{row.title}</span>
          <span className="truncate text-(--noksha-fg-subtle) text-xs">{row.detail}</span>
        </span>
      </span>
    </SelectItem>
  ));
}

export default function SelectRichRows() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Two-line rows">
        <SelectRoot defaultValue="pro">
          <SelectTrigger aria-label="Plan" placeholder="Select a plan" />
          <SelectContent matchTriggerWidth>{stackedRows(PLANS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Title and price">
        <SelectRoot defaultValue="team">
          <SelectTrigger variant="soft" aria-label="Plan" placeholder="Select a plan" />
          <SelectContent matchTriggerWidth>{splitRows(PLANS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Avatar rows">
        <SelectRoot defaultValue="ah">
          <SelectTrigger aria-label="Assignee" placeholder="Assign to" />
          <SelectContent matchTriggerWidth>{avatarRows(MEMBERS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Member and role">
        <SelectRoot defaultValue="mr">
          <SelectTrigger variant="ghost" aria-label="Assignee" placeholder="Assign to" />
          <SelectContent matchTriggerWidth>{splitRows(MEMBERS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Repo rows">
        <SelectRoot defaultValue="ui">
          <SelectTrigger
            className="font-mono"
            aria-label="Repository"
            placeholder="Select a repo"
          />
          <SelectContent className="font-mono" matchTriggerWidth>
            {stackedRows(REPOS)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Wide list">
        <SelectRoot defaultValue="scale">
          <SelectTrigger className="w-full" aria-label="Plan" placeholder="Select a plan" />
          <SelectContent className="min-w-80">{stackedRows(PLANS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Elevated surface">
        <SelectRoot defaultValue="ki">
          <SelectTrigger
            className="border-transparent shadow-md hover:border-transparent"
            aria-label="Assignee"
            placeholder="Assign to"
          />
          <SelectContent className="shadow-xl" matchTriggerWidth>
            {avatarRows(MEMBERS)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Pill trigger">
        <SelectRoot defaultValue="hobby">
          <SelectTrigger
            variant="soft"
            className="rounded-full px-4"
            aria-label="Plan"
            placeholder="Select a plan"
          />
          <SelectContent className="rounded-2xl" matchTriggerWidth>
            {stackedRows(PLANS)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Large trigger">
        <SelectRoot defaultValue="ls">
          <SelectTrigger size="lg" aria-label="Assignee" placeholder="Assign to" />
          <SelectContent matchTriggerWidth>{avatarRows(MEMBERS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Compact trigger">
        <SelectRoot defaultValue="docs">
          <SelectTrigger
            size="xs"
            variant="soft"
            aria-label="Repository"
            placeholder="Select a repo"
          />
          <SelectContent matchTriggerWidth>{stackedRows(REPOS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Disabled rich row">
        <SelectRoot defaultValue="hobby">
          <SelectTrigger aria-label="Plan" placeholder="Select a plan" />
          <SelectContent matchTriggerWidth>
            <SelectItem value="hobby" textValue="Hobby">
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-(--noksha-weight-medium)">Hobby</span>
                <span className="truncate text-(--noksha-fg-subtle) text-xs">Free forever</span>
              </span>
            </SelectItem>
            <SelectItem value="scale" disabled textValue="Scale">
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-(--noksha-weight-medium)">Scale</span>
                <span className="truncate text-(--noksha-fg-subtle) text-xs">Contact sales</span>
              </span>
            </SelectItem>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Inverse trigger">
        <SelectRoot defaultValue="api">
          <SelectTrigger
            className="border-transparent bg-(--noksha-bg-inverse) text-(--noksha-fg-inverse) hover:border-transparent [&>svg]:text-(--noksha-fg-inverse)"
            aria-label="Repository"
            placeholder="Select a repo"
          />
          <SelectContent matchTriggerWidth>{stackedRows(REPOS)}</SelectContent>
        </SelectRoot>
      </DemoTile>
    </div>
  );
}
