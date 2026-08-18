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

export default function ButtonFloating() {
  const simple = React.useRef<HTMLDivElement>(null);
  const extended = React.useRef<HTMLDivElement>(null);
  const menu = React.useRef<HTMLDivElement>(null);
  const [last, setLast] = React.useState<string | null>(null);

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
      className={`noksha-grid-bg relative overflow-hidden rounded-xl border border-line-subtle bg-surface ${
        tall ? 'h-72' : 'h-44'
      }`}
    >
      <p className="p-3 font-medium text-fg-muted text-xs">{title}</p>
      {children}
    </div>
  );
});
