import * as stylex from '@stylexjs/stylex';
import { Box } from '@ken/react';
import { block, shape, labelW } from '../skeletons.styles';

/**
 * SidebarChatsSkeleton — the Chats group's loading state in the LIVE rail (not the
 * route-transition fallback). One icon+label placeholder per inline chat slot,
 * mirroring NavLink's padding/gap (`px space3`, `py space2`, `gap space2`) so the
 * swap to the real conversation list doesn't jump. Reuses the app-level skeleton
 * blocks — same `backgroundSkeleton` fill + 1.5s pulse — so it breathes in lockstep
 * with the route fallback's SidebarSkeleton and any other on-screen Skeleton.
 *
 * Decorative: `aria-hidden` here, since the live conversation list has no busy
 * region of its own to announce.
 */

// One row per inline chat slot (matches Sidebar's MAX_CHAT_DISPLAY).
const ROWS: Array<keyof typeof labelW> = ['w70', 'w55'];

export function SidebarChatsSkeleton() {
  return (
    <Box direction="column" gap="space1" aria-hidden>
      {ROWS.map((w, i) => (
        <Box
          key={`${w}-${i}`}
          align="center"
          gap="space2"
          px="space3"
          py="space2"
        >
          <div {...stylex.props(block.base, shape.icon)} />
          <div {...stylex.props(block.base, shape.label, labelW[w])} />
        </Box>
      ))}
    </Box>
  );
}
