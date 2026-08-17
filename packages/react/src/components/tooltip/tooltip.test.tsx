import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Tooltip } from './tooltip.js';

function Basic(props: React.ComponentProps<typeof Tooltip.Root>) {
  return (
    <Tooltip.Root delayDuration={0} closeDelay={0} {...props}>
      <Tooltip.Trigger>Delete</Tooltip.Trigger>
      <Tooltip.Content>Delete permanently</Tooltip.Content>
    </Tooltip.Root>
  );
}

describe('Tooltip', () => {
  it('starts closed', () => {
    render(<Basic />);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens on hover and closes on leave', async () => {
    render(<Basic />);
    const trigger = screen.getByRole('button', { name: 'Delete' });

    await userEvent.hover(trigger);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Delete permanently');

    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('opens on keyboard focus', async () => {
    render(<Basic />);

    await userEvent.tab();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('closes on blur', async () => {
    render(
      <>
        <Basic />
        <button type="button">next</button>
      </>,
    );

    await userEvent.tab();
    await screen.findByRole('tooltip');

    await userEvent.tab();
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('describes the trigger rather than naming it', async () => {
    render(<Basic />);
    const trigger = screen.getByRole('button', { name: 'Delete' });

    await userEvent.hover(trigger);
    await screen.findByRole('tooltip');

    // The button is still called "Delete". A tooltip used as the only label
    // leaves touch users — who never see it — with an unlabelled control.
    expect(trigger).toHaveAccessibleName('Delete');
    expect(trigger).toHaveAccessibleDescription('Delete permanently');
  });

  it('drops aria-describedby while closed', () => {
    render(<Basic />);
    expect(screen.getByRole('button', { name: 'Delete' })).not.toHaveAttribute('aria-describedby');
  });

  it('closes on Escape', async () => {
    render(<Basic />);

    await userEvent.hover(screen.getByRole('button', { name: 'Delete' }));
    await screen.findByRole('tooltip');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('closes when the trigger is pressed', async () => {
    render(<Basic />);

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    // Acting on the control answers the question the tooltip was asking.
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('ignores touch, which has no hover to speak of', () => {
    render(<Basic />);
    const trigger = screen.getByRole('button', { name: 'Delete' });

    // jsdom has no PointerEvent, and fireEvent's fallback drops `pointerType`
    // entirely — so the event is built by hand. React synthesises
    // `onPointerEnter` from `pointerover`, which is why that is the one fired.
    const hover = (pointerType: string) => {
      const event = new MouseEvent('pointerover', { bubbles: true });
      Object.defineProperty(event, 'pointerType', { value: pointerType });
      fireEvent(trigger, event);
    };

    // A long-press tooltip would fight the platform's own text selection and
    // context menu, so touch simply does not open one.
    hover('touch');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    hover('mouse');
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('lets the pointer through by default', async () => {
    render(<Basic />);

    await userEvent.hover(screen.getByRole('button', { name: 'Delete' }));
    // Otherwise a tooltip near a control's edge blocks the control's own hover.
    expect(await screen.findByRole('tooltip')).toHaveClass('pointer-events-none');
  });

  it('accepts the pointer when interactive', async () => {
    render(<Basic interactive />);

    await userEvent.hover(screen.getByRole('button', { name: 'Delete' }));
    expect(await screen.findByRole('tooltip')).toHaveClass('pointer-events-auto');
  });

  it('honours the open delay', async () => {
    render(
      <Tooltip.Root delayDuration={5000}>
        <Tooltip.Trigger>Delete</Tooltip.Trigger>
        <Tooltip.Content>Delete permanently</Tooltip.Content>
      </Tooltip.Root>,
    );

    await userEvent.hover(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('skips the delay for the next tooltip in a group', async () => {
    render(
      <Tooltip.Provider delayDuration={5000} skipDelayDuration={5000}>
        <Tooltip.Root>
          <Tooltip.Trigger>First</Tooltip.Trigger>
          <Tooltip.Content>First tip</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger>Second</Tooltip.Trigger>
          <Tooltip.Content>Second tip</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger>Third</Tooltip.Trigger>
          <Tooltip.Content>Third tip</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>,
    );

    // The first one opens without waiting because its own delay is zero; that
    // starts the skip window, so the third opens instantly despite a 5s delay.
    await userEvent.hover(screen.getByRole('button', { name: 'Second' }));
    await screen.findByText('Second tip');
    await userEvent.unhover(screen.getByRole('button', { name: 'Second' }));

    await userEvent.hover(screen.getByRole('button', { name: 'Third' }));
    expect(await screen.findByText('Third tip')).toBeInTheDocument();
  });

  it('supports controlled use', () => {
    render(<Basic open />);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
