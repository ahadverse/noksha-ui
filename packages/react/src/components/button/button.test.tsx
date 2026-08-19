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
    expect(classes).not.toContain('px-(--noksha-control-px-md)');
  });

  describe('effect', () => {
    it('is off unless asked for', () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole('button').className).not.toContain('animate-noksha-pulse');
    });

    it('is orthogonal to variant and tone — all three land together', () => {
      render(
        <Button variant="gradient" tone="danger" effect="sheen">
          Delete
        </Button>,
      );
      const classes = screen.getByRole('button').className;

      expect(classes).toContain('noksha-tone-btn-danger');
      expect(classes).toContain('linear-gradient(140deg,var(--btn-solid),var(--btn-solid-active))');
      expect(classes).toContain('hover:before:translate-x-[400%]');
    });

    /**
     * The effects paint with the button's own foreground variable rather than a
     * literal colour. Asserting that here is what stops someone "simplifying" a
     * sweep to `white`, which would be invisible on every light-surfaced
     * variant and wrong on all six tones.
     */
    it('draws from the tone variables, never from a fixed colour', () => {
      for (const effect of ['sheen', 'wipe'] as const) {
        const { unmount } = render(<Button effect={effect}>Go</Button>);
        const classes = screen.getByRole('button').className;

        expect(classes).toContain('--btn-current');
        expect(classes).not.toMatch(/\b(white|black)\b/);
        unmount();
      }
    });

    it('neutralises the surface effects on a link, which has no surface', () => {
      render(
        <Button variant="link" effect="wipe">
          Read more
        </Button>,
      );
      expect(screen.getByRole('button').className).toContain('before:hidden');
    });

    it('gives a pulsing filled button a halo it can actually be seen against', () => {
      render(<Button effect="pulse">Deploy</Button>);
      const classes = screen.getByRole('button').className;

      // --btn-solid is the fill itself here, so the compound swaps it out.
      expect(classes).toContain('after:border-(--btn-current)');
      expect(classes).not.toContain('after:border-(--btn-solid)');
    });
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

    it('does not read as unavailable while it is merely busy', () => {
      const { rerender } = render(<Button loading>Save</Button>);
      const loadingClasses = screen.getByRole('button').className;

      rerender(<Button disabled>Save</Button>);
      const disabledClasses = screen.getByRole('button').className;

      // Both are un-pressable, but only one of them is unavailable. A loading
      // button dimmed to the disabled opacity is indistinguishable from one.
      expect(disabledClasses).toContain('disabled:opacity-50');
      expect(loadingClasses).toContain('disabled:opacity-100');
      expect(loadingClasses).not.toContain('disabled:opacity-50');
    });

    it('takes the icon slot instead of blanking the button when asked', () => {
      render(
        <Button loading loadingPlacement="icon" icon={<svg data-testid="icon" />}>
          Saving
        </Button>,
      );
      const button = screen.getByRole('button');

      // The label is the point of this mode — it stays readable, and the icon
      // it replaced is gone rather than sitting beside the spinner.
      expect(button).not.toHaveClass('text-transparent');
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('accepts a custom indicator in either placement', () => {
      const { rerender } = render(
        <Button loading loadingIcon={<svg data-testid="custom" />}>
          Saving
        </Button>,
      );
      expect(screen.getByTestId('custom')).toBeInTheDocument();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      rerender(
        <Button loading loadingPlacement="icon" loadingIcon={<svg data-testid="custom" />}>
          Saving
        </Button>,
      );
      expect(screen.getByTestId('custom')).toBeInTheDocument();
    });
  });

  describe('shape', () => {
    it('rounds the box fully, replacing the radius the size set', () => {
      render(
        <Button shape="round" size="xl">
          Search
        </Button>,
      );
      const button = screen.getByRole('button');

      expect(button).toHaveClass('rounded-full');
      expect(button.className).not.toContain('rounded-(--noksha-radius');
    });

    it('squares the aspect for a circle so an icon sits in a disc', () => {
      render(<Button shape="circle" iconOnly icon={<svg />} aria-label="Search" />);
      const button = screen.getByRole('button', { name: 'Search' });

      expect(button).toHaveClass('rounded-full');
      expect(button).toHaveClass('aspect-square');
      expect(button).toHaveClass('px-0');
    });

    it('leaves a link its intrinsic width, having no box to make round', () => {
      render(
        <Button variant="link" shape="circle">
          Read more
        </Button>,
      );
      expect(screen.getByRole('button')).toHaveClass('aspect-auto');
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
