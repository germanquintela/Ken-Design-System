import { describe, it, expect } from 'vitest';
import { sse, parseOpenAIDelta } from './sse';

describe('sse', () => {
  it('formats an event frame', () => {
    expect(sse('observation', { title: 'A' })).toBe(
      'event: observation\ndata: {"title":"A"}\n\n',
    );
  });
});

describe('parseOpenAIDelta', () => {
  it('extracts a content delta', () => {
    expect(
      parseOpenAIDelta('{"choices":[{"delta":{"content":"hel"}}]}'),
    ).toEqual({ content: 'hel' });
  });
  it('flags the terminal [DONE] payload', () => {
    expect(parseOpenAIDelta('[DONE]')).toEqual({ done: true });
  });
  it('ignores empty deltas', () => {
    expect(parseOpenAIDelta('{"choices":[{"delta":{}}]}')).toEqual({});
  });
  it('ignores unparseable payloads', () => {
    expect(parseOpenAIDelta('{not json')).toEqual({});
  });
});
