'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Home,
  CircleDashed,
  MoreHorizontal,
  Plus,
  Component,
  Palette,
} from 'lucide-react';
import { COMPONENTS } from '@/generated/components.manifest';
import { FOUNDATIONS } from '@/lib/docs/foundations';
import {
  Box,
  Text,
  Separator,
  Logo,
  LinkButton,
  StackLogo,
  CommandMenu,
} from '@ken/react';
import type { CommandGroup } from '@ken/react';
import { space, layout } from '@ken/react/theme/tokens/space.stylex';
import { NavLink } from './components/NavLink';
import { NavGroupTitle } from './components/NavGroupTitle';
import { SidebarUser } from './components/SidebarUser';
import { SearchNavItem } from './components/SearchNavItem';
import { SidebarChatsSkeleton } from '@/components/skeletons/SidebarChatsSkeleton';
import { useChat } from '@/hooks/useChat';

type NavItem = { label: string; href: string; icon: React.ElementType };

/**
 * Sidebar navigation — icon + label + destination. Add an entry to extend the
 * rail; each renders as a NavLink (left-aligned icon+label, hover + active-route
 * states) wrapping a Next `<Link>`.
 */
const NAV: NavItem[] = [{ label: 'Home', href: '/', icon: Home }];

/** How many recent chats the rail shows inline before collapsing the rest behind
 *  a "See more" link to the full `/chats` history page. */
const MAX_CHAT_DISPLAY = 2;

/**
 * Sidebar — the app shell's left rail (Ramp mark + shared nav + conversation
 * list + footer user), extracted from AppWrapper so it can be iterated on in
 * isolation. Stretches full height; composed entirely from Ken primitives. The
 * conversation list always renders below the shared nav (ChatProvider is mounted
 * at the root), so chats are present on every page — not just the AI builder.
 */
export function Sidebar() {
  const { conversations, conversationsLoading } = useChat();
  const router = useRouter();
  const [commandOpen, setCommandOpen] = React.useState(false);

  const go = (href: string) => () => router.push(href);

  const commandGroups: CommandGroup[] = [
    {
      heading: 'Navigation',
      items: NAV.map((n) => ({
        id: n.href,
        label: n.label,
        icon: n.icon,
        onSelect: go(n.href),
      })),
    },
    {
      heading: 'Components',
      items: COMPONENTS.map((c) => ({
        id: `/components/${c.slug}`,
        label: c.title,
        icon: Component,
        onSelect: go(`/components/${c.slug}`),
      })),
    },
    {
      heading: 'Foundations',
      items: FOUNDATIONS.map((f) => ({
        id: `/foundations/${f.slug}`,
        label: f.title,
        icon: Palette,
        onSelect: go(`/foundations/${f.slug}`),
      })),
    },
    {
      heading: 'Chats',
      items: conversations.map((c) => ({
        id: c.id,
        label: c.title,
        icon: CircleDashed,
        onSelect: go(`/ai-builder/${c.id}`),
      })),
    },
    {
      heading: 'Actions',
      items: [
        {
          id: 'new-chat',
          label: 'New Chat',
          icon: Plus,
          onSelect: go('/ai-builder'),
        },
      ],
    },
  ].filter((g) => g.items.length > 0);

  return (
    <Box
      as="aside"
      direction="column"
      flex="none"
      width={layout.sidebarWidth}
      py="space2"
      // Pin the rail to the viewport so it stays put while the content card
      // scrolls, and bound its height (viewport minus the shell's space2 top+
      // bottom inset) so the middle nav can scroll internally instead of growing
      // the page. `top` matches the shell padding so the stuck rail stays aligned.
      position="sticky"
      top="space2"
      height={`calc(100dvh - ${space.space2} * 2)`}
    >
      <Box direction="column" gap="space4">
        <Box align="center" minHeight="space8" pl="space4">
          <Link href="/" aria-label="Home">
            <Logo size="xs" />
          </Link>
        </Box>
        <LinkButton
          fullWidth
          size="sm"
          prefix={<StackLogo size="xxs" aria-hidden />}
          render={<Link href="/ai-builder" />}
        >
          New Chat
        </LinkButton>

        <Separator tone="subtle" />
      </Box>
      {/* Scrollable middle — nav + chats + foundations + components grow to fill
          the space between the pinned header and footer, scrolling on overflow
          (`minHeight: 0` lets the flex child shrink below its content height). */}
      <Box
        direction="column"
        gap="space4"
        flex="1"
        minHeight={0}
        overflowY="auto"
        hideScrollbar
        py="space4"
      >
        {/* Shared navbar — identical on every page. `shrink={false}` on each group
            (here and below) is load-bearing: Box's base sets `min-height: 0`, so
            without it these flex children would compress below their content height
            and overlap instead of letting this column overflow → scroll. */}
        <Box as="nav" direction="column" gap="space1" shrink={false}>
          <SearchNavItem onClick={() => setCommandOpen(true)} />
          {NAV.map(({ label, href, icon }) => (
            <NavLink key={href} href={href} icon={icon}>
              {label}
            </NavLink>
          ))}
        </Box>
        <Box direction="column" gap="space1" shrink={false}>
          <NavGroupTitle>Chats</NavGroupTitle>
          {conversationsLoading ? (
            <SidebarChatsSkeleton />
          ) : conversations.length === 0 ? (
            <Box px="space3" py="space2">
              <Text size="footnote" tone="tertiary">
                No conversations created yet
              </Text>
            </Box>
          ) : (
            <Box as="nav" direction="column" gap="space1">
              {conversations.slice(0, MAX_CHAT_DISPLAY).map((c) => (
                <NavLink
                  key={c.id}
                  href={`/ai-builder/${c.id}`}
                  icon={CircleDashed}
                >
                  {c.title}
                </NavLink>
              ))}
              {conversations.length > MAX_CHAT_DISPLAY && (
                <NavLink href="/chats" icon={MoreHorizontal}>
                  See more
                </NavLink>
              )}
            </Box>
          )}
        </Box>
        <Separator orientation="horizontal" tone="subtle" />
        <Box direction="column" gap="space1" shrink={false}>
          <NavGroupTitle>Foundations</NavGroupTitle>
          <Box as="nav" direction="column" gap="space1">
            {FOUNDATIONS.map((f) => (
              <NavLink key={f.slug} href={`/foundations/${f.slug}`}>
                {f.title}
              </NavLink>
            ))}
          </Box>
        </Box>
        <Separator orientation="horizontal" tone="subtle" />
        <Box direction="column" gap="space1" shrink={false}>
          <NavGroupTitle>Components</NavGroupTitle>
          <Box as="nav" direction="column" gap="space1">
            {COMPONENTS.map((c) => (
              <NavLink key={c.slug} href={`/components/${c.slug}`}>
                {c.title}
              </NavLink>
            ))}
          </Box>
        </Box>
      </Box>
      <Box direction="column" gap="space4">
        <Box direction="column" gap="space4">
          <Separator tone="subtle" />
          <SidebarUser />
        </Box>
      </Box>

      <CommandMenu
        open={commandOpen}
        onOpenChange={setCommandOpen}
        groups={commandGroups}
      />
    </Box>
  );
}
