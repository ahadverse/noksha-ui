import { Slot } from '@prism-ui/core';
import * as React from 'react';
import type { Tone } from '../../internal/tone.js';
import type { AlertPartProps, AlertProps } from './alert.types.js';
import {
  alertActionsVariants,
  alertDescriptionVariants,
  alertTitleVariants,
  alertVariants,
} from './alert.variants.js';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

/**
 * Shape carries the meaning as well as colour does — a triangle reads as a
 * warning to someone who cannot tell the amber from the red.
 */
const TONE_ICONS: Record<Tone, React.ReactNode> = {
  info: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.75v.5" />
    </svg>
  ),
  success: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  ),
  warning: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M10.3 4.2 2.8 17.1A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.9L13.7 4.2a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9.5v4M12 16.75v.5" />
    </svg>
  ),
  danger: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 15.75v.5" />
    </svg>
  ),
  accent: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.75v.5" />
    </svg>
  ),
  neutral: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.75v.5" />
    </svg>
  ),
};

/**
 * A message about the state of the page or of an action.
 *
 * ```tsx
 * <Alert.Root tone="danger" live>
 *   <Alert.Title>Deployment failed</Alert.Title>
 *   <Alert.Description>Build step 3 exited with code 1.</Alert.Description>
 *   <Alert.Actions><Button size="sm">Retry</Button></Alert.Actions>
 * </Alert.Root>
 * ```
 */
export const AlertRoot = React.forwardRef<HTMLDivElement, AlertProps>(function AlertRoot(
  {
    variant = 'soft',
    tone = 'info',
    live = false,
    icon,
    asChild = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  const resolvedIcon = icon === undefined ? TONE_ICONS[tone] : icon;

  return (
    <Comp
      ref={ref}
      // `role="alert"` is an assertive live region. Reserving it for `live`
      // keeps a static page banner from interrupting the screen reader with
      // something that was already there before the user arrived.
      role={live ? 'alert' : undefined}
      data-tone={tone}
      className={alertVariants({ variant, tone, withIcon: resolvedIcon != null, className })}
      {...rest}
    >
      {resolvedIcon}
      {children}
    </Comp>
  );
});
AlertRoot.displayName = 'Alert.Root';

export const AlertTitle = React.forwardRef<HTMLDivElement, AlertPartProps>(function AlertTitle(
  { asChild = false, className, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  return <Comp ref={ref} className={alertTitleVariants({ className })} {...rest} />;
});
AlertTitle.displayName = 'Alert.Title';

export const AlertDescription = React.forwardRef<HTMLDivElement, AlertPartProps>(
  function AlertDescription({ asChild = false, className, ...rest }, ref) {
    const Comp = asChild ? Slot : 'div';
    return <Comp ref={ref} className={alertDescriptionVariants({ className })} {...rest} />;
  },
);
AlertDescription.displayName = 'Alert.Description';

export const AlertActions = React.forwardRef<HTMLDivElement, AlertPartProps>(function AlertActions(
  { asChild = false, className, ...rest },
  ref,
) {
  const Comp = asChild ? Slot : 'div';
  return <Comp ref={ref} className={alertActionsVariants({ className })} {...rest} />;
});
AlertActions.displayName = 'Alert.Actions';

export const Alert = {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
  Actions: AlertActions,
};

export { alertVariants };
