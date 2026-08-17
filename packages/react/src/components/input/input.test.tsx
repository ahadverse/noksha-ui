import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './input.js';

describe('Input', () => {
  it('renders a real input and takes typing', async () => {
    render(<Input aria-label="Name" />);

    const input = screen.getByLabelText('Name');
    await userEvent.type(input, 'Ada');
    expect(input).toHaveValue('Ada');
  });

  it('participates in a form with no JavaScript wiring', () => {
    render(
      <form data-testid="form">
        <Input name="email" defaultValue="ada@example.com" aria-label="Email" />
      </form>,
    );

    const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
    expect(data.get('email')).toBe('ada@example.com');
  });

  it('renders no wrapper when there are no icons', () => {
    const { container } = render(<Input aria-label="Name" />);

    // A plain input stays a plain input, so consumer CSS and autofill behave
    // the way they do everywhere else.
    expect(container.firstElementChild?.tagName).toBe('INPUT');
  });

  it('wraps only when an icon needs positioning', () => {
    const { container } = render(
      <Input aria-label="Search" startIcon={<svg data-testid="icon" />} />,
    );

    expect(container.firstElementChild?.tagName).toBe('DIV');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('pads the field to clear its icons', () => {
    render(
      <Input aria-label="Amount" startIcon={<span>$</span>} endIcon={<span>USD</span>} size="md" />,
    );

    const classes = screen.getByLabelText('Amount').className;
    expect(classes).toContain('ps-9');
    expect(classes).toContain('pe-9');
  });

  it('keeps affixes from stealing the click', async () => {
    render(<Input aria-label="Amount" startIcon={<span>$</span>} />);

    const affix = screen.getByText('$').closest('span[aria-hidden="true"]');
    expect(affix).toHaveClass('pointer-events-none');
  });

  it('marks itself invalid through aria, which is what drives the styling', () => {
    render(<Input aria-label="Email" invalid />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Name" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('calls a consumer onChange', async () => {
    const onChange = vi.fn();
    render(<Input aria-label="Name" onChange={onChange} />);

    await userEvent.type(screen.getByLabelText('Name'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('skips a disabled input in the tab order', async () => {
    render(
      <>
        <Input aria-label="First" disabled />
        <Input aria-label="Second" />
      </>,
    );

    await userEvent.tab();
    expect(screen.getByLabelText('Second')).toHaveFocus();
  });

  it('lets caller classes win', () => {
    render(<Input aria-label="Name" className="rounded-none" />);

    const classes = screen.getByLabelText('Name').className;
    expect(classes).toContain('rounded-none');
    expect(classes).not.toContain('rounded-(--noksha-radius-md)');
  });
});
