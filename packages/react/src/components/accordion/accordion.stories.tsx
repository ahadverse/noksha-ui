import type { StoryGroup } from '../../stories.js';
import { Accordion } from './accordion.js';
import type { AccordionVariant } from './accordion.types.js';

const VARIANTS: AccordionVariant[] = ['bordered', 'separated', 'ghost'];

const ITEMS = [
  {
    value: 'billing',
    label: 'How does billing work?',
    body: 'You are charged monthly for the plan you are on, prorated when you change it mid-cycle.',
  },
  {
    value: 'team',
    label: 'Can I add teammates?',
    body: 'Team and Enterprise plans include unlimited seats. Personal plans are single-seat.',
  },
  {
    value: 'api',
    label: 'Is there an API?',
    body: 'Yes — every action in the dashboard is available over the REST API and the CLI.',
  },
];

export const accordionStories: StoryGroup = {
  component: 'Accordion',
  stories: [
    {
      name: 'Variants',
      description:
        'The height animates in CSS from 0fr to 1fr, so it lands on the content’s own height with nothing measured.',
      render: () => (
        <div className="flex w-full max-w-md flex-col gap-6">
          {VARIANTS.map((variant) => (
            <Accordion.Root key={variant} variant={variant} defaultValue="billing" collapsible>
              {ITEMS.map((item) => (
                <Accordion.Item key={item.value} value={item.value}>
                  {/* An open panel is a landmark named after its trigger, so
                      three copies of one FAQ on a page would be three landmarks
                      called the same thing. The variant name keeps them apart —
                      the same thing a real page does by not repeating itself. */}
                  <Accordion.Trigger>{`${item.label} (${variant})`}</Accordion.Trigger>
                  <Accordion.Content>{item.body}</Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          ))}
        </div>
      ),
    },
    {
      name: 'Multiple',
      description: 'Several sections open at once; the value is an array rather than a string.',
      render: () => (
        <div className="w-full max-w-md">
          <Accordion.Root type="multiple" defaultValue={['billing', 'api']}>
            {ITEMS.map((item) => (
              <Accordion.Item key={item.value} value={item.value}>
                <Accordion.Trigger>{item.label}</Accordion.Trigger>
                <Accordion.Content>{item.body}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      ),
    },
    {
      name: 'Collapsible',
      description: 'Without it, one section always stays open.',
      render: () => (
        <div className="w-full max-w-md">
          <Accordion.Root defaultValue="billing" collapsible>
            {ITEMS.slice(0, 2).map((item) => (
              <Accordion.Item key={item.value} value={item.value}>
                <Accordion.Trigger>{item.label}</Accordion.Trigger>
                <Accordion.Content>{item.body}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      ),
    },
    {
      name: 'Disabled item',
      render: () => (
        <div className="w-full max-w-md">
          <Accordion.Root>
            <Accordion.Item value="a">
              <Accordion.Trigger>Available</Accordion.Trigger>
              <Accordion.Content>Open me.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="b" disabled>
              <Accordion.Trigger>Enterprise only</Accordion.Trigger>
              <Accordion.Content>Not on this plan.</Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      ),
    },
  ],
};
