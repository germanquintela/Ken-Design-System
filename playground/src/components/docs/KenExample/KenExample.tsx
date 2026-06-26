'use client';
import * as React from 'react';
import { Showcase, CodePreview } from '@ken/react';
import { KenRenderer, PreviewBoundary } from '@/lib/renderer/KenRenderer';
import { kenExampleData } from '@/lib/docs/kenExample';

/** Renders a ```ken JSON block as a live Showcase: live preview + derived TSX.
 *  Outer spacing is owned by the caller (DocPage's section layout). */
export function KenExample({ json }: { json: string }) {
  const data = React.useMemo(() => kenExampleData(json), [json]);
  if (!data.ok) return <CodePreview code={data.raw} language="tsx" />;

  return (
    <Showcase code={data.code} language="tsx">
      <PreviewBoundary>
        <KenRenderer node={data.node} />
      </PreviewBoundary>
    </Showcase>
  );
}
