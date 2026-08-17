import * as React from 'react';

/**
 * Nested locks are counted rather than applied twice: a dialog that opens a
 * drawer must not restore scrolling when only the drawer closes.
 */
let lockCount = 0;
let release: (() => void) | null = null;

/** iOS ignores `overflow: hidden` on the body and needs the position trick. */
function isIosSafari(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ios = /iP(ad|hone|od)/.test(navigator.platform ?? '');
  const iPadOs = navigator.platform === 'MacIntel' && (navigator.maxTouchPoints ?? 0) > 1;
  return ios || iPadOs;
}

function applyLock(): () => void {
  const { body, documentElement: html } = document;

  const previousBody = body.style.cssText;
  const previousHtml = html.style.cssText;
  const scrollY = window.scrollY;

  /**
   * Reserve the space the scrollbar occupied. Without it, hiding the scrollbar
   * widens the viewport by ~15px and the whole page visibly jumps sideways the
   * moment a dialog opens — the single most common scroll-lock bug.
   *
   * `scrollbar-gutter: stable` does the same job natively and is preferred when
   * the page already opted into it, because it also holds the gutter for any
   * other scroll container.
   */
  const gutterIsStable = getComputedStyle(html).scrollbarGutter?.includes('stable') ?? false;
  const scrollbarWidth = window.innerWidth - html.clientWidth;

  if (isIosSafari()) {
    // Freezing the body in place is the only thing that stops iOS rubber-banding
    // the page behind an overlay; the scroll offset is re-applied on release.
    Object.assign(body.style, {
      position: 'fixed',
      top: `${-scrollY}px`,
      left: '0',
      right: '0',
      overflow: 'hidden',
    });
  } else {
    body.style.overflow = 'hidden';
    if (!gutterIsStable && scrollbarWidth > 0) {
      const current = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + scrollbarWidth}px`;
    }
  }

  return () => {
    body.style.cssText = previousBody;
    html.style.cssText = previousHtml;
    if (isIosSafari()) window.scrollTo(0, scrollY);
  };
}

/**
 * Locks page scrolling while `enabled`, without the layout shift.
 *
 * ```ts
 * useScrollLock(open);
 * ```
 */
export function useScrollLock(enabled = true): void {
  React.useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;

    lockCount += 1;
    if (lockCount === 1) release = applyLock();

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        release?.();
        release = null;
      }
    };
  }, [enabled]);
}

/** How many locks are held. Exposed for tests. */
export function getScrollLockCount(): number {
  return lockCount;
}
