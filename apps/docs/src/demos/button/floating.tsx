'use client';

import { FloatingButton, FloatingMenu } from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

const PenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" strokeLinejoin="round" />
  </svg>
);

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path
      d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
      strokeLinejoin="round"
    />
    <path d="M14 3v5h5" strokeLinejoin="round" />
  </svg>
);

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m4 17 5-5 4 4 3-3 4 4" strokeLinejoin="round" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M10 14a4 4 0 0 0 6 .5l2-2a4 4 0 0 0-6-6l-1 1" strokeLinecap="round" />
    <path d="M14 10a4 4 0 0 0-6-.5l-2 2a4 4 0 0 0 6 6l1-1" strokeLinecap="round" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M11 2c.6 3.4 2.6 5.4 6 6-3.4.6-5.4 2.6-6 6-.6-3.4-2.6-5.4-6-6 3.4-.6 5.4-2.6 6-6Z" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path
      d="M6 9a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 13.5 6 9Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 19a2 2 0 0 0 4 0" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 5h16v11H8l-4 4Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path
      d="M4 8a2 2 0 0 1 2-2h1.5l1-2h7l1 2H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

function SimpleFab() {
  const box = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={box}
      className="noksha-canvas-bg relative h-44 overflow-hidden rounded-xl border border-line-subtle bg-surface"
    >
      <FloatingButton container={box} label="New item" icon={<PlusIcon />} offset={16} size="md" />
    </div>
  );
}

function ExtendedFab() {
  const box = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={box}
      className="noksha-canvas-bg relative h-44 overflow-hidden rounded-xl border border-line-subtle bg-surface"
    >
      <FloatingButton
        container={box}
        extended
        label="Compose"
        icon={<PenIcon />}
        offset={16}
        size="md"
        tone="success"
      />
    </div>
  );
}

function GradientFab() {
  const box = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={box}
      className="noksha-canvas-bg relative h-44 overflow-hidden rounded-xl border border-line-subtle bg-surface"
    >
      <FloatingButton
        container={box}
        extended
        label="Boost"
        icon={<SparkleIcon />}
        offset={16}
        size="md"
        variant="gradient"
        tone="accent"
      />
    </div>
  );
}

function GlowPulseFab() {
  const box = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={box}
      className="noksha-canvas-bg relative h-44 overflow-hidden rounded-xl border border-line-subtle bg-surface"
    >
      <FloatingButton
        container={box}
        label="Alerts"
        icon={<BellIcon />}
        offset={16}
        size="md"
        variant="glow"
        tone="danger"
        effect="pulse"
      />
    </div>
  );
}

function TopLeftFab() {
  const box = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={box}
      className="noksha-canvas-bg relative h-44 overflow-hidden rounded-xl border border-line-subtle bg-surface"
    >
      <FloatingButton
        container={box}
        label="Add"
        icon={<PlusIcon />}
        offset={16}
        size="md"
        placement="top-left"
        tone="info"
      />
    </div>
  );
}

function BottomCenterFab() {
  const box = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={box}
      className="noksha-canvas-bg relative h-44 overflow-hidden rounded-xl border border-line-subtle bg-surface"
    >
      <FloatingButton
        container={box}
        extended
        label="Continue"
        icon={<CheckIcon />}
        offset={16}
        size="md"
        placement="bottom-center"
        variant="soft"
        tone="success"
      />
    </div>
  );
}

function ExpandableMenu() {
  const box = React.useRef<HTMLDivElement>(null);
  const [last, setLast] = React.useState<string | null>(null);

  return (
    <div
      ref={box}
      className="noksha-canvas-bg relative h-72 overflow-hidden rounded-xl border border-line-subtle bg-surface"
    >
      <p className="p-3 font-medium text-fg-muted text-xs">
        {last ? `Picked ${last}` : 'Open the menu'}
      </p>
      <FloatingMenu
        container={box}
        label="Create"
        offset={16}
        size="md"
        actions={[
          {
            id: 'doc',
            label: 'Document',
            icon: <DocIcon />,
            onSelect: () => setLast('Document'),
          },
          {
            id: 'image',
            label: 'Image',
            icon: <ImageIcon />,
            tone: 'info',
            onSelect: () => setLast('Image'),
          },
          {
            id: 'link',
            label: 'Link',
            icon: <LinkIcon />,
            tone: 'accent',
            onSelect: () => setLast('Link'),
          },
        ]}
      />
    </div>
  );
}

function IconOnlyMenu() {
  const box = React.useRef<HTMLDivElement>(null);
  const [last, setLast] = React.useState<string | null>(null);

  return (
    <div
      ref={box}
      className="noksha-canvas-bg relative h-72 overflow-hidden rounded-xl border border-line-subtle bg-surface"
    >
      <p className="p-3 font-medium text-fg-muted text-xs">
        {last ? `Picked ${last}` : 'Labels hidden'}
      </p>
      <FloatingMenu
        container={box}
        label="Share"
        icon={<ChatIcon />}
        offset={16}
        size="md"
        variant="glass"
        tone="accent"
        hideActionLabels
        actions={[
          {
            id: 'chat',
            label: 'Message',
            icon: <ChatIcon />,
            onSelect: () => setLast('Message'),
          },
          {
            id: 'photo',
            label: 'Photo',
            icon: <CameraIcon />,
            tone: 'info',
            onSelect: () => setLast('Photo'),
          },
          {
            id: 'link',
            label: 'Link',
            icon: <LinkIcon />,
            tone: 'success',
            onSelect: () => setLast('Link'),
          },
        ]}
      />
    </div>
  );
}

function CustomIconMenu() {
  const box = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={box}
      className="noksha-canvas-bg relative h-72 overflow-hidden rounded-xl border border-line-subtle bg-surface"
    >
      <FloatingMenu
        container={box}
        label="Options"
        icon={<PlusIcon />}
        openIcon={<XIcon />}
        offset={16}
        size="md"
        variant="solid"
        tone="neutral"
        actions={[
          { id: 'doc', label: 'Document', icon: <DocIcon /> },
          { id: 'image', label: 'Image', icon: <ImageIcon />, tone: 'info' },
        ]}
      />
    </div>
  );
}

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

export default function ButtonFloating() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="FloatingButton">
        <DemoTile label="Simple">
          <SimpleFab />
        </DemoTile>

        <DemoTile label="Extended">
          <ExtendedFab />
        </DemoTile>

        <DemoTile label="Gradient variant">
          <GradientFab />
        </DemoTile>

        <DemoTile label="Glow + pulse effect">
          <GlowPulseFab />
        </DemoTile>

        <DemoTile label="Top-left placement">
          <TopLeftFab />
        </DemoTile>

        <DemoTile label="Bottom-center placement">
          <BottomCenterFab />
        </DemoTile>
      </Group>

      <Group title="FloatingMenu">
        <div className="min-w-0 sm:col-span-2">
          <DemoTile label="Expandable">
            <ExpandableMenu />
          </DemoTile>
        </div>

        <DemoTile label="Icons only">
          <IconOnlyMenu />
        </DemoTile>

        <DemoTile label="Custom open icon">
          <CustomIconMenu />
        </DemoTile>
      </Group>
    </div>
  );
}
