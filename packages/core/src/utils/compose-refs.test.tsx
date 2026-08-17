import { render } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { composeRefs } from './compose-refs.js';

describe('composeRefs', () => {
  it('fills object refs and calls function refs with the same node', () => {
    const objectRef = React.createRef<HTMLDivElement>();
    const functionRef = vi.fn();

    const { container } = render(<div ref={composeRefs(objectRef, functionRef)} />);
    const node = container.firstChild;

    expect(objectRef.current).toBe(node);
    expect(functionRef).toHaveBeenCalledWith(node);
  });

  it('ignores null and undefined refs', () => {
    const objectRef = React.createRef<HTMLDivElement>();

    expect(() => render(<div ref={composeRefs(null, undefined, objectRef)} />)).not.toThrow();
    expect(objectRef.current).not.toBeNull();
  });

  it('clears object refs on unmount', () => {
    const objectRef = React.createRef<HTMLDivElement>();

    const { unmount } = render(<div ref={composeRefs(objectRef)} />);
    expect(objectRef.current).not.toBeNull();

    unmount();
    expect(objectRef.current).toBeNull();
  });

  it('runs a cleanup returned by a callback ref instead of calling it with null', () => {
    const cleanup = vi.fn();
    const callbackRef = vi.fn(() => cleanup);

    const { unmount } = render(<div ref={composeRefs(callbackRef)} />);
    expect(callbackRef).toHaveBeenCalledTimes(1);

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
    // The cleanup replaces the null call — it must not be invoked twice.
    expect(callbackRef).toHaveBeenCalledTimes(1);
  });

  it('mixes cleanup and non-cleanup refs without leaking either', () => {
    const cleanup = vi.fn();
    const withCleanup = vi.fn(() => cleanup);
    const plain = vi.fn();
    const objectRef = React.createRef<HTMLDivElement>();

    const { unmount } = render(<div ref={composeRefs(withCleanup, plain, objectRef)} />);
    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(plain).toHaveBeenLastCalledWith(null);
    expect(objectRef.current).toBeNull();
  });
});
