import * as stylex from '@stylexjs/stylex';
import { color } from '@ken/react/theme/tokens/color.stylex';

export const styles = stylex.create({
  // The 404 stands on its own clean white canvas — not the app shell's warm
  // limestone surface. backgroundPage (paper, #ffffff) keeps it on-system.
  page: {
    backgroundColor: color.backgroundPage,
  },
});
