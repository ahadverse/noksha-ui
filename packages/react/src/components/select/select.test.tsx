import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './select.js';

function Plans(props: React.ComponentProps<typeof Select.Root>) {
  return (
    <Select.Root {...props}>
      <Select.Trigger placeholder="Choose a plan" aria-label="Plan" />
      <Select.Content>
        <Select.Item value="free">Free</Select.Item>
        <Select.Item value="pro">Pro</Select.Item>
        <Select.Item value="team" disabled>
          Team
        </Select.Item>
        <Select.Item value="enterprise">Enterprise</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}

const open = () => userEvent.click(screen.getByRole('combobox'));

describe('Select', () => {
  it('shows the placeholder when nothing is selected', () => {
    render(<Plans />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Choose a plan');
    expect(screen.getByRole('combobox')).toHaveAttribute('data-placeholder');
  });

  it('shows the selected label without ever opening the list', () => {
    render(<Plans defaultValue="pro" />);

    // The labels are read out of the element tree, so the trigger is correct on
    // the very first paint — no flash of the raw value, no server mismatch.
    expect(screen.getByRole('combobox')).toHaveTextContent('Pro');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens on click and lists the options', async () => {
    render(<Plans />);
    await open();

    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('opens on ArrowDown, Enter and Space', async () => {
    for (const key of ['{ArrowDown}', '{Enter}', ' '] as const) {
      const view = render(<Plans />);
      screen.getByRole('combobox').focus();

      await userEvent.keyboard(key);
      expect(await screen.findByRole('listbox')).toBeInTheDocument();
      view.unmount();
    }
  });

  it('selects on click and closes', async () => {
    const onValueChange = vi.fn();
    render(<Plans onValueChange={onValueChange} />);
    await open();

    await userEvent.click(screen.getByRole('option', { name: 'Pro' }));
    expect(onValueChange).toHaveBeenLastCalledWith('pro');
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(screen.getByRole('combobox')).toHaveTextContent('Pro');
  });

  it('marks the selected option in aria', async () => {
    render(<Plans defaultValue="pro" />);
    await open();

    expect(screen.getByRole('option', { name: 'Pro' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: 'Free' })).toHaveAttribute('aria-selected', 'false');
  });

  it('opens focused on the selected option, not on the first', async () => {
    render(<Plans defaultValue="enterprise" />);
    await open();

    // Otherwise a list of two hundred countries starts at Afghanistan every time.
    await waitFor(() => expect(screen.getByRole('option', { name: 'Enterprise' })).toHaveFocus());
  });

  it('moves with the arrow keys and skips disabled options', async () => {
    render(<Plans defaultValue="pro" />);
    await open();
    await waitFor(() => expect(screen.getByRole('option', { name: 'Pro' })).toHaveFocus());

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: 'Enterprise' })).toHaveFocus();
  });

  it('selects the focused option with Enter', async () => {
    const onValueChange = vi.fn();
    render(<Plans onValueChange={onValueChange} />);
    await open();
    await waitFor(() => expect(screen.getByRole('option', { name: 'Free' })).toHaveFocus());

    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onValueChange).toHaveBeenLastCalledWith('pro');
  });

  it('does not select a disabled option', async () => {
    const onValueChange = vi.fn();
    render(<Plans onValueChange={onValueChange} />);
    await open();

    await userEvent.click(screen.getByRole('option', { name: 'Team' }), { pointerEventsCheck: 0 });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('jumps with type-to-select inside the list', async () => {
    render(<Plans />);
    await open();
    await waitFor(() => expect(screen.getByRole('option', { name: 'Free' })).toHaveFocus());

    await userEvent.keyboard('e');
    expect(screen.getByRole('option', { name: 'Enterprise' })).toHaveFocus();
  });

  it('type-to-selects from the closed trigger, as a native select does', async () => {
    const onValueChange = vi.fn();
    render(<Plans onValueChange={onValueChange} />);

    screen.getByRole('combobox').focus();
    await userEvent.keyboard('p');

    expect(onValueChange).toHaveBeenLastCalledWith('pro');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    render(<Plans />);
    await open();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveFocus());
  });

  it('closes on an outside press', async () => {
    render(
      <>
        <button type="button">elsewhere</button>
        <Plans />
      </>,
    );
    await open();

    await userEvent.click(screen.getByRole('button', { name: 'elsewhere' }));
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
  });

  it('posts with the form through a hidden input', async () => {
    render(
      <form data-testid="form">
        <Plans name="plan" defaultValue="free" />
      </form>,
    );

    await open();
    await userEvent.click(screen.getByRole('option', { name: 'Pro' }));

    const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
    expect(data.get('plan')).toBe('pro');
  });

  it('ties the listbox to the trigger', async () => {
    render(<Plans />);
    const trigger = screen.getByRole('combobox');

    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await open();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', screen.getByRole('listbox').id);
  });

  it('groups options with a label', async () => {
    render(
      <Select.Root>
        <Select.Trigger placeholder="Pick" aria-label="Grouped" />
        <Select.Content>
          <Select.Group label="Paid">
            <Select.Item value="pro">Pro</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>,
    );

    await open();
    expect(screen.getByRole('group', { name: 'Paid' })).toBeInTheDocument();
    // Items nested inside a group are still collected for the trigger's label.
    expect(screen.getByRole('option', { name: 'Pro' })).toBeInTheDocument();
  });

  it('does not open while disabled', async () => {
    render(<Plans disabled />);

    await userEvent.click(screen.getByRole('combobox'), { pointerEventsCheck: 0 });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports controlled use', async () => {
    function Controlled() {
      const [value, setValue] = React.useState('free');
      return <Plans value={value} onValueChange={setValue} />;
    }

    render(<Controlled />);
    await open();
    await userEvent.click(screen.getByRole('option', { name: 'Pro' }));

    expect(screen.getByRole('combobox')).toHaveTextContent('Pro');
  });

  it('fails loudly when a part is used outside the root', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Select.Trigger />)).toThrow(/Select.Root/);
    error.mockRestore();
  });
});
