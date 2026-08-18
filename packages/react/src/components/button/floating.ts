import type * as React from 'react';
import type { FloatingPlacement } from './button.types.js';

export function anchorStyle(
  placement: FloatingPlacement,
  offset: number,
  scoped: boolean,
): React.CSSProperties {
  const style: React.CSSProperties = {
    position: scoped ? 'absolute' : 'fixed',
    display: 'flex',
  };

  if (placement.startsWith('top')) style.top = offset;
  else style.bottom = offset;

  if (placement.endsWith('center')) {
    style.insetInlineStart = offset;
    style.insetInlineEnd = offset;
    style.justifyContent = 'center';
  } else if (placement.endsWith('left')) {
    style.insetInlineStart = offset;
    style.justifyContent = 'flex-start';
  } else {
    style.insetInlineEnd = offset;
    style.justifyContent = 'flex-end';
  }

  return style;
}

export function stackAlignment(placement: FloatingPlacement): string {
  if (placement.endsWith('center')) return 'items-center';
  return placement.endsWith('left') ? 'items-start' : 'items-end';
}

export function stacksUpward(placement: FloatingPlacement): boolean {
  return !placement.startsWith('top');
}
