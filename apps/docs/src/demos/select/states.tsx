'use client';

import {
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@noksha-ui/react';
import type * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const TIERS = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
  { value: 'enterprise', label: 'Enterprise' },
];

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h4 className="flex items-center gap-3 font-medium text-(--noksha-fg-subtle) text-xs uppercase tracking-wide after:h-px after:flex-1 after:bg-(--noksha-border-subtle)">
        {title}
      </h4>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function renderOptions() {
  return TIERS.map((tier) => (
    <SelectItem key={tier.value} value={tier.value}>
      {tier.label}
    </SelectItem>
  ));
}

export default function SelectStates() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="On the root">
        <DemoTile label="Default">
          <SelectRoot defaultValue="pro">
            <SelectTrigger aria-label="Tier" placeholder="Select a tier" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Placeholder">
          <SelectRoot>
            <SelectTrigger aria-label="Tier" placeholder="Nothing selected yet" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Disabled">
          <SelectRoot disabled defaultValue="team">
            <SelectTrigger aria-label="Tier" placeholder="Select a tier" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Disabled and empty">
          <SelectRoot disabled>
            <SelectTrigger aria-label="Tier" placeholder="Unavailable" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Invalid">
          <SelectRoot invalid>
            <SelectTrigger aria-label="Tier" placeholder="Select a tier" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="Invalid with value">
          <SelectRoot invalid defaultValue="free">
            <SelectTrigger aria-label="Tier" placeholder="Select a tier" />
            <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
          </SelectRoot>
        </DemoTile>

        <div className="min-w-0 sm:col-span-2">
          <DemoTile label="Required">
            <SelectRoot required>
              <SelectTrigger aria-label="Tier" placeholder="Required field" />
              <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
            </SelectRoot>
          </DemoTile>
        </div>
      </Group>

      <Group title="On options">
        <DemoTile label="Disabled option">
          <SelectRoot defaultValue="pro">
            <SelectTrigger aria-label="Tier" placeholder="Select a tier" />
            <SelectContent matchTriggerWidth>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="team" disabled>
                Team — seats full
              </SelectItem>
              <SelectItem value="enterprise" disabled>
                Enterprise — contact sales
              </SelectItem>
            </SelectContent>
          </SelectRoot>
        </DemoTile>

        <DemoTile label="All options disabled">
          <SelectRoot>
            <SelectTrigger aria-label="Tier" placeholder="No tier available" />
            <SelectContent matchTriggerWidth>
              {TIERS.map((tier) => (
                <SelectItem key={tier.value} value={tier.value} disabled>
                  {tier.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </DemoTile>
      </Group>

      <Group title="With FieldRoot">
        <DemoTile label="With description">
          <FieldRoot>
            <FieldLabel>Billing tier</FieldLabel>
            <SelectRoot defaultValue="team">
              <SelectTrigger placeholder="Select a tier" />
              <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
            </SelectRoot>
            <FieldDescription>Changing this prorates the current period.</FieldDescription>
          </FieldRoot>
        </DemoTile>

        <DemoTile label="With error">
          <FieldRoot invalid>
            <FieldLabel>Billing tier</FieldLabel>
            <SelectRoot invalid>
              <SelectTrigger placeholder="Select a tier" />
              <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
            </SelectRoot>
            <FieldError>Pick a tier before continuing.</FieldError>
          </FieldRoot>
        </DemoTile>

        <div className="min-w-0 sm:col-span-2">
          <DemoTile label="Required with description">
            <FieldRoot>
              <FieldLabel>Support plan</FieldLabel>
              <SelectRoot required defaultValue="enterprise">
                <SelectTrigger placeholder="Select a plan" />
                <SelectContent matchTriggerWidth>{renderOptions()}</SelectContent>
              </SelectRoot>
              <FieldDescription>Enterprise includes a named engineer.</FieldDescription>
            </FieldRoot>
          </DemoTile>
        </div>
      </Group>
    </div>
  );
}
