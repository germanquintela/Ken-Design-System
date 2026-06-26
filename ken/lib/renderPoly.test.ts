import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import type { ReactElement } from 'react';
import { composeRefs, renderPoly } from './renderPoly';

describe('renderPoly', () => {
  it('renders a string `as` as that host element with props', () => {
    const el = renderPoly({
      as: 'section',
      props: { id: 'x', className: 'c' },
    });
    expect(el.type).toBe('section');
    expect(el.props.id).toBe('x');
    expect(el.props.className).toBe('c');
  });

  it('defaults `as` to div', () => {
    const el = renderPoly({ props: {} });
    expect(el.type).toBe('div');
  });

  it('renders a component `as` as that component type', () => {
    const Comp = (p: Record<string, unknown>) => createElement('span', p);
    const el = renderPoly({ as: Comp, props: { 'data-k': 1 } });
    expect(el.type).toBe(Comp);
    expect(el.props['data-k']).toBe(1);
  });

  it('forwards a ref on the type path', () => {
    const ref = { current: null };
    const el = renderPoly({ as: 'div', ref, props: {} });
    expect(el.props.ref).toBe(ref);
  });

  it('clones a `render` element, consumer props winning, className joined', () => {
    const render = createElement('a', {
      href: '/own',
      className: 'own',
    }) as ReactElement;
    const el = renderPoly({ render, props: { className: 'ken', 'data-k': 2 } });
    expect(el.type).toBe('a');
    expect(el.props.href).toBe('/own'); // consumer wins for conflicts
    expect(el.props.className).toBe('own ken'); // consumer-first (matches Base UI useRender)
    expect(el.props['data-k']).toBe(2);
  });

  it('merges style on the render path (ken base, consumer overrides)', () => {
    const render = createElement('a', {
      style: { color: 'red' },
    }) as ReactElement;
    const el = renderPoly({
      render,
      props: { style: { color: 'blue', margin: 0 } },
    });
    expect(el.props.style).toEqual({ color: 'red', margin: 0 });
  });

  it('short-circuits style to undefined when neither side has a style', () => {
    const render = createElement('a', { href: '/x' }) as ReactElement;
    const el = renderPoly({ render, props: { className: 'ken' } });
    expect(el.props.style).toBeUndefined();
  });
});

describe('composeRefs', () => {
  it('writes the node to every ref (object + callback)', () => {
    const obj = { current: null as unknown };
    let called: unknown = null;
    const cb = (n: unknown) => {
      called = n;
    };
    const node = {};
    composeRefs(obj, cb)(node);
    expect(obj.current).toBe(node);
    expect(called).toBe(node);
  });

  it('ignores nullish refs', () => {
    expect(() => composeRefs(undefined, null as never)(null)).not.toThrow();
  });
});
