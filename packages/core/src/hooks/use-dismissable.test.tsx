import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  type DismissReason,
  getLayerCount,
  type UseDismissableOptions,
  useDismissable,
} from './use-dismissable.js';

type LayerProps = Omit<UseDismissableOptions, 'ref' | 'onDismiss'> & {
  name: string;
  onDismiss: (reason: DismissReason) => void;
  children?: React.ReactNode;
  withTrigger?: boolean;
};

function Layer({ name, onDismiss, children, withTrigger = false, ...options }: LayerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  useDismissable({
    ref,
    onDismiss: (reason) => onDismiss(reason),
    extraRefs: withTrigger ? [triggerRef] : undefined,
    ...options,
  });

  return (
    <>
      {withTrigger ? (
        <button type="button" ref={triggerRef}>
          {name} trigger
        </button>
      ) : null}
      <div ref={ref} data-testid={name}>
        <button type="button">{name} inside</button>
        {children}
      </div>
    </>
  );
}

afterEach(() => {
  // Unmount first — hook order across setup files is not guaranteed, and the
  // point of this assertion is that no layer outlives its component.
  cleanup();
  expect(getLayerCount(), 'a layer leaked between tests').toBe(0);
});

describe('useDismissable', () => {
  it('dismisses on Escape', async () => {
    const onDismiss = vi.fn();
    render(<Layer name="one" onDismiss={onDismiss} />);

    await userEvent.keyboard('{Escape}');
    expect(onDismiss).toHaveBeenCalledWith('escape');
  });

  it('dismisses on a pointer press outside', async () => {
    const onDismiss = vi.fn();
    render(
      <>
        <button type="button">elsewhere</button>
        <Layer name="one" onDismiss={onDismiss} />
      </>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'elsewhere' }));
    expect(onDismiss).toHaveBeenCalledWith('outside-pointer');
  });

  it('ignores presses inside the layer', async () => {
    const onDismiss = vi.fn();
    render(<Layer name="one" onDismiss={onDismiss} />);

    await userEvent.click(screen.getByRole('button', { name: 'one inside' }));
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('treats the trigger as inside', async () => {
    const onDismiss = vi.fn();
    render(<Layer name="one" onDismiss={onDismiss} withTrigger />);

    // Without this, clicking the trigger dismisses the layer and the trigger's
    // own click then reopens it — so the popover appears never to close.
    await userEvent.click(screen.getByRole('button', { name: 'one trigger' }));
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('does nothing while disabled', async () => {
    const onDismiss = vi.fn();
    render(<Layer name="one" onDismiss={onDismiss} enabled={false} />);

    expect(getLayerCount()).toBe(0);
    await userEvent.keyboard('{Escape}');
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('honours the per-reason opt-outs', async () => {
    const onDismiss = vi.fn();
    render(
      <>
        <button type="button">elsewhere</button>
        <Layer name="one" onDismiss={onDismiss} disableEscape disableOutsidePointer />
      </>,
    );

    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'elsewhere' }));
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('dismisses on focus leaving, when asked', async () => {
    const onDismiss = vi.fn();
    render(
      <>
        <Layer name="one" onDismiss={onDismiss} dismissOnFocusOut />
        <button type="button">elsewhere</button>
      </>,
    );

    screen.getByRole('button', { name: 'elsewhere' }).focus();
    expect(onDismiss).toHaveBeenCalledWith('focus-out');
  });

  it('unregisters on unmount and tears the listeners down', () => {
    const { unmount } = render(<Layer name="one" onDismiss={vi.fn()} />);
    expect(getLayerCount()).toBe(1);

    unmount();
    expect(getLayerCount()).toBe(0);
  });

  describe('nesting', () => {
    it('Escape closes only the topmost layer', async () => {
      const outer = vi.fn();
      const inner = vi.fn();

      render(
        <Layer name="outer" onDismiss={outer}>
          <Layer name="inner" onDismiss={inner} />
        </Layer>,
      );

      await userEvent.keyboard('{Escape}');
      expect(inner).toHaveBeenCalledWith('escape');
      expect(outer).not.toHaveBeenCalled();
    });

    it('a press inside the inner layer closes neither', async () => {
      const outer = vi.fn();
      const inner = vi.fn();

      render(
        <Layer name="outer" onDismiss={outer}>
          <Layer name="inner" onDismiss={inner} />
        </Layer>,
      );

      await userEvent.click(screen.getByRole('button', { name: 'inner inside' }));
      expect(inner).not.toHaveBeenCalled();
      expect(outer).not.toHaveBeenCalled();
    });

    it('a press on the page closes both, innermost first', async () => {
      const order: string[] = [];

      render(
        <>
          <button type="button">elsewhere</button>
          <Layer name="outer" onDismiss={() => order.push('outer')}>
            <Layer name="inner" onDismiss={() => order.push('inner')} />
          </Layer>
        </>,
      );

      await userEvent.click(screen.getByRole('button', { name: 'elsewhere' }));
      expect(order).toEqual(['inner', 'outer']);
    });

    it('a press in the outer layer closes only the inner one', async () => {
      const outer = vi.fn();
      const inner = vi.fn();

      render(
        <Layer name="outer" onDismiss={outer}>
          <Layer name="inner" onDismiss={inner} />
        </Layer>,
      );

      await userEvent.click(screen.getByRole('button', { name: 'outer inside' }));
      expect(inner).toHaveBeenCalledWith('outside-pointer');
      expect(outer).not.toHaveBeenCalled();
    });
  });

  it('keeps the latest handler without re-registering the layer', async () => {
    const first = vi.fn();
    const second = vi.fn();

    const { rerender } = render(<Layer name="one" onDismiss={first} />);
    rerender(<Layer name="one" onDismiss={second} />);

    await userEvent.keyboard('{Escape}');
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith('escape');
  });
});
