'use client';

import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

interface Option {
  value: string;
  label: string;
}

const PLANS: Option[] = [
  { value: 'starter', label: 'Starter' },
  { value: 'growth', label: 'Growth' },
  { value: 'scale', label: 'Scale' },
  { value: 'enterprise', label: 'Enterprise' },
];

const REGIONS: Option[] = [
  { value: 'iad', label: 'Washington, D.C.' },
  { value: 'fra', label: 'Frankfurt' },
  { value: 'sin', label: 'Singapore' },
  { value: 'gru', label: 'São Paulo' },
];

const BRANCHES: Option[] = [
  { value: 'main', label: 'main' },
  { value: 'develop', label: 'develop' },
  { value: 'release', label: 'release/4.2' },
  { value: 'hotfix', label: 'hotfix/auth' },
];

const ROLES: Option[] = [
  { value: 'owner', label: 'Owner' },
  { value: 'admin', label: 'Admin' },
  { value: 'member', label: 'Member' },
  { value: 'guest', label: 'Guest' },
];

const CURRENCIES: Option[] = [
  { value: 'usd', label: 'US Dollar' },
  { value: 'eur', label: 'Euro' },
  { value: 'jpy', label: 'Japanese Yen' },
  { value: 'bdt', label: 'Bangladeshi Taka' },
];

const STATUSES: Option[] = [
  { value: 'live', label: 'Live' },
  { value: 'building', label: 'Building' },
  { value: 'queued', label: 'Queued' },
  { value: 'failed', label: 'Failed' },
];

const RUNTIMES: Option[] = [
  { value: 'node22', label: 'Node 22' },
  { value: 'bun1', label: 'Bun 1.1' },
  { value: 'deno2', label: 'Deno 2' },
  { value: 'python312', label: 'Python 3.12' },
];

const TEAMS: Option[] = [
  { value: 'platform', label: 'Platform' },
  { value: 'growth', label: 'Growth' },
  { value: 'design', label: 'Design' },
  { value: 'support', label: 'Support' },
];

const WINDOWS: Option[] = [
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last quarter' },
];

const DENSITIES: Option[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'cozy', label: 'Cozy' },
  { value: 'roomy', label: 'Roomy' },
];

const STATUS_DOTS: Record<string, string> = {
  live: 'var(--noksha-success-solid)',
  building: 'var(--noksha-warning-solid)',
  queued: 'var(--noksha-fg-subtle)',
  failed: 'var(--noksha-danger-solid)',
};

function renderOptions(options: Option[]) {
  return options.map((option) => (
    <SelectItem key={option.value} value={option.value}>
      {option.label}
    </SelectItem>
  ));
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </svg>
  );
}

function BranchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <circle cx="6" cy="5" r="2.5" />
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="9" r="2.5" />
      <path d="M6 7.5v9M8.5 9H14a4 4 0 0 1 4 4v1" />
    </svg>
  );
}

