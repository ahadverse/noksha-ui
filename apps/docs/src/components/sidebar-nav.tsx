'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavGroup } from '@/lib/nav';

/**
 * The documentation index.
 *
 * A client component only because the current route decides which link is
 * highlighted — the groups themselves are computed on the server and handed
 * down as plain data.
 */
export function SidebarNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6 text-sm">
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="mb-2 px-3 font-semibold text-fg text-xs uppercase tracking-wider">
            {group.title}
          </h2>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'block rounded-md px-3 py-1.5 transition-colors',
                      'focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2',
                      active
                        ? 'bg-accent-subtle font-medium text-accent-fg'
                        : 'text-fg-muted hover:bg-subtle hover:text-fg',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
