import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ElementType, Ref } from 'react';
import { renderPoly } from '../../lib/renderPoly';
import { Highlight } from 'prism-react-renderer';
import { CopyButton } from '../CopyButton';
import { kenPrismTheme } from './kenPrismTheme';
import { styles } from './CodePreview.styles';

export type CodeLanguage = 'tsx' | 'jsx' | 'ts' | 'js' | 'css' | 'bash';

export interface CodePreviewProps {
  /** The source to render. Leading/trailing blank lines are trimmed. */
  code: string;
  /** Prism grammar. Default 'tsx'. */
  language?: CodeLanguage;
  /** Draw the surface border + radius. Default true; Showcase passes false. */
  bordered?: boolean;
  /** Show the copy-to-clipboard button (top-right). Default true. */
  showCopy?: boolean;
  /** The element the wrapper renders as. Default `div`. */
  as?: ElementType;
}

/**
 * **CodePreview** — a Prism-highlighted source block painted in Ken's own theme,
 * with a copy-to-clipboard button (Ken's `CopyButton`) in the top-right. A
 * playground/docs-presentation component, not part of the Ken library; `Showcase`
 * embeds it borderless for its reveal-code panel.
 *
 * @example
 * ```tsx
 * <CodePreview code={`const x = 1;`} language="ts" />
 * ```
 */
export const CodePreview = forwardRef<HTMLElement, CodePreviewProps>(
  function CodePreview(
    {
      code,
      language = 'tsx',
      bordered = true,
      showCopy = true,
      as = 'div',
      ...rest
    },
    ref,
  ) {
    const trimmed = code.trim();

    return renderPoly({
      as,
      ref: ref as Ref<HTMLElement>,
      props: {
        ...rest,
        ...stylex.props(styles.root),
        children: (
          <>
            <pre {...stylex.props(styles.pre, bordered && styles.bordered)}>
              <Highlight
                code={trimmed}
                language={language}
                theme={kenPrismTheme}
              >
                {({ tokens, getTokenProps }) => (
                  <>
                    {tokens.map((line, i) => (
                      <span key={i} {...stylex.props(styles.line)}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </span>
                    ))}
                  </>
                )}
              </Highlight>
            </pre>
            {/* Copy affordance is Ken's own CopyButton — it owns the clipboard
              write + the copy→check confirm swap. We just hand it the source. */}
            {showCopy && (
              <span {...stylex.props(styles.copy)}>
                <CopyButton
                  value={trimmed}
                  variant="ghost"
                  size="sm"
                  aria-label="Copy code"
                />
              </span>
            )}
          </>
        ),
      },
    });
  },
);
