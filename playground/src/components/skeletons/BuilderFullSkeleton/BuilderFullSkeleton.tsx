import * as stylex from '@stylexjs/stylex';
import { Box, Card } from '@ken/react';
import { fill, shell } from '@/components/AppWrapper/AppWrapper.styles';
import { Bar } from '../Bar';
import { SidebarSkeleton } from '../SidebarSkeleton';
import { BuilderPanes } from '../BuilderPanes';
import * as s from '../skeletons.styles';

/**
 * Full-shell builder fallback (`app/(builder)/loading.tsx`). Stands in for the FIRST
 * entry into the builder from another route — when `ai-builder/layout.tsx` (the
 * AppWrapper shell) is itself still rendering, so the whole shell must be drawn. The
 * canvas-only `BuilderSkeleton` can't cover this: its boundary lives *inside* that
 * layout, so on first entry the nearest active boundary was the root `HomeSkeleton`
 * — the wrong (Home) skeleton flashing on the way into the builder.
 *
 * The `(builder)` route group puts THIS boundary ABOVE the layout — the same trick
 * `(auth)/loading.tsx` uses to override the root skeleton — so entering the builder
 * now shows a builder-shaped skeleton. Mirrors AppWrapper(contentFill, title=…):
 * sidebar + a titled Card whose fill body holds the same chat + canvas panes.
 */
export function BuilderFullSkeleton() {
  return (
    <div
      role="status"
      aria-busy
      aria-label="Loading"
      {...stylex.props(shell.base, shell.fill)}
    >
      <SidebarSkeleton />

      <Box flex="1" minWidth={0}>
        <Card width="full">
          {/* Titled header — the live title ("New chat" / a conversation name) isn't
              known at fallback time, so a placeholder bar stands in for it. */}
          <Card.Header>
            <Box px="space4" py="space3">
              <Bar shape={[s.shape.headerTitle]} />
            </Box>
          </Card.Header>

          {/* contentFill body — fills below the header (mirrors AppWrapper's fill.body),
              holding the same chat + canvas panes the live builder fills it with. */}
          <div {...stylex.props(fill.body)}>
            <Box direction="row" grow minHeight={0} height="full">
              <BuilderPanes />
            </Box>
          </div>
        </Card>
      </Box>
    </div>
  );
}
