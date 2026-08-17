import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ToastProvider, useToast } from './toast.js';
import type { ToastOptions, ToastProviderProps } from './toast.types.js';

function Harness({
  options = {},
  ...providerProps
}: { options?: ToastOptions } & Omit<ToastProviderProps, 'children'>) {
  function Trigger() {
    const { toast, dismissAll } = useToast();
    return (
      <>
        <button type="button" onClick={() => toast({ title: 'Deployed', ...options })}>
          notify
        </button>
        <button type="button" onClick={dismissAll}>
          clear
        </button>
      </>
    );
  }

  return (
    <ToastProvider {...providerProps}>
      <Trigger />
    </ToastProvider>
  );
}

const notify = () => userEvent.click(screen.getByRole('button', { name: 'notify' }));

describe('Toast', () => {
  it('renders no viewport until there is something to show', () => {
    render(<Harness />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('shows a toast', async () => {
    render(<Harness />);
    await notify();

    expect(screen.getByText('Deployed')).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('announces politely, and assertively only for errors', async () => {
    const { rerender } = render(<Harness options={{ tone: 'success' }} />);
    await notify();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    rerender(<Harness options={{ tone: 'danger' }} />);
    await userEvent.click(screen.getByRole('button', { name: 'clear' }));
    await waitFor(() => expect(screen.queryByText('Deployed')).not.toBeInTheDocument());

    await notify();
    // Errors interrupt; a "Saved" cutting across what the user is reading does not.
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('dismisses from its close button', async () => {
    render(<Harness />);
    await notify();

    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() => expect(screen.queryByText('Deployed')).not.toBeInTheDocument());
  });

  it('dismisses itself after the duration', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<Harness duration={1000} />);
    await user.click(screen.getByRole('button', { name: 'notify' }));
    expect(screen.getByText('Deployed')).toBeInTheDocument();

    await React.act(async () => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.queryByText('Deployed')).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it('never dismisses a toast with infinite duration', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<Harness options={{ duration: Number.POSITIVE_INFINITY }} />);
    await user.click(screen.getByRole('button', { name: 'notify' }));

    await React.act(async () => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.getByText('Deployed')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('pauses the timer while the pointer is over the viewport', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<Harness duration={1000} />);
    await user.click(screen.getByRole('button', { name: 'notify' }));

    await user.hover(screen.getByRole('list'));
    await React.act(async () => {
      vi.advanceTimersByTime(5000);
    });
    // A toast the user is reading must not vanish out from under them.
    expect(screen.getByText('Deployed')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('replaces a toast reusing the same id rather than stacking', async () => {
    function Trigger() {
      const { toast } = useToast();
      return (
        <>
          <button type="button" onClick={() => toast({ id: 'save', title: 'Saving…' })}>
            start
          </button>
          <button type="button" onClick={() => toast({ id: 'save', title: 'Saved' })}>
            finish
          </button>
        </>
      );
    }

    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'start' }));
    await userEvent.click(screen.getByRole('button', { name: 'finish' }));

    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.queryByText('Saving…')).not.toBeInTheDocument();
    expect(screen.getAllByRole('status')).toHaveLength(1);
  });

  it('caps the stack at max', async () => {
    render(<Harness max={2} />);

    await notify();
    await notify();
    await notify();

    await waitFor(() => expect(screen.getAllByRole('status')).toHaveLength(2));
  });

  it('lets the pointer through the empty parts of the viewport', async () => {
    render(<Harness />);
    await notify();

    // Otherwise a corner-pinned region swallows every click in that corner.
    expect(screen.getByRole('list')).toHaveClass('pointer-events-none');
    expect(screen.getByRole('status')).toHaveClass('pointer-events-auto');
  });

  it('reports dismissal to the caller', async () => {
    const onDismiss = vi.fn();
    render(<Harness options={{ onDismiss }} />);

    await notify();
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

    await waitFor(() => expect(onDismiss).toHaveBeenCalled());
  });

  it('fails loudly outside a provider', () => {
    function Loose() {
      useToast();
      return null;
    }

    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Loose />)).toThrow(/ToastProvider/);
    error.mockRestore();
  });
});
