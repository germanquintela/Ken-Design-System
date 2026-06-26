'use client';

import * as stylex from '@stylexjs/stylex';
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useState,
} from 'react';
import type { MouseEventHandler, ReactElement, ReactNode, Ref } from 'react';
import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import { ChevronDown } from 'lucide-react';
import { Button } from '../Button';
import { iconSize } from '../../theme/foundations/iconSize';
import { overlay } from '../../theme/foundations/overlay';
import { item as menuItem, slot as menuSlot } from './Menu.styles';

// Menu.Chevron rotates with the open state. StyleX has no descendant selectors,
// so a chevron nested in the trigger can't react to the trigger's
// data-popup-open — it reads this context instead.
const MenuOpenContext = createContext(false);

const ITEM_ICON = iconSize.lg;
const CHEVRON_ICON = iconSize.md;

const sizeIcon = (node: ReactNode, px: number) =>
  isValidElement(node)
    ? cloneElement(node as ReactElement<{ size?: number }>, { size: px })
    : node;

// Disabled is applied LAST so a disabled-destructive item mutes rather than staying red.
function Row({
  prefix,
  suffix,
  destructive,
  disabled,
  children,
}: {
  prefix?: ReactNode;
  suffix?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  const slotProps = stylex.props(
    overlay.slot.base,
    destructive && menuSlot.destructive,
    disabled && overlay.slot.disabled,
  );
  return (
    <>
      {prefix != null && (
        <span aria-hidden {...slotProps}>
          {sizeIcon(prefix, ITEM_ICON)}
        </span>
      )}
      <span {...stylex.props(overlay.label.base)}>{children}</span>
      {suffix != null && (
        <span aria-hidden {...slotProps}>
          {sizeIcon(suffix, ITEM_ICON)}
        </span>
      )}
    </>
  );
}

export interface MenuProps {
  /** `Menu.Trigger` plus `Menu.Content` (and the items inside it). */
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Fires whenever the menu requests to open or close. */
  onOpenChange?: (open: boolean) => void;
  /** Modal (Base UI default true): scroll-lock + outside-interaction guard. */
  modal?: boolean;
}

function MenuRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  modal,
}: MenuProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  return (
    <MenuOpenContext.Provider value={open}>
      <BaseMenu.Root
        open={open}
        onOpenChange={(nextOpen) => {
          if (openProp === undefined) setOpenState(nextOpen); // only shadow when uncontrolled
          onOpenChange?.(nextOpen);
        }}
        modal={modal}
      >
        {children}
      </BaseMenu.Root>
    </MenuOpenContext.Provider>
  );
}

export interface MenuTriggerProps {
  /** Compose the trigger over a Ken control via Base UI render. Defaults to a secondary Button. */
  render?: ReactElement;
  /** Trigger contents — a label, optionally followed by `Menu.Chevron`. */
  children?: ReactNode;
}

/**
 * **Menu.Trigger** — the control that opens the menu. Defaults to a secondary
 * `Button`; pass `render` to compose over any other Ken control.
 */
const MenuTrigger = forwardRef<HTMLElement, MenuTriggerProps>(
  function MenuTrigger({ render, children }, ref) {
    return (
      <BaseMenu.Trigger
        ref={ref as Ref<HTMLElement>}
        render={render ?? <Button variant="secondary" />}
      >
        {children}
      </BaseMenu.Trigger>
    );
  },
);

export interface MenuContentProps {
  /** The menu rows — `Menu.Item` · `Menu.LinkItem` · `Menu.Separator` · `Menu.Section`. */
  children: ReactNode;
  /** Side of the trigger to anchor to. Default `bottom`. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignment along that side. Default `start`. */
  align?: 'start' | 'center' | 'end';
  /** Gap between trigger and panel, px. Default 6. */
  sideOffset?: number;
}

/**
 * **Menu.Content** — the floating panel (portal + positioner + popup) that holds
 * the items. Anchors to the trigger via `side` · `align` · `sideOffset`.
 */
