import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Field } from '../field/field.js';
import { RangeSlider, Slider } from './slider.js';

function marksOf(slider: HTMLElement) {
  const group = slider.parentElement?.lastElementChild as HTMLElement;
  return { group, marks: Array.from(group.children) as HTMLElement[] };
}

function thumbs() {
  return [
    screen.getByRole('slider', { name: 'Minimum' }),
    screen.getByRole('slider', { name: 'Maximum' }),
  ] as const;
}

function pressTrack(area: HTMLElement, clientX: number) {
  // jsdom has no PointerEvent, so a MouseEvent carries clientX and button instead.
  fireEvent(
    area,
    new MouseEvent('pointerdown', { bubbles: true, cancelable: true, clientX, button: 0 }),
  );
}

function mockTrackRect(area: HTMLElement) {
  vi.spyOn(area, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: 100,
    bottom: 20,
    width: 100,
    height: 20,
    toJSON: () => ({}),
  });
}

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

  it('clamps the fill to the track when the value is out of range', () => {
    render(
      <>
        <Slider aria-label="Over" min={0} max={100} defaultValue={150} />
        <Slider aria-label="Under" min={0} max={100} defaultValue={-20} />
      </>,
    );

    expect(screen.getByRole('slider', { name: 'Over' })).toHaveStyle({ '--sl-fill': '100%' });
    expect(screen.getByRole('slider', { name: 'Under' })).toHaveStyle({ '--sl-fill': '0%' });
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

  it('renders a wrapper for a tooltip or marks without showValue', () => {
    const tooltip = render(<Slider aria-label="Volume" tooltip />);
    expect(tooltip.container.firstElementChild?.tagName).toBe('DIV');
    tooltip.unmount();

    const marks = render(<Slider aria-label="Volume" marks={[0, 100]} />);
    expect(marks.container.firstElementChild?.tagName).toBe('DIV');
  });

  it('puts containerClassName on the wrapper', () => {
    const { container } = render(
      <Slider aria-label="Volume" showValue containerClassName="mt-4" />,
    );
    expect(container.firstElementChild).toHaveClass('mt-4');
    expect(screen.getByRole('slider')).not.toHaveClass('mt-4');
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

  describe('appearance', () => {
    it('sets the size variables', () => {
      render(<Slider aria-label="Volume" size="xl" />);
      expect(screen.getByRole('slider').className).toContain('[--sl-track:0.75rem]');
    });

    it('sets the thumb shape variables', () => {
      render(<Slider aria-label="Volume" thumb="bar" />);
      expect(screen.getByRole('slider').className).toContain('--sl-thumb-w:calc(');
    });

    it('sets the variant variables', () => {
      render(<Slider aria-label="Volume" variant="outline" />);
      expect(screen.getByRole('slider').className).toContain('[--sl-track-shadow:inset_');
    });

    it('applies the tone class', () => {
      render(<Slider aria-label="Volume" tone="success" />);
      expect(screen.getByRole('slider')).toHaveClass('noksha-tone-sl-success');
    });

    it('lays out vertically', () => {
      render(<Slider aria-label="Volume" orientation="vertical" />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-orientation', 'vertical');
      expect(slider.className).toContain('[writing-mode:vertical-lr]');
    });

    it('leaves aria-orientation off when horizontal', () => {
      render(<Slider aria-label="Volume" />);
      expect(screen.getByRole('slider')).not.toHaveAttribute('aria-orientation');
    });

    it("lets the caller's className override a variable", () => {
      render(<Slider aria-label="Volume" className="[--sl-thumb:2rem]" />);

      const { className } = screen.getByRole('slider');
      expect(className).toContain('[--sl-thumb:2rem]');
      expect(className).not.toContain('[--sl-thumb:1.125rem]');
    });
  });

  describe('tooltip', () => {
    it('shows the formatted value, hidden from assistive tech', () => {
      render(<Slider aria-label="Volume" defaultValue={40} tooltip formatValue={(v) => `${v}%`} />);

      const tooltip = screen.getByText('40%');
      expect(tooltip).toHaveAttribute('aria-hidden', 'true');
      expect(tooltip).toHaveClass('opacity-0');
      expect(tooltip).not.toHaveClass('opacity-100');
    });

    it('stays visible with tooltip="always"', () => {
      render(<Slider aria-label="Volume" defaultValue={40} tooltip="always" />);

      const tooltip = screen.getByText('40');
      expect(tooltip).toHaveClass('opacity-100');
      expect(tooltip).not.toHaveClass('opacity-0');
    });

    it('follows the value', () => {
      render(<Slider aria-label="Volume" defaultValue={40} tooltip="always" />);

      fireEvent.change(screen.getByRole('slider'), { target: { value: '75' } });
      expect(screen.getByText('75')).toHaveStyle({ '--sl-p': '0.75' });
    });
  });

  describe('marks', () => {
    it('places one mark per step for marks={true}', () => {
      render(<Slider aria-label="Volume" min={0} max={10} step={5} marks />);
      expect(marksOf(screen.getByRole('slider')).marks).toHaveLength(3);
    });

    it('renders bare ticks for numeric marks', () => {
      render(<Slider aria-label="Volume" marks={[0, 50, 100]} />);

      const { marks } = marksOf(screen.getByRole('slider'));
      expect(marks.map((mark) => mark.textContent)).toEqual(['', '', '']);
      expect(marks.map((mark) => mark.style.getPropertyValue('--sl-p'))).toEqual(['0', '0.5', '1']);
    });

    it('renders labels for object marks', () => {
      render(
        <Slider
          aria-label="Volume"
          marks={[
            { value: 0, label: 'Low' },
            { value: 100, label: 'High' },
          ]}
        />,
      );

      expect(screen.getByText('Low')).toBeInTheDocument();
      expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('activates the marks at or below the value', () => {
      render(<Slider aria-label="Volume" defaultValue={50} marks={[0, 50, 100]} />);

      const slider = screen.getByRole('slider');
      const active = () => marksOf(slider).marks.map((mark) => mark.hasAttribute('data-active'));
      expect(active()).toEqual([true, true, false]);

      fireEvent.change(slider, { target: { value: '20' } });
      expect(active()).toEqual([true, false, false]);
    });

    it('hides the marks from assistive tech', () => {
      render(<Slider aria-label="Volume" marks={[{ value: 0, label: 'Low' }]} />);
      expect(marksOf(screen.getByRole('slider')).group).toHaveAttribute('aria-hidden', 'true');
    });

    it('steps decimal marks without floating-point noise', () => {
      render(<Slider aria-label="Opacity" min={0} max={1} step={0.1} marks />);

      const { marks } = marksOf(screen.getByRole('slider'));
      expect(marks).toHaveLength(11);
      // 3 * 0.1 is 0.30000000000000004 in floating point.
      expect(marks[3]?.style.getPropertyValue('--sl-p')).toBe('0.3');
    });
  });

  describe('invalid', () => {
    it('sets aria-invalid from the prop', () => {
      render(<Slider aria-label="Volume" invalid />);
      expect(screen.getByRole('slider')).toHaveAttribute('aria-invalid', 'true');
    });

    it('picks up invalid from a surrounding field', () => {
      render(
        <Field.Root invalid>
          <Field.Label>Volume</Field.Label>
          <Slider />
        </Field.Root>,
      );

      expect(screen.getByRole('slider', { name: 'Volume' })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });
  });
});

describe('RangeSlider', () => {
  it('renders two sliders named Minimum and Maximum', () => {
    render(<RangeSlider />);

    expect(screen.getAllByRole('slider')).toHaveLength(2);
    expect(screen.getByRole('slider', { name: 'Minimum' })).toHaveProperty('type', 'range');
    expect(screen.getByRole('slider', { name: 'Maximum' })).toHaveProperty('type', 'range');
  });

  it('takes the thumb names from thumbLabels', () => {
    render(<RangeSlider thumbLabels={['From', 'To']} />);

    expect(screen.getByRole('slider', { name: 'From' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'To' })).toBeInTheDocument();
  });

  it('starts on defaultValue', () => {
    render(<RangeSlider defaultValue={[20, 60]} />);

    const [lo, hi] = thumbs();
    expect(lo).toHaveValue('20');
    expect(hi).toHaveValue('60');
  });

  it('spans min to max when uncontrolled with no default', () => {
    render(<RangeSlider min={10} max={50} />);

    const [lo, hi] = thumbs();
    expect(lo).toHaveValue('10');
    expect(hi).toHaveValue('50');
  });

  it('reports both ends when either thumb moves', () => {
    const onValueChange = vi.fn();
    render(<RangeSlider defaultValue={[20, 60]} onValueChange={onValueChange} />);

    const [lo, hi] = thumbs();
    fireEvent.change(lo, { target: { value: '30' } });
    expect(onValueChange).toHaveBeenLastCalledWith([30, 60]);

    fireEvent.change(hi, { target: { value: '70' } });
    expect(onValueChange).toHaveBeenLastCalledWith([30, 70]);
  });

  it('stops each thumb at the other', () => {
    render(<RangeSlider defaultValue={[20, 60]} />);

    const [lo, hi] = thumbs();
    fireEvent.change(lo, { target: { value: '90' } });
    expect(lo).toHaveValue('60');

    fireEvent.change(hi, { target: { value: '10' } });
    expect(hi).toHaveValue('60');
  });

  it('keeps minStepsBetween steps between the thumbs', () => {
    const onValueChange = vi.fn();
    render(
      <RangeSlider
        min={0}
        max={100}
        step={5}
        minStepsBetween={2}
        value={[20, 60]}
        onValueChange={onValueChange}
      />,
    );

    const [lo, hi] = thumbs();
    fireEvent.change(lo, { target: { value: '80' } });
    expect(onValueChange).toHaveBeenLastCalledWith([50, 60]);

    fireEvent.change(hi, { target: { value: '10' } });
    expect(onValueChange).toHaveBeenLastCalledWith([20, 30]);
  });

  it('does not report a change when a clamped thumb has nowhere to go', () => {
    const onValueChange = vi.fn();
    render(
      <RangeSlider step={5} minStepsBetween={2} value={[50, 60]} onValueChange={onValueChange} />,
    );

    fireEvent.change(thumbs()[0], { target: { value: '55' } });
    expect(onValueChange).not.toHaveBeenCalled();
    expect(thumbs()[0]).toHaveValue('50');
  });

  it('hands a drag to the other thumb when both are stacked', () => {
    const onValueChange = vi.fn();
    render(<RangeSlider value={[40, 40]} onValueChange={onValueChange} />);

    fireEvent.change(thumbs()[1], { target: { value: '25' } });
    expect(onValueChange).toHaveBeenLastCalledWith([25, 40]);

    fireEvent.change(thumbs()[0], { target: { value: '70' } });
    expect(onValueChange).toHaveBeenLastCalledWith([40, 70]);
  });

  it('keeps a decimal gap free of float noise', () => {
    const onValueChange = vi.fn();
    render(
      <RangeSlider
        min={0}
        max={1}
        step={0.1}
        minStepsBetween={3}
        value={[0.2, 1]}
        onValueChange={onValueChange}
      />,
    );

    fireEvent.change(thumbs()[0], { target: { value: '0.9' } });
    expect(onValueChange).toHaveBeenLastCalledWith([0.7, 1]);
  });

  it('paints an inverted controlled value in order', () => {
    render(<RangeSlider value={[80, 20]} />);
    expect(thumbs()[0]).toHaveValue('20');
    expect(thumbs()[1]).toHaveValue('80');
  });

  it('supports controlled use', () => {
    function Controlled() {
      const [value, setValue] = React.useState<[number, number]>([10, 90]);
      return <RangeSlider value={value} onValueChange={setValue} />;
    }

    render(<Controlled />);
    fireEvent.change(thumbs()[0], { target: { value: '40' } });
    expect(thumbs()[0]).toHaveValue('40');
  });

  it('holds a controlled value the parent does not update', () => {
    render(<RangeSlider value={[10, 90]} />);

    fireEvent.change(thumbs()[0], { target: { value: '40' } });
    expect(thumbs()[0]).toHaveValue('10');
  });

  it('posts both ends under one name', () => {
    render(
      <form data-testid="form">
        <RangeSlider name="price" defaultValue={[20, 60]} />
      </form>,
    );

    for (const thumb of thumbs()) expect(thumb).toHaveAttribute('name', 'price');
    const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
    expect(data.getAll('price')).toEqual(['20', '60']);
  });

  it('disables both thumbs and marks the root', () => {
    const { container } = render(<RangeSlider disabled />);

    for (const thumb of thumbs()) expect(thumb).toBeDisabled();
    expect(container.firstElementChild).toHaveAttribute('data-disabled');
  });

  it('marks both thumbs and the root invalid', () => {
    const { container } = render(<RangeSlider invalid />);

    for (const thumb of thumbs()) expect(thumb).toHaveAttribute('aria-invalid', 'true');
    expect(container.firstElementChild).toHaveAttribute('data-invalid');
  });

  it('shows and formats both ends', () => {
    render(<RangeSlider defaultValue={[20, 60]} showValue formatValue={(v) => `$${v}`} />);

    expect(screen.getByText('$20 – $60')).toBeInTheDocument();
    const [lo, hi] = thumbs();
    expect(lo).toHaveAttribute('aria-valuetext', '$20');
    expect(hi).toHaveAttribute('aria-valuetext', '$60');
  });

  it('leaves aria-valuetext alone when there is no formatter', () => {
    render(<RangeSlider defaultValue={[20, 60]} />);
    for (const thumb of thumbs()) expect(thumb).not.toHaveAttribute('aria-valuetext');
  });

  it('activates the marks inside the range', () => {
    render(<RangeSlider defaultValue={[25, 75]} marks={[0, 25, 50, 75, 100]} />);

    const { group, marks } = marksOf(thumbs()[0]);
    expect(group).toHaveAttribute('aria-hidden', 'true');
    expect(marks.map((mark) => mark.hasAttribute('data-active'))).toEqual([
      false,
      true,
      true,
      true,
      false,
    ]);
  });

  it('wires itself into a surrounding field', () => {
    render(
      <Field.Root>
        <Field.Label>Price</Field.Label>
        <RangeSlider />
        <Field.Description>Per night, before tax.</Field.Description>
      </Field.Root>,
    );

    const [lo, hi] = thumbs();
    expect(lo.id).not.toBe('');
    expect(screen.getByText('Price')).toHaveAttribute('for', lo.id);
    expect(lo).toHaveAccessibleDescription('Per night, before tax.');
    expect(hi).toHaveAccessibleDescription('Per night, before tax.');
  });

  it('forwards its ref to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<RangeSlider ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toContainElement(thumbs()[0]);
  });

  it('moves the nearer thumb to a press on the track', () => {
    render(<RangeSlider defaultValue={[20, 60]} />);

    const [lo, hi] = thumbs();
    const area = lo.parentElement as HTMLElement;
    mockTrackRect(area);

    pressTrack(area, 90);
    expect(hi).toHaveValue('90');
    expect(hi).toHaveFocus();

    pressTrack(area, 10);
    expect(lo).toHaveValue('10');
    expect(lo).toHaveFocus();
  });

  it('ignores presses on the track while disabled', () => {
    const onValueChange = vi.fn();
    render(<RangeSlider defaultValue={[20, 60]} disabled onValueChange={onValueChange} />);

    const area = thumbs()[0].parentElement as HTMLElement;
    mockTrackRect(area);

    pressTrack(area, 90);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
