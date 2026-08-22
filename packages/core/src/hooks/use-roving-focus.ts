import * as React from 'react';
import { isHidden } from '../utils/focusable.js';
import { useEventCallback } from './use-event-callback.js';

export type Orientation = 'horizontal' | 'vertical' | 'both';
export type Direction = 'ltr' | 'rtl';

/**
 * Items opt in by carrying this attribute. An explicit marker beats guessing
 * from roles: a tablist holds tabs, a menu holds menuitems and separators, and
 * a toolbar holds anything at all — one selector cannot cover them.
 */
export const ROVING_ITEM_ATTR = 'data-noksha-item';

export interface UseRovingFocusOptions {
  /** The element that owns the items — the tablist, menu, radiogroup, toolbar. */
  ref: React.RefObject<HTMLElement | null>;
  /** Which arrow keys navigate. `both` accepts all four. */
  orientation?: Orientation;
  /** Wrap around at the ends. */
  loop?: boolean;
  /** Flips Left/Right. Read from the container's `dir` when omitted. */
  dir?: Direction;
  /** Overrides the default `[data-noksha-item]` item selector. */
  itemSelector?: string;
  /** Runs after focus moves — where a tab strip with automatic activation selects. */
  onNavigate?: (item: HTMLElement, index: number) => void;
  /**
   * Maintain `tabindex` across the items so the group is one tab stop.
   *
   * Leave it off when the component already drives `tabIndex` from its own
   * state — a Tabs list, for instance — or the two will fight each other.
   */
  manageTabIndex?: boolean;
}

export interface UseRovingFocus {
  /** Spread onto the container. */
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  /** The navigable items right now, in DOM order. */
  getItems: () => HTMLElement[];
  /**
   * Moves focus to an index, clamping or wrapping according to `loop`.
   *
   * Scrolls the item into view by default — what arrow-key navigation wants
   * in a long list. Mount-time autofocus wants the opposite: the item is
   * inside a freshly-portalled popover that has not been anchor-positioned
   * yet, so a scrolling focus() lands wherever the browser's default
   * placement happens to be — typically the top of the page — rather than
   * scrolling the popover's own list.
   */
  focusItem: (index: number, options?: { preventScroll?: boolean }) => void;
}

function isNavigable(item: HTMLElement): boolean {
  if (item.hasAttribute('data-disabled')) return false;
  if (item.getAttribute('aria-disabled') === 'true') return false;
  if ((item as HTMLButtonElement).disabled) return false;
  return !isHidden(item);
}

/**
 * Arrow-key navigation for a group that behaves as one tab stop.
 *
 * Used by Tabs, RadioGroup, Menu and Toolbar. The items are read from the DOM on
 * each keypress rather than kept in a registry, so items that appear, vanish or
 * reorder need no bookkeeping and cannot leave a stale index behind.
 */
export function useRovingFocus(options: UseRovingFocusOptions): UseRovingFocus {
  const {
    ref,
    orientation = 'both',
    loop = true,
    dir,
    itemSelector = `[${ROVING_ITEM_ATTR}]`,
    onNavigate,
    manageTabIndex = false,
  } = options;

  const navigate = useEventCallback(onNavigate);

  const getItems = React.useCallback((): HTMLElement[] => {
    const container = ref.current;
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLElement>(itemSelector)).filter(isNavigable);
  }, [ref, itemSelector]);

  const applyTabIndex = React.useCallback(
    (items: HTMLElement[], activeIndex: number) => {
      if (!manageTabIndex) return;
      items.forEach((item, index) => {
        item.tabIndex = index === activeIndex ? 0 : -1;
      });
    },
    [manageTabIndex],
  );

  const focusItem = React.useCallback(
    (index: number, options?: { preventScroll?: boolean }) => {
      const items = getItems();
      if (items.length === 0) return;

      const resolved = loop
        ? ((index % items.length) + items.length) % items.length
        : Math.min(Math.max(index, 0), items.length - 1);

      const item = items[resolved];
      if (!item) return;

      applyTabIndex(items, resolved);
      item.focus({ preventScroll: options?.preventScroll ?? false });
      navigate(item, resolved);
    },
    [getItems, loop, applyTabIndex, navigate],
  );

  // Give the group its single tab stop before the user ever presses a key.
  React.useEffect(() => {
    if (!manageTabIndex) return;
    const items = getItems();
    if (items.length === 0) return;

    const active = items.findIndex((item) => item.tabIndex === 0);
    applyTabIndex(items, active === -1 ? 0 : active);
  }, [manageTabIndex, getItems, applyTabIndex]);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.defaultPrevented) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const container = ref.current;
      if (!container) return;

      // Arrow keys inside a text field belong to the caret, not to the group.
      const target = event.target as HTMLElement;
      if (target !== container && target.closest('input,textarea,[contenteditable="true"]')) return;

      const rtl = (dir ?? (container.closest('[dir="rtl"]') ? 'rtl' : 'ltr')) === 'rtl';
      const horizontal = orientation === 'horizontal' || orientation === 'both';
      const vertical = orientation === 'vertical' || orientation === 'both';

      const items = getItems();
      if (items.length === 0) return;

      const current = items.indexOf(target.closest<HTMLElement>(itemSelector) ?? target);
      const from = current === -1 ? 0 : current;

      let next: number | null = null;

      switch (event.key) {
        case 'ArrowRight':
          if (horizontal) next = from + (rtl ? -1 : 1);
          break;
        case 'ArrowLeft':
          if (horizontal) next = from + (rtl ? 1 : -1);
          break;
        case 'ArrowDown':
          if (vertical) next = from + 1;
          break;
        case 'ArrowUp':
          if (vertical) next = from - 1;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = items.length - 1;
          break;
        default:
          return;
      }

      if (next === null) return;
      if (!loop && (next < 0 || next >= items.length)) {
        // At an end without looping, let the key through — in a toolbar the
        // page may well want to scroll.
        return;
      }

      event.preventDefault();
      focusItem(next);
    },
    [ref, dir, orientation, getItems, itemSelector, loop, focusItem],
  );

  return { onKeyDown, getItems, focusItem };
}
