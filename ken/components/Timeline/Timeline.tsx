'use client';

import * as stylex from '@stylexjs/stylex';
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
} from 'react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import { Accordion } from '@base-ui-components/react/accordion';
import { ChevronRight } from 'lucide-react';
import { iconSize } from '../../theme/foundations/iconSize';
import { focusRing } from '../../theme/foundations/focusRing';
import * as s from './Timeline.styles';

// TIMELINE — a Base UI Accordion dressed as a timeline. A dotted rail of dots runs
// down the left; each row is a collapsible step. While the whole timeline is `loading`
// the last (CURRENT) step is emphasised — its dot turns obsidian and bounces like a
// ball, its title goes from muted to primary. Once loading ends there is no "current"
// step: every dot + title reads as muted history (opening a step still highlights it).
// A step with no `children` has no panel to reveal, so it drops its chevron and isn't
// expandable. Compound + co-located styles, like Table/Card.
//
// Why child-walking (Breadcrumb's pattern) instead of Base UI's per-item index: the
// rail's look depends on an item's POSITION — muted vs current dot, where the line
// starts/ends, which dot bounces. The Root enumerates its Item children and injects
// `index`/`count`; each Item derives `isFirst`/`isLast` from them.

interface TimelineContextValue {
  /** The whole timeline is working — the current (last) dot bounces + its step goes in-progress. */
  loading: boolean;
}
const TimelineContext = createContext<TimelineContextValue>({ loading: false });

// Internal props the Root injects into each Item — not part of the public API.
interface InjectedItemProps {
  index?: number;
  count?: number;
}

export interface TimelineProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'className' | 'style' | 'defaultValue'
  > {
  /** The `Timeline.Item` steps, in order. */
  children?: ReactNode;
  /**
   * The whole timeline is working. The current (last) dot bounces like a ball and
   * that step reads as in-progress. Default `false`.
   */
  loading?: boolean;
  /** Controlled open values (Base UI). */
  value?: (string | number)[];
  /** Uncontrolled initial open values (Base UI). */
  defaultValue?: (string | number)[];
  /** Open/close callback (Base UI). */
  onValueChange?: (value: (string | number)[]) => void;
  /**
   * Whether multiple steps can be open at once. Default `true` — steps are
   * independent (one dot per step, open them in any combination).
   */
  multiple?: boolean;
  /** Disable the whole timeline. */
  disabled?: boolean;
}

const TimelineRoot = forwardRef<HTMLDivElement, TimelineProps>(
  function Timeline(
    {
      children,
      loading = false,
      multiple = true,
      value,
      defaultValue,
      onValueChange,
      disabled,
      ...rest
    },
    ref,
  ) {
    const items = Children.toArray(children).filter(
      isValidElement,
    ) as ReactElement<InjectedItemProps>[];
    const count = items.length;

    return (
      <TimelineContext.Provider value={{ loading }}>
        <Accordion.Root
          ref={ref}
          multiple={multiple}
          value={value}
          defaultValue={defaultValue}
          onValueChange={
            onValueChange
              ? (next) => onValueChange(next as (string | number)[])
              : undefined
          }
          disabled={disabled}
          {...rest}
          {...stylex.props(s.root.base)}
        >
          {items.map((item, index) => cloneElement(item, { index, count }))}
        </Accordion.Root>
      </TimelineContext.Provider>
    );
  },
);

export interface TimelineItemProps {
  /** The step label — the accordion trigger. */
  title: ReactNode;
  /** The panel body, revealed when the step is open. Usually text. */
  children?: ReactNode;
  /** A stable identity for controlled open state. Defaults to the step's index. */
  value?: string | number;
  /** Disable just this step. */
  disabled?: boolean;
}

/**
 * **Timeline.Item** — one step on the rail. With `children` it's a collapsible
 * accordion row (chevron + revealable panel); without, a plain non-expandable
 * label. The trailing item is the "current" step the timeline emphasises while
 * loading.
 */
