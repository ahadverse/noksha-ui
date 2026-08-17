import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { FocusScope } from './focus-scope.js';

function Trapped({ trapped = true, ...props }: React.ComponentProps<typeof FocusScope>) {
  return (
    <>
      <button type="button">outside before</button>
      <FocusScope trapped={trapped} {...props}>
        <button type="button">first</button>
        <button type="button">middle</button>
        <button type="button">last</button>
      </FocusScope>
      <button type="button">outside after</button>
    </>
  );
}

describe('FocusScope', () => {
  it('moves focus to the first tabbable child on mount', () => {
    render(<Trapped />);
    expect(screen.getByRole('button', { name: 'first' })).toHaveFocus();
  });

  it('falls back to the container when there is nothing to focus', () => {
    const { container } = render(
      <FocusScope trapped data-testid="scope">
        <p>nothing focusable here</p>
      </FocusScope>,
    );

    // The container has to take focus, or Tab would walk straight back into
    // the page the trap is supposed to be holding the user away from.
    expect(container.querySelector('[data-testid="scope"]')).toHaveFocus();
  });

  it('respects preventDefault on the mount event', () => {
    render(
      <Trapped
        onMountAutoFocus={(event) => {
          event.preventDefault();
        }}
      />,
    );
    expect(screen.getByRole('button', { name: 'first' })).not.toHaveFocus();
  });

  it('leaves focus alone when autoFocus is off', () => {
    render(<Trapped autoFocus={false} />);
    expect(document.body).toHaveFocus();
  });

  describe('trapping', () => {
    it('wraps forward from the last element to the first', async () => {
      render(<Trapped />);

      await userEvent.tab();
      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'last' })).toHaveFocus();

      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'first' })).toHaveFocus();
    });

    it('wraps backward from the first element to the last', async () => {
      render(<Trapped />);
      expect(screen.getByRole('button', { name: 'first' })).toHaveFocus();

      await userEvent.tab({ shift: true });
      expect(screen.getByRole('button', { name: 'last' })).toHaveFocus();
    });

    it('does not wrap when loop is off, but still holds focus in', async () => {
      render(<Trapped loop={false} />);

      await userEvent.tab();
      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'last' })).toHaveFocus();

      // `loop` governs the wrap, `trapped` governs the boundary. With looping
      // off, Tab at the end goes nowhere rather than jumping back to the first —
      // and the focusin guard still refuses to let it out of the scope.
      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'first' })).not.toHaveFocus();
      expect(screen.getByRole('button', { name: 'outside after' })).not.toHaveFocus();
    });

    it('pulls focus back when something outside grabs it', async () => {
      render(<Trapped />);

      // No Tab involved: this is the path sentinel-based traps miss, where a
      // script, an embed, or browser chrome moves focus on its own.
      screen.getByRole('button', { name: 'outside after' }).focus();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'outside after' })).not.toHaveFocus();
      });
    });

    it('lets focus leave when it is not trapped', async () => {
      render(<Trapped trapped={false} />);

      const outside = screen.getByRole('button', { name: 'outside after' });
      outside.focus();
      expect(outside).toHaveFocus();
    });
  });

  describe('restore', () => {
    it('returns focus to the opener on unmount', async () => {
      function Harness() {
        const [open, setOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setOpen(true)}>
              open
            </button>
            {open ? (
              <FocusScope trapped>
                <button type="button" onClick={() => setOpen(false)}>
                  close
                </button>
              </FocusScope>
            ) : null}
          </>
        );
      }

      render(<Harness />);
      const opener = screen.getByRole('button', { name: 'open' });

      await userEvent.click(opener);
      expect(screen.getByRole('button', { name: 'close' })).toHaveFocus();

      await userEvent.click(screen.getByRole('button', { name: 'close' }));
      await waitFor(() => expect(opener).toHaveFocus());
    });

    it('respects preventDefault on the unmount event', async () => {
      const onUnmountAutoFocus = vi.fn((event: Event) => event.preventDefault());

      const { unmount } = render(
        <FocusScope trapped onUnmountAutoFocus={onUnmountAutoFocus}>
          <button type="button">inside</button>
        </FocusScope>,
      );

      unmount();
      expect(onUnmountAutoFocus).toHaveBeenCalled();
    });
  });

  it('renders as its child with asChild', () => {
    render(
      <FocusScope asChild trapped>
        <section aria-label="scoped">
          <button type="button">inside</button>
        </section>
      </FocusScope>,
    );

    expect(screen.getByRole('region', { name: 'scoped' })).toBeInTheDocument();
  });

  it('still calls a consumer onKeyDown', async () => {
    const onKeyDown = vi.fn();
    render(
      <FocusScope trapped onKeyDown={onKeyDown}>
        <button type="button">inside</button>
      </FocusScope>,
    );

    await userEvent.keyboard('{Tab}');
    expect(onKeyDown).toHaveBeenCalled();
  });
});
