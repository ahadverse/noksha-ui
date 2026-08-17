import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from './textarea.js';

describe('Textarea', () => {
  it('takes typing and posts with the form', async () => {
    render(
      <form data-testid="form">
        <Textarea name="notes" aria-label="Notes" />
      </form>,
    );

    await userEvent.type(screen.getByLabelText('Notes'), 'Shipped');
    const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
    expect(data.get('notes')).toBe('Shipped');
  });

  it('defaults its rows to minRows', () => {
    render(<Textarea aria-label="Notes" minRows={5} />);
    expect(screen.getByLabelText('Notes')).toHaveAttribute('rows', '5');
  });

  it('is resizable vertically by default', () => {
    render(<Textarea aria-label="Notes" />);
    expect(screen.getByLabelText('Notes')).toHaveClass('resize-y');
  });

  it('forces resize off when auto-sizing', () => {
    render(<Textarea aria-label="Notes" autoSize resize="both" />);

    // A box that grows itself *and* can be dragged fights the user: the next
    // keystroke snaps it back to the content height.
    expect(screen.getByLabelText('Notes')).toHaveClass('resize-none');
  });

  it('measures itself on input when auto-sizing', () => {
    render(<Textarea aria-label="Notes" autoSize />);
    const textarea = screen.getByLabelText('Notes') as HTMLTextAreaElement;

    // jsdom has no layout, so scrollHeight is stubbed; what is under test is
    // that the height is written from a measurement rather than from a line count.
    Object.defineProperty(textarea, 'scrollHeight', { configurable: true, value: 500 });
    fireEvent.input(textarea, { target: { value: 'a\nb\nc' } });

    expect(textarea.style.height).toBe('500px');
  });

  it('does not touch the height when auto-sizing is off', () => {
    render(<Textarea aria-label="Notes" />);
    const textarea = screen.getByLabelText('Notes') as HTMLTextAreaElement;

    fireEvent.input(textarea, { target: { value: 'a\nb\nc' } });
    expect(textarea.style.height).toBe('');
  });

  it('still calls a consumer onInput', () => {
    const onInput = vi.fn();
    render(<Textarea aria-label="Notes" autoSize onInput={onInput} />);

    fireEvent.input(screen.getByLabelText('Notes'), { target: { value: 'x' } });
    expect(onInput).toHaveBeenCalled();
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="Notes" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
