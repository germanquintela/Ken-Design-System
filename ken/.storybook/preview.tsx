import type { Preview } from '@storybook/react';
import { kenLight } from './theme';
// StyleX rules self-inject at runtime (see .storybook/vite-stylex.mjs).
// fonts.css is the SAME file consumers import via `@ken/react/fonts.css` — it
// provides the Lausanne @font-face + --font-lausanne var; preview.css adds the
// workbench's body defaults.
import '../fonts.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    // Light-mode only by decision — single light background, no dark value.
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#ffffff' }],
    },
    // Autodocs pages render on the same Ken chrome theme (no dark docs).
    docs: { theme: kenLight },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
