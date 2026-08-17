import { Slot, Slottable } from '@prism-ui/core';
import * as React from 'react';
import type { BadgeProps } from './badge.types.js';
import { badgeDotVariants, badgeVariants } from './badge.variants.js';

/**
 * A small status label.
 *
 * ```tsx
 * <Badge tone="success" dot>Live</Badge>
 * <Badge variant="outline" tone="neutral">Draft</Badge>
 * ```
 *
 * It is a `<span>`, not a button: a badge that can be clicked or dismissed is a
 * different control with different a11y requirements, and conflating the two is
 * how "chip" components end up unusable from the keyboard.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'soft',
    tone = 'accent',
    size = 'md',
    dot = false,
    icon,
    asChild = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp ref={ref} className={badgeVariants({ variant, tone, size, className })} {...rest}>
      {dot ? <span aria-hidden="true" className={badgeDotVariants({ size })} /> : null}
      {icon}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}) as (props: BadgeProps & React.RefAttributes<HTMLSpanElement>) => React.ReactElement | null;

(Badge as unknown as { displayName: string }).displayName = 'Badge';

export { badgeVariants };
