import { DOCS } from '@/generated/docs.generated';

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const entry = DOCS[slug];
  if (!entry) return new Response('Not found', { status: 404 });
  const md = `# ${entry.meta.title}\n\n${entry.meta.description}\n\n${entry.body}\n`;
  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
