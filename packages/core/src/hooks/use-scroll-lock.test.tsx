import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getScrollLockCount, useScrollLock } from './use-scroll-lock.js';

function Lock({ enabled = true }: { enabled?: boolean }) {
  useScrollLock(enabled);
  return null;
}

beforeEach(() => {
  document.body.style.cssText = '';
  document.documentElement.style.cssText = '';
});

afterEach(() => {
  expect(getScrollLockCount(), 'a scroll lock leaked between tests').toBe(0);
});

describe('useScrollLock', () => {
  it('locks the body while enabled and restores on unmount', () => {
    const { unmount } = render(<Lock />);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('does nothing while disabled', () => {
    render(<Lock enabled={false} />);
    expect(document.body.style.overflow).toBe('');
    expect(getScrollLockCount()).toBe(0);
  });

  it('counts nested locks so the inner one does not release the outer', () => {
    const outer = render(<Lock />);
    const inner = render(<Lock />);
    expect(getScrollLockCount()).toBe(2);

    // A drawer opened from inside a dialog closes first; the page must stay
    // locked until the dialog closes too.
    inner.unmount();
    expect(document.body.style.overflow).toBe('hidden');

    outer.unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('restores styles the page already had', () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '8px';

    const { unmount } = render(<Lock />);
    unmount();

    expect(document.body.style.overflow).toBe('auto');
    expect(document.body.style.paddingRight).toBe('8px');
  });

  it('releases when the flag flips off without unmounting', () => {
    const { rerender } = render(<Lock />);
    expect(getScrollLockCount()).toBe(1);

    rerender(<Lock enabled={false} />);
    expect(getScrollLockCount()).toBe(0);
    expect(document.body.style.overflow).toBe('');
  });
});
