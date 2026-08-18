import type { StoryGroup } from '../../stories.js';
import { Button } from './button.js';
import type {
  ButtonEffect,
  ButtonShape,
  ButtonSize,
  ButtonTone,
  ButtonVariant,
} from './button.types.js';
import { ButtonGroup } from './button-group.js';
import { CopyButton } from './copy-button.js';
import { FloatingButton } from './floating-button.js';
import { FloatingMenu } from './floating-menu.js';
import { ScrollToTop } from './scroll-to-top.js';
import { ToggleButton } from './toggle-button.js';

const VARIANTS: ButtonVariant[] = [
  'solid',
  'soft',
  'outline',
  'ghost',
  'link',
  'gradient',
  'glass',
  'glow',
  'dashed',
];
const EFFECTS: ButtonEffect[] = ['none', 'lift', 'sheen', 'wipe', 'pulse', 'tilt'];
const TONES: ButtonTone[] = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'];
const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const SHAPES: ButtonShape[] = ['default', 'round', 'circle'];

const label = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
  </svg>
);

export const buttonStories: StoryGroup = {
  component: 'Button',
  stories: [
    {
      name: 'Variants',
      description: 'Visual weight, from most to least emphasis. Colour comes from tone, not here.',
      render: () => (
        <>
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {label(variant)}
            </Button>
          ))}
        </>
      ),
    },
    {
      name: 'Effects',
      description:
        'Hover each one. The motion is a third axis — independent of variant and tone, and inert under prefers-reduced-motion.',
      render: () => (
        <>
          {EFFECTS.map((effect) => (
            <Button key={effect} effect={effect}>
              {label(effect)}
            </Button>
          ))}
        </>
      ),
    },
    {
      name: 'Effects on every variant',
      description:
        'One effect, nine surfaces. Nothing here is a per-variant special case — the sheen reads the same --btn-current the label does.',
      render: () => (
        <>
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} effect="sheen">
              {label(variant)}
            </Button>
          ))}
        </>
      ),
    },
    {
      name: 'Tones',
      description:
        'One prop repaints the whole button. Every tone declares the same seven slots, so no variant × tone matrix is needed.',
      render: () => (
        <>
          {TONES.map((tone) => (
            <Button key={tone} tone={tone}>
              {label(tone)}
            </Button>
          ))}
        </>
      ),
    },
    {
      name: 'Soft tones',
      description: 'The same tones at lower weight — subtle background, tone-coloured text.',
      render: () => (
        <>
          {TONES.map((tone) => (
            <Button key={tone} variant="soft" tone={tone}>
              {label(tone)}
            </Button>
          ))}
        </>
      ),
    },
    {
      name: 'Outline tones',
      render: () => (
        <>
          {TONES.map((tone) => (
            <Button key={tone} variant="outline" tone={tone}>
              {label(tone)}
            </Button>
          ))}
        </>
      ),
    },
    {
      name: 'Sizes',
      description:
        'Heights and padding derive from --noksha-density; one variable retunes them all.',
      render: () => (
        <>
          {SIZES.map((size) => (
            <Button key={size} size={size}>
              Button {size}
            </Button>
          ))}
        </>
      ),
    },
    {
      name: 'With icons',
      render: () => (
        <>
          <Button icon={<PlusIcon />}>New project</Button>
          <Button variant="outline" trailingIcon={<ArrowIcon />}>
            Continue
          </Button>
          <Button variant="soft" tone="danger" icon={<TrashIcon />}>
            Delete
          </Button>
        </>
      ),
    },
    {
      name: 'Icon only',
      description:
        'The type system requires aria-label here — an unlabelled icon button will not compile.',
      render: () => (
        <>
          {SIZES.map((size) => (
            <Button key={size} size={size} iconOnly aria-label="Add item" icon={<PlusIcon />} />
          ))}
          <Button iconOnly variant="outline" aria-label="Add item" icon={<PlusIcon />} />
          <Button iconOnly variant="ghost" aria-label="Add item" icon={<PlusIcon />} />
          <Button iconOnly variant="soft" tone="danger" aria-label="Delete" icon={<TrashIcon />} />
        </>
      ),
    },
    {
      name: 'Shapes',
      description:
        'A box axis beside size: round is the pill, circle the icon disc. It composes with every variant.',
      render: () => (
        <>
          {SHAPES.map((shape) => (
            <Button key={shape} shape={shape} aria-label="Search" icon={<PlusIcon />}>
              {shape === 'circle' ? null : label(shape)}
            </Button>
          ))}
          {SIZES.map((size) => (
            <Button
              key={size}
              shape="circle"
              size={size}
              iconOnly
              aria-label="Add item"
              icon={<PlusIcon />}
            />
          ))}
          <Button shape="round" variant="outline" trailingIcon={<ArrowIcon />}>
            Continue
          </Button>
          <Button
            shape="circle"
            variant="soft"
            tone="danger"
            aria-label="Delete"
            icon={<TrashIcon />}
          />
        </>
      ),
    },
    {
      name: 'Loading',
      description:
        'The label stays in the box, invisible, so the button holds its exact width. No layout jump on click. loadingPlacement="icon" keeps the label readable instead, and loadingIcon swaps the indicator.',
      render: () => (
        <>
          <Button loading>Save changes</Button>
          <Button loading loadingPlacement="icon" icon={<PlusIcon />} variant="outline">
            Saving
          </Button>
          <Button loading loadingPlacement="icon" shape="round" tone="info">
            Syncing
          </Button>
          <Button loading variant="soft">
            Save changes
          </Button>
          <Button loading variant="outline" tone="neutral">
            Save changes
          </Button>
          <Button loading size="lg" tone="success">
            Deploy
          </Button>
        </>
      ),
    },
    {
      name: 'Button group',
      description: 'Several buttons acting as one control, with the shared borders collapsed.',
      render: () => (
        <>
          <ButtonGroup>
            <Button variant="outline" tone="neutral">
              Day
            </Button>
            <Button variant="outline" tone="neutral">
              Week
            </Button>
            <Button variant="outline" tone="neutral">
              Month
            </Button>
          </ButtonGroup>
          <ButtonGroup orientation="vertical">
            <Button variant="outline" tone="neutral">
              Top
            </Button>
            <Button variant="outline" tone="neutral">
              Middle
            </Button>
            <Button variant="outline" tone="neutral">
              Bottom
            </Button>
          </ButtonGroup>
        </>
      ),
    },
    {
      name: 'Toggle button',
      description: 'Holds a pressed state on aria-pressed. Controlled or uncontrolled.',
      render: () => (
        <>
          <ToggleButton variant="outline">Bold</ToggleButton>
          <ToggleButton variant="outline" defaultPressed>
            Italic
          </ToggleButton>
          <ToggleButton variant="soft" tone="success" defaultPressed>
            Live
          </ToggleButton>
        </>
      ),
    },
    {
      name: 'Copy button',
      description: 'Writes to the clipboard, confirms for two seconds, and announces it politely.',
      render: () => (
        <>
          <CopyButton value="pnpm add @noksha-ui/react" />
          <CopyButton withLabel variant="outline" value="pnpm add @noksha-ui/react" />
        </>
      ),
    },
    {
      name: 'Floating button',
      description:
        'Pinned to a corner of a positioned box here; pinned to the viewport when no container is given.',
      render: () => (
        <div className="relative h-40 w-64 rounded-lg border border-(--noksha-border-subtle)">
          <FloatingButton label="New item" icon={<PlusIcon />} size="md" offset={12} />
        </div>
      ),
    },
    {
      name: 'Floating menu',
      description:
        'The expandable form. Escape or an outside press closes it, and focus goes back to the trigger.',
      render: () => (
        <FloatingMenu
          label="Create"
          size="md"
          defaultOpen
          actions={[
            { id: 'a', label: 'Document', icon: <PlusIcon /> },
            { id: 'b', label: 'Upload', icon: <ArrowIcon />, tone: 'info' },
            { id: 'c', label: 'Delete', icon: <TrashIcon />, tone: 'danger' },
          ]}
        />
      ),
    },
    {
      name: 'Back to top',
      description:
        'Fixed to a corner, hidden until the page has scrolled. It is invisible rather than transparent while hidden, so it leaves the tab order with it.',
      render: () => <ScrollToTop showAfter={0} />,
    },
    {
      name: 'Disabled',
      render: () => (
        <>
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {label(variant)}
            </Button>
          ))}
        </>
      ),
    },
    {
      name: 'Full width',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Button fullWidth>Continue</Button>
          <Button fullWidth variant="outline" tone="neutral">
            Cancel
          </Button>
        </div>
      ),
    },
    {
      name: 'asChild',
      description:
        'Renders the child element — no wrapper div, and the anchor keeps its own semantics.',
      render: () => (
        <>
          <Button asChild>
            <a href="#pricing">Anchor as a button</a>
          </Button>
          <Button asChild variant="outline" trailingIcon={<ArrowIcon />}>
            <a href="#docs">Read the docs</a>
          </Button>
        </>
      ),
    },
  ],
};
