import { describe, it, expect } from 'vitest';
import { extractClosedObservations, extractMessageDelta } from './incremental';

describe('extractClosedObservations', () => {
  it('returns [] before the array opens', () => {
    expect(extractClosedObservations('{"observ')).toEqual([]);
    expect(extractClosedObservations('{"observations":')).toEqual([]);
  });

  it('returns only fully-closed observation objects', () => {
    const buf = '{"observations":[{"title":"A","detail":"x"},{"title":"B"';
    expect(extractClosedObservations(buf)).toEqual([
      { title: 'A', detail: 'x' },
    ]);
  });

  it('returns all observations once each closes', () => {
    const buf =
      '{"observations":[{"title":"A"},{"title":"B","detail":"y"}],"spec":{';
    expect(extractClosedObservations(buf)).toEqual([
      { title: 'A' },
      { title: 'B', detail: 'y' },
    ]);
  });

  it('is not fooled by braces/brackets inside strings', () => {
    const buf = '{"observations":[{"title":"use a { } and [ ]"}]';
    expect(extractClosedObservations(buf)).toEqual([
      { title: 'use a { } and [ ]' },
    ]);
  });

  it('ignores objects missing a string title', () => {
    const buf = '{"observations":[{"foo":1},{"title":"ok"}]';
    expect(extractClosedObservations(buf)).toEqual([{ title: 'ok' }]);
  });
});

describe('extractMessageDelta', () => {
  it('returns empty/not-closed before the message key arrives', () => {
    expect(extractMessageDelta('{"observations":[]')).toEqual({
      text: '',
      closed: false,
    });
    expect(extractMessageDelta('{"message"')).toEqual({
      text: '',
      closed: false,
    });
    expect(extractMessageDelta('{"message":')).toEqual({
      text: '',
      closed: false,
    });
  });

  it('decodes a partial (still-open) message string', () => {
    expect(extractMessageDelta('{"message":"Here is a car')).toEqual({
      text: 'Here is a car',
      closed: false,
    });
  });

  it('marks the message closed at the unescaped closing quote', () => {
    expect(extractMessageDelta('{"message":"Done.","spec":{}}')).toEqual({
      text: 'Done.',
      closed: true,
    });
  });

  it('decodes escaped quotes and backslashes without closing early', () => {
    expect(extractMessageDelta('{"message":"a \\"b\\" \\\\ c"')).toEqual({
      text: 'a "b" \\ c',
      closed: true,
    });
  });

  it('decodes \\n and \\t escapes', () => {
    expect(extractMessageDelta('{"message":"line1\\nline2\\tend"')).toEqual({
      text: 'line1\nline2\tend',
      closed: true,
    });
  });

  it('holds back a trailing lone backslash at the chunk boundary', () => {
    expect(extractMessageDelta('{"message":"abc\\')).toEqual({
      text: 'abc',
      closed: false,
    });
  });

  it('holds back an incomplete \\u escape at the chunk boundary', () => {
    expect(extractMessageDelta('{"message":"abc\\u26')).toEqual({
      text: 'abc',
      closed: false,
    });
  });

  it('decodes a complete \\u escape', () => {
    expect(extractMessageDelta('{"message":"x\\u0041y"')).toEqual({
      text: 'xAy',
      closed: true,
    });
  });

  it('tolerates whitespace between the colon and the opening quote', () => {
    expect(extractMessageDelta('{"message":   "hi"')).toEqual({
      text: 'hi',
      closed: true,
    });
  });

  it('ignores a stray "message" key inside an observation (anchors after the array)', () => {
    const buf =
      '{"observations":[{"title":"a","message":"DECOY"}],"message":"REAL';
    expect(extractMessageDelta(buf)).toEqual({ text: 'REAL', closed: false });
  });

  it('returns empty while the observations array is still open (message not reached yet)', () => {
    const buf = '{"observations":[{"title":"Add a message input';
    expect(extractMessageDelta(buf)).toEqual({ text: '', closed: false });
  });

  it('decodes the message after a closed observations array', () => {
    const buf =
      '{"observations":[{"title":"Step"}],"message":"Hi there.","spec":{}}';
    expect(extractMessageDelta(buf)).toEqual({
      text: 'Hi there.',
      closed: true,
    });
  });
});
