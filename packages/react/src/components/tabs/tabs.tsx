import {
  composeRefs,
  ROVING_ITEM_ATTR,
  useControllableState,
  useRovingFocus,
} from '@prism-ui/core';
import * as React from 'react';
import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsSize,
  TabsTriggerProps,
  TabsVariant,
} from './tabs.types.js';
import {
  tabsContentVariants,
  tabsListVariants,
  tabsTriggerVariants,
  tabsVariants,
} from './tabs.variants.js';

interface TabsContextValue {
  value: string | undefined;
  setValue: (value: string) => void;
  baseId: string;
  orientation: 'horizontal' | 'vertical';
  variant: TabsVariant;
  size: TabsSize;
  activationMode: 'automatic' | 'manual';
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(part: string): TabsContextValue {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(`[@prism-ui/react] <Tabs.${part}> must be used inside <Tabs.Root>.`);
  }
  return context;
}

const triggerId = (base: string, value: string) => `${base}-trigger-${value}`;
const panelId = (base: string, value: string) => `${base}-panel-${value}`;

/**
 * A tab strip and its panels.
 *
 * ```tsx
 * <Tabs.Root defaultValue="overview">
 *   <Tabs.List>
 *     <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
 *     <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="overview">…</Tabs.Content>
 *   <Tabs.Content value="usage">…</Tabs.Content>
 * </Tabs.Root>
 * ```
 */
export const TabsRoot = React.forwardRef<HTMLDivElement, TabsProps>(function TabsRoot(
  {
    value: valueProp,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    variant = 'line',
    size = 'md',
    activationMode = 'automatic',
    className,
    ...rest
  },
  ref,
) {
  const [value, setValueState] = useControllableState<string | undefined>({
    value: valueProp,
    defaultValue,
    onChange: (next) => {
      if (next !== undefined) onValueChange?.(next);
    },
  });

  const baseId = React.useId();
  const setValue = React.useCallback((next: string) => setValueState(next), [setValueState]);

  const context = React.useMemo<TabsContextValue>(
    () => ({ value, setValue, baseId, orientation, variant, size, activationMode }),
    [value, setValue, baseId, orientation, variant, size, activationMode],
  );

  return (
    <TabsContext.Provider value={context}>
      <div
        ref={ref}
        data-orientation={orientation}
        className={tabsVariants({ orientation, className })}
        {...rest}
      />
    </TabsContext.Provider>
  );
});
TabsRoot.displayName = 'Tabs.Root';

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { fitted = false, className, ...rest },
  forwardedRef,
) {
  const { orientation, variant, activationMode, setValue } = useTabsContext('List');
  const listRef = React.useRef<HTMLDivElement>(null);

  const { onKeyDown } = useRovingFocus({
    ref: listRef,
    orientation,
    // Tab order is handled by the triggers themselves, which set tabIndex from
    // the selected value — the two would otherwise fight over the same attribute.
    manageTabIndex: false,
    onNavigate: (item) => {
      if (activationMode !== 'automatic') return;
      const next = item.getAttribute('data-value');
      if (next) setValue(next);
    },
  });

  return (
    <div
      ref={composeRefs(forwardedRef, listRef)}
      role="tablist"
      aria-orientation={orientation}
      data-orientation={orientation}
      className={tabsListVariants({ orientation, variant, fitted, className })}
      {...rest}
      onKeyDown={(event) => {
        rest.onKeyDown?.(event);
        onKeyDown(event);
      }}
    />
  );
});
TabsList.displayName = 'Tabs.List';

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ value, className, ...rest }, ref) {
    const {
      value: selected,
      setValue,
      baseId,
      orientation,
      variant,
      size,
    } = useTabsContext('Trigger');
    const active = selected === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={triggerId(baseId, value)}
        aria-selected={active}
        aria-controls={panelId(baseId, value)}
        // The strip is a single tab stop: Tab moves past it, arrows move within.
        tabIndex={active ? 0 : -1}
        data-state={active ? 'active' : 'inactive'}
        data-value={value}
        data-orientation={orientation}
        {...{ [ROVING_ITEM_ATTR]: '' }}
        className={tabsTriggerVariants({ variant, size, orientation, className })}
        {...rest}
        onClick={(event) => {
          rest.onClick?.(event);
          if (!event.defaultPrevented) setValue(value);
        }}
        onKeyDown={(event) => {
          rest.onKeyDown?.(event);
          if (event.defaultPrevented) return;
          // Manual activation still commits on Enter or Space.
          if (event.key === 'Enter' || event.key === ' ') setValue(value);
        }}
      />
    );
  },
);
TabsTrigger.displayName = 'Tabs.Trigger';

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { value, forceMount = false, className, ...rest },
  ref,
) {
  const { value: selected, baseId, orientation } = useTabsContext('Content');
  const active = selected === value;

  if (!active && !forceMount) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={panelId(baseId, value)}
      aria-labelledby={triggerId(baseId, value)}
      // A panel with no focusable content of its own still needs to be
      // reachable, or Tab out of the strip skips straight past the content the
      // user just selected. This is what the WAI-ARIA tabs pattern prescribes.
      // biome-ignore lint/a11y/noNoninteractiveTabindex: required by the tabs pattern
      tabIndex={0}
      hidden={!active}
      data-state={active ? 'active' : 'inactive'}
      data-orientation={orientation}
      className={tabsContentVariants({ className })}
      {...rest}
    />
  );
});
TabsContent.displayName = 'Tabs.Content';

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};

export { tabsVariants };
