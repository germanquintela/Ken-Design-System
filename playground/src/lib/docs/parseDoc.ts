// Parses a component doc.md body into the fixed docs structure the DocPage
// renders: an intro lede, then one section per `##` heading (title + prose
// description + example blocks). Deliberately tiny — doc bodies only use `##`
// headings, prose, and ```ken / ```<lang> fences (no lists/h3/md-tables), so a
// line scanner is simpler and lighter than pulling in a full markdown renderer.

import type { DocSection, ParsedDoc } from '@/schemas/docs';

// Strip the inline markdown that shows up in prose so it renders as clean text
// (Ken ships one font weight — `**bold**` is normal weight by design anyway).
function stripInline(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

export function parseDoc(body: string): ParsedDoc {
  const lines = body.split('\n');
  const lede: string[] = [];
  const sections: DocSection[] = [];
  let current: DocSection | null = null;
  let para: string[] = [];

  const target = () => (current ? current.description : lede);
  const flushPara = () => {
    if (para.length) {
      const text = stripInline(para.join(' ').trim());
      if (text) target().push(text);
      para = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const fence = /^```(\w*)\s*$/.exec(line);
    if (fence) {
      flushPara();
      const lang = fence[1] || 'tsx';
      const src: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        src.push(lines[i]);
        i++;
      }
      if (!current) {
        current = { title: '', description: [], blocks: [] };
        sections.push(current);
      }
      current.blocks.push({ lang, src: src.join('\n') });
      continue;
    }

    const heading = /^##\s+(.*)$/.exec(line);
    if (heading) {
      flushPara();
      current = {
        title: stripInline(heading[1].trim()),
        description: [],
        blocks: [],
      };
      sections.push(current);
      continue;
    }

    if (line.trim() === '') {
      flushPara();
      continue;
    }
    para.push(line);
  }
  flushPara();

  return { lede, sections };
}
