import type * as React from 'react';

import { SidebarNav } from '@/components/sidebar-nav';
import { getNavGroups } from '@/lib/nav';

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const groups = await getNavGroups();

  return (
    <div className="mx-auto flex max-w-[90rem] gap-8 px-4 sm:px-6">
      {/* The sticky rail is hidden below lg, where the header's drawer takes over. */}
      <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 overflow-y-auto py-8 lg:block">
        <SidebarNav groups={groups} />
      </aside>

      <main id="content" className="min-w-0 flex-1 py-8 lg:py-10">
        {children}
      </main>
    </div>
  );
}
