import {
  composeRefs,
  ROVING_ITEM_ATTR,
  useControllableState,
  usePresence,
  useRovingFocus,
} from '@noksha-ui/core';
import * as React from 'react';
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
  AccordionVariant,
} from './accordion.types.js';
import {
  accordionContentBodyVariants,
  accordionContentInnerVariants,
  accordionContentVariants,
  accordionIndicatorVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionVariants,
} from './accordion.variants.js';

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  baseId: string;
  variant: AccordionVariant;
  disabled: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
  open: boolean;
  disabled: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionContext(part: string): AccordionContextValue {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(`[@noksha-ui/react] <Accordion.${part}> must be used inside <Accordion.Root>.`);
  }
  return context;
}

function useItemContext(part: string): AccordionItemContextValue {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(`[@noksha-ui/react] <Accordion.${part}> must be used inside <Accordion.Item>.`);
  }
  return context;
}

const triggerId = (base: string, value: string) => `${base}-trigger-${value}`;
const panelId = (base: string, value: string) => `${base}-panel-${value}`;

/**
 * Collapsible sections.
 *
 * ```tsx
 * <Accordion.Root type="single" collapsible defaultValue="billing">
 *   <Accordion.Item value="billing">
 *     <Accordion.Trigger>Billing</Accordion.Trigger>
 *     <Accordion.Content>…</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 * ```
 */
export const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionProps>(
  function AccordionRoot(props, forwardedRef) {
    const {
      type = 'single',
      variant = 'bordered',
      disabled = false,
      className,
      value: valueProp,
      defaultValue,
      onValueChange,
      collapsible = false,
      ...rest
    } = props as AccordionProps & {
      type?: 'single' | 'multiple';
      value?: string | string[];
      defaultValue?: string | string[];
      onValueChange?: (value: never) => void;
      collapsible?: boolean;
    };

    const multiple = type === 'multiple';
    const baseId = React.useId();
    const listRef = React.useRef<HTMLDivElement>(null);

    // Normalised to an array internally so the open/toggle logic is written once;
    // the caller's shape is restored on the way back out.
    const [value, setValue] = useControllableState<string[]>({
      value:
        valueProp === undefined
          ? undefined
          : multiple
            ? (valueProp as string[])
            : [valueProp as string],
      defaultValue:
        defaultValue === undefined
          ? []
          : multiple
            ? (defaultValue as string[])
            : [defaultValue as string],
      onChange: (next) => {
        if (multiple) (onValueChange as ((value: string[]) => void) | undefined)?.(next);
        else (onValueChange as ((value: string) => void) | undefined)?.(next[0] ?? '');
      },
    });

    const isOpen = React.useCallback((item: string) => value.includes(item), [value]);

    const toggle = React.useCallback(
      (item: string) => {
        setValue((current) => {
          const open = current.includes(item);
          if (multiple)
            return open ? current.filter((entry) => entry !== item) : [...current, item];
          if (open) return collapsible ? [] : current;
          return [item];
        });
      },
      [setValue, multiple, collapsible],
    );

    // Arrow keys move between headers, per the WAI-ARIA accordion pattern.
    const { onKeyDown } = useRovingFocus({ ref: listRef, orientation: 'vertical' });

    const context = React.useMemo<AccordionContextValue>(
      () => ({ isOpen, toggle, baseId, variant, disabled }),
      [isOpen, toggle, baseId, variant, disabled],
    );

    return (
      <AccordionContext.Provider value={context}>
        {/* biome-ignore lint/a11y/noStaticElementInteractions: a keydown delegate for the real controls inside; the container is not itself operable */}
        <div
          ref={composeRefs(forwardedRef, listRef)}
          className={accordionVariants({ variant, className })}
          {...rest}
          onKeyDown={(event) => {
            rest.onKeyDown?.(event);
            onKeyDown(event);
          }}
        />
      </AccordionContext.Provider>
    );
  },
);
AccordionRoot.displayName = 'Accordion.Root';

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ value, disabled = false, className, ...rest }, ref) {
    const { isOpen, variant, disabled: rootDisabled } = useAccordionContext('Item');
    const open = isOpen(value);
    const itemDisabled = disabled || rootDisabled;

    const context = React.useMemo<AccordionItemContextValue>(
      () => ({ value, open, disabled: itemDisabled }),
      [value, open, itemDisabled],
    );

    return (
      <AccordionItemContext.Provider value={context}>
        <div
          ref={ref}
          data-state={open ? 'open' : 'closed'}
          data-disabled={itemDisabled || undefined}
          className={accordionItemVariants({ variant, className })}
          {...rest}
        />
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = 'Accordion.Item';

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ as: Heading = 'h3', indicator, className, children, ...rest }, ref) {
    const { toggle, baseId } = useAccordionContext('Trigger');
    const { value, open, disabled } = useItemContext('Trigger');

    const resolvedIndicator = indicator === undefined ? <ChevronIcon /> : indicator;

    return (
      // The button is wrapped in a heading so the sections show up in a screen
      // reader's headings list — which is how people navigate a long FAQ.
      <Heading className="m-0">
        <button
          ref={ref}
          type="button"
          id={triggerId(baseId, value)}
          aria-expanded={open}
          aria-controls={panelId(baseId, value)}
          disabled={disabled}
          data-state={open ? 'open' : 'closed'}
          data-value={value}
          {...{ [ROVING_ITEM_ATTR]: '' }}
          className={`group/trigger ${accordionTriggerVariants({ className })}`}
          {...rest}
          onClick={(event) => {
            rest.onClick?.(event);
            if (!event.defaultPrevented) toggle(value);
          }}
        >
          {children}
          {resolvedIndicator ? (
            <span className={accordionIndicatorVariants()}>{resolvedIndicator}</span>
          ) : null}
        </button>
      </Heading>
    );
  },
);
AccordionTrigger.displayName = 'Accordion.Trigger';

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ forceMount = false, className, children, ...rest }, ref) {
    const { baseId } = useAccordionContext('Content');
    const { value, open } = useItemContext('Content');

    const panelRef = React.useRef<HTMLElement>(null);
    const present = usePresence(open, panelRef);

    /**
     * Collapsed panels are unmounted rather than merely hidden.
     *
     * A zero-height panel that is still in the DOM is still in the accessibility
     * tree, so a screen reader reads out every collapsed section of a long FAQ.
     * `usePresence` keeps it mounted only for as long as the closing animation
     * needs, which is what lets it be both animated and genuinely gone.
     */
    if (!present && !forceMount) return null;

    return (
      <section
        ref={panelRef}
        id={panelId(baseId, value)}
        aria-labelledby={triggerId(baseId, value)}
        hidden={!present && forceMount}
        data-state={open ? 'open' : 'closed'}
        className={accordionContentVariants()}
      >
        {/* Owns `overflow: hidden`, which is what makes the 0fr row clip. */}
        <div className={accordionContentInnerVariants()}>
          <div ref={ref} className={accordionContentBodyVariants({ className })} {...rest}>
            {children}
          </div>
        </div>
      </section>
    );
  },
);
AccordionContent.displayName = 'Accordion.Content';

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};

export { accordionVariants };
