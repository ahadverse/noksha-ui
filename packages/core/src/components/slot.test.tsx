import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Slot, Slottable } from './slot.js';

describe('Slot', () => {
  it('renders the child element and no wrapper of its own', () => {
    const { container } = render(
      <Slot data-testid="slot">
        <a href="/pricing">Pricing</a>
      </Slot>,
    );

    const link = screen.getByRole('link', { name: 'Pricing' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('data-testid', 'slot');
    expect(container.firstChild).toBe(link);
  });

  it('lets the child win on plain props', () => {
    render(
      <Slot id="from-slot" title="from-slot">
        <button type="button" id="from-child">
          Go
        </button>
      </Slot>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('id', 'from-child');
    expect(button).toHaveAttribute('title', 'from-slot');
  });

  it('merges className rather than letting one side clobber the other', () => {
    render(
      <Slot className="px-2 rounded-md">
        <button type="button" className="px-8">
          Go
        </button>
      </Slot>,
    );

    const button = screen.getByRole('button');
    expect(button.className).toContain('rounded-md');
    // The child's px-8 beats the slot's px-2 through cx().
    expect(button.className).toContain('px-8');
    expect(button.className).not.toContain('px-2');
  });

  it('merges style objects with the child last', () => {
    render(
      <Slot style={{ color: 'red', margin: '4px' }}>
        <button type="button" style={{ color: 'blue' }}>
          Go
        </button>
      </Slot>,
    );

    const button = screen.getByRole('button');
    expect(button.style.color).toBe('blue');
    expect(button.style.margin).toBe('4px');
  });

  it('chains event handlers instead of dropping one', async () => {
    const user = userEvent.setup();
    const order: string[] = [];

    render(
      <Slot onClick={() => order.push('slot')}>
        <button type="button" onClick={() => order.push('child')}>
          Go
        </button>
      </Slot>,
    );

    await user.click(screen.getByRole('button'));
    expect(order).toEqual(['child', 'slot']);
  });

  it('keeps the slot handler when the child has none', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Slot onClick={onClick}>
        <button type="button">Go</button>
      </Slot>,
    );

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('composes its own ref with the child ref', () => {
    const slotRef = React.createRef<HTMLElement>();
    const childRef = React.createRef<HTMLButtonElement>();

    render(
      <Slot ref={slotRef}>
        <button type="button" ref={childRef}>
          Go
        </button>
      </Slot>,
    );

    const button = screen.getByRole('button');
    expect(slotRef.current).toBe(button);
    expect(childRef.current).toBe(button);
  });

  it('renders nothing when there is no element child', () => {
    const { container } = render(<Slot>{null}</Slot>);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('Slottable', () => {
  it('targets the marked child, leaving siblings in place', () => {
    render(
      <Slot className="btn" data-testid="target">
        <span aria-hidden="true">icon</span>
        <Slottable>
          <a href="/docs">Docs</a>
        </Slottable>
        <span aria-hidden="true">arrow</span>
      </Slot>,
    );

    const link = screen.getByRole('link', { name: /Docs/ });
    // The props landed on the anchor, not on the leading icon.
    expect(link).toHaveAttribute('data-testid', 'target');
    expect(link.className).toContain('btn');
    // And the siblings moved inside it.
    expect(link).toHaveTextContent('icon');
    expect(link).toHaveTextContent('arrow');
  });

  it('preserves the slotted element own children', () => {
    render(
      <Slot>
        <Slottable>
          <a href="/docs">Docs</a>
        </Slottable>
      </Slot>,
    );

    expect(screen.getByRole('link')).toHaveTextContent('Docs');
  });
});
