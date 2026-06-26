import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { renderPoly } from '../../lib/renderPoly';
import { surface, variants } from '../../recipes/buttonRecipe';
import { focusRing } from '../../theme/foundations/focusRing';
import type { ButtonVariant, ButtonSize } from '../Button';

// LinkButton — a Button that navigates. Same recipe, same 7 variants, same size
// scale; the only difference is the element. It renders a real <a> so it gets
// native link semantics (open-in-new-tab, copy-link, middle-click) for free,
// and is polymorphic via `renderPoly`: pass `render={<Link … />}` to
// swap in a framework router link (Next's <Link>, etc.) without @ken/react ever
// importing it — keeping the package framework-agnostic.
//
// No `disabled`: a link that can't navigate shouldn't be a link (the recipe's
// `:disabled` rules don't fire on <a> anyway). Drop the destination instead.

type AnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'prefix'>;

export interface LinkButtonProps extends AnchorProps {
  /** Visual treatment. `default` is the lime primary action. Matches Button. */
  variant?: ButtonVariant;
  /** Control height + type scale. Matches Button. */
  size?: ButtonSize;
  /** Icon rendered before the label. */
  prefix?: ReactNode;
  /** Icon rendered after the label. */
  suffix?: ReactNode;
  /** Stretch to the container's width (label stays centred). Default `false`. */
  fullWidth?: boolean;
  /**
   * Replace the default <a> with another element — e.g. a router link
   * (`render={<Link href="/x" />}`). Accepts a React element.
   */
  render?: ReactElement;
}

/**
 * **LinkButton** — a `Button` that navigates: same recipe, `variant`s and size
 * scale, but renders a real `<a>` for native link semantics (open-in-new-tab,
 * copy-link, middle-click). Polymorphic via `render` — pass `render={<Link … />}`
 * to swap in a framework router link.
 *
 * @example
 * ```tsx
 * <LinkButton href="/pricing" variant="secondary">See pricing</LinkButton>
 *
 * <LinkButton render={<Link href="/dashboard" />} suffix={<ArrowRight size={16} />}>
 *   Dashboard
 * </LinkButton>
 * ```
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    {
      variant = 'default',
      size = 'md',
      prefix,
      suffix,
      fullWidth = false,
      children,
      render,
      ...rest
    },
    ref,
  ) {
    return renderPoly({
      as: 'a',
      render,
      ref: ref as Ref<HTMLAnchorElement>,
      props: {
        ...rest,
        ...stylex.props(
          surface.base,
          focusRing.ring,
          surface[size],
          fullWidth && surface.block,
          variants[variant],
        ),
        children: (
          <>
            {prefix}
            {children}
            {suffix}
          </>
        ),
      },
    });
  },
);
