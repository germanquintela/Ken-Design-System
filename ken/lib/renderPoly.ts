import { cloneElement, createElement, isValidElement } from 'react';
import type { CSSProperties, ElementType, ReactElement, Ref } from 'react';

type AnyProps = Record<string, unknown>;

/**
 * Compose up to two refs into one callback ref. Non-hook (safe outside a
 * component body) — presentational primitives don't need stable ref identity.
 */
export function composeRefs<T>(
  ...refs: Array<Ref<T> | undefined>
): (node: T | null) => void {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(node);
      else (ref as { current: T | null }).current = node;
    }
  };
}

interface RenderPolyArgs {
  /** Element type to render when no `render` element is given. Default `div`. */
  as?: ElementType;
  /** A pre-built element to render instead (the `render={<Link/>}` pattern). */
  render?: ReactElement;
  /** Ref to forward onto the rendered element. */
  ref?: Ref<unknown>;
  /** Props already merged with the `stylex.props()` output. */
  props: AnyProps;
}

/**
 * Non-hook polymorphic renderer — the server-safe replacement for Base UI's
 * `useRender`. Lets presentational Ken primitives keep the polymorphic
 * `as`/`render` API while dropping `'use client'`.
 *
 * - `render` element present → `cloneElement`, merging Ken's props with the
 *   consumer's (consumer wins for conflicts; className joins, style spreads,
 *   refs compose) — mirrors useRender's merge-props.
 * - otherwise → `createElement(as, props)` (React 19 ref-as-prop).
 */
export function renderPoly({
  as = 'div',
  render,
  ref,
  props,
}: RenderPolyArgs): ReactElement<AnyProps> {
  if (isValidElement(render)) {
    const own = render.props as {
      className?: string;
      style?: CSSProperties;
      ref?: Ref<unknown>;
    };
    return cloneElement(render, {
      ...props,
      ...own,
      className:
        [own.className, props.className].filter(Boolean).join(' ') || undefined,
      style:
        props.style || own.style
          ? { ...(props.style as CSSProperties), ...own.style }
          : undefined,
      // Compose the consumer element's own ref with ours (useRender overwrote
      // the consumer ref; composing is the intentional, more-correct behavior).
      ref: own.ref ? composeRefs(ref, own.ref) : ref,
    } as AnyProps) as ReactElement<AnyProps>;
  }
  return createElement(as, { ...props, ref }) as ReactElement<AnyProps>;
}
