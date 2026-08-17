import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from './accordion.js';

function Basic(props: React.ComponentProps<typeof Accordion.Root>) {
  return (
    <Accordion.Root {...props}>
      <Accordion.Item value="billing">
        <Accordion.Trigger>Billing</Accordion.Trigger>
        <Accordion.Content>Billing details</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="team">
        <Accordion.Trigger>Team</Accordion.Trigger>
        <Accordion.Content>Team details</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="api">
        <Accordion.Trigger>API</Accordion.Trigger>
        <Accordion.Content>API details</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

describe('Accordion', () => {
  it('starts with everything closed', () => {
    render(<Basic />);

    expect(screen.queryByText('Billing details')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Billing' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('opens on click', async () => {
    render(<Basic />);

    await userEvent.click(screen.getByRole('button', { name: 'Billing' }));
    expect(screen.getByText('Billing details')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Billing' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('puts each trigger in a heading so it shows up in the headings list', () => {
    render(<Basic />);

    // How people actually navigate a long FAQ with a screen reader.
    expect(screen.getByRole('heading', { level: 3, name: 'Billing' })).toBeInTheDocument();
  });

  it('takes a heading level, so the page outline stays right', () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="a">
          <Accordion.Trigger as="h2">A</Accordion.Trigger>
          <Accordion.Content>A body</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'A' })).toBeInTheDocument();
  });

  it('ties the panel to its trigger', async () => {
    render(<Basic />);
    await userEvent.click(screen.getByRole('button', { name: 'Billing' }));

    const trigger = screen.getByRole('button', { name: 'Billing' });
    const panel = screen.getByRole('region');

    expect(trigger).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', trigger.id);
  });

  it('closes the previous item in single mode', async () => {
    render(<Basic />);

    await userEvent.click(screen.getByRole('button', { name: 'Billing' }));
    await userEvent.click(screen.getByRole('button', { name: 'Team' }));

    await waitFor(() => expect(screen.queryByText('Billing details')).not.toBeInTheDocument());
    expect(screen.getByText('Team details')).toBeInTheDocument();
  });

  it('will not close the open item unless collapsible', async () => {
    render(<Basic defaultValue="billing" />);

    await userEvent.click(screen.getByRole('button', { name: 'Billing' }));
    expect(screen.getByText('Billing details')).toBeInTheDocument();
  });

  it('closes the open item when collapsible', async () => {
    render(<Basic defaultValue="billing" collapsible />);

    await userEvent.click(screen.getByRole('button', { name: 'Billing' }));
    await waitFor(() => expect(screen.queryByText('Billing details')).not.toBeInTheDocument());
  });

  it('keeps several open in multiple mode', async () => {
    render(<Basic type="multiple" />);

    await userEvent.click(screen.getByRole('button', { name: 'Billing' }));
    await userEvent.click(screen.getByRole('button', { name: 'Team' }));

    expect(screen.getByText('Billing details')).toBeInTheDocument();
    expect(screen.getByText('Team details')).toBeInTheDocument();
  });

  it('reports the value in the shape the mode implies', async () => {
    const single = vi.fn();
    const { unmount } = render(<Basic onValueChange={single} />);
    await userEvent.click(screen.getByRole('button', { name: 'Team' }));
    expect(single).toHaveBeenLastCalledWith('team');
    unmount();

    const multiple = vi.fn();
    render(<Basic type="multiple" onValueChange={multiple} />);
    await userEvent.click(screen.getByRole('button', { name: 'Team' }));
    expect(multiple).toHaveBeenLastCalledWith(['team']);
  });

  it('moves between headers with the arrow keys', async () => {
    render(<Basic />);
    screen.getByRole('button', { name: 'Billing' }).focus();

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: 'Team' })).toHaveFocus();

    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('button', { name: 'Billing' })).toHaveFocus();
  });

  it('skips a disabled item', async () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="a">
          <Accordion.Trigger>A</Accordion.Trigger>
          <Accordion.Content>A body</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b" disabled>
          <Accordion.Trigger>B</Accordion.Trigger>
          <Accordion.Content>B body</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="c">
          <Accordion.Trigger>C</Accordion.Trigger>
          <Accordion.Content>C body</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    screen.getByRole('button', { name: 'A' }).focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: 'C' })).toHaveFocus();
  });

  it('supports controlled use', async () => {
    function Controlled() {
      const [value, setValue] = React.useState('billing');
      return <Basic value={value} onValueChange={setValue} />;
    }

    render(<Controlled />);
    await userEvent.click(screen.getByRole('button', { name: 'API' }));
    expect(screen.getByText('API details')).toBeInTheDocument();
  });

  it('fails loudly when a part is used outside the root', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <Accordion.Item value="x">
          <Accordion.Trigger>x</Accordion.Trigger>
        </Accordion.Item>,
      ),
    ).toThrow(/Accordion.Root/);
    error.mockRestore();
  });
});