function MenuContent({
  children,
  side = 'bottom',
  align = 'start',
  sideOffset = 6,
}: MenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        {...stylex.props(overlay.positioner.base)}
      >
        <BaseMenu.Popup {...stylex.props(overlay.panel.base)}>
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export interface MenuItemProps {
  /** Row label. */
  children: ReactNode;
  /** Leading icon (auto-sized). */
  prefix?: ReactNode;
  /** Trailing icon (auto-sized). */
  suffix?: ReactNode;
  /** Ignore interaction + mute. */
  disabled?: boolean;
  /** Danger styling for destructive actions. */
  destructive?: boolean;
  /** Click handler for the action. */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Close the menu on click. Default true. */
  closeOnClick?: boolean;
}

/**
 * **Menu.Item** — a single actionable row. Optional leading / trailing icons
 * (`prefix` / `suffix`), `destructive` danger styling, and `disabled`; closes
 * the menu on click unless `closeOnClick={false}`.
 */
const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  { children, prefix, suffix, disabled, destructive, onClick, closeOnClick },
  ref,
) {
  return (
    <BaseMenu.Item
      ref={ref as Ref<HTMLElement>}
      disabled={disabled}
      onClick={onClick}
      closeOnClick={closeOnClick}
      {...stylex.props(overlay.item.base, destructive && menuItem.destructive)}
    >
      <Row
        prefix={prefix}
        suffix={suffix}
        destructive={destructive}
        disabled={disabled}
      >
        {children}
      </Row>
    </BaseMenu.Item>
  );
});

export interface MenuLinkItemProps {
  /** Row label. */
  children: ReactNode;
  /** Destination URL — the row renders as an `<a href>` and won't auto-close the menu. */
  href: string;
  /** Leading icon (auto-sized). */
  prefix?: ReactNode;
  /** Trailing icon (auto-sized). */
  suffix?: ReactNode;
  /** Ignore interaction + mute. */
  disabled?: boolean;
}

/**
 * **Menu.LinkItem** — a menu row that navigates: renders as an `<a href>` and
 * does not auto-close the menu on click.
 */
const MenuLinkItem = forwardRef<HTMLAnchorElement, MenuLinkItemProps>(
  function MenuLinkItem({ children, href, prefix, suffix, disabled }, ref) {
    return (
      <BaseMenu.Item
        ref={ref as Ref<HTMLAnchorElement>}
        render={<a href={href} />}
        closeOnClick={false}
        disabled={disabled}
        {...stylex.props(overlay.item.base)}
      >
        <Row prefix={prefix} suffix={suffix} disabled={disabled}>
          {children}
        </Row>
      </BaseMenu.Item>
    );
  },
);

/** **Menu.Separator** — a thin divider between groups of items. */
function MenuSeparator() {
  return <BaseMenu.Separator {...stylex.props(overlay.separator.base)} />;
}

export interface MenuSectionProps {
  /** The group heading, shown muted above the items. */
  label: string;
  /** The items in this group. */
  children: ReactNode;
}

/**
 * **Menu.Section** — a labelled group of items. Renders `label` as a muted group
 * heading above its `children`.
 */
function MenuSection({ label, children }: MenuSectionProps) {
  return (
    <BaseMenu.Group>
      <BaseMenu.GroupLabel {...stylex.props(overlay.groupLabel.base)}>
        {label}
      </BaseMenu.GroupLabel>
      {children}
    </BaseMenu.Group>
  );
}

/**
 * **Menu.Chevron** — a caret for use inside `Menu.Trigger` that rotates when the
 * menu is open (reads the open state from context).
 */
function MenuChevron() {
  const open = useContext(MenuOpenContext);
  return (
    <ChevronDown
      size={CHEVRON_ICON}
      aria-hidden
      {...stylex.props(overlay.chevron.base, open && overlay.chevron.open)}
    />
  );
}

MenuRoot.displayName = 'Menu';
MenuTrigger.displayName = 'Menu.Trigger';
MenuContent.displayName = 'Menu.Content';
MenuItem.displayName = 'Menu.Item';
MenuLinkItem.displayName = 'Menu.LinkItem';
MenuSeparator.displayName = 'Menu.Separator';
MenuSection.displayName = 'Menu.Section';
MenuChevron.displayName = 'Menu.Chevron';

/**
 * **Menu** — a dropdown menu of actions, built on Base UI Menu (focus, keyboard,
 * typeahead, outside-dismiss). Compound: compose `Menu.Trigger` + `Menu.Content`
 * (the portal + positioner + panel), and fill the panel with `Menu.Item` ·
 * `Menu.LinkItem` · `Menu.Separator` · `Menu.Section`. Drop a `Menu.Chevron`
 * inside the trigger for a caret that rotates with the open state.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <Menu.Trigger>
 *     Actions <Menu.Chevron />
 *   </Menu.Trigger>
 *   <Menu.Content>
 *     <Menu.Item prefix={<Pencil />}>Edit</Menu.Item>
 *     <Menu.Separator />
 *     <Menu.Item destructive prefix={<Trash />}>Delete</Menu.Item>
 *   </Menu.Content>
 * </Menu>
 * ```
 */
export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  LinkItem: MenuLinkItem,
  Separator: MenuSeparator,
  Section: MenuSection,
  Chevron: MenuChevron,
});
