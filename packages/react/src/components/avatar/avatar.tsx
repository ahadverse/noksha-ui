import { cx, Slot } from '@prism-ui/core';
import * as React from 'react';
import type {
  AvatarFallbackProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarLoadingStatus,
  AvatarProps,
} from './avatar.types.js';
import {
  avatarFallbackVariants,
  avatarGroupVariants,
  avatarImageVariants,
  avatarVariants,
} from './avatar.variants.js';

interface AvatarContextValue {
  status: AvatarLoadingStatus;
  setStatus: (status: AvatarLoadingStatus) => void;
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

function useAvatarContext(part: string): AvatarContextValue {
  const context = React.useContext(AvatarContext);
  if (!context) {
    throw new Error(`[@prism-ui/react] <Avatar.${part}> must be used inside <Avatar.Root>.`);
  }
  return context;
}

/**
 * A user or entity image with a fallback.
 *
 * ```tsx
 * <Avatar.Root>
 *   <Avatar.Image src={user.avatarUrl} alt={user.name} />
 *   <Avatar.Fallback>{initials(user.name)}</Avatar.Fallback>
 * </Avatar.Root>
 * ```
 */
export const AvatarRoot = React.forwardRef<HTMLSpanElement, AvatarProps>(function AvatarRoot(
  { size = 'md', shape = 'circle', asChild = false, className, ...rest },
  ref,
) {
  const [status, setStatus] = React.useState<AvatarLoadingStatus>('idle');
  const value = React.useMemo(() => ({ status, setStatus }), [status]);

  const Comp = asChild ? Slot : 'span';

  return (
    <AvatarContext.Provider value={value}>
      <Comp
        ref={ref}
        data-status={status}
        className={avatarVariants({ size, shape, className })}
        {...rest}
      />
    </AvatarContext.Provider>
  );
});
AvatarRoot.displayName = 'Avatar.Root';

/**
 * The image stays mounted through its whole lifecycle and fades in, rather than
 * being swapped for the fallback once it resolves.
 *
 * Unmounting the fallback and mounting the image is the obvious approach and it
 * causes a visible flicker on every list of avatars: the fallback paints, the
 * image decodes, the DOM churns. Here the fallback simply sits underneath.
 */
export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  function AvatarImage({ className, src, onLoad, onError, onLoadingStatusChange, ...rest }, ref) {
    const { status, setStatus } = useAvatarContext('Image');

    const notify = React.useCallback(
      (next: AvatarLoadingStatus) => {
        setStatus(next);
        onLoadingStatusChange?.(next);
      },
      [setStatus, onLoadingStatusChange],
    );

    // An empty or missing src is a failure, not a pending load — without this the
    // fallback would wait forever for an event that is never coming.
    React.useEffect(() => {
      notify(src ? 'loading' : 'error');
    }, [src, notify]);

    if (!src) return null;

    return (
      // biome-ignore lint/a11y/useAltText: `alt` is required by AvatarImageProps and arrives through the spread
      <img
        ref={ref}
        src={src}
        data-status={status}
        className={avatarImageVariants({
          className: cx(
            'absolute inset-0 transition-opacity duration-(--prism-duration-normal)',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            className,
          ),
        })}
        onLoad={(event) => {
          notify('loaded');
          onLoad?.(event);
        }}
        onError={(event) => {
          notify('error');
          onError?.(event);
        }}
        {...rest}
      />
    );
  },
);
AvatarImage.displayName = 'Avatar.Image';

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  function AvatarFallback({ delayMs, className, children, ...rest }, ref) {
    const { status } = useAvatarContext('Fallback');
    const [canRender, setCanRender] = React.useState(delayMs === undefined);

    React.useEffect(() => {
      if (delayMs === undefined) return;
      const timer = setTimeout(() => setCanRender(true), delayMs);
      return () => clearTimeout(timer);
    }, [delayMs]);

    if (!canRender || status === 'loaded') return null;

    return (
      <span
        ref={ref}
        // The image above carries the alt text. Announcing the initials too
        // would read the same person's name twice.
        aria-hidden="true"
        className={avatarFallbackVariants({ className })}
        {...rest}
      >
        {children}
      </span>
    );
  },
);
AvatarFallback.displayName = 'Avatar.Fallback';

/**
 * An overlapping row of avatars, clamped to `max` with a `+n` counter.
 *
 * The size is applied by cloning, so the group is the only place a size is
 * written — twelve avatars in a row cannot drift out of step with each other.
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { max, size, spacing = 'normal', className, children, ...rest },
  ref,
) {
  const avatars = React.Children.toArray(children).filter(React.isValidElement);
  const visible = max === undefined ? avatars : avatars.slice(0, max);
  const overflow = avatars.length - visible.length;

  return (
    <div ref={ref} className={avatarGroupVariants({ spacing, className })} {...rest}>
      {visible.map((child) =>
        size ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size }) : child,
      )}
      {overflow > 0 ? (
        <AvatarRoot size={size} aria-label={`${overflow} more`}>
          <span className={avatarFallbackVariants({ className: 'text-[0.85em]' })}>
            +{overflow}
          </span>
        </AvatarRoot>
      ) : null}
    </div>
  );
});
AvatarGroup.displayName = 'Avatar.Group';

export const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Group: AvatarGroup,
};

export { avatarVariants };
