// Shapes for the docs subsystem: the parsed structure of a component `doc.md`
// body, plus the foundations nav registry. The parsing logic (parseDoc) and the
// registry data (FOUNDATIONS) live in lib/docs/; these are just the contracts.

export interface DocBlock {
  /** Fence language. `ken` → live example; anything else → static code. */
  lang: string;
  src: string;
}

export interface DocSection {
  title: string;
  /** Prose paragraphs between the heading and its example(s). */
  description: string[];
  blocks: DocBlock[];
}

export interface ParsedDoc {
  /** Prose before the first `##` heading. */
  lede: string[];
  sections: DocSection[];
}

// Foundations nav registry entry — drives the Sidebar's "Foundations" group.
// Each foundation has its own static route (/foundations/<slug>) + container.
export interface FoundationEntry {
  slug: string;
  title: string;
}
