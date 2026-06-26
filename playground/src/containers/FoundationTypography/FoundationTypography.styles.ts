import * as stylex from '@stylexjs/stylex';
import { font } from '@ken/react/theme/tokens/typography.stylex';

export const styles = stylex.create({
  specimen: (size: string, lh: string) => ({
    fontFamily: font.sans,
    fontSize: size,
    lineHeight: lh,
    margin: 0,
  }),
});
