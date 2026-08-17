import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from './use-controllable-state.js';

describe('useControllableState', () => {
  it('manages its own state when uncontrolled', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 'a' }));

    expect(result.current[0]).toBe('a');
    act(() => result.current[1]('b'));
    expect(result.current[0]).toBe('b');
  });

  it('defers to the prop when controlled and ignores internal writes', () => {
    const { result } = renderHook(() => useControllableState({ value: 'a', defaultValue: 'z' }));

    expect(result.current[0]).toBe('a');
    act(() => result.current[1]('b'));
    // The owner did not change `value`, so the displayed state must not move.
    expect(result.current[0]).toBe('a');
  });

  it('calls onChange in both modes', () => {
    const uncontrolled = vi.fn();
    const controlled = vi.fn();

    const a = renderHook(() => useControllableState({ defaultValue: 'a', onChange: uncontrolled }));
    act(() => a.result.current[1]('b'));
    expect(uncontrolled).toHaveBeenCalledWith('b');

    const b = renderHook(() =>
      useControllableState({ value: 'a', defaultValue: 'a', onChange: controlled }),
    );
    act(() => b.result.current[1]('b'));
    expect(controlled).toHaveBeenCalledWith('b');
  });

  it('accepts an updater function like useState', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 1 }));

    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(2);
  });

  it('sees the newer value when the setter is called twice in one tick', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 0, onChange }));

    act(() => {
      result.current[1]((prev) => prev + 1);
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
    expect(onChange).toHaveBeenNthCalledWith(2, 2);
  });

  it('skips the update when the value is unchanged', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 'a', onChange }));

    act(() => result.current[1]('a'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keeps the setter identity stable across renders', () => {
    const { result, rerender } = renderHook(
      ({ onChange }) => useControllableState({ defaultValue: 'a', onChange }),
      { initialProps: { onChange: () => {} } },
    );

    const first = result.current[1];
    rerender({ onChange: () => {} });
    expect(result.current[1]).toBe(first);
  });

  it('calls the latest onChange, not the one from first render', () => {
    const first = vi.fn();
    const second = vi.fn();

    const { result, rerender } = renderHook(
      ({ onChange }) => useControllableState({ defaultValue: 'a', onChange }),
      { initialProps: { onChange: first } },
    );

    rerender({ onChange: second });
    act(() => result.current[1]('b'));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith('b');
  });

  it('follows the controlled value when the owner changes it', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: 'a' }),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'c' });
    expect(result.current[0]).toBe('c');
  });

  it('warns when a component switches between controlled and uncontrolled', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = renderHook(
      ({ value }: { value?: string }) => useControllableState({ value, defaultValue: 'a' }),
      { initialProps: { value: 'a' } as { value?: string } },
    );

    rerender({ value: undefined });
    expect(error).toHaveBeenCalledWith(expect.stringContaining('controlled to uncontrolled'));

    error.mockRestore();
  });
});
