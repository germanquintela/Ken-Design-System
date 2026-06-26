import * as stylex from '@stylexjs/stylex';
import { radius } from '@ken/react/theme/tokens/radius.stylex';
import { color } from '@ken/react/theme/tokens/color.stylex';

export const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
  },
  swatch: (c: string) => ({
    backgroundColor: c,
    height: '64px',
    borderRadius: radius.control,
    border: `1px solid ${color.borderSubtle}`,
  }),
});
