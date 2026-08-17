import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useTypeahead } from './use-typeahead.js';

const ITEMS = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry'];

function Listbox({
  onMatch,
  items = ITEMS,
}: {
  onMatch: (index: number) => void;
  items?: string[];
}) {
  const [active, setActive] = React.useState(-1);
  const activeRef = React.useRef(active);
  activeRef.current = active;

  const { onKeyDown, search } = useTypeahead({
    getItems: () => items,
    getActiveIndex: () => activeRef.current,
    onMatch: (index) => {
      setActive(index);
      onMatch(index);
    },
  });

  return (
    <div>
      <div role="listbox" tabIndex={0} onKeyDown={onKeyDown} aria-label="fruit">
        {items.map((item, index) => (
          // biome-ignore lint/a11y/useFocusableInteractive: static harness rows
          <div key={item} role="option" aria-selected={index === active}>
            {item}
          </div>
        ))}
      </div>
      <span data-testid="search">{search}</span>
    </div>
  );
}

async function type(text: string) {
  screen.getByRole('listbox').focus();
  await userEvent.keyboard(text);
}

describe('useTypeahead', () => {
  it('jumps to the first item matching a single character', async () => {
    const onMatch = vi.fn();
    render(<Listbox onMatch={onMatch} />);

    await type('b');
    expect(onMatch).toHaveBeenLastCalledWith(2);
  });

  it('cycles through matches when the same character repeats', async () => {
    const onMatch = vi.fn();
    render(<Listbox onMatch={onMatch} />);

    // The native-select gesture: pressing `a` twice walks Apple → Apricot
    // rather than sticking on the first match.
    await type('a');
    expect(onMatch).toHaveBeenLastCalledWith(0);

    await type('a');
    expect(onMatch).toHaveBeenLastCalledWith(1);

    await type('a');
    expect(onMatch).toHaveBeenLastCalledWith(0);
  });

  it('treats different characters as a growing prefix', async () => {
    const onMatch = vi.fn();
    render(<Listbox onMatch={onMatch} />);

    await type('bl');
    expect(onMatch).toHaveBeenLastCalledWith(3);
  });

  it('keeps the current item when the prefix still matches it', async () => {
    const onMatch = vi.fn();
    render(<Listbox onMatch={onMatch} />);

    await type('a');
    expect(onMatch).toHaveBeenLastCalledWith(0);

    // "ap" still describes Apple, so the search must not skip past it.
    await type('p');
    expect(onMatch).toHaveBeenLastCalledWith(0);
  });

  it('wraps around the end of the list', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onMatch = vi.fn();

    render(<Listbox onMatch={onMatch} />);
    screen.getByRole('listbox').focus();

    await user.keyboard('c');
    expect(onMatch).toHaveBeenLastCalledWith(4);

    // A separate query, not the prefix "ca" — so the search starts past the
    // last item and has to come round to the front.
    vi.advanceTimersByTime(1200);
    await user.keyboard('a');
    expect(onMatch).toHaveBeenLastCalledWith(0);

    vi.useRealTimers();
  });

  it('does nothing when nothing matches', async () => {
    const onMatch = vi.fn();
    render(<Listbox onMatch={onMatch} />);

    await type('z');
    expect(onMatch).not.toHaveBeenCalled();
  });

  it('ignores Space, so a listbox can still select with it', async () => {
    const onMatch = vi.fn();
    render(<Listbox onMatch={onMatch} />);

    await type(' ');
    expect(onMatch).not.toHaveBeenCalled();
  });

  it('ignores modified keystrokes and non-printable keys', async () => {
    const onMatch = vi.fn();
    render(<Listbox onMatch={onMatch} />);

    await type('{Control>}a{/Control}');
    await type('{Enter}');
    await type('{ArrowDown}');
    expect(onMatch).not.toHaveBeenCalled();
  });

  it('exposes the query so far', async () => {
    render(<Listbox onMatch={vi.fn()} />);

    await type('bl');
    expect(screen.getByTestId('search')).toHaveTextContent('bl');
  });

  it('forgets the query after the timeout', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onMatch = vi.fn();

    render(<Listbox onMatch={onMatch} />);
    screen.getByRole('listbox').focus();

    await user.keyboard('b');
    expect(onMatch).toHaveBeenLastCalledWith(2);

    vi.advanceTimersByTime(1200);

    // A new query, not a continuation: `l` on its own matches nothing.
    await user.keyboard('l');
    expect(onMatch).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
