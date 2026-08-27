import { Radio, RadioGroup } from '@noksha-ui/react';

const PLANS = [
  { id: 'starter', name: 'Starter', price: 0, blurb: 'For side projects' },
  { id: 'pro', name: 'Pro', price: 20, blurb: 'For small teams' },
  { id: 'scale', name: 'Scale', price: 80, blurb: 'For growing companies' },
];

export default function RadioCards() {
  return (
    <RadioGroup defaultValue="pro" orientation="horizontal" className="w-full items-stretch">
      {PLANS.map((option) => (
        <label
          key={option.id}
          htmlFor={option.id}
          className="flex w-56 cursor-pointer items-start gap-2.5 rounded-lg border border-line-subtle bg-surface p-4 has-[:checked]:border-accent has-[:checked]:bg-accent-subtle"
        >
          <Radio id={option.id} value={option.id} />
          <div>
            <p className="font-medium text-fg text-sm">{option.name}</p>
            <p className="text-fg-muted text-xs">
              {option.price === 0 ? 'Free' : `$${option.price}/month`} — {option.blurb}
            </p>
          </div>
        </label>
      ))}
    </RadioGroup>
  );
}
