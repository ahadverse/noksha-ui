/**
 * Focus bookkeeping shared by `FocusScope`, `useRovingFocus` and every overlay.
 *
 * Visibility is decided from computed style, the `hidden` attribute and `inert`
 * rather than from `offsetParent` or `getClientRects()`. Those two are the usual
 * shortcut, but they read layout — which means they report *everything* as
 * hidden in jsdom, and they force a synchronous reflow in the browser on a path
 * that runs on every Tab press.
 */

/**
 * Everything the platform can focus. `[tabindex]` is matched broadly and then
 * filtered by {@link isTabbable}, because `tabindex="-1"` is focusable by script
 * but must stay out of the Tab order.
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button',
  'input:not([type="hidden"])',
  'select',
  'textarea',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  'summary',
  '[tabindex]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

function isDisabled(element: Element): boolean {
  if ((element as HTMLInputElement).disabled) return true;
  if (element.getAttribute('aria-disabled') === 'true') return true;

  // A control inside a disabled <fieldset> is disabled too, unless it sits in
  // that fieldset's first <legend>.
  const fieldset = element.closest('fieldset[disabled]');
  if (!fieldset) return false;

  const legend = fieldset.querySelector(':scope > legend');
  return !legend?.contains(element);
}

/** Hidden to the user, and therefore not focusable. */
export function isHidden(element: HTMLElement): boolean {
  if (element.hidden) return true;
  if (element.closest('[inert]')) return true;
  if (element.closest('[aria-hidden="true"]')) return true;

  // `details` collapses its content, but the summary itself stays reachable.
  const details = element.closest('details:not([open])');
  if (
    details &&
    details !== element &&
    !details.querySelector(':scope > summary')?.contains(element)
  ) {
    return true;
  }

  const view = element.ownerDocument.defaultView;
  if (!view) return false;

  for (let node: HTMLElement | null = element; node; node = node.parentElement) {
    const style = view.getComputedStyle(node);
    if (style.display === 'none' || style.visibility === 'hidden') return true;
  }
  return false;
}

/** Can receive focus from script (`element.focus()`). */
export function isFocusable(element: HTMLElement): boolean {
  if (!element.matches(FOCUSABLE_SELECTOR)) return false;
  if (isDisabled(element)) return false;
  return !isHidden(element);
}

/** Reachable with Tab — focusable *and* in the tab order. */
export function isTabbable(element: HTMLElement): boolean {
  return isFocusable(element) && element.tabIndex >= 0;
}

/** Every tabbable descendant, in tab order (which is DOM order here — see below). */
export function getTabbable(container: HTMLElement): HTMLElement[] {
  return getFocusable(container).filter(isTabbable);
}

/**
 * Every script-focusable descendant, in DOM order.
 *
 * Positive `tabindex` values are deliberately *not* sorted ahead. Inside a focus
 * scope the visual order is the useful order, and honouring positive tabindex
 * would let one stray `tabindex="1"` in consumer content jump the trap's own
 * sentinel ordering.
 */
export function getFocusable(container: HTMLElement): HTMLElement[] {
  const found = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  const all = isFocusable(container) ? [container, ...found] : found;
  return all.filter(isFocusable);
}

/** First and last tabbable descendants — the two ends a trap wraps between. */
export function getTabbableEdges(container: HTMLElement): [HTMLElement | null, HTMLElement | null] {
  const tabbable = getTabbable(container);
  return [tabbable[0] ?? null, tabbable[tabbable.length - 1] ?? null];
}

export interface FocusOptions {
  /** Select the text of an input once focused — the usual want for a field. */
  select?: boolean;
  preventScroll?: boolean;
}

/**
 * Focuses the first candidate that takes focus, and reports whether any did.
 *
 * Elements are tried in order rather than assumed focusable: a candidate can be
 * hidden, disabled, or removed between being collected and being focused.
 */
export function focusFirst(
  candidates: Array<HTMLElement | null>,
  options: FocusOptions = {},
): boolean {
  const { select = false, preventScroll = false } = options;
  const previous = candidates[0]?.ownerDocument.activeElement;

  for (const candidate of candidates) {
    if (!candidate) continue;
    if (candidate === previous) return true;

    candidate.focus({ preventScroll });
    if (candidate.ownerDocument.activeElement !== candidate) continue;

    if (select && isSelectable(candidate)) candidate.select();
    return true;
  }
  return false;
}

function isSelectable(element: HTMLElement): element is HTMLInputElement {
  return 'select' in element && typeof (element as HTMLInputElement).select === 'function';
}
