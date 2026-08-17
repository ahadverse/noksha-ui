import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type { ClassValue };

/**
 * Joins class names and resolves conflicting Tailwind utilities, last one wins.
 *
 * This is what makes rule 3 of the component contract hold: a consumer's
 * `className` beats the library's own classes without any specificity war,
 * because `px-6` from the caller genuinely replaces `px-4` from the variant
 * rather than racing it in the cascade.
 *
 * Re-exported through this one function so `tailwind-merge` stays a single
 * swappable dependency (ADR-002).
 */
export function cx(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
