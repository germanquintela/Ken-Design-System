// Foundations nav registry — drives the Sidebar's "Foundations" group. Each
// foundation has its own static route (/foundations/<slug>) + container
// (containers/Foundation<Title>/), so this is metadata only, not a page map.
import type { FoundationEntry } from '@/schemas/docs';

export const FOUNDATIONS: FoundationEntry[] = [
  { slug: 'colors', title: 'Colors' },
  { slug: 'typography', title: 'Typography' },
];
