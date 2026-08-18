import { cx } from '@noksha-ui/core';
import * as React from 'react';
import type { ButtonGroupProps } from './button.types.js';

const ORIENTATION = {
  horizontal: [
    'flex-row',
    '[&>*:not(:first-child)]:-ml-px',
    '[&>*:not(:first-child)]:rounded-s-none',
    '[&>*:not(:last-child)]:rounded-e-none',
  ].join(' '),
  vertical: [
    'flex-col',
    '[&>*:not(:first-child)]:-mt-px',
    '[&>*:not(:first-child)]:rounded-t-none',
    '[&>*:not(:last-child)]:rounded-b-none',
  ].join(' '),
};

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { orientation = 'horizontal', attached = true, role = 'group', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role}
      className={cx(
        'inline-flex',
        attached
          ? cx(ORIENTATION[orientation], '[&>*]:relative [&>*:focus-visible]:z-10 [&>*:hover]:z-10')
          : cx(orientation === 'vertical' ? 'flex-col' : 'flex-row', 'gap-2'),
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
ButtonGroup.displayName = 'ButtonGroup';
