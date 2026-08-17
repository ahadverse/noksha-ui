import { Portal, usePresence } from '@prism-ui/core';
import * as React from 'react';
import type { Tone } from '../../internal/tone.js';
import type {
  ToastApi,
  ToastOptions,
  ToastPosition,
  ToastProviderProps,
  ToastRecord,
} from './toast.types.js';
import {
  toastActionVariants,
  toastCloseVariants,
  toastDescriptionVariants,
  toastIconVariants,
  toastTitleVariants,
  toastVariants,
  toastViewportVariants,
} from './toast.variants.js';

const ToastContext = React.createContext<ToastApi | null>(null);

/** The imperative handle. Throws outside a provider rather than silently no-op. */
export function useToast(): ToastApi {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('[@prism-ui/react] useToast() must be used inside a <ToastProvider>.');
  }
  return context;
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

const TONE_ICONS: Partial<Record<Tone, React.ReactNode>> = {
  success: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  ),
  danger: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 15.75v.5" />
    </svg>
  ),
  warning: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M10.3 4.2 2.8 17.1A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.9L13.7 4.2a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9.5v4M12 16.75v.5" />
    </svg>
  ),
  info: (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.75v.5" />
    </svg>
  ),
};

interface ToastItemProps {
  record: ToastRecord;
  position: ToastPosition;
  defaultDuration: number;
  paused: boolean;
  onDismiss: (id: string) => void;
  onRemove: (id: string) => void;
}

function ToastItem({
  record,
  position,
  defaultDuration,
  paused,
  onDismiss,
  onRemove,
}: ToastItemProps) {
  const ref = React.useRef<HTMLLIElement>(null);
  const present = usePresence(record.open, ref);

  const duration = record.duration ?? defaultDuration;

  /**
   * The remaining time is tracked rather than the timer simply being restarted,
   * so hovering a toast at four seconds and leaving gives back one second — not
   * a fresh five. Restarting is the common shortcut and it makes a toast the
   * pointer merely passes over feel like it will never leave.
   */
  const remaining = React.useRef(duration);
  const startedAt = React.useRef(0);

  React.useEffect(() => {
    if (!record.open || !Number.isFinite(duration) || paused) return;

    startedAt.current = Date.now();
    const timer = setTimeout(() => onDismiss(record.id), remaining.current);

    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current));
    };
  }, [record.open, record.id, duration, paused, onDismiss]);

  const { id } = record;
  React.useEffect(() => {
    if (!present) onRemove(id);
  }, [present, id, onRemove]);

  if (!present) return null;

  const icon = record.tone ? TONE_ICONS[record.tone] : undefined;

  return (
    <li
      ref={ref}
      // Errors interrupt; everything else waits for a natural pause. Announcing
      // a "Saved" toast assertively would cut across whatever the user is
      // reading for no good reason.
      role={record.tone === 'danger' ? 'alert' : 'status'}
      data-state={record.open ? 'open' : 'closed'}
      data-tone={record.tone ?? 'neutral'}
      className={toastVariants({ tone: record.tone ?? 'neutral', position })}
    >
      {icon ? <span className={toastIconVariants()}>{icon}</span> : null}
      {record.title ? <div className={toastTitleVariants()}>{record.title}</div> : null}
      {record.description ? (
        <div className={toastDescriptionVariants()}>{record.description}</div>
      ) : null}
      {record.action ? <div className={toastActionVariants()}>{record.action}</div> : null}
      <button
        type="button"
        aria-label="Dismiss"
        className={toastCloseVariants()}
        onClick={() => onDismiss(record.id)}
      >
        <svg {...iconProps} aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </li>
  );
}

/**
 * Holds the toast queue and renders the viewport.
 *
 * ```tsx
 * <ToastProvider position="bottom-right">
 *   <App />
 * </ToastProvider>
 *
 * const { toast } = useToast();
 * toast({ title: 'Deployed', tone: 'success' });
 * ```
 */
export function ToastProvider({
  children,
  position = 'bottom-right',
  duration = 5000,
  max = 4,
  container,
  label = 'Notifications',
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);
  const [paused, setPaused] = React.useState(false);
  const counter = React.useRef(0);

  const dismiss = React.useCallback((id: string) => {
    // Marked closed rather than removed, so the exit animation gets to run;
    // ToastItem takes it out of the list once the animation ends.
    setToasts((current) =>
      current.map((record) => (record.id === id ? { ...record, open: false } : record)),
    );
  }, []);

  const remove = React.useCallback((id: string) => {
    setToasts((current) => {
      const record = current.find((entry) => entry.id === id);
      if (!record || record.open) return current;
      record.onDismiss?.();
      return current.filter((entry) => entry.id !== id);
    });
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts((current) => current.map((record) => ({ ...record, open: false })));
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions): string => {
      counter.current += 1;
      const id = options.id ?? `prism-toast-${counter.current}`;

      setToasts((current) => {
        // A repeated id replaces in place — a "Saving…" that becomes "Saved"
        // should not push a second card onto the stack.
        const existing = current.findIndex((record) => record.id === id);
        if (existing !== -1) {
          const next = [...current];
          next[existing] = { ...options, id, open: true };
          return next;
        }

        const appended = [...current, { ...options, id, open: true }];
        const live = appended.filter((record) => record.open);

        // Over the limit, the oldest is closed rather than dropped, so it
        // animates away instead of vanishing mid-read.
        if (live.length <= max) return appended;
        const oldest = live[0];
        return appended.map((record) =>
          record.id === oldest?.id ? { ...record, open: false } : record,
        );
      });

      return id;
    },
    [max],
  );

  const api = React.useMemo<ToastApi>(
    () => ({ toast, dismiss, dismissAll, toasts }),
    [toast, dismiss, dismissAll, toasts],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {toasts.length > 0 ? (
        <Portal container={container}>
          <ol
            aria-label={label}
            tabIndex={-1}
            className={toastViewportVariants({ position })}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {toasts.map((record) => (
              <ToastItem
                key={record.id}
                record={record}
                position={position}
                defaultDuration={duration}
                paused={paused}
                onDismiss={dismiss}
                onRemove={remove}
              />
            ))}
          </ol>
        </Portal>
      ) : null}
    </ToastContext.Provider>
  );
}
ToastProvider.displayName = 'ToastProvider';

export { toastVariants };
