import {
  composeRefs,
  FocusScope,
  Portal,
  ROVING_ITEM_ATTR,
  useAnchorPosition,
  useControllableState,
  useDismissable,
  useIsomorphicLayoutEffect,
  usePresence,
  useRovingFocus,
  useTypeahead,
} from '@prism-ui/core';
import * as React from 'react';
import { useFieldControl } from '../field/field.js';
import type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemData,
  SelectItemProps,
  SelectProps,
  SelectTriggerProps,
} from './select.types.js';
import {
  selectContentVariants,
  selectGroupLabelVariants,
  selectIndicatorVariants,
  selectItemVariants,
  selectTriggerVariants,
} from './select.variants.js';

const SELECT_ITEM = Symbol.for('prism.select.item');

/**
 * Reads the options straight out of the element tree.
 *
 * The alternative is a registry the items write to on mount — and that cannot
 * answer "what is the label for the current value" until the list has been
 * opened at least once, because closed content is not mounted. Every library
 * that takes that route ends up either rendering the raw value on first paint
 * or portalling the list into a detached node to make the registration happen.
 *
 * Walking the tree is synchronous, correct on the server, and has no flash. The
 * cost is the one documented rule: `Select.Item` has to be written inside
 * `Select.Content` in the JSX, not hidden behind a component of your own.
 */
function collectItems(node: React.ReactNode, out: SelectItemData[] = []): SelectItemData[] {
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return;

    const marker = (child.type as unknown as Record<symbol, boolean> | undefined)?.[SELECT_ITEM];
    if (marker) {
      const props = child.props as SelectItemProps;
      out.push({
        value: props.value,
        label: props.children,
        textValue: props.textValue ?? textOf(props.children),
        disabled: Boolean(props.disabled),
      });
      return;
    }

    const nested = (child.props as { children?: React.ReactNode } | undefined)?.children;
    if (nested) collectItems(nested, out);
  });

  return out;
}

