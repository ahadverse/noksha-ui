import * as React from 'react';
import { useEventCallback } from './use-event-callback.js';

export interface UseTypeaheadOptions {
  /** The searchable text of every item, in the order they appear. */
  getItems: () => string[];
  /** Where the search starts from — usually the active or selected index. */
  getActiveIndex?: () => number;
  /** Called with the index of the match. */
  onMatch: (index: number) => void;
  /** How long keystrokes keep accumulating into one query. */
  timeout?: number;
}

export interface UseTypeahead {
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  /** The query so far — useful for a "no matches" hint. */
  search: string;
  /** Drops the buffer, e.g. when the menu closes. */
  reset: () => void;
}

/**
 * Type-to-select for Select, Menu and Combobox.
 *
 * Two details separate this from a naive `startsWith` scan, and both are what
 * users expect from native controls:
 *
 * - the search starts *after* the current item and wraps, so typing `s`
 *   repeatedly walks through every entry starting with S rather than sticking
 *   on the first one;
 * - a repeated single character is treated as that cycling gesture, while
 *   `s`, `e`, `p` typed quickly is treated as the prefix "sep" — the ambiguity
 *   native selects resolve the same way.
 */
export function useTypeahead(options: UseTypeaheadOptions): UseTypeahead {
  const { getItems, getActiveIndex, onMatch, timeout = 1000 } = options;

  const [search, setSearch] = React.useState('');
  const searchRef = React.useRef('');
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = useEventCallback(getItems);
  const activeIndex = useEventCallback(getActiveIndex);
  const match = useEventCallback(onMatch);

  const reset = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    searchRef.current = '';
    setSearch('');
  }, []);

  React.useEffect(() => reset, [reset]);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      // Single printable characters only: this must not swallow Enter, Tab,
      // arrows, or a Space that a listbox uses to select.
      if (event.key.length !== 1 || event.key === ' ') return;

      const values = items() ?? [];
      if (values.length === 0) return;

      const next = searchRef.current + event.key.toLowerCase();
      const cycling = next.length > 1 && next.split('').every((char) => char === next[0]);
      const query = cycling ? (next[0] as string) : next;

      searchRef.current = next;
      setSearch(next);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(reset, timeout);

      const current = activeIndex() ?? -1;

      // A growing prefix re-examines the current item — having landed on
      // "Separator" for `s`, typing `e` must keep it rather than skip past it.
      // A first keystroke, or a cycling repeat, always moves on instead.
      const start = current + (cycling || next.length === 1 ? 1 : 0);

      for (let i = 0; i < values.length; i++) {
        const index = (start + i) % values.length;
        const text = (values[index] ?? '').trim().toLowerCase();

        if (text.startsWith(query)) {
          event.preventDefault();
          match(index);
          return;
        }
      }
    },
    [items, activeIndex, match, reset, timeout],
  );

  return { onKeyDown, search, reset };
}
