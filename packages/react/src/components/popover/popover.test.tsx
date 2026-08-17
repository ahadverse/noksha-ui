import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Popover } from './popover.js';

function Basic(props: React.ComponentProps<typeof Popover.Root>) {
  return (
    <Popover.Root {...props}>
      <Popover.Trigger>Filters</Popover.Trigger>
      <Popover.Content>
        <button type="button">Apply</button>
        <Popover.Close>Done</Popover.Close>
      </Popover.Content>
    </Popover.Root>
  );
}

describe('Popover', () => {
  it('starts closed and renders nothing', () => {
    render(<Basic />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens on the trigger and closes on it again', async () => {
    render(<Basic />);
    const trigger = screen.getByRole('button', { name: 'Filters' });

    await userEvent.click(trigger);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await userEvent.click(trigger);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('keeps the trigger state in aria', async () => {
    render(<Basic />);
    const trigger = screen.getByRole('button', { name: 'Filters' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    // No aria-controls while there is nothing to point at — a reference to an
    // absent id is broken, not merely empty.
    expect(trigger).not.toHaveAttribute('aria-controls');

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', screen.getByRole('dialog').id);
  });

  it('portals out of the trigger subtree', async () => {
    const { container } = render(<Basic />);
    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));

    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    render(<Basic />);
    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes on an outside press', async () => {
    render(
      <>
        <button type="button">elsewhere</button>
        <Basic />
      </>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));

    await userEvent.click(screen.getByRole('button', { name: 'elsewhere' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('stays open on a press inside', async () => {
    render(<Basic />);
    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));

    await userEvent.click(screen.getByRole('button', { name: 'Apply' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('ignores outside presses when modal', async () => {
    render(
      <>
        <button type="button">elsewhere</button>
        <Basic modal />
      </>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));

    await userEvent.click(screen.getByRole('button', { name: 'elsewhere' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes from Popover.Close', async () => {
    render(<Basic />);
    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));

    await userEvent.click(screen.getByRole('button', { name: 'Done' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('moves focus in on open and back to the trigger on close', async () => {
    render(<Basic />);
    const trigger = screen.getByRole('button', { name: 'Filters' });

    await userEvent.click(trigger);
    expect(screen.getByRole('button', { name: 'Apply' })).toHaveFocus();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('reports open state to the consumer', async () => {
    const onOpenChange = vi.fn();
    render(<Basic onOpenChange={onOpenChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it('supports controlled use', async () => {
    function Controlled() {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            open from outside
          </button>
          <Basic open={open} onOpenChange={setOpen} />
        </>
      );
    }

    render(<Controlled />);
    await userEvent.click(screen.getByRole('button', { name: 'open from outside' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('carries the resolved side into a data attribute for the animation', async () => {
    render(<Basic />);
    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));

    // The animation follows the side the layer actually landed on, so a flipped
    // popover slides the right way.
    expect(screen.getByRole('dialog')).toHaveAttribute('data-side');
    expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');
  });

  it('fails loudly when a part is used outside the root', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Popover.Trigger>x</Popover.Trigger>)).toThrow(/Popover.Root/);
    error.mockRestore();
  });
});
