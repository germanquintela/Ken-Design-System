'use client';

import * as stylex from '@stylexjs/stylex';
import { createElement, useEffect } from 'react';
import type { ElementType } from 'react';
import { Dialog } from '@base-ui-components/react/dialog';
import { Autocomplete } from '@base-ui-components/react/autocomplete';
import { Search } from 'lucide-react';
import { overlay } from '../../theme/foundations/overlay';
import { iconSize } from '../../theme/foundations/iconSize';
import * as s from './CommandMenu.styles';

export interface CommandItem {
  /** Stable id (unique within the palette). */
  id: string;
  /** Row label — also the primary filter text. */
  label: string;
  /** Optional leading Lucide icon, sized by the component. */
  icon?: ElementType;
  /** Runs on select (click or Enter); the palette closes afterward. */
  onSelect: () => void;
  /** Extra match terms beyond `label`. */
  keywords?: string[];
}

export interface CommandGroup {
  /** Group heading shown above its items. */
  heading: string;
  /** The commands in this group. */
  items: CommandItem[];
}

export interface CommandMenuProps {
  /** Whether the palette is open (controlled). */
  open?: boolean;
  /** Open/close callback — fires on ⌘K, select, backdrop click and `Esc`. */
  onOpenChange?: (open: boolean) => void;
  /** Grouped commands. Empty groups should be filtered out by the caller. */
  groups: CommandGroup[];
  /** Search input placeholder. Default `Search…`. */
  placeholder?: string;
  /** Shown when nothing matches the query. Default `No results.`. */
  emptyMessage?: string;
  /** Bind global ⌘K / ⌃K to toggle open. Default true. */
  shortcut?: boolean;
}

// The Base UI Autocomplete filters on the string each item maps to.
const itemToStringValue = (item: CommandItem) =>
  [item.label, ...(item.keywords ?? [])].join(' ');

/**
 * **CommandMenu** — a ⌘K command palette. Base UI Dialog (scrim, focus trap,
 * `Esc`) hosts an always-open Autocomplete with built-in filtering. Rows and
 * headings reuse the shared `overlay` vocabulary, so it matches Menu/Select; the
 * surface mirrors `overlay.panel`. Props-driven (controlled), like Modal, and
 * owns the global ⌘K / ⌃K shortcut unless `shortcut={false}`.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <CommandMenu
 *   open={open}
 *   onOpenChange={setOpen}
 *   groups={[
 *     {
 *       heading: 'Navigation',
 *       items: [
 *         { id: 'home', label: 'Go home', icon: Home, onSelect: () => router.push('/') },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
export function CommandMenu({
  open,
  onOpenChange,
  groups,
  placeholder = 'Search…',
  emptyMessage = 'No results.',
  shortcut = true,
}: CommandMenuProps) {
  // Global ⌘K (⌃K on Win/Linux) → toggle open. Same shape as SearchInput.
  useEffect(() => {
    if (!shortcut) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        onOpenChange?.(!open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shortcut, open, onOpenChange]);

  const select = (item: CommandItem) => {
    item.onSelect();
    onOpenChange?.(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(next) => onOpenChange?.(next)}>
      <Dialog.Portal>
        <Dialog.Backdrop {...stylex.props(s.backdrop.base)} />
        <Dialog.Popup
          {...stylex.props(s.popup.base)}
          aria-label="Command menu"
          // The always-open Autocomplete swallows Escape for its own (no-op) close,
          // so the Dialog never sees it. Catch Escape in the CAPTURE phase — before
          // the input's handler runs — and close the palette ourselves.
          onKeyDownCapture={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation();
              onOpenChange?.(false);
            }
          }}
        >
          <Autocomplete.Root
            items={groups}
            open
            autoHighlight
            itemToStringValue={itemToStringValue}
          >
            <div {...stylex.props(s.searchRow.base)}>
              <span aria-hidden {...stylex.props(s.searchIcon.base)}>
                <Search size={iconSize.lg} aria-hidden />
              </span>
              <Autocomplete.Input
                placeholder={placeholder}
                {...stylex.props(s.input.base)}
              />
            </div>

            <Autocomplete.List {...stylex.props(s.list.base)}>
              {(group: CommandGroup) => (
                <Autocomplete.Group key={group.heading} items={group.items}>
                  <Autocomplete.GroupLabel
                    {...stylex.props(overlay.groupLabel.base)}
                  >
                    {group.heading}
                  </Autocomplete.GroupLabel>
                  <Autocomplete.Collection>
                    {(item: CommandItem) => (
                      <Autocomplete.Item
                        key={item.id}
                        value={item}
                        onClick={() => select(item)}
                        {...stylex.props(overlay.item.base)}
                      >
                        {item.icon && (
                          <span
                            aria-hidden
                            {...stylex.props(overlay.slot.base)}
                          >
                            {createElement(item.icon, {
                              size: iconSize.lg,
                              'aria-hidden': true,
                            })}
                          </span>
                        )}
                        <span {...stylex.props(overlay.label.base)}>
                          {item.label}
                        </span>
                      </Autocomplete.Item>
                    )}
                  </Autocomplete.Collection>
                </Autocomplete.Group>
              )}
            </Autocomplete.List>

            <Autocomplete.Empty {...stylex.props(s.empty.base)}>
              {emptyMessage}
            </Autocomplete.Empty>
          </Autocomplete.Root>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
