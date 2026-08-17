import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './switch.js';

describe('Switch', () => {
  it('announces as a switch, not a checkbox', () => {
    render(<Switch aria-label="Notifications" />);

    // The distinction matters to a screen reader: "off"/"on" rather than
    // "not checked"/"checked".
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('toggles on click and reports the new state', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />);

    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
  });

  it('toggles with Space', async () => {
    render(<Switch aria-label="Notifications" />);

    await userEvent.tab();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('posts with the form as a checkbox does', () => {
    render(
      <form data-testid="form">
        <Switch name="notify" value="on" defaultChecked aria-label="Notifications" />
      </form>,
    );

    const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
    expect(data.get('notify')).toBe('on');
  });

  it('derives the thumb travel from the track size', () => {
    const { container } = render(<Switch aria-label="Notifications" size="lg" />);

    // Width and height are published as variables, so the travel is computed
    // rather than a per-size translate someone tuned by eye.
    const spans = container.querySelectorAll('span');
    const thumb = spans[spans.length - 1];

    expect(container.firstElementChild?.className).toContain('[--sw-w:2.75rem]');
    expect(thumb?.className).toContain('translate-x-[calc(var(--sw-w)-var(--sw-h))]');
  });

  it('supports controlled use', async () => {
    function Controlled() {
      const [on, setOn] = React.useState(false);
      return <Switch aria-label="Notifications" checked={on} onCheckedChange={setOn} />;
    }

    render(<Controlled />);
    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('does not toggle while disabled', async () => {
    render(<Switch aria-label="Notifications" disabled />);

    await userEvent.click(screen.getByRole('switch'), { pointerEventsCheck: 0 });
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Switch ref={ref} aria-label="Notifications" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
