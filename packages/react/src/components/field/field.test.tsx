import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from '../input/input.js';
import { Field } from './field.js';

describe('Field', () => {
  it('ties the label to the control without an explicit id', async () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>,
    );

    const input = screen.getByLabelText('Email');
    await userEvent.click(screen.getByText('Email'));
    expect(input).toHaveFocus();
  });

  it('honours an explicit id', () => {
    render(
      <Field.Root id="email-field">
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>,
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email-field');
  });

  it('describes the control with the description', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input />
        <Field.Description>We only use this for receipts.</Field.Description>
      </Field.Root>,
    );

    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'We only use this for receipts.',
    );
  });

  it('never points aria-describedby at an id that is not there', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>,
    );

    // A dangling reference makes browsers ignore the whole attribute, so an
    // always-on describedby silently breaks the descriptions that do exist.
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-describedby');
  });

  it('marks the control invalid and describes it with the error', () => {
    render(
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Input />
        <Field.Error>Enter a valid email.</Field.Error>
      </Field.Root>,
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Enter a valid email.');
  });

  it('keeps the error unmounted while the field is valid', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input />
        <Field.Error>Enter a valid email.</Field.Error>
      </Field.Root>,
    );

    expect(screen.queryByText('Enter a valid email.')).not.toBeInTheDocument();
  });

  it('describes the control with both texts at once', () => {
    render(
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Input />
        <Field.Description>We only use this for receipts.</Field.Description>
        <Field.Error>Enter a valid email.</Field.Error>
      </Field.Root>,
    );

    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'We only use this for receipts. Enter a valid email.',
    );
  });

  it('propagates required to the control and marks the label', () => {
    render(
      <Field.Root required>
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>,
    );

    // Queried by accessible name, which is the computation that matters: the
    // asterisk is `aria-hidden`, so the control is still named plain "Email"
    // rather than "Email star". `aria-required` carries the requirement.
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toBeRequired();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('propagates disabled to the control', () => {
    render(
      <Field.Root disabled>
        <Field.Label>Email</Field.Label>
        <Input />
      </Field.Root>,
    );

    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('lets the control override what the field says', () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input disabled />
      </Field.Root>,
    );

    // The field fills in what the caller left unsaid; it never overrules them.
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('works with no field around it at all', () => {
    render(<Input aria-label="Loose input" />);
    expect(screen.getByLabelText('Loose input')).toBeInTheDocument();
  });
});
