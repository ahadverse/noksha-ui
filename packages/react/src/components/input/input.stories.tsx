import type { StoryGroup } from '../../stories.js';
import { Input } from './input.js';
import type { InputSize, InputVariant } from './input.types.js';

const VARIANTS: InputVariant[] = ['outline', 'soft', 'ghost'];
const SIZES: InputSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const inputStories: StoryGroup = {
  component: 'Input',
  stories: [
    {
      name: 'Variants',
      render: () => (
        <div className="flex w-full max-w-xs flex-col gap-3">
          {VARIANTS.map((variant) => (
            <Input key={variant} variant={variant} placeholder={variant} aria-label={variant} />
          ))}
        </div>
      ),
    },
    {
      name: 'Sizes',
      render: () => (
        <div className="flex w-full max-w-xs flex-col gap-3">
          {SIZES.map((size) => (
            <Input key={size} size={size} placeholder={`Size ${size}`} aria-label={size} />
          ))}
        </div>
      ),
    },
    {
      name: 'With affixes',
      description:
        'Affixes are pointer-events-none, so aiming at the icon still lands in the field.',
      render: () => (
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Input startIcon={<SearchIcon />} placeholder="Search" aria-label="Search" />
          <Input
            startIcon={<span>$</span>}
            endIcon={<span>USD</span>}
            placeholder="0.00"
            aria-label="Amount"
          />
        </div>
      ),
    },
    {
      name: 'States',
      render: () => (
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Input placeholder="Default" aria-label="Default" />
          <Input placeholder="Invalid" aria-label="Invalid" invalid />
          <Input placeholder="Disabled" aria-label="Disabled" disabled />
          <Input placeholder="Read only" aria-label="Read only" readOnly defaultValue="Locked" />
        </div>
      ),
    },
    {
      name: 'Types',
      render: () => (
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Input type="email" placeholder="you@example.com" aria-label="Email" />
          <Input type="password" placeholder="Password" aria-label="Password" />
          <Input type="date" aria-label="Date" />
          <Input type="number" placeholder="0" aria-label="Number" />
        </div>
      ),
    },
  ],
};
