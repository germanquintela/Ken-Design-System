import * as stylex from '@stylexjs/stylex';
import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { renderPoly } from '../../lib/renderPoly';
import type { AvatarProps, AvatarSize } from './Avatar';
import * as s from './Avatar.styles';

type NativeDiv = Omit<
  ComponentPropsWithoutRef<'div'>,
  'className' | 'style' | 'children'
>;

export interface AvatarGroupProps extends NativeDiv {
  /** The avatars to stack — `<Avatar>` elements. */
  children: ReactNode;
  /** Diameter for every avatar in the group (overrides each child's). Default `md`. */
  size?: AvatarSize;
  /** Cap the visible avatars; the remainder collapse into a "+N" chip. */
  max?: number;
}

/**
 * **AvatarGroup** — stacks `<Avatar>` elements into an overlapping row. The group
 * owns the look: it clones a uniform `size` onto each child and wraps it in a
 * ringed, left-pulled item, so the `<Avatar>` itself stays a plain circle. Pass
 * `max` to cap the row — the overflow collapses into one more circular avatar (a
 * neutral "+N" chip), reusing the very same circle styles. Uses `renderPoly`
 * to keep the no-raw-element rule for the container.
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar name="Ada Lovelace" />
 *   <Avatar name="Grace Hopper" />
 *   <Avatar name="Alan Turing" />
 *   <Avatar name="Katherine Johnson" />
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup = forwardRef<HTMLElement, AvatarGroupProps>(
  function AvatarGroup({ children, size = 'md', max, ...rest }, ref) {
    const items = Children.toArray(children).filter(
      isValidElement,
    ) as ReactElement<AvatarProps>[];
    const limit =
      max != null && max > 0 ? Math.min(max, items.length) : items.length;
    const shown = items.slice(0, limit);
    const overflow = items.length - shown.length;

    return renderPoly({
      as: 'div',
      ref: ref as Ref<HTMLElement>,
      props: {
        ...rest,
        ...stylex.props(s.group.root),
        children: (
          <>
            {shown.map((child, i) => (
              // First item sits flush; the rest pull left to overlap.
              <span
                key={child.key ?? i}
                {...stylex.props(s.stack.base, i > 0 && s.stack[size])}
              >
                {cloneElement(child, { size })}
              </span>
            ))}
            {overflow > 0 && (
              <span {...stylex.props(s.stack.base, s.stack[size])}>
                <span
                  {...stylex.props(s.root.base, s.size[size], s.tint.overflow)}
                >
                  +{overflow}
                </span>
              </span>
            )}
          </>
        ),
      },
    });
  },
);
