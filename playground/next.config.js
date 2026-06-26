const path = require('node:path');
const stylexPlugin = require('@stylexswc/nextjs-plugin');

const appDir = __dirname; // playground/
const repoRoot = path.join(__dirname, '..'); // monorepo root — common root for ken/ + playground/

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: repoRoot,
  // Compile the @ken/react workspace source through Next's SWC/StyleX pipeline.
  transpilePackages: ['@ken/react', '@ken/ai'],
  async rewrites() {
    return [
      {
        source: '/components/:slug.md',
        destination: '/api/docs/components/:slug',
      },
    ];
  },
};

// The NAPI-RS StyleX compiler transforms app + @ken/react source (so
// defineVars/create are compiled, not run at runtime) AND extracts/injects the
// atomic CSS. rootDir is the repo root so token var hashes are identical
// whether a .stylex.ts is declared in ken or consumed in the playground.
module.exports = stylexPlugin({
  rsOptions: {
    dev: process.env.NODE_ENV !== 'production',
    aliases: {
      '@/*': [path.join(appDir, 'src', '*')],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
      rootDir: repoRoot,
    },
  },
  useCSSLayers: false,
  transformCss: async (css, filePath) => {
    const postcss = require('postcss');
    const autoprefixer = require('autoprefixer');
    const result = await postcss([autoprefixer]).process(css, {
      from: filePath,
    });
    return result.css;
  },
})(nextConfig);
