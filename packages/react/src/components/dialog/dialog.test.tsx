import { getScrollLockCount } from '@noksha-ui/core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Drawer } from '../drawer/drawer.js';
import { Dialog } from './dialog.js';

function Basic(props: React.ComponentProps<typeof Dialog.Root>) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger>Delete</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Delete project?</Dialog.Title>
          <Dialog.Description>This cannot be undone.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close>Cancel</Dialog.Close>
          <button type="button">Confirm</button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}

describe('Dialog', () => {
  it('starts closed', () => {
    render(<Basic />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens from the trigger', async () => {
    render(<Basic />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('takes its accessible name and description from its parts', async () => {
    render(<Basic />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAccessibleName('Delete project?');
    expect(dialog).toHaveAccessibleDescription('This cannot be undone.');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('warns when it has no accessible name', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <Dialog.Root defaultOpen>
        <Dialog.Content>
          <p>No title anywhere</p>
        </Dialog.Content>
      </Dialog.Root>,
    );

    // "dialog" on its own tells the user nothing about what took over the screen.
    await waitFor(() =>
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('accessible name')),
    );
    warn.mockRestore();
  });

  it('traps focus inside', async () => {
    render(<Basic />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await screen.findByRole('dialog');

    const inside = ['Cancel', 'Confirm', 'Close'];
    for (let i = 0; i < 6; i++) {
      await userEvent.tab();
      const name =
        document.activeElement?.getAttribute('aria-label') ?? document.activeElement?.textContent;
      expect(inside).toContain(name);
    }
  });

  it('returns focus to the trigger on close', async () => {
    render(<Basic />);
    const trigger = screen.getByRole('button', { name: 'Delete' });

    await userEvent.click(trigger);
    await screen.findByRole('dialog');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('locks page scrolling while open, and only while open', async () => {
    render(<Basic />);
    expect(getScrollLockCount()).toBe(0);

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await screen.findByRole('dialog');
    expect(getScrollLockCount()).toBe(1);

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(getScrollLockCount()).toBe(0));
  });

  it('does not lock scrolling when not modal', async () => {
    render(<Basic modal={false} />);

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await screen.findByRole('dialog');
    expect(getScrollLockCount()).toBe(0);
  });

  it('closes on the backdrop, on Escape, and on Dialog.Close', async () => {
    for (const close of ['backdrop', 'escape', 'button'] as const) {
      const view = render(<Basic />);
      await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
      await screen.findByRole('dialog');

      if (close === 'escape') await userEvent.keyboard('{Escape}');
      if (close === 'button') await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      if (close === 'backdrop') {
        await userEvent.click(document.querySelector('.fixed.inset-0') as HTMLElement);
      }

      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
      view.unmount();
    }
  });

  it('has a labelled close button that can be turned off', async () => {
    const { rerender } = render(
      <Dialog.Root defaultOpen>
        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>,
    );

    expect(await screen.findByRole('button', { name: 'Close' })).toBeInTheDocument();

    rerender(
      <Dialog.Root defaultOpen>
        <Dialog.Content hideCloseButton>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>,
    );
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('supports controlled use', async () => {
    const onOpenChange = vi.fn();
    render(<Basic open onOpenChange={onOpenChange} />);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
});

describe('Drawer', () => {
  it('reuses the Dialog machinery with a different surface', async () => {
    render(
      <Drawer.Root>
        <Drawer.Trigger>Filters</Drawer.Trigger>
        <Drawer.Content side="left" size="lg">
          <Drawer.Header>
            <Drawer.Title>Filters</Drawer.Title>
          </Drawer.Header>
        </Drawer.Content>
      </Drawer.Root>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Filters' }));

    const drawer = await screen.findByRole('dialog');
    expect(drawer).toHaveAccessibleName('Filters');
    expect(getScrollLockCount()).toBe(1);
    // Pinned to its edge and sliding a full width, so the same keyframes serve.
    expect(drawer.className).toContain('[--noksha-enter-x:-100%]');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('sizes on the axis that matches its side', async () => {
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Content side="bottom" size="xl">
          <Drawer.Title>Sheet</Drawer.Title>
        </Drawer.Content>
      </Drawer.Root>,
    );

    const drawer = await screen.findByRole('dialog');
    expect(drawer.className).toContain('max-h-[80dvh]');
    expect(drawer.className).not.toContain('max-w-2xl');
  });
});
