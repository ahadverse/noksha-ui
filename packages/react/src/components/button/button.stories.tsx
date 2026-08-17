import type { StoryGroup } from '../../stories.js';
import { Button } from './button.js';
import type { ButtonSize, ButtonTone, ButtonVariant } from './button.types.js';

const VARIANTS: ButtonVariant[] = ['solid', 'soft', 'outline', 'ghost', 'link'];
const TONES: ButtonTone[] = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'];
const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

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
              {variant}
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
              {tone}
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
              {tone}
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
              {tone}
            </Button>
          ))}
        </>
      ),
    },
    {
      name: 'Sizes',
      description:
        'Heights and padding derive from --prism-density; one variable retunes them all.',
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
      name: 'Loading',
      description:
        'The label stays in the box, invisible, so the button holds its exact width. No layout jump on click.',
      render: () => (
        <>
          <Button loading>Save changes</Button>
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
      name: 'Disabled',
      render: () => (
        <>
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant}
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
