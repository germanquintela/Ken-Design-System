'use client';
import * as stylex from '@stylexjs/stylex';
import { Flag, ChevronRight } from 'lucide-react';
import { Box, StackLogo, Timeline, Text, ShimmerText } from '@ken/react';
import type { Observation } from '@ken/ai';
import { styles } from './AssistantTurn.styles';

export interface AssistantTurnProps {
  observations: Observation[];
  /** Conversational reply shown under the steps (streams in while building). */
  message?: string;
  /** The build is in flight — StackLogo wobbles and the last Timeline step bounces. */
  building?: boolean;
  /** The version this turn produced (null/undefined while building). */
  version?: number | null;
  /** Jump the canvas to this turn's version. */
  onJump?: () => void;
}

/**
 * Custom, app-layer "version produced" chip — intentionally hand-rolled instead
 * of Ken's Button so it can carry its own segmented layout (flag · status · rule)
 * and share one foreground tone across all three. The whole pill is one clickable
 * button; flag, label, and rule all inherit its currentColor and transition together.
 */
function VersionPill({
  version,
  onJump,
}: {
  version: number;
  onJump?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onJump}
      aria-label={`View version ${version}`}
      {...stylex.props(styles.pill)}
    >
      <Flag size={14} strokeWidth={2} aria-hidden />
      <span {...stylex.props(styles.label)}>Version {version} generated</span>
      <ChevronRight
        size={14}
        strokeWidth={2}
        aria-hidden
        {...stylex.props(styles.chevron)}
      />
    </button>
  );
}

export function AssistantTurn({
  observations,
  message,
  building = false,
  version,
  onJump,
}: AssistantTurnProps) {
  return (
    <Box align="start" direction="column" gap="space4" shrink={false}>
      <Box direction="column" gap="space1">
        <Box flex="none" pt="space1" gap="space2">
          <StackLogo size="xs" loading={building} />
          {building ? (
            <ShimmerText size="caption">Thinking…</ShimmerText>
          ) : (
            <Text size="caption" tone="secondary">
              Tought process
            </Text>
          )}
        </Box>
        <Box direction="column" gap="space2" grow minWidth={0} ml="space1">
          {observations.length > 0 && (
            <Timeline loading={building}>
              {observations.map((o, i) => (
                <Timeline.Item key={i} title={o.title}>
                  {o.detail ? (
                    <Text size="footnote" tone="secondary">
                      {o.detail}
                    </Text>
                  ) : null}
                </Timeline.Item>
              ))}
            </Timeline>
          )}
        </Box>
      </Box>
      {message ? (
        <Box flex="none" pt="space1" gap="space2" direction="column">
          <StackLogo size="xs" loading={building} />
          <Text size="caption">{building ? `${message} ▍` : message}</Text>
        </Box>
      ) : null}
      {!building && version != null && (
        <VersionPill version={version} onJump={onJump} />
      )}
    </Box>
  );
}
