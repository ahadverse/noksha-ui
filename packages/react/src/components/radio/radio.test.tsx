import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Radio, RadioGroup } from './radio.js';

function Plans(props: React.ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup aria-label="Plan" {...props}>
      <Radio value="free" aria-label="Free" />
      <Radio value="pro" aria-label="Pro" />
      <Radio value="team" aria-label="Team" />
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  it('exposes itself as a radiogroup with real radios inside', () => {
    render(<Plans />);

    expect(screen.getByRole('radiogroup', { name: 'Plan' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('gives every radio the same name so the browser groups them', () => {
    render(<Plans />);

    const names = screen.getAllByRole('radio').map((radio) => (radio as HTMLInputElement).name);
    expect(new Set(names).size).toBe(1);
    expect(names[0]).toBeTruthy();
  });

  it('selects on click and reports the value', async () => {
    const onValueChange = vi.fn();
    render(<Plans onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole('radio', { name: 'Pro' }));
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith('pro');
  });

  it('starts on defaultValue', () => {
    render(<Plans defaultValue="team" />);
    expect(screen.getByRole('radio', { name: 'Team' })).toBeChecked();
  });

  it('moves with the arrow keys, from the platform rather than from us', async () => {
    render(<Plans defaultValue="free" />);

    screen.getByRole('radio', { name: 'Free' }).focus();
    await userEvent.keyboard('{ArrowDown}');

    // Native radios sharing a name already navigate and select on arrow keys.
    // Reimplementing it on top would mean fighting the platform.
    expect(screen.getByRole('radio', { name: 'Pro' })).toHaveFocus();
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
  });

  it('is one tab stop', async () => {
    render(
      <>
        <button type="button">before</button>
        <Plans defaultValue="free" />
        <button type="button">after</button>
      </>,
    );

    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByRole('radio', { name: 'Free' })).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'after' })).toHaveFocus();
  });

  it('posts the selected value with the form', async () => {
    render(
      <form data-testid="form">
        <Plans name="plan" defaultValue="free" />
      </form>,
    );

    await userEvent.click(screen.getByRole('radio', { name: 'Team' }));
    const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
    expect(data.get('plan')).toBe('team');
  });

  it('supports controlled use', async () => {
    function Controlled() {
      const [value, setValue] = React.useState('free');
      return <Plans value={value} onValueChange={setValue} />;
    }

    render(<Controlled />);
    await userEvent.click(screen.getByRole('radio', { name: 'Pro' }));
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
  });

  it('disables every radio from the group', () => {
    render(<Plans disabled />);

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toBeDisabled();
    }
  });

  it('carries required and invalid down to the radios', () => {
    render(<Plans required invalid />);

    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-required', 'true');
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('radio', { name: 'Free' })).toBeRequired();
  });
});
