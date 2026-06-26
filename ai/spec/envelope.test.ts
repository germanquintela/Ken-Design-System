import { describe, it, expect } from 'vitest';
import { parseEnvelope } from './envelope';

describe('parseEnvelope', () => {
  const envKnown = (t: string) => ['Card', 'Button', 'Box', 'Icon'].includes(t);

  it('extracts spec + observations from the envelope', () => {
    const raw = JSON.stringify({
      observations: [{ title: 'Plan' }, { title: 'Build', detail: 'd' }],
      message: 'Built a card.',
      spec: { type: 'Card', children: ['hi'] },
    });
    const res = parseEnvelope(raw, envKnown);
    expect(res).toEqual({
      ok: true,
      spec: { type: 'Card', children: ['hi'] },
      observations: [{ title: 'Plan' }, { title: 'Build', detail: 'd' }],
      message: 'Built a card.',
    });
  });

  it('falls back to a bare spec node with empty observations', () => {
    const res = parseEnvelope({ type: 'Card', children: ['x'] }, envKnown);
    expect(res).toEqual({
      ok: true,
      spec: { type: 'Card', children: ['x'] },
      observations: [],
      message: '',
    });
  });

  it('errors when the spec is unusable', () => {
    expect(
      parseEnvelope({ observations: [], spec: { type: 'Nope' } }, envKnown).ok,
    ).toBe(false);
  });

  it('drops malformed observation entries but keeps a valid spec', () => {
    const raw = JSON.stringify({
      observations: [{ nope: 1 }, 'bad'],
      spec: { type: 'Card' },
    });
    const res = parseEnvelope(raw, envKnown);
    expect(res).toEqual({
      ok: true,
      spec: { type: 'Card' },
      observations: [],
      message: '',
    });
  });
});
