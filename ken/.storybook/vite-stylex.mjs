// Minimal Vite plugin that compiles StyleX with the official @stylexjs/babel
// plugin in DEV mode with runtime injection: each module emits `stylex.inject`
// calls so its atomic rules (and defineVars :root vars) are added to the
// document at load time. No CSS extraction / virtual module / ordering concerns
// — works identically in `storybook dev` and `storybook build`. Readable class
// names also make the workbench easier to debug. (@stylexjs/stylex provides the
// `inject` runtime, already a dependency.)
import babel from '@babel/core';
import stylexBabelPlugin from '@stylexjs/babel-plugin';
import jsxSyntax from '@babel/plugin-syntax-jsx';
import tsSyntax from '@babel/plugin-syntax-typescript';

const jsx = jsxSyntax.default ?? jsxSyntax;
const ts = tsSyntax.default ?? tsSyntax;

export function stylexVite({ rootDir }) {
  return {
    name: 'vite-stylex-babel',
    enforce: 'pre', // see raw source (stylex.create / JSX) before other transforms
    async transform(code, id) {
      const clean = id.split('?')[0];
      if (id.startsWith('\0') || clean.includes('/node_modules/')) return null;
      if (!/\.[mc]?[jt]sx?$/.test(clean)) return null;
      if (!code.includes('@stylexjs/stylex')) return null;

      const isTSX = clean.endsWith('.tsx');
      const isTS = clean.endsWith('.ts') || isTSX;
      const result = await babel.transformAsync(code, {
        filename: clean,
        babelrc: false,
        configFile: false,
        sourceMaps: true,
        plugins: [
          jsx,
          isTS ? [ts, { isTSX, allExtensions: true }] : null,
          [
            stylexBabelPlugin,
            {
              dev: true,
              runtimeInjection: true,
              // Keep `.stylex.ts` token imports alive after compilation so the
              // defineVars modules still load and inject their `:root { --x: … }`
              // declarations. Without this they're tree-shaken and every
              // var(--token) resolves to nothing → components render unstyled.
              treeshakeCompensation: true,
              unstable_moduleResolution: { type: 'commonJS', rootDir },
            },
          ],
        ].filter(Boolean),
      });
      if (!result) return null;
      return { code: result.code ?? code, map: result.map };
    },
  };
}
