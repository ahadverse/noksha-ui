'use client';

import { FloatingButton, FloatingMenu } from '@noksha-ui/react';
import * as React from 'react';

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
    <path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 13.5 6 9Z" strokeLinecap="round" strokeLinejoin="round" />
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
    <path d="M4 8a2 2 0 0 1 2-2h1.5l1-2h7l1 2H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

export default function ButtonFloating() {
  const simple = React.useRef<HTMLDivElement>(null);
  const extended = React.useRef<HTMLDivElement>(null);
  const menu = React.useRef<HTMLDivElement>(null);
  const [last, setLast] = React.useState<string | null>(null);

  const gradient = React.useRef<HTMLDivElement>(null);
  const glow = React.useRef<HTMLDivElement>(null);
  const topLeft = React.useRef<HTMLDivElement>(null);
  const bottomCenter = React.useRef<HTMLDivElement>(null);
  const iconMenu = React.useRef<HTMLDivElement>(null);
  const customIconMenu = React.useRef<HTMLDivElement>(null);
  const [lastIcon, setLastIcon] = React.useState<string | null>(null);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel ref={simple} title="Simple">
          <FloatingButton
            container={simple}
            label="New item"
            icon={<PlusIcon />}
            offset={16}
            size="md"
          />
        </Panel>

        <Panel ref={extended} title="Extended">
          <FloatingButton
            container={extended}
            extended
            label="Compose"
            icon={<PenIcon />}
            offset={16}
            size="md"
            tone="success"
          />
        </Panel>

        <Panel ref={gradient} title="Gradient variant">
          <FloatingButton
            container={gradient}
            extended
            label="Boost"
            icon={<SparkleIcon />}
            offset={16}
            size="md"
            variant="gradient"
            tone="accent"
          />
        </Panel>

        <Panel ref={glow} title="Glow + pulse effect">
          <FloatingButton
            container={glow}
            label="Alerts"
            icon={<BellIcon />}
            offset={16}
            size="md"
            variant="glow"
            tone="danger"
            effect="pulse"
          />
        </Panel>

        <Panel ref={topLeft} title="Top-left placement">
          <FloatingButton
            container={topLeft}
            label="Add"
            icon={<PlusIcon />}
            offset={16}
            size="md"
            placement="top-left"
            tone="info"
          />
        </Panel>

        <Panel ref={bottomCenter} title="Bottom-center placement">
          <FloatingButton
            container={bottomCenter}
            extended
            label="Continue"
            icon={<CheckIcon />}
            offset={16}
            size="md"
            placement="bottom-center"
            variant="soft"
            tone="success"
          />
        </Panel>
      </div>

      <Panel ref={menu} tall title={last ? `Expandable — picked ${last}` : 'Expandable — open it'}>
        <FloatingMenu
          container={menu}
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
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2">
        <Panel ref={iconMenu} tall title={lastIcon ? `Icons only — picked ${lastIcon}` : 'Icons only — labels hidden'}>
          <FloatingMenu
            container={iconMenu}
            label="Share"
            icon={<ChatIcon />}
            offset={16}
            size="md"
            variant="glass"
            tone="accent"
            hideActionLabels
            actions={[
              { id: 'chat', label: 'Message', icon: <ChatIcon />, onSelect: () => setLastIcon('Message') },
              { id: 'photo', label: 'Photo', icon: <CameraIcon />, tone: 'info', onSelect: () => setLastIcon('Photo') },
              { id: 'link', label: 'Link', icon: <LinkIcon />, tone: 'success', onSelect: () => setLastIcon('Link') },
            ]}
          />
        </Panel>

        <Panel ref={customIconMenu} tall title="Custom open icon">
          <FloatingMenu
            container={customIconMenu}
            label="Options"
            icon={<PlusIcon />}
            openIcon={<XIcon />}
            offset={16}
            size="md"
            variant="solid"
            tone="neutral"
            actions={[
              { id: 'doc2', label: 'Document', icon: <DocIcon /> },
              { id: 'image2', label: 'Image', icon: <ImageIcon />, tone: 'info' },
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}

const Panel = React.forwardRef<
  HTMLDivElement,
  { title: string; tall?: boolean; children: React.ReactNode }
>(function Panel({ title, tall = false, children }, ref) {
  return (
    <div
      ref={ref}
      className={`noksha-canvas-bg relative overflow-hidden rounded-xl border border-line-subtle bg-surface ${
        tall ? 'h-72' : 'h-44'
      }`}
    >
      <p className="p-3 font-medium text-fg-muted text-xs">{title}</p>
      {children}
    </div>
  );
});
