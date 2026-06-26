import * as stylex from '@stylexjs/stylex';
import { color } from '../../theme/tokens/color.stylex';
import { space } from '../../theme/tokens/space.stylex';
import { radius } from '../../theme/tokens/radius.stylex';
import {
  font,
  fontSize,
  lineHeight,
} from '../../theme/tokens/typography.stylex';

export const styles = stylex.create({
  // relative wrapper so the copy button can sit top-right over the code surface
  root: {
    position: 'relative',
    minWidth: 0,
  },
  // scrollable code surface; backgroundSubtle reads distinct from a white preview.
  // paddingRight leaves room under the copy button.
  pre: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: color.backgroundSubtle,
    color: color.textPrimary,
    fontFamily: font.mono,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    paddingTop: space.space4,
    paddingBottom: space.space4,
    paddingLeft: space.space4,
    paddingRight: space.space10,
    overflowX: 'auto',
  },
  // border + radius only when standalone (Showcase passes bordered={false})
  bordered: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: color.borderSubtle,
    borderRadius: radius.surface,
  },
  line: {
    display: 'block',
    whiteSpace: 'pre',
  },
  copy: {
    position: 'absolute',
    top: space.space2,
    right: space.space2,
  },
});
