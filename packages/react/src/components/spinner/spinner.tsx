import { cx } from '@noksha-ui/core';
import type * as React from 'react';
import type { SpinnerProps, SpinnerVariant } from './spinner.types.js';
import { spinnerGroupVariants, spinnerVariants } from './spinner.variants.js';

const ICON_TEMPO = '[--noksha-spinner-duration:1s] motion-reduce:[--noksha-spinner-duration:2s]';

export function Spinner({
  size = 'md',
  variant = 'ring',
  speed = 'normal',
  label = 'Loading',
  placement = 'end',
  icon,
  children,
  className,
  ...rest
}: SpinnerProps) {
  const silent = label === null;
  const hasText = children !== undefined && children !== null;

  const drawing = icon ? (
    <span className="inline-flex size-full animate-noksha-spinner-spin items-center justify-center [&>*]:size-full">
      {icon}
    </span>
  ) : (
    DESIGNS[variant]()
  );

  const mark = spinnerVariants({
    size,
    variant: icon ? null : variant,
    speed,
    className: cx(icon ? ICON_TEMPO : undefined, hasText ? undefined : className),
  });

  if (!hasText) {
    return (
      <span
        {...(silent
          ? ({ role: 'presentation', 'aria-hidden': true } as const)
          : ({ role: 'status', 'aria-label': label } as const))}
        data-variant={icon ? 'icon' : variant}
        className={mark}
        {...rest}
      >
        {drawing}
      </span>
    );
  }

  return (
    <span
      {...(silent ? {} : ({ role: 'status' } as const))}
      className={spinnerGroupVariants({ placement, className })}
      {...rest}
    >
      <span aria-hidden="true" data-variant={icon ? 'icon' : variant} className={mark}>
        {drawing}
      </span>
      <span>{children}</span>
    </span>
  );
}

Spinner.displayName = 'Spinner';

export { spinnerGroupVariants, spinnerVariants };

function parts(count: number, render: (index: number) => React.ReactNode) {
  return Array.from({ length: count }, (_, index) => render(index));
}

function onRim(index: number, count: number, distance: string): string {
  return `translate(-50%, -50%) rotate(${(index * 360) / count}deg) translateY(${distance})`;
}

const DESIGNS: Record<SpinnerVariant, () => React.ReactNode> = {
  ring: () => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-full animate-noksha-spinner-spin"
    >
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2.75" opacity="0.22" />
      <path
        d="M21.5 12A9.5 9.5 0 0 0 12 2.5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  ),

  arc: () => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-full animate-noksha-spinner-spin"
    >
      <path
        d="M21.5 12A9.5 9.5 0 0 0 12 2.5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  ),

  dual: () => (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="absolute inset-0 size-full animate-noksha-spinner-spin"
      >
        <path
          d="M22 12A10 10 0 0 0 12 2"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="absolute inset-0 size-full animate-noksha-spinner-spin [animation-direction:reverse]"
      >
        <path
          d="M6.5 12A5.5 5.5 0 0 0 12 17.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </>
  ),

  dash: () => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-full animate-noksha-spinner-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        className="animate-noksha-spinner-dash"
      />
    </svg>
  ),

  segment: () => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-full animate-noksha-spinner-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeDasharray="7 5"
      />
    </svg>
  ),

  comet: () => {
    const ring =
      'radial-gradient(farthest-side, transparent calc(100% - var(--noksha-spinner-stroke)), #000 0)';

    return (
      <span
        className="size-full animate-noksha-spinner-spin rounded-full"
        style={{
          backgroundImage: 'conic-gradient(from 90deg, transparent 10deg, currentColor 350deg)',
          maskImage: ring,
          WebkitMaskImage: ring,
        }}
      />
    );
  },

  dots: () => (
    <span className="flex size-full items-center justify-between">
      {parts(3, (index) => (
        <span
          key={index}
          className="size-[26%] shrink-0 animate-noksha-spinner-fade rounded-full bg-current"
          style={{ animationDelay: `${index * 160}ms` }}
        />
      ))}
    </span>
  ),

  bounce: () => (
    <span className="flex size-full items-center justify-between">
      {parts(3, (index) => (
        <span
          key={index}
          className="size-[26%] shrink-0 animate-noksha-spinner-bounce rounded-full bg-current"
          style={{ animationDelay: `${index * 120}ms` }}
        />
      ))}
    </span>
  ),

  beat: () => (
    <span className="flex size-full items-center justify-between">
      {parts(3, (index) => (
        <span
          key={index}
          className="size-[30%] shrink-0 animate-noksha-spinner-beat rounded-full bg-current"
          style={{ animationDelay: `${index * 150}ms` }}
        />
      ))}
    </span>
  ),

  orbit: () => (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="absolute inset-0 size-full"
      >
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2.25" opacity="0.2" />
      </svg>
      <span className="absolute inset-0 animate-noksha-spinner-spin">
        <span className="-translate-x-1/2 absolute top-0 left-1/2 size-[28%] rounded-full bg-current" />
      </span>
    </>
  ),

  halo: () => (
    <>
      {parts(8, (index) => (
        <span
          key={index}
          className="absolute top-1/2 left-1/2 size-[22%] animate-noksha-spinner-fade rounded-full bg-current"
          style={{
            transform: onRim(index, 8, '-170%'),
            animationDelay: `${index * 120}ms`,
          }}
        />
      ))}
    </>
  ),

  bars: () => (
    <span className="flex size-full items-center justify-between">
      {parts(5, (index) => (
        <span
          key={index}
          className="h-full w-[12%] shrink-0 animate-noksha-spinner-stretch rounded-full bg-current"
          style={{ animationDelay: `${index * 110}ms` }}
        />
      ))}
    </span>
  ),

  wave: () => (
    <span className="flex size-full items-center justify-between">
      {parts(5, (index) => (
        <span
          key={index}
          className="h-[62%] w-[12%] shrink-0 animate-noksha-spinner-bounce rounded-full bg-current"
          style={{ animationDelay: `${index * 90}ms` }}
        />
      ))}
    </span>
  ),

  spokes: () => (
    <>
      {parts(12, (index) => (
        <span
          key={index}
          className="absolute top-1/2 left-1/2 h-[30%] w-[9%] animate-noksha-spinner-fade rounded-full bg-current"
          style={{
            transform: onRim(index, 12, '-115%'),
            animationDelay: `${index * 90}ms`,
          }}
        />
      ))}
    </>
  ),

  pulse: () => <span className="size-full animate-noksha-spinner-beat rounded-full bg-current" />,

  ripple: () => (
    <>
      {parts(2, (index) => (
        <span
          key={index}
          className="absolute inset-0 animate-noksha-spinner-ripple rounded-full border-[length:var(--noksha-spinner-stroke)] border-current"
          style={{
            animationDelay: index === 0 ? undefined : 'calc(var(--noksha-spinner-duration) / -2)',
          }}
        />
      ))}
    </>
  ),

  grid: () => (
    <span className="grid size-full grid-cols-3 grid-rows-3 gap-[8%]">
      {parts(9, (index) => (
        <span
          key={index}
          className="animate-noksha-spinner-fade rounded-[22%] bg-current"
          style={{ animationDelay: `${((index % 3) + Math.floor(index / 3)) * 110}ms` }}
        />
      ))}
    </span>
  ),

  flip: () => <span className="size-full animate-noksha-spinner-flip rounded-[22%] bg-current" />,
};
