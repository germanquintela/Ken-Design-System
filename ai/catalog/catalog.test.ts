import { describe, it, expect } from 'vitest';
import { CATALOG } from './data';
import { catalogTypeNames } from './names';

describe('catalog integrity', () => {
  it('has the 34 public components', () => {
    expect(CATALOG).toHaveLength(34);
  });

  it('exposes the newer components added after the AI builder shipped', () => {
    const names = CATALOG.map((c) => c.name);
    expect(names).toContain('Pill');
    expect(names).toContain('Logo');
    expect(names).toContain('CopyButton');
    expect(names).toContain('CommandMenu');
  });

  it('Button variant enum excludes "primary" and includes "default"', () => {
    const variant = CATALOG.find((c) => c.name === 'Button')!.props.find(
      (p) => p.name === 'variant',
    )!;
    expect(variant.enum).toContain('default');
    expect(variant.enum).not.toContain('primary');
  });

  it('Table exposes Table.Head (not Table.Header)', () => {
    const subs = CATALOG.find((c) => c.name === 'Table')!.subcomponents.map(
      (s) => s.name,
    );
    expect(subs).toContain('Table.Head');
    expect(subs).not.toContain('Table.Header');
    expect(subs).toContain('Table.Cell');
  });

  it('type names include compound dot-names', () => {
    const names = catalogTypeNames();
    expect(names).toContain('Card.Header');
    expect(names).toContain('Menu.Trigger');
    expect(names).toContain('Tabs.Panel');
  });
});
