'use client';

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function SelectGrouped() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Two groups">
        <SelectRoot defaultValue="ts">
          <SelectTrigger aria-label="Language" placeholder="Pick a language" />
          <SelectContent matchTriggerWidth>
            <SelectGroup label="Typed">
              <SelectItem value="ts">TypeScript</SelectItem>
              <SelectItem value="rs">Rust</SelectItem>
            </SelectGroup>
            <SelectGroup label="Dynamic">
              <SelectItem value="js">JavaScript</SelectItem>
              <SelectItem value="py">Python</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Three groups">
        <SelectRoot defaultValue="iad">
          <SelectTrigger aria-label="Region" placeholder="Pick a region" />
          <SelectContent matchTriggerWidth>
            <SelectGroup label="Americas">
              <SelectItem value="iad">Washington, D.C.</SelectItem>
              <SelectItem value="sfo">San Francisco</SelectItem>
            </SelectGroup>
            <SelectGroup label="Europe">
              <SelectItem value="fra">Frankfurt</SelectItem>
              <SelectItem value="lhr">London</SelectItem>
            </SelectGroup>
            <SelectGroup label="Asia">
              <SelectItem value="sin">Singapore</SelectItem>
              <SelectItem value="nrt">Tokyo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Ungrouped first">
        <SelectRoot defaultValue="recent">
          <SelectTrigger variant="soft" aria-label="Filter" placeholder="Pick a filter" />
          <SelectContent matchTriggerWidth>
            <SelectItem value="recent">Most recent</SelectItem>
            <SelectGroup label="By status">
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Disabled inside group">
        <SelectRoot defaultValue="pro">
          <SelectTrigger aria-label="Plan" placeholder="Pick a plan" />
          <SelectContent matchTriggerWidth>
            <SelectGroup label="Self-serve">
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
            </SelectGroup>
            <SelectGroup label="Sales-assisted">
              <SelectItem value="team" disabled>
                Team — contact sales
              </SelectItem>
              <SelectItem value="ent" disabled>
                Enterprise — contact sales
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Single group">
        <SelectRoot defaultValue="mon">
          <SelectTrigger variant="ghost" aria-label="Day" placeholder="Pick a day" />
          <SelectContent matchTriggerWidth>
            <SelectGroup label="Weekdays">
              <SelectItem value="mon">Monday</SelectItem>
              <SelectItem value="tue">Tuesday</SelectItem>
              <SelectItem value="wed">Wednesday</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Emoji labels">
        <SelectRoot defaultValue="bug">
          <SelectTrigger aria-label="Issue type" placeholder="Issue type" />
          <SelectContent matchTriggerWidth>
            <SelectGroup label="🐞 Defects">
              <SelectItem value="bug">Bug report</SelectItem>
              <SelectItem value="regress">Regression</SelectItem>
            </SelectGroup>
            <SelectGroup label="✨ Changes">
              <SelectItem value="feat">Feature request</SelectItem>
              <SelectItem value="docs">Documentation</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Pill trigger">
        <SelectRoot defaultValue="usd">
          <SelectTrigger
            variant="soft"
            className="rounded-full px-4"
            aria-label="Currency"
            placeholder="Pick a currency"
          />
          <SelectContent className="rounded-2xl" matchTriggerWidth>
            <SelectGroup label="Major">
              <SelectItem value="usd">US Dollar</SelectItem>
              <SelectItem value="eur">Euro</SelectItem>
            </SelectGroup>
            <SelectGroup label="Regional">
              <SelectItem value="bdt">Bangladeshi Taka</SelectItem>
              <SelectItem value="inr">Indian Rupee</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Four groups, scrolling">
        <SelectRoot defaultValue="s3">
          <SelectTrigger aria-label="Service" placeholder="Pick a service" />
          <SelectContent matchTriggerWidth>
            <SelectGroup label="Storage">
              <SelectItem value="s3">Object store</SelectItem>
              <SelectItem value="ebs">Block store</SelectItem>
            </SelectGroup>
            <SelectGroup label="Compute">
              <SelectItem value="vm">Virtual machines</SelectItem>
              <SelectItem value="fn">Functions</SelectItem>
            </SelectGroup>
            <SelectGroup label="Database">
              <SelectItem value="pg">Postgres</SelectItem>
              <SelectItem value="redis">Redis</SelectItem>
            </SelectGroup>
            <SelectGroup label="Network">
              <SelectItem value="cdn">CDN</SelectItem>
              <SelectItem value="lb">Load balancer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Uppercase group labels">
        <SelectRoot defaultValue="draft">
          <SelectTrigger size="sm" aria-label="Publishing state" placeholder="Pick a state" />
          <SelectContent
            className="[&_[class*=group-label]]:uppercase [&_[class*=group-label]]:tracking-wide"
            matchTriggerWidth
          >
            <SelectGroup label="Editing">
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">In review</SelectItem>
            </SelectGroup>
            <SelectGroup label="Published">
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Monospace values">
        <SelectRoot defaultValue="main">
          <SelectTrigger
            size="xs"
            variant="soft"
            className="font-mono"
            aria-label="Git ref"
            placeholder="Pick a ref"
          />
          <SelectContent className="font-mono" matchTriggerWidth>
            <SelectGroup label="Branches">
              <SelectItem value="main">main</SelectItem>
              <SelectItem value="develop">develop</SelectItem>
            </SelectGroup>
            <SelectGroup label="Tags">
              <SelectItem value="v4">v4.2.0</SelectItem>
              <SelectItem value="v3">v3.9.1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Wide list">
        <SelectRoot defaultValue="cus">
          <SelectTrigger aria-label="Table" placeholder="Pick a table" />
          <SelectContent className="min-w-72">
            <SelectGroup label="Core">
              <SelectItem value="cus">customers</SelectItem>
              <SelectItem value="ord">orders</SelectItem>
            </SelectGroup>
            <SelectGroup label="Analytics">
              <SelectItem value="ev">events_raw</SelectItem>
              <SelectItem value="ses">sessions_daily</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Elevated surface">
        <SelectRoot defaultValue="email">
          <SelectTrigger
            className="border-transparent shadow-md hover:border-transparent"
            aria-label="Channel"
            placeholder="Pick a channel"
          />
          <SelectContent className="shadow-xl" matchTriggerWidth>
            <SelectGroup label="Direct">
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectGroup>
            <SelectGroup label="In-app">
              <SelectItem value="push">Push</SelectItem>
              <SelectItem value="inbox">Inbox</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectRoot>
      </DemoTile>
    </div>
  );
}
