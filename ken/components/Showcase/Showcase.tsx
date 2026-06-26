'use client';
import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { Collapsible } from '@base-ui-components/react/collapsible';
import { ChevronDown } from 'lucide-react';
import { Text } from '../Text';
import { iconSize } from '../../theme/foundations/iconSize';
import { CodePreview, type CodeLanguage } from '../CodePreview';
import { styles } from './Showcase.styles';

export interface ShowcaseProps {
  /** The live example, rendered centered in the preview area. */
  children: React.ReactNode;
  /** The source string revealed when the code is expanded. */
  code: string;
  /** Prism grammar forwarded to CodePreview. Default 'tsx'. */
  language?: CodeLanguage;
  /** Start with the code expanded. Default false. */
  defaultOpen?: boolean;
}

/**
 * **Showcase** — the Geist-style preview-with-reveal-code box for the docs site:
 * renders a live example centered in a card above a "Show / Hide code" trigger
 * (Base UI `Collapsible`) that expands to reveal the source via `CodePreview`.
 * A playground/docs-presentation component, not part of the Ken library itself.
 *
 * @example
 * ```tsx
 * <Showcase code={`<Button>Save</Button>`}>
 *   <Button>Save</Button>
 * </Showcase>
 * ```
 */
export function Showcase({
  children,
  code,
  language = 'tsx',
  defaultOpen = false,
}: ShowcaseProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      {...stylex.props(styles.card)}
    >
      <div {...stylex.props(styles.preview)}>{children}</div>

      <Collapsible.Trigger {...stylex.props(styles.footer)}>
        <Text as="span" size="caption" tone="secondary">
          {open ? 'Hide code' : 'Show code'}
        </Text>
        <span
          aria-hidden
          {...stylex.props(styles.chevron, open && styles.chevronOpen)}
        >
          <ChevronDown size={iconSize.md} />
        </span>
      </Collapsible.Trigger>

      <Collapsible.Panel {...stylex.props(styles.panel)}>
        <CodePreview code={code} language={language} bordered={false} />
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
