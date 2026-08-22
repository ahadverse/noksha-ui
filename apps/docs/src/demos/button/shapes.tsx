'use client';

import { Button, ToggleButton } from '@noksha-ui/react';
import * as React from 'react';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 3v12m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 19h16" strokeLinecap="round" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 13.5 6 9Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 19a2 2 0 0 0 4 0" strokeLinecap="round" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.8h7.2a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M12 20.5 4.6 13a5 5 0 0 1 7-7.1L12 6.3l.4-.4a5 5 0 0 1 7 7.1L12 20.5Z" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 5h16v11H8l-4 4Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="M8.2 10.8 15.8 6.2M8.2 13.2l7.6 4.6" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path
      d="M19.4 13a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V19a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H5a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H11a1.7 1.7 0 0 0 1-1.5V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V11a1.7 1.7 0 0 0 1.5 1H19a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5Z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8Z" />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);

const HelpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7" />
    <path d="M12 17h.01" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

function PlayPauseButton() {
  const [playing, setPlaying] = React.useState(false);
  return (
    <Button
      shape="circle"
      iconOnly
      variant="solid"
      tone="neutral"
      icon={playing ? <PauseIcon /> : <PlayIcon />}
      aria-label={playing ? 'Pause' : 'Play'}
      onClick={() => setPlaying((value) => !value)}
    />
  );
}

export default function ButtonShapes() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Row label="circle">
        <Button shape="circle" iconOnly icon={<SearchIcon />} aria-label="Search" />
        <Button shape="circle" variant="soft" aria-label="Account">
          A
        </Button>
        <Button
          shape="circle"
          iconOnly
          variant="outline"
          icon={<SearchIcon />}
          aria-label="Search"
        />
        <Button
          shape="circle"
          iconOnly
          variant="dashed"
          icon={<SearchIcon />}
          aria-label="Search"
        />
        <Button
          shape="circle"
          iconOnly
          variant="ghost"
          tone="danger"
          icon={<SearchIcon />}
          aria-label="Delete"
        />
      </Row>

      <Row label="round">
        <Button shape="round" icon={<SearchIcon />}>
          Search
        </Button>
        <Button shape="round" variant="outline" icon={<SearchIcon />}>
          Search
        </Button>
        <Button shape="round" variant="dashed" trailingIcon={<SearchIcon />}>
          Search
        </Button>
        <Button shape="round" variant="soft" tone="success" icon={<DownloadIcon />}>
          Download
        </Button>
      </Row>

      <Row label="real-world">
        <BadgeButton icon={<BellIcon />} label="Notifications" count={3} tone="danger" />
        <BadgeButton icon={<CartIcon />} label="Cart" count={2} tone="accent" />
        <span className="relative inline-flex">
          <Button shape="circle" iconOnly variant="ghost" tone="neutral" icon={<ChatIcon />} aria-label="Messages" />
          <span className="pointer-events-none absolute top-0.5 right-0.5 size-2 rounded-full bg-(--noksha-success-solid)" />
        </span>
        <ToggleButton shape="circle" iconOnly variant="outline" tone="danger" icon={<HeartIcon />} aria-label="Save to wishlist" />
        <Button shape="circle" iconOnly variant="soft" tone="neutral" icon={<ShareIcon />} aria-label="Share" />
        <Button shape="circle" iconOnly variant="soft" tone="neutral" icon={<SettingsIcon />} aria-label="Settings" />
        <Button shape="circle" variant="soft" tone="info" aria-label="Profile">
          JD
        </Button>
      </Row>

      <Row label="more">
        <Button shape="circle" iconOnly variant="ghost" tone="neutral" icon={<ChevronLeftIcon />} aria-label="Back" />
        <Button shape="circle" iconOnly variant="soft" tone="neutral" icon={<XIcon />} aria-label="Close" />
        <PlayPauseButton />
        <ToggleButton
          shape="circle"
          iconOnly
          variant="outline"
          tone="warning"
          icon={<StarIcon />}
          aria-label="Rate this"
          className="[&[aria-pressed=true]_svg]:fill-current"
        />
        <Button shape="circle" iconOnly variant="ghost" tone="neutral" icon={<MoreIcon />} aria-label="More options" />
        <ToggleButton
          shape="circle"
          iconOnly
          variant="outline"
          tone="danger"
          icon={<MicIcon />}
          aria-label="Mute microphone"
          className="[&[aria-pressed=true]]:bg-(--noksha-danger-solid) [&[aria-pressed=true]]:text-white [&[aria-pressed=true]_svg]:opacity-70"
        />
        <Button shape="circle" iconOnly variant="dashed" tone="neutral" icon={<HelpIcon />} aria-label="Help" />
        <Button shape="circle" iconOnly variant="ghost" tone="danger" icon={<PinIcon />} aria-label="Location" />
      </Row>

      <Row label="sizes">
        <Button shape="circle" iconOnly size="xs" icon={<SearchIcon />} aria-label="Search" />
        <Button shape="circle" iconOnly size="sm" icon={<SearchIcon />} aria-label="Search" />
        <Button shape="circle" iconOnly size="lg" icon={<SearchIcon />} aria-label="Search" />
        <Button shape="round" size="xs">
          Extra small
        </Button>
        <Button shape="round" size="lg">
          Large
        </Button>
      </Row>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <code className="w-14 shrink-0 text-fg-subtle text-xs">{label}</code>
      {children}
    </div>
  );
}

function BadgeButton({
  icon,
  label,
  count,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  tone: 'danger' | 'accent';
}) {
  return (
    <span className="relative inline-flex">
      <Button shape="circle" iconOnly variant="ghost" tone="neutral" icon={icon} aria-label={label} />
      <span
        className={`pointer-events-none absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full font-semibold text-[0.6rem] text-white ${
          tone === 'danger' ? 'bg-(--noksha-danger-solid)' : 'bg-(--noksha-accent-solid)'
        }`}
      >
        {count}
      </span>
    </span>
  );
}
