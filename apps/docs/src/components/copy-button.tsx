'use client';

import { Button, type ButtonProps } from '@prism-ui/react';
import * as React from 'react';

import { CheckIcon, CopyIcon } from './icons';

interface CopyButtonProps extends Omit<ButtonProps, 'children' | 'onClick' | 'iconOnly' | 'icon'> {
  value: string;
  /** Shown instead of the icon-only form. */
  label?: string;
}

/**
 * The button the whole site exists for.
 *
 * Confirmation is the icon swapping in place rather than a toast: copying is a
 * thing people do repeatedly and quickly, and a notification per copy would
 * stack up faster than it clears.
 */
export function CopyButton({ value, label, ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = React.useCallback(() => {
    // `writeText` rejects on an insecure origin or a denied permission. Failing
    // silently would leave the user believing they had copied something.
    navigator.clipboard.writeText(value).then(
      () => setCopied(true),
      () => setCopied(false),
    );
  }, [value]);

  const icon = copied ? <CheckIcon /> : <CopyIcon />;

  if (label) {
    return (
      <Button variant="ghost" tone="neutral" size="sm" icon={icon} onClick={copy} {...props}>
        {copied ? 'Copied' : label}
      </Button>
    );
  }

  return (
    <Button
      iconOnly
      variant="ghost"
      tone="neutral"
      size="sm"
      icon={icon}
      onClick={copy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      {...props}
    />
  );
}
