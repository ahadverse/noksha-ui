import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button.js';

describe('Button', () => {
  it('renders a button with an accessible name', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('defaults to type="button" so it cannot submit a form by accident', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('still allows an explicit submit type', () => {
    render(<Button type="submit">Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('forwards its ref to the underlying element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('lets caller classes win over variant classes', () => {
    render(<Button className="px-12">Save</Button>);
    const classes = screen.getByRole('button').className;

    // cx() runs through tailwind-merge, so the variant's own padding is
    // *removed*, not merely outranked in the cascade.
    expect(classes).toContain('px-12');
    expect(classes).not.toContain('px-(--prism-control-px-md)');
  });

  describe('loading', () => {
    it('marks itself busy and blocks interaction', async () => {
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Save
        </Button>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();

      await userEvent.click(button, { pointerEventsCheck: 0 });
      expect(onClick).not.toHaveBeenCalled();
    });

    it('keeps the label in the box so the width does not jump', () => {
      render(<Button loading>Save changes</Button>);
      const button = screen.getByRole('button');

      // The label stays where it is, made transparent rather than unmounted, so
      // the button holds its exact width — and stays announced by name.
      expect(button).toHaveTextContent('Save changes');
      expect(button).toHaveClass('text-transparent');
      expect(button).toHaveAccessibleName(/Save changes/);
    });

    it('announces the spinner, with an overridable label', () => {
      const { rerender } = render(<Button loading>Save</Button>);
      expect(screen.getByRole('status')).toHaveAccessibleName('Loading');

      rerender(
        <Button loading loadingLabel="Saving changes">
          Save
        </Button>,
      );
      expect(screen.getByRole('status')).toHaveAccessibleName('Saving changes');
    });
  });

  describe('asChild', () => {
    it('renders the child element rather than a button', () => {
      render(
        <Button asChild>
          <a href="/pricing">Pricing</a>
        </Button>,
      );

      const link = screen.getByRole('link', { name: 'Pricing' });
      expect(link.tagName).toBe('A');
      expect(link).not.toHaveAttribute('type');
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('merges the button classes onto the child', () => {
      render(
        <Button asChild variant="outline">
          <a href="/pricing">Pricing</a>
        </Button>,
      );
      expect(screen.getByRole('link')).toHaveClass('inline-flex');
    });

    it('chains the child handler with the library handler', async () => {
      const order: string[] = [];
      render(
        <Button asChild onClick={() => order.push('button')}>
          <a href="/pricing" onClick={() => order.push('child')}>
            Pricing
          </a>
        </Button>,
      );

      await userEvent.click(screen.getByRole('link'));
      expect(order).toEqual(['child', 'button']);
    });

    it('keeps sibling icons out of the slot target', () => {
      render(
        <Button asChild icon={<svg data-testid="icon" />}>
          <a href="/pricing">Pricing</a>
        </Button>,
      );

      // The icon renders next to the anchor's text, and the anchor — not the
      // icon — is what receives the button props.
      const link = screen.getByRole('link');
      expect(link).toHaveTextContent('Pricing');
      expect(link.querySelector('[data-testid="icon"]')).not.toBeNull();
    });
  });

  describe('keyboard', () => {
    it('activates on Enter and Space', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Save</Button>);

      await userEvent.tab();
      expect(screen.getByRole('button')).toHaveFocus();

      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('skips a disabled button in the tab order', async () => {
      render(
        <>
          <Button disabled>First</Button>
          <Button>Second</Button>
        </>,
      );

      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();
    });
  });

  describe('icon-only', () => {
    it('carries the required accessible name', () => {
      render(<Button iconOnly aria-label="Delete" icon={<svg />} />);
      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });
  });
});
