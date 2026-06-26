import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes, ReactNode, Ref } from 'react';
import { renderPoly } from '../../lib/renderPoly';
import { Text } from '../Text';
import * as s from './UserMessage.styles';

// `className`/`style` are intentionally removed — no escape hatch; the surface,
// alignment and width all come from typed, token-bound styles (same contract as
// Box/Text/Badge).
type NativeDiv = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'>;

export interface UserMessageProps extends NativeDiv {
  /** The element the message renders as. Default `div` — pass `li`, `article`… */
  as?: ElementType;
  /** The message body. Wraps and right-aligns inside the bubble. */
  children: ReactNode;
  /** Pre-formatted date shown beneath the bubble, e.g. `"Jun 23"`. The DS does
   *  no locale formatting — pass the string you want to display. */
  date?: string;
  /** Pre-formatted time shown beneath the bubble, e.g. `"2:45 PM"`. Joined to
   *  `date` with a middot when both are present. */
  time?: string;
}

/**
 * **UserMessage** — a single outgoing (user) chat message: a right-hugging
 * bubble — background surface fill, 18px bubble radius, right-aligned body text,
 * capped at 300px — with the date · time as a muted footnote OUTSIDE the bubble.
 *
 * Display-only composition, so (like Card/Badge/Text) it uses `renderPoly`:
 * keeps the polymorphic `as`, the forwarded ref and the no-raw-element rule
 * without pulling in any interactive behaviour. The meta
 * line reuses the Text primitive; the 14px message body styles in
 * UserMessage.styles.ts (Text omits the control-only 14px `label` size).
 *
 * @example
 * ```tsx
 * <UserMessage date="Jun 23" time="2:45 PM">
 *   Can you summarize this invoice?
 * </UserMessage>
 * ```
 */
export const UserMessage = forwardRef<HTMLElement, UserMessageProps>(
  function UserMessage({ as = 'div', children, date, time, ...rest }, ref) {
    // date · time — only the parts provided, joined by a middot when both exist.
    const stamp = [date, time].filter(Boolean).join(' · ');

    return renderPoly({
      as,
      ref: ref as Ref<HTMLElement>,
      props: {
        ...rest,
        ...stylex.props(s.root.base),
        children: (
          <>
            <div {...stylex.props(s.bubble.base)}>
              <p {...stylex.props(s.message.base)}>{children}</p>
            </div>
            {stamp && (
              <Text as="span" size="footnote" tone="tertiary">
                {stamp}
              </Text>
            )}
          </>
        ),
      },
    });
  },
);
