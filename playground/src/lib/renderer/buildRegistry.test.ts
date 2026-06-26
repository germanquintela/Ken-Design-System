import { describe, it, expect } from 'vitest';
import { buildRegistry, isComponentLike } from './buildRegistry';

const fc = () => null; // plain function component
const fwd = { $$typeof: Symbol.for('react.forward_ref'), render: () => null }; // forwardRef-like
const compound = Object.assign(() => null, {
  Header: () => null,
  Body: { $$typeof: Symbol.for('react.forward_ref'), render: () => null },
});

describe('isComponentLike', () => {
  it('accepts functions and forwardRef/memo objects, rejects plain data', () => {
    expect(isComponentLike(fc)).toBe(true);
    expect(isComponentLike(fwd)).toBe(true);
    expect(isComponentLike({ a: 1 })).toBe(false);
    expect(isComponentLike('Button')).toBe(false);
    expect(isComponentLike(null)).toBe(false);
  });
});

describe('buildRegistry', () => {
  it('registers each component by name', () => {
    const reg = buildRegistry({ Button: fc, Card: fwd });
    expect(reg.Button).toBe(fc);
    expect(reg.Card).toBe(fwd);
  });
  it('registers compound sub-parts as Name.Sub', () => {
    const reg = buildRegistry({ Card: compound });
    expect(reg.Card).toBe(compound);
    expect(reg['Card.Header']).toBe(compound.Header);
    expect(reg['Card.Body']).toBe(compound.Body);
  });
  it('skips reserved forwardRef internals (no Card.render / Card.$$typeof)', () => {
    const reg = buildRegistry({ Card: compound });
    expect(reg['Card.render']).toBeUndefined();
    expect(reg['Card.$$typeof']).toBeUndefined();
  });
  it('ignores non-component exports', () => {
    const reg = buildRegistry({ MAX: 5, label: 'x', Button: fc });
    expect(reg.MAX).toBeUndefined();
    expect(reg.Button).toBe(fc);
  });
});
