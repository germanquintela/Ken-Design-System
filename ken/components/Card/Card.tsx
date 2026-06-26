import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes, Ref } from 'react';
import { renderPoly } from '../../lib/renderPoly';
import * as s from './Card.styles';

type CardRadius = 'none' | 'nav' | 'control' | 'surface';
type CardWidth = 'full' | 'fit' | 'auto';
type SectionBackground = 'none' | 'subtle';

type NativeRoot = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'>;
type NativeSection = Omit<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'style'
>;

export interface CardProps extends NativeRoot {
  /** The element Card renders as. Default `div`. */
  as?: ElementType;
  /** Hairline outer border: `true` (default hairline), `'subtle'` (faintest), `false` (none). Default `true`. */
  border?: boolean | 'subtle';
  /** Corner radius amount. Default `surface` (12px). */
  radius?: CardRadius;
  /** Width behavior — fills the container by default. */
  width?: CardWidth;
}

export interface CardSectionProps extends NativeSection {
  /** Section fill. `none` is transparent (shows the card's white). */
  background?: SectionBackground;
}

export interface CardBarProps extends CardSectionProps {
  /** Cast a soft shadow onto the body (raised / sticky look). Default `false`. */
  shadow?: boolean;
}

const CardRoot = forwardRef<HTMLElement, CardProps>(function Card(
  { as = 'div', border = true, radius = 'surface', width = 'full', ...rest },
  ref,
) {
  return renderPoly({
    as,
    ref: ref as Ref<HTMLElement>,
    props: {
      ...rest,
      ...stylex.props(
        s.root.base,
        border === true && s.border.on,
        border === 'subtle' && s.border.subtle,
        s.radiusStyles[radius],
        s.width[width],
      ),
    },
  });
});

/**
 * **Card.Header** — top section of a Card, with a bottom divider hairline. Set
 * `background="subtle"` for a tinted fill, or `shadow` for a raised/sticky header.
 */
const CardHeader = forwardRef<HTMLDivElement, CardBarProps>(function CardHeader(
  { background = 'none', shadow = false, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      {...stylex.props(
        s.header.root,
        background !== 'none' && s.background[background],
        shadow && s.header.shadow,
      )}
    >
      {children}
    </div>
  );
});

/**
 * **Card.Body** — the Card's main content section. Carries no dividers of its
 * own; set `background="subtle"` for a tinted fill.
 */
const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(function CardBody(
  { background = 'none', children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      {...stylex.props(background !== 'none' && s.background[background])}
    >
      {children}
    </div>
  );
});

/**
 * **Card.Footer** — bottom section of a Card, with a top divider hairline. Set
 * `background="subtle"` for a tinted fill, or `shadow` for a raised/sticky footer.
 */
const CardFooter = forwardRef<HTMLDivElement, CardBarProps>(function CardFooter(
  { background = 'none', shadow = false, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      {...stylex.props(
        s.footer.root,
        background !== 'none' && s.background[background],
        shadow && s.footer.shadow,
      )}
    >
      {children}
    </div>
  );
});

CardRoot.displayName = 'Card';
CardHeader.displayName = 'Card.Header';
CardBody.displayName = 'Card.Body';
CardFooter.displayName = 'Card.Footer';

/**
 * **Card** — a bordered, rounded surface that frames grouped content. Compose it
 * from `Card.Header`, `Card.Body` and `Card.Footer`; each section owns its own
 * divider hairline, so headers and footers separate from the body automatically.
 * Renders a plain white surface by default — set a section `background` for the
 * subtle fill, and `shadow` on a header/footer for a raised/sticky look. Uses
 * `renderPoly` (not Base UI's `useRender`) so the module is shared and
 * `Card.*` dot-notation survives RSC prerender.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>Invoice #1024</Card.Header>
 *   <Card.Body>
 *     <Text>Amount due: $4,200</Text>
 *   </Card.Body>
 *   <Card.Footer background="subtle">
 *     <Button>Pay now</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
