import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
// @ts-expect-error — local ESM plugin, no type declarations needed
import { stylexVite } from './vite-stylex.mjs';

// `storybook` runs with cwd = ken/ (via `pnpm --filter @ken/react`), so the
// monorepo root is one level up. StyleX's rootDir is pinned there for stable
// token var names.
const repoRoot = path.resolve(process.cwd(), '..');

const config: StorybookConfig = {
  framework: { name: '@storybook/react-vite', options: {} },
  stories: ['../components/**/*.stories.@(tsx|ts)'],
  addons: [],
  // Serve the Lausanne font file to the server root so the MANAGER document
  // (separate from the preview iframe — it never sees fonts.css) can load it.
  // Absolute path is unambiguous regardless of config-dir-relative resolution;
  // process.cwd() is ken/ at storybook runtime.
  staticDirs: [
    { from: path.resolve(process.cwd(), 'fonts'), to: '/fonts' },
    // Serve the Storybook favicon set (dark-bg/lime swoosh — the inverse of the
    // playground's lime-bg mark) at the manager root so the <link>s below resolve.
    { from: path.resolve(process.cwd(), '.storybook/favicon'), to: '/favicon' },
  ],
  // Inject the chrome's @font-face (the theme's fontBase references "Lausanne")
  // plus the favicon links — Storybook's manager <head> has no favicon by default.
  managerHead: (head) => `${head}
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
    <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/favicon/site.webmanifest" />
    <style>
      @font-face {
        font-family: 'Lausanne';
        src:
          url('/fonts/Lausanne-Regular.woff2') format('woff2'),
          url('/fonts/Lausanne-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      /* lime underline on the active canvas/addon tab (cosmetic accent) */
      [role='tablist'] button[aria-selected='true'] {
        box-shadow: inset 0 -2px 0 #e4f222; /* lime — accentDefault */
      }
    </style>
    <script>
      // Pin the browser-tab title. Storybook hardcodes "\${story} ⋅ Storybook"
      // and re-sets document.title (via Helmet) on every navigation, so a static
      // <title> won't stick — a guarded observer re-applies our brand each time.
      (function () {
        var DOC_TITLE = 'Ken Design System';
        function pin() { if (document.title !== DOC_TITLE) document.title = DOC_TITLE; }
        pin();
        new MutationObserver(pin).observe(
          document.querySelector('title') || document.head,
          { childList: true, characterData: true, subtree: true }
        );
      })();
    </script>`,
  viteFinal: async (cfg) => {
    cfg.plugins = cfg.plugins ?? [];
    // Compile StyleX (official Babel plugin) in dev + build; styles self-inject
    // at runtime (see .storybook/vite-stylex.mjs).
    cfg.plugins.unshift(stylexVite({ rootDir: repoRoot }));
    // ken components use the AUTOMATIC JSX runtime (no `import React`). Our
    // pre-plugin leaves JSX for esbuild to compile, so force the automatic
    // runtime here — otherwise esbuild defaults to classic (`React.createElement`)
    // and throws "React is not defined".
    cfg.esbuild = {
      ...(typeof cfg.esbuild === 'object' && cfg.esbuild ? cfg.esbuild : {}),
      jsx: 'automatic',
      jsxImportSource: 'react',
    };
    return cfg;
  },
};

export default config;
