import { notFound } from 'next/navigation';
import { DOCS } from '@/generated/docs.generated';
import { COMPONENTS } from '@/generated/components.manifest';
import { ComponentDoc } from '@/containers/ComponentDoc';

export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.slug }));
}

export default async function ComponentDocRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = DOCS[slug];
  if (!entry) notFound();
  return <ComponentDoc entry={entry} />;
}
