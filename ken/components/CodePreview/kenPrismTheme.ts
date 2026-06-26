import type { PrismTheme } from 'prism-react-renderer';
import { color } from '../../theme/tokens/color.stylex';

/**
 * prism-react-renderer theme mapped entirely onto Ken color tokens (light-only).
 * Token values resolve to `var(--…)` strings at runtime, so they are valid as
 * prism's inline-style colors. `plain.backgroundColor` is transparent — the raw
 * `<pre>` surface (styled in CodePreview.styles) owns the background, so this
 * theme drops cleanly into any container.
 */
export const kenPrismTheme: PrismTheme = {
  plain: {
    color: color.textPrimary,
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: color.textMuted, fontStyle: 'italic' },
    },
    { types: ['punctuation'], style: { color: color.textSecondary } },
    {
      types: ['operator', 'entity', 'url'],
      style: { color: color.textSecondary },
    },
    {
      types: [
        'keyword',
        'control',
        'directive',
        'unit',
        'builtin',
        'important',
      ],
      style: { color: color.infoDefault },
    },
    {
      types: ['string', 'char', 'attr-value', 'inserted'],
      style: { color: color.successDefault },
    },
    {
      types: ['tag', 'selector', 'deleted'],
      style: { color: color.accentDefault },
    },
    {
      types: ['number', 'boolean', 'constant', 'symbol', 'regex'],
      style: { color: color.warningDefault },
    },
    {
      types: ['attr-name', 'function', 'class-name', 'property', 'variable'],
      style: { color: color.textBody },
    },
  ],
};