/** Best-effort plain text of a label, for type-to-select. */
function textOf(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (React.isValidElement(node)) {
    return textOf((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

interface SelectContextValue {
  value: string | undefined;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  items: SelectItemData[];
  triggerId: string;
  contentId: string;
  describedBy: string | undefined;
  anchor: HTMLElement | null;
  setAnchor: (element: HTMLElement | null) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext(part: string): SelectContextValue {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error(`[@prism-ui/react] <Select.${part}> must be used inside <Select.Root>.`);
  }
  return context;
}

/**
 * A listbox-backed select.
 *
 * ```tsx
 * <Select.Root name="plan" defaultValue="pro">
 *   <Select.Trigger placeholder="Choose a plan" />
 *   <Select.Content>
 *     <Select.Item value="free">Free</Select.Item>
 *     <Select.Item value="pro">Pro</Select.Item>
 *   </Select.Content>
 * </Select.Root>
 * ```
 *
 * Not a native `<select>`: options in one cannot be styled, grouped visually, or
 * given icons. What the native element does give — posting with the form — is
 * kept through a hidden input, so `FormData` and server actions still work.
 */
export function SelectRoot({
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  name,
  disabled = false,
  required = false,
  invalid = false,
  children,
}: SelectProps) {
  const [value, setValueState] = useControllableState<string | undefined>({
    value: valueProp,
    defaultValue,
    onChange: (next) => {
      if (next !== undefined) onValueChange?.(next);
    },
  });

  const [open, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const id = React.useId();

  // No `id` is offered to the field: `useFieldControl` lets the control's own
  // id win, so passing the generated one here would mean a surrounding
  // `<Field.Label htmlFor>` always pointed at an element that does not exist.
  // The generated id is the fallback for a Select standing on its own.
  const field = useFieldControl({
    disabled,
    required,
    'aria-invalid': invalid || undefined,
  });
  const items = React.useMemo(() => collectItems(children), [children]);

  const setValue = React.useCallback(
    (next: string) => {
      setValueState(next);
      setOpen(false);
    },
    [setValueState, setOpen],
  );

  const context = React.useMemo<SelectContextValue>(
    () => ({
      value,
      setValue,
      open,
      setOpen,
      items,
      triggerId: field.id ?? `${id}-trigger`,
      contentId: `${id}-content`,
      describedBy: field['aria-describedby'],
      anchor,
      setAnchor,
      triggerRef,
      disabled: field.disabled ?? disabled,
      required: field.required ?? required,
      invalid: field['aria-invalid'] === true || invalid,
    }),
    [value, setValue, open, setOpen, items, field, id, anchor, disabled, required, invalid],
  );

  return (
    <SelectContext.Provider value={context}>
      {children}
      {name ? (
        // Hidden rather than visually-hidden: the listbox is the control the
        // user operates, and a second focusable field would be in their way.
        <input
          type="hidden"
          name={name}
          value={value ?? ''}
          disabled={context.disabled}
          aria-hidden="true"
        />
      ) : null}
    </SelectContext.Provider>
  );
}
SelectRoot.displayName = 'Select.Root';

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

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(
    { variant = 'outline', size = 'md', placeholder, renderValue, className, children, ...rest },
    forwardedRef,
  ) {
    const {
      value,
      setValue,
      open,
      setOpen,
      items,
      triggerId,
      contentId,
      describedBy,
      setAnchor,
      triggerRef,
      disabled,
      required,
      invalid,
    } = useSelectContext('Trigger');

    const selected = items.find((item) => item.value === value);

    // Type-to-select while closed, exactly as a native select does — no need to
    // open the list to jump to "Netherlands".
    const typeahead = useTypeahead({
      getItems: () => items.map((item) => item.textValue),
      getActiveIndex: () => items.findIndex((item) => item.value === value),
      onMatch: (index) => {
        const item = items[index];
        if (item && !item.disabled) setValue(item.value);
      },
    });

    return (
      <button
        ref={composeRefs(forwardedRef, triggerRef, setAnchor)}
        type="button"
        id={triggerId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        data-state={open ? 'open' : 'closed'}
        data-placeholder={selected ? undefined : ''}
        className={selectTriggerVariants({ variant, size, className })}
        {...rest}
        onClick={(event) => {
          rest.onClick?.(event);
          if (!event.defaultPrevented) setOpen(!open);
        }}
        onKeyDown={(event) => {
          rest.onKeyDown?.(event);
          if (event.defaultPrevented) return;

          if (
            event.key === 'ArrowDown' ||
            event.key === 'ArrowUp' ||
            event.key === 'Enter' ||
            event.key === ' '
          ) {
            event.preventDefault();
            setOpen(true);
            return;
          }
          if (!open) typeahead.onKeyDown(event);
        }}
      >
        <span className="truncate">
          {renderValue ? renderValue(value) : (selected?.label ?? placeholder ?? children)}
        </span>
        <ChevronIcon />
      </button>
    );
  },
);
SelectTrigger.displayName = 'Select.Trigger';

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(
    {
      side = 'bottom',
      align = 'start',
      sideOffset = 6,
      collisionPadding = 8,
      container,
      matchTriggerWidth = false,
      className,
      children,
      ...rest
    },
    forwardedRef,
  ) {
    const { open, setOpen, setValue, items, value, contentId, triggerId, anchor, triggerRef } =
      useSelectContext('Content');

    const contentRef = React.useRef<HTMLDivElement>(null);
    const present = usePresence(open, contentRef);

    const position = useAnchorPosition({
      open: present,
      placement: align === 'center' ? side : `${side}-${align}`,
      offset: sideOffset,
      collisionPadding,
      matchAnchorWidth: true,
    });

    const { setAnchor } = position;
    useIsomorphicLayoutEffect(() => setAnchor(anchor), [setAnchor, anchor]);

    useDismissable({
      ref: contentRef,
      enabled: open,
      extraRefs: [triggerRef],
      onDismiss: () => setOpen(false),
    });

    const roving = useRovingFocus({ ref: contentRef, orientation: 'vertical' });
    const { focusItem } = roving;

    const enabledItems = React.useMemo(() => items.filter((item) => !item.disabled), [items]);

    const typeahead = useTypeahead({
      getItems: () => enabledItems.map((item) => item.textValue),
      getActiveIndex: () => {
        const active = document.activeElement as HTMLElement | null;
        const current = active?.getAttribute('data-value');
        return enabledItems.findIndex((item) => item.value === current);
      },
      onMatch: (index) => focusItem(index),
    });

    // Open on the selected option rather than on the first one, so a list of two
    // hundred countries does not start at Afghanistan every single time.
    const selectedIndex = enabledItems.findIndex((item) => item.value === value);
    const openIndex = selectedIndex === -1 ? 0 : selectedIndex;

    if (!present) return null;

    return (
      <Portal container={container}>
        <div
          ref={position.setFloating}
          style={position.floatingStyles}
          className="z-(--prism-z-dropdown)"
        >
          <FocusScope
            asChild
            trapped
            autoFocus
            restoreFocus
            onMountAutoFocus={(event) => {
              event.preventDefault();
              focusItem(openIndex);
            }}
          >
            <div
              ref={composeRefs(forwardedRef, contentRef)}
              id={contentId}
              role="listbox"
              aria-labelledby={triggerId}
              data-state={open ? 'open' : 'closed'}
              data-side={position.side}
              data-align={position.align}
              className={selectContentVariants({ matchTriggerWidth, className })}
              onKeyDown={(event) => {
                roving.onKeyDown(event);
                if (event.defaultPrevented) return;

                if (event.key === 'Enter' || event.key === ' ') {
                  const active = document.activeElement as HTMLElement | null;
                  const next = active?.getAttribute('data-value');
                  if (next != null) {
                    event.preventDefault();
                    setValue(next);
                  }
                  return;
                }
                if (event.key === 'Tab') {
                  // Tab commits and leaves, as a native select does.
                  setOpen(false);
                  return;
                }
                typeahead.onKeyDown(event);
              }}
              {...rest}
            >
              {children}
            </div>
          </FocusScope>
        </div>
      </Portal>
    );
  },
);
SelectContent.displayName = 'Select.Content';

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { value, disabled = false, textValue: _textValue, className, children, ...rest },
  ref,
) {
  const { value: selected, setValue } = useSelectContext('Item');
  const isSelected = selected === value;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard selection is handled once on the listbox, which owns focus
    <div
      ref={ref}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      // Focused directly rather than tracked with aria-activedescendant: the
      // browser then scrolls the row into view on its own, which is most of
      // what a hand-rolled implementation of that pattern gets wrong.
      tabIndex={-1}
      data-value={value}
      data-disabled={disabled || undefined}
      data-selected={isSelected || undefined}
      {...{ [ROVING_ITEM_ATTR]: '' }}
      className={selectItemVariants({ className })}
      onClick={(event) => {
        rest.onClick?.(event);
        if (!disabled && !event.defaultPrevented) setValue(value);
      }}
      // Pointer movement moves focus, so the keyboard highlight and the pointer
      // never disagree about which row is active.
      onPointerMove={(event) => {
        rest.onPointerMove?.(event);
        if (!disabled) event.currentTarget.focus({ preventScroll: true });
      }}
      {...rest}
    >
      {children}
      {isSelected ? (
        <span className={selectIndicatorVariants()}>
          <CheckIcon />
        </span>
      ) : null}
    </div>
  );
});
SelectItem.displayName = 'Select.Item';
(SelectItem as unknown as Record<symbol, boolean>)[SELECT_ITEM] = true;

export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(function SelectGroup(
  { label, className, children, ...rest },
  ref,
) {
  const id = React.useId();

  return (
    // biome-ignore lint/a11y/useSemanticElements: <fieldset> is not a permitted child of a listbox
    <div
      ref={ref}
      role="group"
      aria-labelledby={label ? id : undefined}
      className={className}
      {...rest}
    >
      {label ? (
        <div id={id} className={selectGroupLabelVariants()}>
          {label}
        </div>
      ) : null}
      {children}
    </div>
  );
});
SelectGroup.displayName = 'Select.Group';

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
};

export { selectTriggerVariants };
