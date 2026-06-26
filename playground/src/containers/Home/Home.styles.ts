import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  // Box has no grid-template axis, so the grid lives in a co-located style.
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      default: 'repeat(2, minmax(0, 1fr))',
      '@media (max-width: 640px)': '1fr',
    },
    gap: '16px',
  },
  media: {
    display: 'block',
    width: '100%',
    height: 'auto',
    // Keep the scale on its own GPU layer so the image doesn't re-rasterize
    // ("resharpen snap") when the transform settles back on hover-out. A plain
    // 2D hint only: no translateZ / 3D, which can leave a sub-pixel edge seam.
    willChange: 'transform',
    transition: `transform 250ms cubic-bezier(0.23, 1, 0.32, 1)`,
    transform: {
      default: 'scale(1.04)',
      ':hover': {
        default: 'scale(1.04)',
        '@media (hover: hover) and (pointer: fine)': 'scale(1.24)',
      },
    },
  },
});
