import type { StoryGroup } from '../../stories.js';
import { Tabs } from './tabs.js';
import type { TabsVariant } from './tabs.types.js';

const VARIANTS: TabsVariant[] = ['line', 'solid', 'pill'];

const SECTIONS = [
  { value: 'overview', label: 'Overview', body: 'Traffic, errors and latency at a glance.' },
  { value: 'usage', label: 'Usage', body: '2,481 requests this billing period.' },
  { value: 'settings', label: 'Settings', body: 'Region, retention and access.' },
];

export const tabsStories: StoryGroup = {
  component: 'Tabs',
  stories: [
    {
      name: 'Variants',
      description:
        'The active indicator is a border on the tab itself — nothing to measure or keep in sync.',
      render: () => (
        <div className="flex w-full max-w-md flex-col gap-6">
          {VARIANTS.map((variant) => (
            <Tabs.Root key={variant} defaultValue="overview" variant={variant}>
              <Tabs.List aria-label={variant}>
                {SECTIONS.map((section) => (
                  <Tabs.Trigger key={section.value} value={section.value}>
                    {section.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              {SECTIONS.map((section) => (
                <Tabs.Content key={section.value} value={section.value}>
                  <p className="text-(--noksha-fg-muted) text-sm">{section.body}</p>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          ))}
        </div>
      ),
    },
    {
      name: 'Sizes',
      render: () => (
        <div className="flex w-full max-w-md flex-col gap-6">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Tabs.Root key={size} defaultValue="a" variant="solid" size={size}>
              <Tabs.List aria-label={size}>
                <Tabs.Trigger value="a">First</Tabs.Trigger>
                <Tabs.Trigger value="b">Second</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="a">Size {size}</Tabs.Content>
              <Tabs.Content value="b">Size {size}</Tabs.Content>
            </Tabs.Root>
          ))}
        </div>
      ),
    },
    {
      name: 'Vertical',
      render: () => (
        <div className="w-full max-w-md">
          <Tabs.Root defaultValue="overview" orientation="vertical">
            <Tabs.List aria-label="Sections">
              {SECTIONS.map((section) => (
                <Tabs.Trigger key={section.value} value={section.value}>
                  {section.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {SECTIONS.map((section) => (
              <Tabs.Content key={section.value} value={section.value}>
                <p className="text-(--noksha-fg-muted) text-sm">{section.body}</p>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      ),
    },
    {
      name: 'Fitted',
      render: () => (
        <div className="w-full max-w-md">
          <Tabs.Root defaultValue="a" variant="solid">
            <Tabs.List fitted aria-label="Fitted">
              <Tabs.Trigger value="a">Monthly</Tabs.Trigger>
              <Tabs.Trigger value="b">Yearly</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="a">Billed every month.</Tabs.Content>
            <Tabs.Content value="b">Billed once a year, two months free.</Tabs.Content>
          </Tabs.Root>
        </div>
      ),
    },
    {
      name: 'Manual activation',
      description:
        'Arrowing across the strip only moves focus — use it when a panel fetches on mount.',
      render: () => (
        <div className="w-full max-w-md">
          <Tabs.Root defaultValue="overview" activationMode="manual">
            <Tabs.List aria-label="Manual">
              {SECTIONS.map((section) => (
                <Tabs.Trigger key={section.value} value={section.value}>
                  {section.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {SECTIONS.map((section) => (
              <Tabs.Content key={section.value} value={section.value}>
                <p className="text-(--noksha-fg-muted) text-sm">{section.body}</p>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      ),
    },
  ],
};
