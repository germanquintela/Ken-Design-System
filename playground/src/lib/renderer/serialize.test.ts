import { describe, it, expect } from 'vitest';
import { serialize } from './serialize';

describe('serialize', () => {
  it('renders an element with a string child and an import', () => {
    const code = serialize({
      type: 'Button',
      props: { variant: 'default' },
      children: ['Save'],
    });
    expect(code).toContain("import { Button } from '@ken/react';");
    expect(code).toContain('<Button variant="default">');
    expect(code).toContain('Save');
    expect(code).toContain('</Button>');
  });

  it('renders boolean and number props correctly', () => {
    const code = serialize({
      type: 'Table',
      props: { striped: true, hover: false },
    });
    expect(code).toContain('striped'); // bare boolean true
    expect(code).not.toContain('hover'); // false is omitted
    const numCode = serialize({ type: 'Skeleton', props: { lines: 3 } });
    expect(numCode).toContain('lines={3}');
  });

  it('renders an Icon node prop as a lucide element with import', () => {
    const code = serialize({
      type: 'Button',
      props: { prefix: { type: 'Icon', props: { name: 'Plus' } } },
      children: ['Add'],
    });
    expect(code).toContain("import { Plus } from 'lucide-react';");
    expect(code).toContain('prefix={<Plus />}');
  });

  it('serializes options arrays with icon as element', () => {
    const code = serialize({
      type: 'Select',
      props: { options: [{ value: 'a', label: 'A', icon: 'Star' }] },
    });
    expect(code).toContain('options={[');
    expect(code).toContain('value: "a"');
    expect(code).toContain('icon: <Star />');
  });
});
