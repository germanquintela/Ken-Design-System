import * as stylex from '@stylexjs/stylex';
import * as s from '../skeletons.styles';

// A single placeholder bar of a given shape (or shapes). Decorative — hidden from
// assistive tech, which is told "Loading" once by the skeleton root's role=status.
export function Bar({ shape }: { shape: stylex.StyleXStyles[] }) {
  return <div aria-hidden {...stylex.props(s.block.base, ...shape)} />;
}
