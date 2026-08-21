'use client';

import { FieldDescription, FieldLabel, FieldRoot, useFieldControl } from '@noksha-ui/react';
import * as React from 'react';

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-6"
  >
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8Z" />
  </svg>
);

function StarRating({
  name,
  value,
  onValueChange,
}: {
  name: string;
  value: number;
  onValueChange: (value: number) => void;
}) {
  const field = useFieldControl();

  return (
    <fieldset
      id={field.id}
      disabled={field.disabled}
      aria-describedby={field['aria-describedby']}
      className="m-0 flex gap-1 border-0 p-0"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-pressed={star <= value}
          aria-label={`${star} star${star === 1 ? '' : 's'}`}
          data-checked={star <= value || undefined}
          onClick={() => onValueChange(star)}
          className="text-fg-muted transition-colors data-[checked]:text-warning-fg disabled:cursor-not-allowed disabled:opacity-60"
        >
          <StarIcon filled={star <= value} />
        </button>
      ))}
      <input type="hidden" name={name} value={value} />
    </fieldset>
  );
}

const VERDICTS = ['Tell us what went wrong', 'Not great', 'Okay', 'Good', 'Great', 'Excellent'];

export default function FieldCustom() {
  const [rating, setRating] = React.useState(3);

  return (
    <div className="w-full max-w-sm">
      <FieldRoot required>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <StarIcon filled />
          </span>
          <FieldLabel>Rate your experience</FieldLabel>
        </div>
        <StarRating name="rating" value={rating} onValueChange={setRating} />
        <FieldDescription>
          {VERDICTS[rating]} — a control the library never shipped, still wired through
          `useFieldControl`.
        </FieldDescription>
      </FieldRoot>
    </div>
  );
}
