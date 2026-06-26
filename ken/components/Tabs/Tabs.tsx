'use client';

import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { Ref } from 'react';
import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import { focusRing } from '../../theme/foundations/focusRing';
import { list, panel, pipe, tab } from './Tabs.styles';

// Built on Base UI's headless Tabs (Root/List/Tab/Indicator/Panel), like the
// rest of the library. Ken owns the styling, so every part drops Base UI's
// `className`/`render` from its public API. The indicator (the sliding "pipe")
// is rendered INSIDE our `Tabs.List` automatically — a consumer can never forget
// it, and never styles it (no escape hatch). Controlled (`value`/`onValueChange`)
// and uncontrolled (`defaultValue`) both come straight from Base UI.

/** Root — groups the list + panels and owns the active value. */
export type TabsProps = Omit<BaseTabs.Root.Props, 'className' | 'render'>;
/** The tab strip. Renders the equal-width tabs + the underline pipe. */
export type TabsListProps = Omit<BaseTabs.List.Props, 'className' | 'render'>;
/** A single tab button. `value` ties it to its `Tabs.Panel`. */
export type TabsTabProps = Omit<BaseTabs.Tab.Props, 'className' | 'render'>;
/** Content shown when the matching tab is active. Optional (nav-only tabs). */
export type TabsPanelProps = Omit<BaseTabs.Panel.Props, 'className' | 'render'>;

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  function Tabs(props, ref) {
    return <BaseTabs.Root ref={ref} {...props} />;
  },
);

/**
 * **Tabs.List** — the tab strip. Wraps the `Tabs.Tab` buttons and auto-renders
 * the sliding underline indicator (no escape hatch — you never style it).
 */
const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { children, ...rest },
  ref,
) {
  return (
    <BaseTabs.List ref={ref} {...rest} {...stylex.props(list.base)}>
      {children}
      <BaseTabs.Indicator {...stylex.props(pipe.base)} />
    </BaseTabs.List>
  );
});

/**
 * **Tabs.Tab** — a single tab button. Its `value` ties it to the matching
 * `Tabs.Panel`.
 */
const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(function TabsTab(
  { children, ...rest },
  ref,
) {
  return (
    // Base UI's Tab is a native <button>, so `:disabled`/`:focus-visible` fire
    // and the focus ring is the shared treatment. Base UI types the ref as
    // `Element`; cast to satisfy it.
    <BaseTabs.Tab
      ref={ref as Ref<Element>}
      {...rest}
      {...stylex.props(tab.base, focusRing.ring)}
    >
      {children}
    </BaseTabs.Tab>
  );
});

/**
 * **Tabs.Panel** — the content shown when its `value` is the active tab. Optional
 * — omit it for nav-only tabs.
 */
const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { children, ...rest },
  ref,
) {
  return (
    <BaseTabs.Panel
      ref={ref}
      {...rest}
      {...stylex.props(panel.base, focusRing.ring)}
    >
      {children}
    </BaseTabs.Panel>
  );
});

TabsRoot.displayName = 'Tabs';
TabsList.displayName = 'Tabs.List';
TabsTab.displayName = 'Tabs.Tab';
TabsPanel.displayName = 'Tabs.Panel';

/**
 * **Tabs** — a tabbed view switcher, built on Base UI Tabs (roving focus, arrow
 * keys, a11y). Compound: `Tabs.List` holds the `Tabs.Tab` buttons and renders the
 * sliding underline pipe for you; each `Tabs.Tab` `value` is matched by a
 * `Tabs.Panel` `value`. Controlled (`value` / `onValueChange`) or uncontrolled
 * (`defaultValue`).
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <Tabs.List>
 *     <Tabs.Tab value="overview">Overview</Tabs.Tab>
 *     <Tabs.Tab value="activity">Activity</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panel value="overview">…</Tabs.Panel>
 *   <Tabs.Panel value="activity">…</Tabs.Panel>
 * </Tabs>
 * ```
 */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
});
