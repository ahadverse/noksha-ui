'use client';

import { Spinner } from '@noksha-ui/react';
import * as React from 'react';

type Phase = 'idle' | 'installing' | 'installed';

export default function SwitchInstallProgress() {
  const [phase, setPhase] = React.useState<Phase>('idle');

  function start() {
    if (phase !== 'idle') return;
    setPhase('installing');
    window.setTimeout(() => setPhase('installed'), 2200);
  }

  return (
    <button
      type="button"
      onClick={phase === 'installed' ? () => setPhase('idle') : start}
      disabled={phase === 'installing'}
      className="flex items-center gap-2.5 rounded-full border-2 border-[#5b5bf0] py-1.5 pr-5 pl-1.5 font-medium text-[15px] text-fg transition-colors disabled:cursor-wait"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#5b5bf0] text-white">
        {phase === 'installing' ? (
          <Spinner size="sm" label={null} />
        ) : phase === 'installed' ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[18px]"
            aria-hidden="true"
          >
            <path d="M12 19V5m0 14-4-4m4 4 4-4" />
          </svg>
        )}
      </span>
      {phase === 'idle' ? 'Download' : phase === 'installing' ? 'Installing…' : 'Installed'}
    </button>
  );
}
