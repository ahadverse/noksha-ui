import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  ROVING_ITEM_ATTR,
  type UseRovingFocusOptions,
  useRovingFocus,
} from './use-roving-focus.js';

type GroupProps = Omit<UseRovingFocusOptions, 'ref'> & {
  items?: Array<{ label: string; disabled?: boolean }>;
  dirAttr?: 'ltr' | 'rtl';
};

function Group({ items, dirAttr, ...options }: GroupProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { onKeyDown } = useRovingFocus({ ref, ...options });

  const entries = items ?? [{ label: 'one' }, { label: 'two' }, { label: 'three' }];

  return (
    <div ref={ref} onKeyDown={onKeyDown} dir={dirAttr} role="toolbar">
      {entries.map((item) => (
        <button
          key={item.label}
          type="button"
          {...{ [ROVING_ITEM_ATTR]: '' }}
          {...(item.disabled ? { 'data-disabled': '' } : {})}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

const focused = () => document.activeElement?.textContent;

describe('useRovingFocus', () => {
  it('moves with the arrow keys', async () => {
    render(<Group />);
    screen.getByRole('button', { name: 'one' }).focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(focused()).toBe('two');

    await userEvent.keyboard('{ArrowDown}');
    expect(focused()).toBe('three');

    await userEvent.keyboard('{ArrowLeft}');
    expect(focused()).toBe('two');
  });

  it('wraps at both ends', async () => {
    render(<Group />);
    screen.getByRole('button', { name: 'three' }).focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(focused()).toBe('one');

    await userEvent.keyboard('{ArrowLeft}');
    expect(focused()).toBe('three');
  });

  it('stops at the ends when loop is off', async () => {
    render(<Group loop={false} />);
    screen.getByRole('button', { name: 'three' }).focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(focused()).toBe('three');
  });

  it('jumps to the ends with Home and End', async () => {
    render(<Group />);
    screen.getByRole('button', { name: 'two' }).focus();

    await userEvent.keyboard('{End}');
    expect(focused()).toBe('three');

    await userEvent.keyboard('{Home}');
    expect(focused()).toBe('one');
  });

  it('ignores the cross-axis keys for a single-orientation group', async () => {
    render(<Group orientation="horizontal" />);
    screen.getByRole('button', { name: 'one' }).focus();

    await userEvent.keyboard('{ArrowDown}');
    expect(focused()).toBe('one');

    await userEvent.keyboard('{ArrowRight}');
    expect(focused()).toBe('two');
  });

  it('flips left and right under dir="rtl"', async () => {
    render(<Group dirAttr="rtl" />);
    screen.getByRole('button', { name: 'one' }).focus();

    await userEvent.keyboard('{ArrowLeft}');
    expect(focused()).toBe('two');
  });

  it('skips disabled items', async () => {
    render(
      <Group items={[{ label: 'one' }, { label: 'two', disabled: true }, { label: 'three' }]} />,
    );
    screen.getByRole('button', { name: 'one' }).focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(focused()).toBe('three');
  });

  it('reports each move through onNavigate', async () => {
    const onNavigate = vi.fn();
    render(<Group onNavigate={onNavigate} />);
    screen.getByRole('button', { name: 'one' }).focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(onNavigate).toHaveBeenCalledWith(expect.any(HTMLElement), 1);
  });

  it('makes the group one tab stop when managing tabindex', async () => {
    render(
      <>
        <button type="button">before</button>
        <Group manageTabIndex />
        <button type="button">after</button>
      </>,
    );

    await userEvent.tab();
    expect(focused()).toBe('before');

    await userEvent.tab();
    expect(focused()).toBe('one');

    // Tab leaves the group entirely — arrows move within it, Tab moves past it.
    await userEvent.tab();
    expect(focused()).toBe('after');
  });

  it('leaves typing in a text field alone', async () => {
    function WithInput() {
      const ref = React.useRef<HTMLDivElement>(null);
      const { onKeyDown } = useRovingFocus({ ref });
      return (
        // biome-ignore lint/a11y/noStaticElementInteractions: a keydown delegate for the controls inside
        <div ref={ref} onKeyDown={onKeyDown}>
          <input aria-label="filter" {...{ [ROVING_ITEM_ATTR]: '' }} />
          <button type="button" {...{ [ROVING_ITEM_ATTR]: '' }}>
            item
          </button>
        </div>
      );
    }

    render(<WithInput />);
    const input = screen.getByLabelText('filter');
    input.focus();

    // Arrows belong to the caret here; stealing them would break every combobox.
    await userEvent.keyboard('{ArrowRight}');
    expect(input).toHaveFocus();
  });
});
