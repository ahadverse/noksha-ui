'use client';

import { Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const HIDE = 'absolute inset-0 z-10 size-full cursor-pointer opacity-0';

const ICONS = {
  profile: (
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5Z" />
  ),
  account: (
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3-1.8-.5a6.9 6.9 0 0 0-.7-1.7l1-1.6-1.4-1.4-1.6 1a6.9 6.9 0 0 0-1.7-.7L13.3 4h-2l-.5 1.8a6.9 6.9 0 0 0-1.7.7l-1.6-1L6.1 7l1 1.6a6.9 6.9 0 0 0-.7 1.7L4.6 11v2l1.8.5c.16.6.4 1.17.7 1.7l-1 1.6 1.4 1.4 1.6-1c.53.3 1.1.54 1.7.7l.5 1.8h2l.5-1.8a6.9 6.9 0 0 0 1.7-.7l1.6 1 1.4-1.4-1-1.6c.3-.53.54-1.1.7-1.7L20 13v-2Z" />
  ),
  appearance: <path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1 7 17M17 7l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />,
  accessibility: (
    <path d="M12 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 9l7-2 7 2M12 7v14M8 21l4-6 4 6" />
  ),
  notifications: (
    <path d="M6 10a6 6 0 1 1 12 0v4l1.5 3h-15L6 14v-4Zm4 9a2 2 0 0 0 4 0" />
  ),
};

const ITEMS = [
  { value: 'profile', label: 'Public profile', icon: ICONS.profile },
  { value: 'account', label: 'Account', icon: ICONS.account },
  { value: 'appearance', label: 'Appearance', icon: ICONS.appearance },
  { value: 'accessibility', label: 'Accessibility', icon: ICONS.accessibility },
  { value: 'notifications', label: 'Notifications', icon: ICONS.notifications },
];

export default function RadioNavList() {
  const [value, setValue] = React.useState('account');

  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      className="w-[220px] gap-0 rounded-lg bg-[#0d1117] p-1"
    >
      {ITEMS.map((item) => (
        <label
          key={item.value}
          className="group relative flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2.5 text-[13px] text-neutral-300 transition-colors has-[:checked]:bg-[#1a1f24] has-[:focus-visible]:bg-[#21262c] hover:bg-[#21262c]"
        >
          <Radio value={item.value} containerClassName={HIDE} />
          <span
            aria-hidden="true"
            className="-left-2.5 absolute inset-y-[5px] w-[3px] rounded-full bg-[#2f81f7] opacity-0 group-has-[:checked]:opacity-100"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0 text-neutral-400"
            aria-hidden="true"
          >
            {item.icon}
          </svg>
          {item.label}
        </label>
      ))}
    </RadioGroup>
  );
}
