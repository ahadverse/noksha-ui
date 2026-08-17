import { getGroupedComponents } from './registry';

export interface NavItem {
  href: string;
  label: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

/**
 * The sidebar, half written by hand and half read from the registry.
 *
 * The guide pages are a deliberate order; the component list is not a list at
 * all but whatever `packages/react` currently ships — so adding a component to
 * the library adds it to the navigation, with no second place to update.
 */
export async function getNavGroups(): Promise<NavGroup[]> {
  const grouped = await getGroupedComponents();

  return [
    {
      title: 'Getting started',
      items: [
        { href: '/docs', label: 'Introduction' },
        { href: '/docs/installation', label: 'Installation' },
        { href: '/docs/theming', label: 'Theming' },
        { href: '/docs/cli', label: 'CLI' },
        { href: '/docs/components', label: 'All components' },
      ],
    },
    ...grouped.map((group) => ({
      title: group.title,
      items: group.components.map((component) => ({
        href: `/docs/components/${component.name}`,
        label: component.title,
      })),
    })),
  ];
}
