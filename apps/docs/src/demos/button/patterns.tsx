'use client';

import { Button, ButtonGroup, CopyButton, ToggleButton } from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const BoldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 5h6.5a3.5 3.5 0 0 1 0 7H7zM7 12h7.5a3.5 3.5 0 0 1 0 7H7z" />
  </svg>
);

const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m12 4 2.4 5.2 5.6.7-4.2 3.9 1.1 5.6L12 16.7 7.1 19.4l1.1-5.6L4 9.9l5.6-.7Z" />
  </svg>
);

function RangeGroup() {
  const [range, setRange] = React.useState('Week');

  return (
    <ButtonGroup>
      <Button
        variant={range === 'Day' ? 'solid' : 'outline'}
        tone={range === 'Day' ? 'accent' : 'neutral'}
        aria-current={range === 'Day' ? 'true' : undefined}
        onClick={() => setRange('Day')}
      >
        Day
      </Button>
      <Button
        variant={range === 'Week' ? 'solid' : 'outline'}
        tone={range === 'Week' ? 'accent' : 'neutral'}
        aria-current={range === 'Week' ? 'true' : undefined}
        onClick={() => setRange('Week')}
      >
        Week
      </Button>
      <Button
        variant={range === 'Month' ? 'solid' : 'outline'}
        tone={range === 'Month' ? 'accent' : 'neutral'}
        aria-current={range === 'Month' ? 'true' : undefined}
        onClick={() => setRange('Month')}
      >
        Month
      </Button>
    </ButtonGroup>
  );
}

function StarToggle() {
  const [starred, setStarred] = React.useState(false);

  return (
    <ToggleButton
      variant="outline"
      tone="warning"
      pressed={starred}
      onPressedChange={setStarred}
      icon={<StarIcon />}
    >
      {starred ? 'Starred' : 'Star'}
    </ToggleButton>
  );
}

export default function ButtonPatterns() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Button group" className="items-center">
        <RangeGroup />
      </DemoTile>

      <DemoTile label="Toggle · uncontrolled" className="items-center">
        <ToggleButton variant="outline" defaultPressed icon={<BoldIcon />}>
          Bold
        </ToggleButton>
      </DemoTile>

      <DemoTile label="Toggle · controlled" className="items-center">
        <StarToggle />
      </DemoTile>

      <DemoTile label="Copy button" className="items-center">
        <CopyButton withLabel variant="outline" value="pnpm add @noksha-ui/react" />
      </DemoTile>
    </div>
  );
}
