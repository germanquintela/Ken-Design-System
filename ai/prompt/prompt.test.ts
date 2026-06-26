import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from './build';
import { FEW_SHOT } from './fewShot';
import { refinementMessage } from './refinement';

describe('buildSystemPrompt', () => {
  const prompt = buildSystemPrompt();

  it('requires a single JSON object and forbids prose/markdown', () => {
    expect(prompt).toMatch(/JSON/);
    expect(prompt).toMatch(/no markdown|no code fences|nothing else/i);
  });

  it('documents components with their enum values', () => {
    expect(prompt).toContain('Button');
    expect(prompt).toContain('default');
    expect(prompt).toContain('Table.Head');
  });

  it('explains the Icon node convention', () => {
    expect(prompt).toMatch(/Icon/);
    expect(prompt).toMatch(/lucide/i);
  });

  it('forbids className/style/handlers', () => {
    expect(prompt).toContain('NEVER set className');
  });

  it('documents the "message" field and its placement after observations', () => {
    expect(prompt).toContain('"message"');
    expect(prompt.indexOf('"observations"')).toBeLessThan(
      prompt.indexOf('"message"'),
    );
    expect(prompt.indexOf('"message"')).toBeLessThan(prompt.indexOf('"spec"'));
  });

  it('keeps the preamble and the COMPONENTS seam intact after extraction', () => {
    expect(prompt).toContain('Prefer real labels over lorem ipsum.');
    expect(prompt).toMatch(/\n\nCOMPONENTS:\n### /);
    expect(prompt.indexOf('lorem ipsum.')).toBeLessThan(
      prompt.indexOf('COMPONENTS:'),
    );
  });

  it('teaches layout & spacing (padded card sections, gaps, width constraint)', () => {
    expect(prompt).toMatch(/LAYOUT & SPACING/);
    expect(prompt).toMatch(/Card sections have NO built-in padding/);
    expect(prompt).toMatch(/gap=/);
    expect(prompt).toMatch(/maxWidth/);
  });
});

describe('FEW_SHOT', () => {
  it('alternates user/assistant and assistant turns are valid JSON objects', () => {
    expect(FEW_SHOT.length).toBeGreaterThanOrEqual(2);
    FEW_SHOT.forEach((turn, i) => {
      expect(turn.role).toBe(i % 2 === 0 ? 'user' : 'assistant');
    });
    for (const turn of FEW_SHOT.filter((t) => t.role === 'assistant')) {
      const parsed = JSON.parse(turn.content);
      expect(Array.isArray(parsed.observations)).toBe(true);
      expect(typeof parsed.spec.type).toBe('string');
    }
  });

  it('assistant turns include a non-empty message string', () => {
    for (const a of FEW_SHOT.filter((t) => t.role === 'assistant')) {
      const obj = JSON.parse(a.content) as { message?: unknown };
      expect(typeof obj.message).toBe('string');
      expect((obj.message as string).length).toBeGreaterThan(0);
    }
  });
});

describe('envelope prompt', () => {
  it('documents the observations+spec envelope and always-render rule', () => {
    const p = buildSystemPrompt();
    expect(p).toContain('"observations"');
    expect(p).toContain('"spec"');
    expect(p).toMatch(
      /always (return|produce|output).*renderable|always output a UI/i,
    );
  });

  it('FEW_SHOT assistant turns are envelopes', () => {
    const assistants = FEW_SHOT.filter((m) => m.role === 'assistant');
    expect(assistants.length).toBeGreaterThan(0);
    for (const a of assistants) {
      const obj = JSON.parse(a.content) as {
        observations?: unknown;
        spec?: unknown;
      };
      expect(Array.isArray(obj.observations)).toBe(true);
      expect(obj.spec).toBeTruthy();
    }
  });

  it('refinementMessage embeds the current spec as JSON', () => {
    const msg = refinementMessage({ type: 'Card' });
    expect(msg.role).toBe('system');
    expect(msg.content).toContain('{"type":"Card"}');
    expect(msg.content).toMatch(/modify|current UI|existing/i);
  });
});
