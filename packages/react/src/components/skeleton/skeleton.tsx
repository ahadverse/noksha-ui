import type * as React from 'react';
import type { SkeletonProps, SkeletonVariant } from './skeleton.types.js';
import { skeletonStackVariants, skeletonVariants } from './skeleton.variants.js';

export function Skeleton({
  variant = 'pulse',
  shape = 'text',
  size = 'md',
  tone = 'neutral',
  speed = 'normal',
  lines = 1,
  label = null,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const announcement = label
    ? ({ role: 'status', 'aria-label': label } as const)
    : ({ role: 'presentation', 'aria-hidden': true } as const);

  const row = (index: number, last: boolean) => (
    <span
      key={index}
      data-variant={variant}
      className={skeletonVariants({
        variant,
        shape,
        size,
        tone,
        speed,
        className: last && shape === 'text' ? 'w-3/5' : undefined,
      })}
      style={{ '--sk-delay': `${index * 140}ms` } as React.CSSProperties}
    >
      {OVERLAYS[variant]}
    </span>
  );

  if (lines > 1) {
    return (
      <span
        {...announcement}
        className={skeletonStackVariants({ className })}
        style={style}
        {...rest}
      >
        {Array.from({ length: lines }, (_, index) => row(index, index === lines - 1))}
      </span>
    );
  }

  return (
    <span
      {...announcement}
      data-variant={variant}
      className={skeletonVariants({ variant, shape, size, tone, speed, className })}
      style={style}
      {...rest}
    >
      {OVERLAYS[variant]}
    </span>
  );
}

Skeleton.displayName = 'Skeleton';

export { skeletonStackVariants, skeletonVariants };

const SWEEP =
  'pointer-events-none absolute inset-0 animate-noksha-skeleton-sweep [animation-delay:var(--sk-delay,0ms)]';

const OVERLAYS: Record<SkeletonVariant, React.ReactNode> = {
  pulse: null,
  breathe: null,
  blink: null,
  fade: (
    <span className="pointer-events-none absolute inset-0 animate-noksha-skeleton-pulse bg-(--sk-subtle-hover) [animation-delay:var(--sk-delay,0ms)]" />
  ),

  shimmer: (
    <span
      className={`${SWEEP} bg-[linear-gradient(90deg,transparent_0%,var(--sk-subtle-hover)_50%,transparent_100%)]`}
    />
  ),
  wave: (
    <span
      className={`${SWEEP} bg-[linear-gradient(100deg,transparent_25%,var(--sk-subtle-hover)_50%,transparent_75%)]`}
    />
  ),
  sheen: (
    <span
      className={`${SWEEP} bg-[linear-gradient(115deg,transparent_40%,var(--sk-subtle-hover)_50%,transparent_60%)]`}
    />
  ),
  slide: (
    <span
      className={`${SWEEP} bg-[linear-gradient(90deg,transparent_0_33%,var(--sk-subtle-hover)_33%_66%,transparent_66%_100%)]`}
    />
  ),

  ripple: (
    <span className="pointer-events-none absolute inset-0 animate-noksha-skeleton-ripple bg-[radial-gradient(circle_at_center,var(--sk-subtle-hover)_0%,transparent_60%)] [animation-delay:var(--sk-delay,0ms)]" />
  ),
  glow: (
    <span className="pointer-events-none absolute inset-0 animate-noksha-skeleton-pulse bg-[radial-gradient(120%_150%_at_50%_50%,var(--sk-subtle-hover)_0%,transparent_65%)] [animation-delay:var(--sk-delay,0ms)]" />
  ),
  bar: (
    <span className="pointer-events-none absolute inset-y-0 left-0 w-full origin-left animate-noksha-skeleton-grow bg-(--sk-subtle-hover) [animation-delay:var(--sk-delay,0ms)]" />
  ),

  gradient: null,
  stripe: null,
  grid: null,
  dots: null,

  outline: null,
  dashed: null,
  flat: null,
};
