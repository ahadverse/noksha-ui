import * as React from 'react';
import { composeRefs } from '../utils/compose-refs.js';
import { focusFirst, getTabbable, getTabbableEdges } from '../utils/focusable.js';
import { Slot } from './slot.js';

export interface FocusScopeProps extends React.HTMLAttributes<HTMLElement> {
  /** Keep Tab inside the scope. Dialogs want this; popovers usually do not. */
  trapped?: boolean;
  /** Wrap from the last element back to the first. Only meaningful when trapped. */
  loop?: boolean;
  /** Move focus into the scope on mount. */
  autoFocus?: boolean;
  /** Return focus to whatever was focused before, on unmount. */
  restoreFocus?: boolean;
  /**
   * Cancelable, both of them: calling `preventDefault()` in `onMountAutoFocus`
   * lets a component put focus somewhere of its own choosing (a search field, a
   * destructive action's Cancel button) instead of on the first tabbable.
   */
  onMountAutoFocus?: (event: Event) => void;
  onUnmountAutoFocus?: (event: Event) => void;
  asChild?: boolean;
  children?: React.ReactNode;
}

const MOUNT_AUTO_FOCUS = 'noksha.focusScope.autoFocusOnMount';
const UNMOUNT_AUTO_FOCUS = 'noksha.focusScope.autoFocusOnUnmount';

/**
 * A focus trap with restore, built without sentinel nodes.
 *
 * The usual implementation brackets the content with two `tabindex="0"` spans
 * and catches focus as it lands on them. That works until the content is inside
 * a portal, an iframe, or anything that moves focus programmatically — and it
 * puts two junk nodes in the a11y tree of every dialog.
 *
 * This one intercepts the Tab key directly and keeps a `focusin` guard as the
 * backstop for focus that arrives without a keypress. Nothing extra is rendered.
 */
export const FocusScope = React.forwardRef<HTMLElement, FocusScopeProps>(
  function FocusScope(props, forwardedRef) {
    const {
      trapped = false,
      loop = true,
      autoFocus = true,
      restoreFocus = true,
      onMountAutoFocus,
      onUnmountAutoFocus,
      asChild = false,
      children,
      ...rest
    } = props;

    const [container, setContainer] = React.useState<HTMLElement | null>(null);

    // The last element focused *inside* the scope, so the focusin guard can put
    // focus back where the user left it rather than snapping to the top.
    const lastFocused = React.useRef<HTMLElement | null>(null);

    const onMountRef = React.useRef(onMountAutoFocus);
    const onUnmountRef = React.useRef(onUnmountAutoFocus);
    React.useEffect(() => {
      onMountRef.current = onMountAutoFocus;
      onUnmountRef.current = onUnmountAutoFocus;
    });

    // Mount focus and restore are one effect on purpose: the element to restore
    // to has to be captured before focus is moved in, and both halves must agree
    // on which element that was.
    React.useEffect(() => {
      if (!container) return;

      const doc = container.ownerDocument;
      const previouslyFocused = doc.activeElement as HTMLElement | null;

      if (autoFocus) {
        const event = new CustomEvent(MOUNT_AUTO_FOCUS, { bubbles: false, cancelable: true });
        container.dispatchEvent(event);
        onMountRef.current?.(event);

        if (!event.defaultPrevented) {
          // The container itself is the fallback, which is why it carries
          // tabIndex={-1}: an empty dialog must still take focus off the page
          // behind it, or Tab would walk straight back into the inert content.
          focusFirst([...getTabbable(container), container], { preventScroll: true });
        }
      }

      return () => {
        const event = new CustomEvent(UNMOUNT_AUTO_FOCUS, { bubbles: false, cancelable: true });
        container.dispatchEvent(event);
        onUnmountRef.current?.(event);

        if (restoreFocus && !event.defaultPrevented) {
          // Deferred a frame: React may still be tearing the subtree down, and
          // focusing an element that is about to be detached silently no-ops.
          requestAnimationFrame(() => focusFirst([previouslyFocused], { preventScroll: true }));
        }
      };
    }, [container, autoFocus, restoreFocus]);

    // Backstop for focus that arrives without a Tab press: a script calling
    // focus(), a click on browser chrome, an autofocusing embed.
    React.useEffect(() => {
      if (!container || !trapped) return;

      const doc = container.ownerDocument;

      const onFocusIn = (event: FocusEvent) => {
        const target = event.target as HTMLElement | null;
        if (target && container.contains(target)) {
          lastFocused.current = target;
          return;
        }
        focusFirst([lastFocused.current, ...getTabbable(container), container], {
          preventScroll: true,
        });
      };

      doc.addEventListener('focusin', onFocusIn, true);
      return () => doc.removeEventListener('focusin', onFocusIn, true);
    }, [container, trapped]);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        rest.onKeyDown?.(event);

        if (!trapped || event.key !== 'Tab' || event.defaultPrevented) return;
        if (event.ctrlKey || event.altKey || event.metaKey) return;
        if (!container) return;

        const [first, last] = getTabbableEdges(container);

        // Nothing to move to: hold focus on the container rather than letting Tab
        // walk out into the page behind the trap.
        if (!first || !last) {
          event.preventDefault();
          container.focus({ preventScroll: true });
          return;
        }

        if (!loop) return;

        const active = container.ownerDocument.activeElement;

        if (event.shiftKey && (active === first || active === container)) {
          event.preventDefault();
          last.focus({ preventScroll: true });
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus({ preventScroll: true });
        }
      },
      [container, trapped, loop, rest.onKeyDown],
    );

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        {...rest}
        ref={composeRefs(forwardedRef, setContainer)}
        tabIndex={rest.tabIndex ?? -1}
        onKeyDown={onKeyDown}
      >
        {children}
      </Comp>
    );
  },
);

FocusScope.displayName = 'FocusScope';
