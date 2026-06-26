import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import * as s from './Logo.styles';

/** Lockup height — xs 16 · sm 24 · md 32 px (each lockup keeps its own aspect ratio). */
export type LogoSize = 'xs' | 'sm' | 'md';

/**
 * Logo lockup: the `mark` (isotype — the swoosh symbol alone) or the `wordmark` (the
 * full "ramp" logotype + swoosh). Both ride the same `size` and `tone` knobs.
 */
export type LogoType = 'mark' | 'wordmark';

/** Colour role for the lockup — maps to a semantic token, never a raw hex (§4.1.7).
 *  `default` obsidian near-black · `muted` grey · `inverse` white (on dark surfaces). */
export type LogoTone = 'default' | 'muted' | 'inverse';

type NativeSpan = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style'>;

export interface LogoProps extends NativeSpan {
  /** Height on the xs/sm/md scale. Default `sm` (24px). */
  size?: LogoSize;
  /** Which lockup to render — `mark` (iso) or `wordmark` (full). Default `mark`. */
  type?: LogoType;
  /** Colour: `default` (dark), `muted` (grey) or `inverse` (white). Default `default`. */
  tone?: LogoTone;
}

// Each lockup's intrinsic SVG (viewBox + path data exported from Figma — like a Lucide
// icon's `d`, not a design token) plus its accessible name. Paths are painted in
// `currentColor`, so `tone` on the wrapper owns the colour. A lockup can carry more
// than one path (the wordmark draws the logotype and the swoosh as two shapes).
const LOCKUPS: Record<
  LogoType,
  { viewBox: string; paths: string[]; label: string }
> = {
  mark: {
    viewBox: '0 0 60 51',
    paths: [
      'M60 50.7421V51.0015H27.2806V50.7421C32.0288 48.0625 35.223 45.3828 38.1583 42.5303H51.6259L60 50.7421ZM51.9712 8.12689L43.6835 0.00146484H43.4245C43.4245 0.00146484 43.5971 15.1286 29.6115 28.9591C15.9712 42.4438 0 42.5303 0 42.5303V42.7896L8.46043 51.0015C8.46043 51.0015 24.259 51.1743 38.1583 37.4303C52.0576 23.8591 51.9712 8.12689 51.9712 8.12689Z',
    ],
    label: 'Ramp',
  },
  wordmark: {
    viewBox: '0 0 243 65',
    paths: [
      'M16.8092 21.9277C11.0337 21.9277 8.18907 27.041 8.18907 33.8877V51.0477H0V14.9077H8.01667V24.2677H8.18907C9.91309 18.461 13.2749 13.8677 18.5332 13.8677C22.2398 13.8677 23.7914 15.1677 23.7914 15.1677L20.0848 22.621C20.0848 22.621 18.9642 21.9277 16.8092 21.9277ZM115.337 26.9543V51.1343H107.406V29.901C107.406 23.8343 105.51 20.6277 100.683 20.6277C95.6829 20.6277 93.2692 24.701 93.2692 32.501V51.1343H85.3388V29.901C85.3388 24.0943 83.4424 20.6277 78.7013 20.6277C73.1845 20.6277 71.1156 25.481 71.1156 32.501V51.1343H63.099V14.9077H71.1156V23.141H71.2018C72.4087 17.5077 75.8567 13.9543 81.6321 13.9543C87.3214 13.9543 91.028 17.0743 92.4934 22.5343C93.8727 17.2477 97.4069 13.9543 102.924 13.9543C110.423 13.9543 115.337 18.721 115.337 26.9543ZM39.8248 13.8677C32.4115 13.8677 27.6705 17.3343 25.4292 23.661L32.2391 26.1743C33.4459 22.361 36.0319 20.1943 39.9972 20.1943C44.3934 20.1943 47.0656 22.1877 47.0656 25.1343C47.0656 28.1677 44.9968 28.861 40.342 29.641C35.1699 30.5077 22.757 30.7677 22.757 41.2543C22.757 47.4077 27.8429 52.001 35.5147 52.001C41.2902 52.001 45.2554 49.661 47.0656 45.241H47.1518V51.1343H55.0823V28.861C54.9961 19.0677 50.1689 13.8677 39.8248 13.8677ZM47.238 34.061C47.238 41.6877 43.5314 46.541 37.4973 46.541C33.2735 46.541 30.7737 44.201 30.7737 40.7343C30.7737 37.5277 33.3597 35.2743 38.3593 34.321C43.4452 33.3677 46.0312 32.241 47.238 29.381V34.061ZM143.611 13.9543C137.576 13.9543 133.525 17.3343 131.801 22.361V14.9077H123.353V65.001H131.715V43.681H131.801C133.697 49.141 137.576 52.1743 143.611 52.1743C153.265 52.1743 160.161 44.201 160.161 32.9343C160.161 21.6677 153.265 13.9543 143.611 13.9543ZM141.542 45.4143C134.904 45.4143 131.198 40.561 131.198 33.021C131.198 25.481 135.335 20.6277 141.542 20.6277C147.748 20.6277 151.886 25.741 151.886 33.021C151.886 40.301 147.748 45.4143 141.542 45.4143Z',
      'M243 50.8743V51.1343H210.33V50.8743C215.071 48.1876 218.26 45.501 221.191 42.641H234.638L243 50.8743ZM234.897 8.14764L226.621 0.000976562H226.363C226.363 0.000976562 226.535 15.1676 212.571 29.0343C198.951 42.5543 183.004 42.641 183.004 42.641V42.901L191.452 51.221C191.452 51.221 207.226 51.3943 221.105 37.6143C234.983 23.921 234.897 8.14764 234.897 8.14764Z',
    ],
    label: 'Ramp',
  },
};

/** The **Ramp** logo — the `mark` (iso swoosh) or full `wordmark`, as an inline SVG
 *  painted in `currentColor`. A non-interactive brand glyph with no Base UI primitive
 *  (like StackLogo / Spinner): a styled `<span>` wrapping a decorative SVG. `size`
 *  scales it by height, `type` picks the lockup, `tone` sets the colour.
 *
 *  @example
 *  ```tsx
 *  <Logo type="wordmark" size="md" />
 *  ```
 */
export const Logo = forwardRef<HTMLSpanElement, LogoProps>(function Logo(
  {
    size = 'sm',
    type = 'mark',
    tone = 'default',
    'aria-hidden': ariaHidden,
    ...rest
  },
  ref,
) {
  const { viewBox, paths, label } = LOCKUPS[type];

  // Decorative (aria-hidden) wins; otherwise it's an image labelled with the brand.
  const a11y = ariaHidden
    ? { 'aria-hidden': ariaHidden }
    : { role: 'img' as const, 'aria-label': label };

  return (
    <span
      ref={ref}
      {...a11y}
      {...rest}
      {...stylex.props(s.root.base, s.tone[tone], s.size[size])}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        {...stylex.props(s.svg.base)}
      >
        {paths.map((d) => (
          <path key={d} d={d} fill="currentColor" />
        ))}
      </svg>
    </span>
  );
});
