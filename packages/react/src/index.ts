/**
 * The root barrel.
 *
 * It is a client boundary: nearly everything here owns state, listens to the
 * document, or both, and the `"use client"` directive is attached to this file
 * at build time. Importing `{ Button }` from a Server Component is still
 * correct — it simply becomes a client component, which it is.
 *
 * `themeScript` deliberately does **not** live here. It is a plain string meant
 * to be inlined into `<head>` during a server render, so it ships from its own
 * directive-free entry: `@noksha-ui/react/theme-script` (ARCHITECTURE.md §7).
 */

export type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
  AccordionVariant,
} from './components/accordion/index.js';
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  accordionVariants,
} from './components/accordion/index.js';
export type {
  AlertPartProps,
  AlertProps,
  AlertTone,
  AlertVariant,
} from './components/alert/index.js';
export {
  Alert,
  AlertActions,
  AlertDescription,
  AlertRoot,
  AlertTitle,
  alertVariants,
} from './components/alert/index.js';
export type {
  AvatarFallbackProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarLoadingStatus,
  AvatarProps,
  AvatarShape,
  AvatarSize,
} from './components/avatar/index.js';
export {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  AvatarRoot,
  avatarVariants,
} from './components/avatar/index.js';
export type { BadgeProps, BadgeSize, BadgeTone, BadgeVariant } from './components/badge/index.js';
export { Badge, badgeVariants } from './components/badge/index.js';
export type {
  ButtonEffect,
  ButtonGroupProps,
  ButtonLoadingPlacement,
  ButtonProps,
  ButtonShape,
  ButtonSize,
  ButtonTone,
  ButtonVariant,
  CopyButtonProps,
  FloatingAction,
  FloatingButtonProps,
  FloatingMenuProps,
  FloatingPlacement,
  ScrollToTopProps,
  ToggleButtonProps,
} from './components/button/index.js';
export {
  Button,
  ButtonGroup,
  buttonVariants,
  CopyButton,
  FloatingButton,
  FloatingMenu,
  ScrollToTop,
  ToggleButton,
} from './components/button/index.js';
export type {
  CardPadding,
  CardPartProps,
  CardProps,
  CardTitleProps,
  CardVariant,
} from './components/card/index.js';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  cardVariants,
} from './components/card/index.js';
export type { CheckboxProps, CheckboxSize, CheckboxTone } from './components/checkbox/index.js';
export { Checkbox, checkboxVariants } from './components/checkbox/index.js';
export type {
  DialogContentProps,
  DialogOverlayProps,
  DialogPartProps,
  DialogProps,
  DialogSize,
  DialogTriggerProps,
} from './components/dialog/index.js';
export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants,
} from './components/dialog/index.js';
export type {
  DrawerContentProps,
  DrawerPartProps,
  DrawerProps,
  DrawerSide,
  DrawerSize,
  DrawerTriggerProps,
} from './components/drawer/index.js';
export {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  drawerContentVariants,
} from './components/drawer/index.js';
export type {
  FieldControlProps,
  FieldLabelProps,
  FieldProps,
  FieldSize,
  FieldTextProps,
} from './components/field/index.js';
export {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  fieldVariants,
  useFieldContext,
  useFieldControl,
} from './components/field/index.js';
export type { InputProps, InputSize, InputVariant } from './components/input/index.js';
export { Input, inputVariants } from './components/input/index.js';
export type {
  PopoverAlign,
  PopoverContentProps,
  PopoverProps,
  PopoverSide,
  PopoverTriggerProps,
} from './components/popover/index.js';
export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  popoverContentVariants,
} from './components/popover/index.js';
export type {
  RadioGroupProps,
  RadioProps,
  RadioSize,
  RadioTone,
} from './components/radio/index.js';
export { Radio, RadioGroup, radioVariants } from './components/radio/index.js';
export type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemData,
  SelectItemProps,
  SelectProps,
  SelectSize,
  SelectTriggerProps,
  SelectVariant,
} from './components/select/index.js';
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  selectTriggerVariants,
} from './components/select/index.js';
export type { SeparatorOrientation, SeparatorProps } from './components/separator/index.js';
export { Separator, separatorVariants } from './components/separator/index.js';
export type {
  SkeletonProps,
  SkeletonShape,
  SkeletonSize,
  SkeletonSpeed,
  SkeletonTone,
  SkeletonVariant,
} from './components/skeleton/index.js';
export { Skeleton, skeletonStackVariants, skeletonVariants } from './components/skeleton/index.js';
export type { SliderProps, SliderSize, SliderTone } from './components/slider/index.js';
export { Slider, sliderVariants } from './components/slider/index.js';

export type {
  SpinnerPlacement,
  SpinnerProps,
  SpinnerSize,
  SpinnerSpeed,
  SpinnerVariant,
} from './components/spinner/index.js';
export { Spinner, spinnerGroupVariants, spinnerVariants } from './components/spinner/index.js';
export type { SwitchProps, SwitchSize, SwitchTone } from './components/switch/index.js';
export { Switch, switchVariants } from './components/switch/index.js';
export type {
  TabsContentProps,
  TabsListProps,
  TabsOrientation,
  TabsProps,
  TabsSize,
  TabsTriggerProps,
  TabsVariant,
} from './components/tabs/index.js';
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  tabsVariants,
} from './components/tabs/index.js';
export type {
  TextareaProps,
  TextareaResize,
  TextareaSize,
  TextareaVariant,
} from './components/textarea/index.js';
export { Textarea, textareaVariants } from './components/textarea/index.js';
export type {
  ToastApi,
  ToastOptions,
  ToastPosition,
  ToastProviderProps,
  ToastRecord,
  ToastTone,
} from './components/toast/index.js';
export { ToastProvider, toastVariants, useToast } from './components/toast/index.js';
export type {
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
} from './components/tooltip/index.js';
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  tooltipContentVariants,
} from './components/tooltip/index.js';
/** The tone table every component shares. */
export { TONES, type Tone } from './internal/tone.js';
export type { ThemeContextValue } from './theme/theme-provider.js';
export { ThemeProvider, type ThemeProviderProps, useTheme } from './theme/theme-provider.js';

/** Types only — the runtime lives at `@noksha-ui/react/theme-script`. */
export type { ResolvedTheme, ThemeMode, ThemeScriptOptions } from './theme/theme-script.js';