const TimelineItem = forwardRef<
  HTMLDivElement,
  TimelineItemProps & InjectedItemProps
>(function TimelineItem(
  { title, children, value, disabled, index = 0, count = 1 },
  ref,
) {
  const { loading } = useContext(TimelineContext);
  const isFirst = index === 0;
  const isLast = index === count - 1;
  const isCurrent = isLast; // the last step is the current one
  const inProgress = loading && isLast;
  // The "current" emphasis (obsidian dot + primary title) is an in-progress signal:
  // it only reads while the timeline is loading. Done → no current step, all muted.
  const emphasized = isCurrent && loading;
  // No panel body → nothing to reveal → not an accordion (no chevron, no toggle).
  const expandable = Children.count(children) > 0;

  // The connecting line: full-height by default; clipped to the dot on the ends so
  // the run is continuous from the first dot's centre to the last's. A lone item
  // (first AND last) has no neighbour to connect to — skip it.
  const showLine = !(isFirst && isLast);

  return (
    <Accordion.Item
      ref={ref}
      value={value ?? index}
      disabled={disabled}
      {...stylex.props(s.item.base)}
    >
      <div {...stylex.props(s.rail.base)}>
        {showLine && (
          <span
            aria-hidden
            {...stylex.props(
              s.line.base,
              isFirst && s.line.fromDot,
              isLast && s.line.toDot,
            )}
          />
        )}
        <div {...stylex.props(s.dotStage.base)}>
          <span
            aria-hidden
            {...stylex.props(
              s.dot.base,
              emphasized ? s.dot.current : s.dot.muted,
              inProgress && s.dot.bounce,
            )}
          />
        </div>
      </div>

      <div {...stylex.props(s.content.base)}>
        <Accordion.Header {...stylex.props(s.header.base)}>
          {expandable ? (
            <Accordion.Trigger
              {...stylex.props(s.trigger.base, focusRing.ring)}
              render={(triggerProps, state) => {
                // Primary title when this step is open, or it's the current step mid-load.
                const active = emphasized || state.open;
                return (
                  <button type="button" {...triggerProps}>
                    <span
                      {...stylex.props(
                        s.title.base,
                        active ? s.title.active : s.title.muted,
                      )}
                    >
                      {title}
                    </span>
                    <ChevronRight
                      size={iconSize.sm}
                      aria-hidden
                      {...stylex.props(
                        s.chevron.base,
                        state.open && s.chevron.open,
                      )}
                    />
                  </button>
                );
              }}
            />
          ) : (
            // No panel body — a plain, non-interactive label in the header band (no chevron).
            <div {...stylex.props(s.trigger.base, s.trigger.static)}>
              <span
                {...stylex.props(
                  s.title.base,
                  emphasized ? s.title.active : s.title.muted,
                )}
              >
                {title}
              </span>
            </div>
          )}
        </Accordion.Header>
        {expandable && (
          <Accordion.Panel {...stylex.props(s.panel.base)}>
            <div {...stylex.props(s.panelInner.base)}>{children}</div>
          </Accordion.Panel>
        )}
      </div>
    </Accordion.Item>
  );
});

TimelineRoot.displayName = 'Timeline';
TimelineItem.displayName = 'Timeline.Item';

/**
 * **Timeline** — a vertical list of steps on a dotted rail, built on Base UI
 * Accordion. Each step is a collapsible `Timeline.Item`: one with `children`
 * reveals a panel, one without is a plain label. While `loading`, the last
 * (current) step is emphasised — its dot turns obsidian and bounces like a ball.
 * Multiple steps open at once by default (`multiple`).
 *
 * @example
 * ```tsx
 * <Timeline loading>
 *   <Timeline.Item title="Invoice received">Parsed 3 line items.</Timeline.Item>
 *   <Timeline.Item title="Approval requested">Sent to Dana.</Timeline.Item>
 *   <Timeline.Item title="Awaiting payment" />
 * </Timeline>
 * ```
 */
export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
});