export default function SelectShells() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Outline">
        <SelectRoot defaultValue="growth">
          <SelectTrigger variant="outline" aria-label="Plan" placeholder="Select a plan" />
          <SelectContent matchTriggerWidth>{renderOptions(PLANS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Soft">
        <SelectRoot defaultValue="fra">
          <SelectTrigger variant="soft" aria-label="Region" placeholder="Select a region" />
          <SelectContent matchTriggerWidth>{renderOptions(REGIONS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Ghost">
        <SelectRoot defaultValue="member">
          <SelectTrigger variant="ghost" aria-label="Role" placeholder="Select a role" />
          <SelectContent matchTriggerWidth>{renderOptions(ROLES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Pill">
        <SelectRoot defaultValue="usd">
          <SelectTrigger
            variant="soft"
            className="rounded-full px-4 hover:bg-(--noksha-accent-subtle)"
            aria-label="Currency"
            placeholder="Select a currency"
          />
          <SelectContent className="rounded-2xl" matchTriggerWidth>
            {renderOptions(CURRENCIES)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Underline">
        <SelectRoot defaultValue="7d">
          <SelectTrigger
            variant="ghost"
            className="rounded-none border-0 border-(--noksha-border-strong) border-b-2 px-0 hover:bg-transparent focus-visible:border-(--noksha-accent-solid)"
            aria-label="Time window"
            placeholder="Select a window"
          />
          <SelectContent matchTriggerWidth>{renderOptions(WINDOWS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Elevated">
        <SelectRoot defaultValue="platform">
          <SelectTrigger
            variant="outline"
            className="border-transparent bg-(--noksha-bg-surface) shadow-lg hover:border-transparent hover:shadow-xl"
            aria-label="Team"
            placeholder="Select a team"
          />
          <SelectContent className="shadow-xl" matchTriggerWidth>
            {renderOptions(TEAMS)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Accent bar">
        <SelectRoot defaultValue="node22">
          <SelectTrigger
            variant="soft"
            className="rounded-s-none border-s-4 border-s-(--noksha-accent-solid) ps-3"
            aria-label="Runtime"
            placeholder="Select a runtime"
          />
          <SelectContent matchTriggerWidth>{renderOptions(RUNTIMES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Inverse slab">
        <SelectRoot defaultValue="scale">
          <SelectTrigger
            variant="outline"
            className="border-transparent bg-(--noksha-bg-inverse) text-(--noksha-fg-inverse) hover:border-transparent hover:opacity-90 [&>svg]:text-(--noksha-fg-inverse)"
            aria-label="Plan"
            placeholder="Select a plan"
          />
          <SelectContent matchTriggerWidth>{renderOptions(PLANS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Dashed">
        <SelectRoot>
          <SelectTrigger
            variant="outline"
            className="border-2 border-dashed"
            aria-label="Team"
            placeholder="Nothing selected"
          />
          <SelectContent matchTriggerWidth>{renderOptions(TEAMS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Prefixed icon">
        <SelectRoot defaultValue="sin">
          <SelectTrigger
            variant="outline"
            aria-label="Region"
            placeholder="Select a region"
            renderValue={(value) => (
              <span className="flex items-center gap-2">
                <span className="size-4 shrink-0 text-(--noksha-fg-muted)">
                  <GlobeIcon />
                </span>
                <span className="truncate">
                  {REGIONS.find((region) => region.value === value)?.label ?? 'Select a region'}
                </span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderOptions(REGIONS)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Monospace compact">
        <SelectRoot defaultValue="main">
          <SelectTrigger
            variant="soft"
            size="xs"
            className="font-mono"
            aria-label="Branch"
            placeholder="Select a branch"
            renderValue={(value) => (
              <span className="flex items-center gap-1.5">
                <span className="size-3.5 shrink-0 text-(--noksha-fg-muted)">
                  <BranchIcon />
                </span>
                <span className="truncate">
                  {BRANCHES.find((branch) => branch.value === value)?.label ?? 'Select a branch'}
                </span>
              </span>
            )}
          />
          <SelectContent className="font-mono" matchTriggerWidth>
            {renderOptions(BRANCHES)}
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Status dot">
        <SelectRoot defaultValue="live">
          <SelectTrigger
            variant="outline"
            size="lg"
            className="ring-2 ring-(--noksha-accent-subtle)"
            aria-label="Deployment status"
            placeholder="Select a status"
            renderValue={(value) => (
              <span className="flex items-center gap-2.5">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: STATUS_DOTS[value ?? ''] ?? 'transparent' }}
                />
                <span className="truncate">
                  {STATUSES.find((entry) => entry.value === value)?.label ?? 'Select a status'}
                </span>
              </span>
            )}
          />
          <SelectContent matchTriggerWidth>{renderOptions(STATUSES)}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <div className="min-w-0 sm:col-span-2">
        <DemoTile label="Densities">
          <SelectRoot defaultValue="cozy">
            <SelectTrigger
              variant="soft"
              size="sm"
              className="rounded-(--noksha-radius-lg) tracking-(--noksha-tracking-tight)"
              aria-label="Density"
              placeholder="Select a density"
            />
            <SelectContent matchTriggerWidth>{renderOptions(DENSITIES)}</SelectContent>
          </SelectRoot>
        </DemoTile>
      </div>
    </div>
  );
}
