import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from './tabs.js';

function Basic(props: React.ComponentProps<typeof Tabs.Root>) {
  return (
    <Tabs.Root defaultValue="overview" {...props}>
      <Tabs.List aria-label="Sections">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Overview panel</Tabs.Content>
      <Tabs.Content value="usage">Usage panel</Tabs.Content>
      <Tabs.Content value="settings">Settings panel</Tabs.Content>
    </Tabs.Root>
  );
}

describe('Tabs', () => {
  it('shows only the selected panel', () => {
    render(<Basic />);

    expect(screen.getByText('Overview panel')).toBeInTheDocument();
    expect(screen.queryByText('Usage panel')).not.toBeInTheDocument();
  });

  it('wires the aria relationships both ways', () => {
    render(<Basic />);

    const tab = screen.getByRole('tab', { name: 'Overview' });
    const panel = screen.getByRole('tabpanel');

    expect(screen.getByRole('tablist', { name: 'Sections' })).toBeInTheDocument();
    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });

  it('switches on click', async () => {
    const onValueChange = vi.fn();
    render(<Basic onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole('tab', { name: 'Usage' }));
    expect(screen.getByText('Usage panel')).toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith('usage');
  });

  it('is one tab stop, with arrows moving inside it', async () => {
    render(
      <>
        <button type="button">before</button>
        <Basic />
      </>,
    );

    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Usage' })).toHaveFocus();

    // Tab leaves the strip for the panel rather than walking every tab.
    await userEvent.tab();
    expect(screen.getByRole('tabpanel')).toHaveFocus();
  });

  it('selects as it moves, by default', async () => {
    render(<Basic />);
    screen.getByRole('tab', { name: 'Overview' }).focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByText('Usage panel')).toBeInTheDocument();
  });

  it('waits for Enter in manual mode', async () => {
    render(<Basic activationMode="manual" />);
    screen.getByRole('tab', { name: 'Overview' }).focus();

    await userEvent.keyboard('{ArrowRight}');
    // A panel that fetches on mount would otherwise fire a request per tab as
    // the user arrows across the strip.
    expect(screen.getByText('Overview panel')).toBeInTheDocument();

    await userEvent.keyboard('{Enter}');
    expect(screen.getByText('Usage panel')).toBeInTheDocument();
  });

  it('wraps around the ends', async () => {
    render(<Basic />);
    screen.getByRole('tab', { name: 'Overview' }).focus();

    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveFocus();
  });

  it('jumps to the ends with Home and End', async () => {
    render(<Basic />);
    screen.getByRole('tab', { name: 'Usage' }).focus();

    await userEvent.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveFocus();

    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
  });

  it('navigates vertically when the orientation says so', async () => {
    render(<Basic orientation="vertical" />);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');

    screen.getByRole('tab', { name: 'Overview' }).focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('tab', { name: 'Usage' })).toHaveFocus();
  });

  it('skips a disabled tab', async () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
          <Tabs.Trigger value="b" disabled>
            B
          </Tabs.Trigger>
          <Tabs.Trigger value="c">C</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">A panel</Tabs.Content>
        <Tabs.Content value="c">C panel</Tabs.Content>
      </Tabs.Root>,
    );

    screen.getByRole('tab', { name: 'A' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'C' })).toHaveFocus();
  });

  it('keeps a forceMount panel in the DOM but hidden', () => {
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
          <Tabs.Trigger value="b">B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">A panel</Tabs.Content>
        <Tabs.Content value="b" forceMount>
          B panel
        </Tabs.Content>
      </Tabs.Root>,
    );

    const hidden = screen.getByText('B panel');
    expect(hidden).toBeInTheDocument();
    expect(hidden).toHaveAttribute('hidden');
  });

  it('supports controlled use', async () => {
    function Controlled() {
      const [value, setValue] = React.useState('overview');
      return <Basic value={value} onValueChange={setValue} />;
    }

    render(<Controlled />);
    await userEvent.click(screen.getByRole('tab', { name: 'Settings' }));
    expect(screen.getByText('Settings panel')).toBeInTheDocument();
  });

  it('fails loudly when a part is used outside the root', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Tabs.Trigger value="x">x</Tabs.Trigger>)).toThrow(/Tabs.Root/);
    error.mockRestore();
  });
});
