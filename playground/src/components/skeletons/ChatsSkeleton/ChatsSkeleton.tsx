import * as stylex from '@stylexjs/stylex';
import { Box, Card, Separator, Text } from '@ken/react';
import { shell } from '@/components/AppWrapper/AppWrapper.styles';
import { Bar } from '../Bar';
import { SidebarSkeleton } from '../SidebarSkeleton';
import * as s from '../skeletons.styles';

// One conversation row of the /chats list: a dotted icon, a grow title that
// truncates, and a trailing date — at the live row's gap/inset (Chats.tsx `row`:
// gap space3, paddingInline space2, paddingBlock space3). `w` varies the title width.
function ChatRow({ w }: { w: keyof typeof s.labelW }) {
  return (
    <Box align="center" gap="space3" px="space2" py="space3">
      <Bar shape={[s.shape.chatDot]} />
      <Box grow minWidth={0}>
        <Bar shape={[s.shape.label, s.labelW[w]]} />
      </Box>
      <Bar shape={[s.shape.metaLine]} />
    </Box>
  );
}

const CHAT_ROWS: Array<keyof typeof s.labelW> = [
  'w70',
  'w45',
  'w80',
  'w55',
  'w65',
  'w50',
  'w75',
  'w60',
];

/**
 * Chats fallback (`app/chats/loading.tsx`). The `/chats` screen is the full-shell
 * AppWrapper (sidebar + a titled Card) holding a SearchInput over a divider-
 * separated list of conversation rows (icon · title · date). This mirrors that
 * exactly so the swap to the live history doesn't jump — without it `/chats` would
 * inherit the root docs skeleton (breadcrumb → hero → sections), nothing like it.
 *
 * Re-uses the real shell background + Ken Card, and renders the real "Chats" title
 * (static, so zero drift) inside a real Card.Header — matching AppWrapper(title="Chats").
 */
export function ChatsSkeleton() {
  return (
    <div
      role="status"
      aria-busy
      aria-label="Loading"
      {...stylex.props(shell.base)}
    >
      <SidebarSkeleton />

      <Box flex="1" minWidth={0}>
        <Card border="subtle" width="full">
          <Card.Header>
            <Box px="space4" py="space3">
              <Text as="h1" size="body">
                Chats
              </Text>
            </Box>
          </Card.Header>

          <Box
            display="block"
            flex="1"
            overflowY="auto"
            hideScrollbar
            p="space4"
          >
            <Box direction="column" gap="space4" width="full">
              <Bar shape={[s.shape.searchField]} />

              <Box direction="column">
                {CHAT_ROWS.map((w, i) => (
                  <div key={`${w}-${i}`}>
                    <ChatRow w={w} />
                    {i < CHAT_ROWS.length - 1 && <Separator tone="subtle" />}
                  </div>
                ))}
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
