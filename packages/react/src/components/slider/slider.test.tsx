import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from './slider.js';

describe('Slider', () => {
  it('renders a native range input', () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getByRole('slider', { name: 'Volume' })).toHaveProperty('type', 'range');
  });

  it('carries min, max and step through to the platform', () => {
    render(<Slider aria-label="Volume" min={10} max={20} step={2} defaultValue={12} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '10');
    expect(slider).toHaveAttribute('max', '20');
    expect(slider).toHaveAttribute('step', '2');
    expect(slider).toHaveValue('12');
  });

  it('paints the filled portion from the value', () => {
    render(<Slider aria-label="Volume" min={0} max={200} defaultValue={50} />);

    // A gradient stop rather than a second element, so the fill cannot get out
    // of step with the thumb.
    expect(screen.getByRole('slider')).toHaveStyle({ '--sl-fill': '25%' });
  });

  it('survives max === min instead of painting NaN', () => {
    render(<Slider aria-label="Volume" min={5} max={5} defaultValue={5} />);
    expect(screen.getByRole('slider')).toHaveStyle({ '--sl-fill': '0%' });
  });

  it('reports changes', () => {
    const onValueChange = vi.fn();
    render(<Slider aria-label="Volume" onValueChange={onValueChange} defaultValue={0} />);

    fireEvent.change(screen.getByRole('slider'), { target: { value: '60' } });
    expect(onValueChange).toHaveBeenLastCalledWith(60);
  });

  it('is keyboard reachable', async () => {
    render(
      <>
        <button type="button">before</button>
        <Slider aria-label="Volume" defaultValue={50} />
      </>,
    );

    await userEvent.tab();
    await userEvent.tab();

    // Arrow-key stepping itself is the platform's, not ours — jsdom does not
    // implement it, and a browser test would only be checking the browser.
    expect(screen.getByRole('slider')).toHaveFocus();
  });

  it('shows and formats the value', () => {
    render(
      <Slider
        aria-label="Opacity"
        min={0}
        max={1}
        step={0.05}
        defaultValue={0.4}
        showValue
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />,
    );

    expect(screen.getByText('40%')).toBeInTheDocument();
    // The formatted string is what a screen reader should read, not "0.4".
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '40%');
  });

  it('leaves aria-valuetext alone when there is no formatter', () => {
    render(<Slider aria-label="Volume" defaultValue={40} />);
    expect(screen.getByRole('slider')).not.toHaveAttribute('aria-valuetext');
  });

  it('renders no wrapper unless the value is shown', () => {
    const { container } = render(<Slider aria-label="Volume" />);
    expect(container.firstElementChild?.tagName).toBe('INPUT');
  });

  it('supports controlled use', () => {
    function Controlled() {
      const [value, setValue] = React.useState(20);
      return <Slider aria-label="Volume" value={value} onValueChange={setValue} />;
    }

    render(<Controlled />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '80' } });
    expect(screen.getByRole('slider')).toHaveValue('80');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Slider ref={ref} aria-label="Volume" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
