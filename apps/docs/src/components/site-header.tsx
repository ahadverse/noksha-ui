'use client';

import { Badge, Button, buttonVariants, Drawer } from '@prism-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import type { NavGroup } from '@/lib/nav';
import { REPO_URL } from '@/lib/site';

import { GitHubIcon, MenuIcon } from './icons';
import { SidebarNav } from './sidebar-nav';
import { ThemeToggle } from './theme-toggle';

const LINKS = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/components', label: 'Components' },
  { href: '/themes', label: 'Themes' },
] as const;

export function SiteHeader({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = React.useState(false);

  // Navigating from inside the drawer should close it; the route change is the
  // only signal for that, since the links are ordinary <Link>s. `pathname` is
  // the whole point of the effect, not an incidental read — hence the ignore.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a dependency of the body.
  React.useEffect(() => setNavOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-line-subtle border-b bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-3 px-4 sm:px-6">
        <Drawer.Root open={navOpen} onOpenChange={setNavOpen}>
          <Drawer.Trigger asChild>
            <Button
              iconOnly
              variant="ghost"
              tone="neutral"
              size="sm"
              className="lg:hidden"
              icon={<MenuIcon />}
              aria-label="Open navigation"
            />
          </Drawer.Trigger>
          <Drawer.Content side="left" size="sm">
            <Drawer.Header>
              <Drawer.Title>Documentation</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <SidebarNav groups={groups} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>

        <Link href="/" className="flex items-center gap-2.5 font-semibold text-fg">
          <PrismMark />
          <span>Prism UI</span>
          <Badge size="sm" variant="soft" tone="neutral" className="font-mono">
            v0.1
          </Badge>
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active =
              link.href === '/docs'
                ? pathname === '/docs'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                tone="neutral"
                size="sm"
                className={active ? 'text-fg' : 'text-fg-muted'}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          {/* An icon-only Button cannot take `asChild` — the type forbids children
              on it — so the link wears the variant classes directly. */}
          <a
            href={REPO_URL}
            rel="noreferrer noopener"
            target="_blank"
            aria-label="GitHub repository"
            className={buttonVariants({
              variant: 'ghost',
              tone: 'neutral',
              size: 'sm',
              iconOnly: true,
            })}
          >
            <GitHubIcon className="size-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

/** The mark: a beam splitting inside a prism, drawn from the accent token. */
function PrismMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <title>Prism UI</title>
      <path d="M12 2.5 21 20H3l9-17.5Z" fill="var(--prism-accent-solid)" opacity="0.16" />
      <path
        d="M12 2.5 21 20H3l9-17.5Z"
        stroke="var(--prism-accent-solid)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 9 15.5 20h-7L12 9Z" fill="var(--prism-accent-solid)" />
    </svg>
  );
}
