import * as React from 'react';
import { useEventCallback } from './use-event-callback.js';

export type DismissReason = 'escape' | 'outside-pointer' | 'focus-out';

export interface UseDismissableOptions {
  /** The layer's own element. Anything inside it counts as "inside". */
  ref: React.RefObject<HTMLElement | null>;
  /** Called when the layer should close. */
  onDismiss: (reason: DismissReason, event: Event) => void;
  /** Off by default until the layer is actually open. */
  enabled?: boolean;
  /**
   * Extra elements that count as inside — the trigger, above all. Without it a
   * click on the trigger dismisses the layer and the trigger then reopens it,
   * so the popover appears not to close at all.
   */
  extraRefs?: ReadonlyArray<React.RefObject<HTMLElement | null>>;
  disableEscape?: boolean;
  disableOutsidePointer?: boolean;
  /** Dismiss when focus leaves the layer — wanted by comboboxes, not by dialogs. */
  dismissOnFocusOut?: boolean;
}

interface Layer {
  getElement: () => HTMLElement | null;
  contains: (target: Node) => boolean;
  dismiss: (reason: DismissReason, event: Event) => void;
  disableEscape: boolean;
  disableOutsidePointer: boolean;
  dismissOnFocusOut: boolean;
  /** Registration sequence, used only to break ties. */
  order: number;
}

/**
 * Every open layer. A module-level registry is what makes nesting behave:
 * Escape inside a popover that sits inside a dialog must close the popover
 * only, and per-component listeners cannot know that ordering.
 */
const layers: Layer[] = [];
let nextOrder = 0;

/**
 * Orders layers bottom-to-top from the DOM, not from mount order.
 *
 * Mount order is the obvious choice and it is wrong: React runs effects
 * child-first, so a popover nested inside a dialog registers *before* the
 * dialog does and would be treated as the layer underneath. Containment answers
 * it directly, and document order settles the portalled case — two overlays
 * appended to `<body>` stack in the order they were appended.
 */
function compareLayers(a: Layer, b: Layer): number {
  const elementA = a.getElement();
  const elementB = b.getElement();
  if (!elementA || !elementB || elementA === elementB) return a.order - b.order;

  const position = elementA.compareDocumentPosition(elementB);

  if (position & Node.DOCUMENT_POSITION_CONTAINED_BY) return -1;
  if (position & Node.DOCUMENT_POSITION_CONTAINS) return 1;
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return a.order - b.order;
}

/** The stack, bottom first. Sorted per event — there are only ever a handful. */
function stack(): Layer[] {
  return [...layers].sort(compareLayers);
}

function topmost(predicate: (layer: Layer) => boolean): Layer | undefined {
  const sorted = stack();
  for (let i = sorted.length - 1; i >= 0; i--) {
    const layer = sorted[i] as Layer;
    if (predicate(layer)) return layer;
  }
  return undefined;
}

function onKeyDown(event: KeyboardEvent): void {
  if (event.key !== 'Escape' || event.defaultPrevented) return;

  const layer = topmost((candidate) => !candidate.disableEscape);
  layer?.dismiss('escape', event);
}

/**
 * Walks the stack from the top down and dismisses every layer the pointer
 * landed outside of, stopping at the first one it landed inside.
 *
 * That single rule covers the nested case: clicking inside an inner popover
 * closes nothing, and clicking on the page behind closes the inner popover and
 * its parent together, top first.
 */
function onPointerDown(event: Event): void {
  const target = event.target as Node | null;
  if (!target) return;

  const sorted = stack();
  for (let i = sorted.length - 1; i >= 0; i--) {
    const layer = sorted[i] as Layer;
    if (layer.contains(target)) return;
    if (!layer.disableOutsidePointer) layer.dismiss('outside-pointer', event);
  }
}

function onFocusIn(event: FocusEvent): void {
  const target = event.target as Node | null;
  if (!target) return;

  const sorted = stack();
  for (let i = sorted.length - 1; i >= 0; i--) {
    const layer = sorted[i] as Layer;
    if (layer.contains(target)) return;
    if (layer.dismissOnFocusOut) layer.dismiss('focus-out', event);
  }
}

function setListening(active: boolean): void {
  const method = active ? 'addEventListener' : 'removeEventListener';

  // Capture phase throughout: a consumer calling stopPropagation inside the
  // layer must not be able to strand an open overlay with no way to close it.
  document[method]('keydown', onKeyDown as EventListener, true);
  document[method]('pointerdown', onPointerDown, true);
  document[method]('focusin', onFocusIn as EventListener, true);
}

/**
 * Closes a layer on Escape, on an outside pointer press, or on focus leaving —
 * in the right order when layers are nested.
 *
 * ```tsx
 * useDismissable({ ref: contentRef, enabled: open, extraRefs: [triggerRef],
 *   onDismiss: () => setOpen(false) });
 * ```
 *
 * Listeners are attached once for the whole stack rather than once per layer,
 * so ten open toasts cost the same three listeners as one.
 */
export function useDismissable(options: UseDismissableOptions): void {
  const {
    ref,
    onDismiss,
    enabled = true,
    extraRefs,
    disableEscape = false,
    disableOutsidePointer = false,
    dismissOnFocusOut = false,
  } = options;

  const dismiss = useEventCallback(onDismiss);

  // Read through a ref so a new array literal from the consumer's render does
  // not re-register the layer and reshuffle the stack.
  const extraRefsRef = React.useRef(extraRefs);
  extraRefsRef.current = extraRefs;

  React.useEffect(() => {
    if (!enabled) return;

    const layer: Layer = {
      order: nextOrder++,
      getElement: () => ref.current,
      contains: (target) => {
        if (ref.current?.contains(target)) return true;
        return (extraRefsRef.current ?? []).some(
          (extra) => extra.current?.contains(target) ?? false,
        );
      },
      dismiss: (reason, event) => dismiss(reason, event),
      disableEscape,
      disableOutsidePointer,
      dismissOnFocusOut,
    };

    layers.push(layer);
    if (layers.length === 1) setListening(true);

    return () => {
      const index = layers.indexOf(layer);
      if (index !== -1) layers.splice(index, 1);
      if (layers.length === 0) setListening(false);
    };
  }, [enabled, ref, dismiss, disableEscape, disableOutsidePointer, dismissOnFocusOut]);
}

/** How many layers are currently registered. Exposed for tests and debugging. */
export function getLayerCount(): number {
  return layers.length;
}
