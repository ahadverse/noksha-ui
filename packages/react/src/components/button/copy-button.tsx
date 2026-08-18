import * as React from 'react';
import { Button } from './button.js';
import type { CopyButtonProps } from './button.types.js';

const CopyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12.5 9 17.5 20 6.5" />
  </svg>
);

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(function CopyButton(
  {
    value,
    label = 'Copy',
    copiedLabel = 'Copied',
    timeout = 2000,
    withLabel = false,
    variant = 'ghost',
    tone = 'neutral',
    size = 'sm',
    onCopied,
    onClick,
    className,
    ...rest
  },
  ref,
) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }

    setCopied(true);
    onCopied?.(value);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), timeout);
  }, [value, timeout, onCopied]);

  const shared = {
    ref,
    variant,
    tone,
    size,
    className,
    icon: copied ? <CheckIcon /> : <CopyIcon />,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) void copy();
    },
    ...rest,
  };

  return (
    <>
      {withLabel ? (
        <Button {...shared}>{copied ? copiedLabel : label}</Button>
      ) : (
        <Button {...shared} iconOnly aria-label={copied ? copiedLabel : label} />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ''}
      </span>
    </>
  );
});
CopyButton.displayName = 'CopyButton';
