'use client';

import Link from 'next/link';
import * as React from 'react';

export interface TocLink {
  id: string;
  label: string;
}

export interface TocSection {
  /** Present when the section heading itself is a target (e.g. "API reference"). Absent for a plain group label like "Examples". */
  id?: string;
  label: string;
  items?: TocLink[];
}

/**
 * The right-hand "on this page" rail. It only decides which link is active —
 * the ids it links to are the same ones `PreviewFrame` and `PropsTable`
 * already render, so there is nothing here to keep in sync by hand.
 */
export function TableOfContents({ sections }: { sections: TocSection[] }) {
  const allIds = React.useMemo(
    () => sections.flatMap((section) => [section.id, ...(section.items?.map((item) => item.id) ?? [])].filter(Boolean) as string[]),
    [sections],
  );

  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // A band near the top of the viewport, not the whole viewport — so the
    // active link tracks whichever heading just scrolled past the top,
    // the same convention most "on this page" rails use.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActiveId(topmost.target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [allIds]);

  if (sections.length === 0) return null;

  return (
    <nav aria-label="On this page" className="flex flex-col gap-1 text-sm">
      <h2 className="mb-2 px-3 font-semibold text-fg text-xs uppercase tracking-wider">On this page</h2>
      <ul className="flex flex-col gap-3">
        {sections.map((section) => (
          <li key={section.label}>
            <TocEntry id={section.id} label={section.label} active={activeId === section.id} />
            {section.items && section.items.length > 0 ? (
              <ul className="mt-1 flex flex-col gap-0.5 border-line-subtle border-s ps-3">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <TocEntry id={item.id} label={item.label} active={activeId === item.id} nested />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TocEntry({
  id,
  label,
  active,
  nested = false,
}: {
  id?: string;
  label: string;
  active: boolean;
  nested?: boolean;
}) {
  const className = [
    'block truncate rounded-md px-3 py-1 transition-colors',
    nested ? '' : 'font-medium',
    active ? 'text-accent-fg' : 'text-fg-muted',
  ].join(' ');

  // A group label with no id of its own (e.g. "Examples") — organizes the
  // list below it without pretending to be a link that goes nowhere.
  if (!id) {
    return <span className={className}>{label}</span>;
  }

  return (
    <Link
      href={`#${id}`}
      aria-current={active ? 'true' : undefined}
      className={`${className} focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2 ${active ? '' : 'hover:text-fg'}`}
    >
      {label}
    </Link>
  );
}
