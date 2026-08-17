import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Card } from './card.js';

describe('Card', () => {
  it('renders its parts in order', () => {
    render(
      <Card.Root>
        <Card.Header>
          <Card.Title>Usage</Card.Title>
          <Card.Description>Billing period to date</Card.Description>
        </Card.Header>
        <Card.Content>2,481 requests</Card.Content>
        <Card.Footer>footer</Card.Footer>
      </Card.Root>,
    );

    expect(screen.getByRole('heading', { name: 'Usage' })).toBeInTheDocument();
    expect(screen.getByText('Billing period to date')).toBeInTheDocument();
    expect(screen.getByText('2,481 requests')).toBeInTheDocument();
  });

  it('publishes its padding as a variable the parts read', () => {
    render(
      <Card.Root data-testid="card" padding="lg">
        <Card.Content data-testid="content">x</Card.Content>
      </Card.Root>,
    );

    // The value lives on the root element, so a consumer's own section between
    // the parts lines up with them without being told the padding.
    expect(screen.getByTestId('card').className).toContain('[--card-p:1.75rem]');
    expect(screen.getByTestId('content').className).toContain('p-(--card-p)');
  });

  it('titles default to h3 and take any level', () => {
    const { rerender } = render(<Card.Title>Usage</Card.Title>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();

    rerender(<Card.Title as="h2">Usage</Card.Title>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('interactive styling does not invent focusability', () => {
    render(
      <Card.Root data-testid="card" interactive>
        content
      </Card.Root>,
    );

    // A div with a click handler is not a control. `interactive` is styling
    // only; real semantics come from asChild with an <a> or <button>.
    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('data-interactive');
    expect(card).not.toHaveAttribute('tabindex');
  });

  it('becomes a real control through asChild', async () => {
    const onClick = vi.fn();
    render(
      <Card.Root asChild interactive>
        <button type="button" onClick={onClick}>
          Pick this plan
        </button>
      </Card.Root>,
    );

    const button = screen.getByRole('button', { name: 'Pick this plan' });
    await userEvent.tab();
    expect(button).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });

  it('forwards refs on every part', () => {
    const root = React.createRef<HTMLDivElement>();
    const title = React.createRef<HTMLHeadingElement>();

    render(
      <Card.Root ref={root}>
        <Card.Title ref={title}>Usage</Card.Title>
      </Card.Root>,
    );

    expect(root.current).toBeInstanceOf(HTMLDivElement);
    expect(title.current).toBeInstanceOf(HTMLHeadingElement);
  });

  it('lets caller classes win', () => {
    render(
      <Card.Root data-testid="card" className="rounded-none">
        x
      </Card.Root>,
    );

    const classes = screen.getByTestId('card').className;
    expect(classes).toContain('rounded-none');
    expect(classes).not.toContain('rounded-(--noksha-radius-lg)');
  });
});
