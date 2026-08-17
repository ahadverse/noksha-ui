import * as React from 'react';
import type { SeparatorProps } from './separator.types.js';
import { separatorLineVariants, separatorVariants } from './separator.variants.js';

/**
 * A dividing rule, optionally with a label in the middle.
 *
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * <Separator decorative={false}>or</Separator>
 * ```
 */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', decorative = true, className, children, ...rest },
  ref,
) {
  const labelled = children != null && children !== false;

  return (
    <div
      ref={ref}
      // A decorative rule is removed from the a11y tree entirely rather than
      // given role="separator": announcing "separator" between every pair of
      // list rows is noise, not structure.
      {...(decorative ? { role: 'none' } : { role: 'separator', 'aria-orientation': orientation })}
      data-orientation={orientation}
      className={separatorVariants({ orientation, labelled, className })}
      {...rest}
    >
      {labelled ? (
        <>
          <span className={separatorLineVariants({ orientation })} />
          {children}
          <span className={separatorLineVariants({ orientation })} />
        </>
      ) : null}
    </div>
  );
});

Separator.displayName = 'Separator';

export { separatorVariants };
