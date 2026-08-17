import { Slot } from '@noksha-ui/core';
import * as React from 'react';
import type { CardPartProps, CardProps, CardTitleProps } from './card.types.js';
import {
  cardContentVariants,
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardVariants,
} from './card.variants.js';

/**
 * A surface that groups related content.
 *
 * ```tsx
 * <Card.Root>
 *   <Card.Header>
 *     <Card.Title>Usage</Card.Title>
 *     <Card.Description>Billing period to date</Card.Description>
 *   </Card.Header>
 *   <Card.Content>…</Card.Content>
 *   <Card.Footer><Button>Upgrade</Button></Card.Footer>
 * </Card.Root>
 * ```
 */
export const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  {
    variant = 'elevated',
    padding = 'md',
    interactive = false,
    asChild = false,
    className,
    ...rest
  },
  ref,
) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={ref}
      data-interactive={interactive || undefined}
      className={cardVariants({ variant, padding, interactive, className })}
      {...rest}
    />
  );
});
CardRoot.displayName = 'Card.Root';

export const CardHeader = React.forwardRef<HTMLDivElement, CardPartProps>(function CardHeader(
  { asChild = false, className, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  return <Comp ref={ref} className={cardHeaderVariants({ className })} {...rest} />;
});
CardHeader.displayName = 'Card.Header';

/**
 * Defaults to `<h3>` but takes any level through `as`.
 *
 * There is no correct default heading level for a component that does not know
 * its page, so this exposes the choice rather than hard-coding one and quietly
 * breaking the document outline.
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { as: Tag = 'h3', asChild = false, className, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : Tag;
  return <Comp ref={ref} className={cardTitleVariants({ className })} {...rest} />;
});
CardTitle.displayName = 'Card.Title';

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardPartProps>(
  function CardDescription({ asChild = false, className, ...rest }, ref) {
    const Comp = asChild ? Slot : 'p';
    return <Comp ref={ref} className={cardDescriptionVariants({ className })} {...rest} />;
  },
);
CardDescription.displayName = 'Card.Description';

export const CardContent = React.forwardRef<HTMLDivElement, CardPartProps>(function CardContent(
  { asChild = false, className, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  return <Comp ref={ref} className={cardContentVariants({ className })} {...rest} />;
});
CardContent.displayName = 'Card.Content';

export const CardFooter = React.forwardRef<HTMLDivElement, CardPartProps>(function CardFooter(
  { asChild = false, className, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  return <Comp ref={ref} className={cardFooterVariants({ className })} {...rest} />;
});
CardFooter.displayName = 'Card.Footer';

/**
 * The namespace is a plain object of the same components exported individually
 * above, so `import { CardTitle }` tree-shakes even where `Card.Title` reads
 * better in application code.
 */
export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
};

export { cardVariants };
