import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Field } from '../field/field.js';
import { Checkbox } from './checkbox.js';

describe('Checkbox', () => {
  it('renders a native checkbox', () => {
    render(<Checkbox aria-label="Terms" />);
    expect(screen.getByRole('checkbox', { name: 'Terms' })).toHaveProperty('type', 'checkbox');
  });

  it('toggles on click and reports the new state', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Terms" onCheckedChange={onCheckedChange} />);

    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
  });

  it('toggles with Space, as the platform does', async () => {
    render(<Checkbox aria-label="Terms" />);

    await userEvent.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();

    await userEvent.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('posts with the form, with no JavaScript involved', () => {
    render(
      <form data-testid="form">
        <Checkbox name="terms" value="accepted" defaultChecked aria-label="Terms" />
      </form>,
    );

    const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
    expect(data.get('terms')).toBe('accepted');
  });

  it('sets the indeterminate property and announces it as mixed', () => {
    render(<Checkbox aria-label="All" indeterminate />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;

    // The DOM property drives the `:indeterminate` styling; the aria attribute
    // is what actually reaches a screen reader.
    expect(input.indeterminate).toBe(true);
    expect(input).toHaveAttribute('aria-checked', 'mixed');
  });

  it('clears indeterminate when it is turned off', () => {
    const { rerender } = render(<Checkbox aria-label="All" indeterminate />);
    rerender(<Checkbox aria-label="All" indeterminate={false} />);

    expect((screen.getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(false);
  });

  it('supports controlled use', async () => {
    function Controlled() {
      const [checked, setChecked] = React.useState(false);
      return <Checkbox aria-label="Terms" checked={checked} onCheckedChange={setChecked} />;
    }

    render(<Controlled />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('inherits id, required and invalid from the field', () => {
    render(
      <Field.Root required invalid>
        <Field.Label>Terms</Field.Label>
        <Checkbox />
      </Field.Root>,
    );

    const input = screen.getByRole('checkbox', { name: 'Terms' });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('keeps the decorative box out of the a11y tree', () => {
    const { container } = render(<Checkbox aria-label="Terms" />);

    for (const decorative of container.querySelectorAll('span[aria-hidden], svg[aria-hidden]')) {
      expect(decorative).toHaveAttribute('aria-hidden', 'true');
    }
    // Exactly one thing is announced: the input itself.
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
  });

  it('does not toggle while disabled', async () => {
    render(<Checkbox aria-label="Terms" disabled />);

    await userEvent.click(screen.getByRole('checkbox'), { pointerEventsCheck: 0 });
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="Terms" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
