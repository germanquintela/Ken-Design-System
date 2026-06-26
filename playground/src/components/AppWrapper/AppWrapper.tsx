import type * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { Box, Card, Text } from '@ken/react';
import { Sidebar } from '../Sidebar';
import * as s from './AppWrapper.styles';

/**
 * AppWrapper — the playground's app shell (Figma 66:824). A limestone page holds a
 * fixed 240px sidebar (Ramp mark + nav) on the left and a white floating Card on the
 * right whose header carries the page `title`; `children` fill the card body. Composed
 * entirely from Ken primitives (Box / Card / Logo / Separator / LinkButton) — the only
 * app-layer style is the shell background, which Ken's Box intentionally cannot paint.
 */
export function AppWrapper({
  title,
  children,
  contentFill = false,
}: {
  title?: string;
  children: React.ReactNode;
  /** Let the children own the full card height (panes scroll internally) instead of the padded body. */
  contentFill?: boolean;
}) {
  return (
    <div
      data-app-shell
      {...stylex.props(s.shell.base, contentFill && s.shell.fill)}
    >
      <Sidebar />

      <Box flex="1" minWidth={0}>
        <Card width="full">
          {title && (
            <Card.Header>
              <Box px="space4" py="space3">
                <Text as="h1" size="body">
                  <span {...stylex.props(s.title.base)}>{title}</span>
                </Text>
              </Box>
            </Card.Header>
          )}
          {contentFill ? (
            // Direct flex:1 child of the (flex-column, full-height) Card — fills the
            // space below the header without needing to style Ken's Card.Body.
            <div {...stylex.props(s.fill.body)}>{children}</div>
          ) : (
            // Flex:1 child of the full-height Card column — grows below the header
            // and scrolls internally, with the scrollbar hidden (Box.base pins
            // min-height:0 so it can shrink instead of blowing out the track).
            // display="block" is load-bearing: Box defaults to flex-row, which
            // would stretch the doc content to the bounded height (align-items:
            // stretch) and squash it instead of letting it flow + scroll.
            <Box
              display="block"
              flex="1"
              overflowY="auto"
              hideScrollbar
              p="space4"
            >
              {children}
            </Box>
          )}
        </Card>
      </Box>
    </div>
  );
}
