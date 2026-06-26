import * as stylex from '@stylexjs/stylex';
import {
  Children,
  Fragment,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react';
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { ChevronRight } from 'lucide-react';
import { iconSize } from '../../theme/foundations/iconSize';
import { focusRing } from '../../theme/foundations/focusRing';
import { styles } from './Breadcrumb.styles';

// Breadcrumb — the wayfinding trail. It's purely presentational: a <nav> over a
// semantic <ol> of <li> crumbs (a real <a>, or a <span aria-current> for the
// page you're on). No state, no effects, no keyboard model beyond native link
// focus — so unlike most Ken components it carries NO 'use client'. It's a
// *shared* (server-renderable) component, which matters because it's page chrome:
// a docs page can drop `<Breadcrumb.Item>` straight into a Server Component
// (the compound dot-notation only survives the RSC boundary when the module
// isn't a client reference). The polymorphic `render` is done with cloneElement,
// not Base UI's `useRender` hook — a hook would re-impose 'use client'.
// Separators are inserted by the root, never by hand — a consumer can't forget
// one, double one, or misplace one (no escape hatch).

/** Root — `<nav>` + `<ol>`. List your crumbs; the chevrons fill themselves in. */
export interface BreadcrumbProps
  extends Omit<ComponentPropsWithoutRef<'nav'>, 'className'> {
  /** The crumbs, in trail order. Mark the last one `current`. */
  children?: ReactNode;
}

type AnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'href'>;

/** A single crumb. Defaults to a link; mark the trailing one `current`. */
export interface BreadcrumbItemProps extends AnchorProps {
  /** The page you're on — renders as non-interactive emphasized text, not a link. */
  current?: boolean;
  /** Destination for an ancestor crumb. Omitted on the `current` crumb. */
  href?: string;
  /** Swap the default <a> for a router link, e.g. `render={<Link href="/x" />}`. */
  render?: ReactElement;
}

// Internal — never exported. The root owns separators so the trail is always
// well-formed; aria-hidden keeps the chevron out of the a11y tree.
function BreadcrumbSeparator() {
  return (
    <li aria-hidden="true" {...stylex.props(styles.separator)}>
      <ChevronRight size={iconSize.sm} />
    </li>
  );
}

/**
 * **Breadcrumb.Item** — one crumb. An ancestor renders as a focusable link
 * (`href`); the trailing `current` crumb renders as non-interactive emphasized
 * text. Pass `render` to swap the `<a>` for a router link.
 */
const BreadcrumbItem = forwardRef<HTMLElement, BreadcrumbItemProps>(
  function BreadcrumbItem(
    { current = false, href, render, children, ...rest },
    ref,
  ) {
    const styleProps = current
      ? stylex.props(styles.current)
      : stylex.props(styles.link, focusRing.ring);

    // Polymorphic crumb (`render={<Link href="/x" />}`): clone the consumer's
    // element, folding in our semantics + styling. Its own props win for
    // conflicts (its href), but className/style COMPOSE so the crumb look always
    // lands. cloneElement is not a hook, so this keeps Breadcrumb server-safe.
    if (isValidElement(render)) {
      const own = render.props as {
        className?: string;
        style?: CSSProperties;
      };
      const crumb = cloneElement(render, {
        'aria-current': current ? 'page' : undefined,
        href: current ? undefined : href,
        ...rest,
        ...own,
        className: [styleProps.className, own.className]
          .filter(Boolean)
          .join(' '),
        style: { ...styleProps.style, ...own.style },
        ref,
        children,
      } as Record<string, unknown>);
      return <li {...stylex.props(styles.item)}>{crumb}</li>;
    }

    // The current page: non-interactive emphasized text.
    if (current) {
      return (
        <li {...stylex.props(styles.item)}>
          <span
            ref={ref as Ref<HTMLSpanElement>}
            aria-current="page"
            {...(rest as ComponentPropsWithoutRef<'span'>)}
            {...styleProps}
          >
            {children}
          </span>
        </li>
      );
    }

    // An ancestor: a focusable link.
    return (
      <li {...stylex.props(styles.item)}>
        <a ref={ref as Ref<HTMLAnchorElement>} href={href} {...rest} {...styleProps}>
          {children}
        </a>
      </li>
    );
  },
);

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    { children, 'aria-label': ariaLabel = 'Breadcrumb', ...rest },
    ref,
  ) {
    const crumbs = Children.toArray(children).filter(isValidElement);
    return (
      <nav ref={ref as Ref<HTMLElement>} aria-label={ariaLabel} {...rest}>
        <ol {...stylex.props(styles.list)}>
          {crumbs.map((crumb, i) => (
            <Fragment key={i}>
              {i > 0 && <BreadcrumbSeparator />}
              {crumb}
            </Fragment>
          ))}
        </ol>
      </nav>
    );
  },
);

BreadcrumbRoot.displayName = 'Breadcrumb';
BreadcrumbItem.displayName = 'Breadcrumb.Item';

/**
 * **Breadcrumb** — the wayfinding trail. Compound: list `Breadcrumb.Item` crumbs
 * in order and the root inserts the `›` chevron separators itself (you can't
 * forget, double or misplace one). Purely presentational and server-renderable
 * (no `'use client'`). Mark the last crumb `current`.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
 *   <Breadcrumb.Item href="/bills">Bills</Breadcrumb.Item>
 *   <Breadcrumb.Item current>Invoice #1024</Breadcrumb.Item>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
});
