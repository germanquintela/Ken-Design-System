'use client';

import * as stylex from '@stylexjs/stylex';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { CircleDashed, MessageSquareDashed } from 'lucide-react';
import { Box, SearchInput, Separator, Text } from '@ken/react';
import { color } from '@ken/react/theme/tokens/color.stylex';
import { space } from '@ken/react/theme/tokens/space.stylex';
import { radius } from '@ken/react/theme/tokens/radius.stylex';
import { useChat } from '@/hooks/useChat';
import { AppWrapper } from '@/components/AppWrapper';

/** The `/chats` screen: full chat history (title + date), one navigable row per
 *  conversation — the "See more" target behind the sidebar's collapsed list.
 *  App-level row styling (hover/active) mirrors NavLink; relies on ChatProvider
 *  being mounted at the root layout. */

// Stable, locale-aware date (e.g. "Jun 25, 2026"). Fixed locale so SSR and the
// client agree (avoids a hydration mismatch on the user's machine locale).
const DATE_FMT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : DATE_FMT.format(d);
}

const styles = stylex.create({
  // Resting + hover own color/background together (single owner per key).
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: space.space3,
    width: '100%',
    paddingInline: space.space2,
    paddingBlock: space.space3,
    borderRadius: radius.nav,
    textDecoration: 'none',
    cursor: 'pointer',
    color: { default: color.textSecondary, ':hover': color.textPrimary },
    backgroundColor: {
      default: 'transparent',
      ':hover': color.backgroundHover,
    },
    transitionProperty: 'color, background-color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease',
  },
  icon: { flexShrink: 0 },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.space3,
    paddingBlock: space.space24,
    textAlign: 'center',
  },
  emptyIcon: { color: color.textMuted },
});

export function Chats() {
  const { conversations } = useChat();
  const pathname = usePathname();
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      trimmed
        ? conversations.filter((c) => c.title.toLowerCase().includes(trimmed))
        : conversations,
    [conversations, trimmed],
  );

  return (
    <AppWrapper title="Chats">
      <Box direction="column" gap="space4" width="full">
        <SearchInput
          placeholder="Search chats by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search chats by name"
          shortcut={false}
        />

        {filtered.length === 0 ? (
          <div {...stylex.props(styles.empty)}>
            <MessageSquareDashed
              size={32}
              aria-hidden
              {...stylex.props(styles.emptyIcon)}
            />
            <Box direction="column" gap="space1" align="center">
              <Text size="caption" tone="primary">
                {trimmed ? 'No chats match your search' : 'No chats yet'}
              </Text>
              <Text size="footnote" tone="secondary">
                {trimmed
                  ? `Nothing found for “${query.trim()}”.`
                  : 'Your conversations will show up here.'}
              </Text>
            </Box>
          </div>
        ) : (
          <Box direction="column">
            {filtered.map((c, i) => {
              const href = `/ai-builder/${c.id}`;
              const active = pathname === href;
              return (
                <div key={c.id}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    {...stylex.props(styles.row)}
                  >
                    <CircleDashed
                      size={14}
                      aria-hidden
                      {...stylex.props(styles.icon)}
                    />
                    <Box grow minWidth={0}>
                      <Text tone="secondary" size="caption" truncate>
                        {c.title}
                      </Text>
                    </Box>
                    <Text size="footnote" tone="secondary">
                      {formatDate(c.created_at)}
                    </Text>
                  </Link>
                  {i < filtered.length - 1 && <Separator tone="subtle" />}
                </div>
              );
            })}
          </Box>
        )}
      </Box>
    </AppWrapper>
  );
}
