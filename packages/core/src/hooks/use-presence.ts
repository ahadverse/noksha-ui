import * as React from 'react';

/**
 * Keeps an element mounted until its exit animation has finished.
 *
 * This is what lets the whole library animate in CSS (ADR-004). React unmounts
 * the moment `open` turns false, which is why most component kits reach for a
 * JS animation library the first time someone asks for a fade-out. Here the
 * component keeps rendering with `data-state="closed"`, the stylesheet runs
 * whatever exit animation it likes, and this hook unmounts on `animationend`.
 *
 * ```tsx
 * const present = usePresence(open, contentRef);
 * if (!present) return null;
 * return <div ref={contentRef} data-state={open ? 'open' : 'closed'} />;
 * ```
 *
 * When there is no exit animation — including under `prefers-reduced-motion`,
 * where every duration token is zero — it unmounts immediately, so nothing is
 * left waiting on an event that will never fire.
 */
export function usePresence(open: boolean, ref: React.RefObject<HTMLElement | null>): boolean {
  const [present, setPresent] = React.useState(open);

  React.useEffect(() => {
    if (open) {
      setPresent(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      setPresent(false);
      return;
    }

    // Read after the render that set `data-state="closed"`, so this is the exit
    // animation being measured, not the entry one.
    const styles = getComputedStyle(node);
    const duration = Number.parseFloat(styles.animationDuration) || 0;
    const name = styles.animationName;

    if (name === 'none' || duration === 0) {
      setPresent(false);
      return;
    }

    // `animationcancel` matters: an element hidden or re-opened mid-exit never
    // fires `animationend`, and without this the layer would stay mounted for good.
    const finish = (event: AnimationEvent) => {
      if (event.target === node) setPresent(false);
    };

    node.addEventListener('animationend', finish);
    node.addEventListener('animationcancel', finish);

    return () => {
      node.removeEventListener('animationend', finish);
      node.removeEventListener('animationcancel', finish);
    };
  }, [open, ref]);

  return present;
}
