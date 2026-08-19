'use client';

import { Button, ButtonGroup, CopyButton, ToggleButton } from '@noksha-ui/react';
import * as React from 'react';

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

export default function ButtonPatterns() {
  const [range, setRange] = React.useState('Week');
  const [starred, setStarred] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
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

      <div className="flex flex-wrap items-center justify-center gap-3">
        <ToggleButton variant="outline" defaultPressed icon={<BoldIcon />}>
          Bold
        </ToggleButton>

        <ToggleButton
          variant="outline"
          tone="warning"
          pressed={starred}
          onPressedChange={setStarred}
          icon={<StarIcon />}
        >
          {starred ? 'Starred' : 'Star'}
        </ToggleButton>

        <CopyButton withLabel variant="outline" value="pnpm add @noksha-ui/react" />
      </div>
    </div>
  );
}
