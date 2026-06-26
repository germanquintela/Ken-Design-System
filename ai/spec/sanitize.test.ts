import { describe, it, expect } from 'vitest';
import { parseSpec, sanitizeNode } from './sanitize';

const known = (t: string) => ['Card', 'Button', 'Box', 'Icon'].includes(t);

describe('sanitizeNode', () => {
  it('keeps a known element and its allowed props/children', () => {
    const out = sanitizeNode(
      { type: 'Button', props: { variant: 'default' }, children: ['Save'] },
      known,
    );
    expect(out).toEqual({
      type: 'Button',
      props: { variant: 'default' },
      children: ['Save'],
    });
  });

  it('drops unknown component types entirely', () => {
    expect(sanitizeNode({ type: 'Nope', children: ['x'] }, known)).toBeNull();
  });

  it('strips dangerous props (className/style/on*/dangerouslySetInnerHTML)', () => {
    const out = sanitizeNode(
      {
        type: 'Button',
        props: {
          variant: 'default',
          className: 'x',
          style: {},
          onClick: 'y',
          dangerouslySetInnerHTML: {},
        },
      },
      known,
    );
    expect(out).toEqual({ type: 'Button', props: { variant: 'default' } });
  });

  it('recurses into children and removes unknown children', () => {
    const out = sanitizeNode(
      {
        type: 'Box',
        children: [{ type: 'Button', children: ['ok'] }, { type: 'Nope' }],
      },
      known,
    );
    expect(out).toEqual({
      type: 'Box',
      children: [{ type: 'Button', children: ['ok'] }],
    });
  });

  it('recurses into node-valued props (e.g. prefix as an Icon node)', () => {
    const out = sanitizeNode(
      {
        type: 'Button',
        props: {
          prefix: { type: 'Icon', props: { name: 'Plus', onClick: 'x' } },
        },
      },
      known,
    );
    expect(out).toEqual({
      type: 'Button',
      props: { prefix: { type: 'Icon', props: { name: 'Plus' } } },
    });
  });

  it('passes plain string nodes through', () => {
    expect(sanitizeNode('hello', known)).toBe('hello');
  });
});

describe('parseSpec', () => {
  it('parses a JSON string and returns a sanitized spec', () => {
    const res = parseSpec('{"type":"Card","children":["hi"]}', known);
    expect(res).toEqual({ ok: true, spec: { type: 'Card', children: ['hi'] } });
  });

  it('accepts an already-parsed object', () => {
    const res = parseSpec({ type: 'Card' }, known);
    expect(res.ok).toBe(true);
  });

  it('errors on invalid JSON', () => {
    const res = parseSpec('{not json', known);
    expect(res.ok).toBe(false);
  });

  it('errors when the root is not a known element', () => {
    expect(parseSpec({ type: 'Nope' }, known).ok).toBe(false);
    expect(parseSpec('hi', known).ok).toBe(false);
  });
});
