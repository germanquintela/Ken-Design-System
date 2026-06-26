'use client';
import * as React from 'react';
import { LayoutDashboard, Code2 } from 'lucide-react';
import { Box, ToggleGroup, CodePreview } from '@ken/react';
import { KenRenderer, PreviewBoundary } from '@/lib/renderer/KenRenderer';
import { serialize } from '@/lib/renderer/serialize';
import type { VersionEntry } from '@/schemas/version';
import { VersionSwitcher } from './components/VersionSwitcher';
import { canvas, codeSurface } from './CanvasPanel.styles';

const TOGGLE_ITEMS = [
  { value: 'canvas', icon: LayoutDashboard, 'aria-label': 'Canvas' },
  { value: 'code', icon: Code2, 'aria-label': 'Code' },
];

export interface CanvasPanelProps {
  versions: VersionEntry[];
  displayedVersion: number | null;
  setDisplayedVersion(v: number): void;
  building: boolean;
}

export function CanvasPanel({
  versions,
  displayedVersion,
  setDisplayedVersion,
}: CanvasPanelProps) {
  const [view, setView] = React.useState<'canvas' | 'code'>('canvas');

  const current =
    versions.find((v) => v.version === displayedVersion) ??
    versions.at(-1) ??
    null;
  const code = React.useMemo(
    () => (current ? serialize(current.spec) : ''),
    [current],
  );

  return (
    <Box direction="column" grow minWidth={0} minHeight={0}>
      <Box
        align="center"
        justify="between"
        gap="space2"
        px="space4"
        py="space2"
        borderBottom="borderSubtle"
      >
        <ToggleGroup
          items={TOGGLE_ITEMS}
          value={view}
          onValueChange={(v) => setView(v as 'canvas' | 'code')}
          aria-label="Canvas or code"
        />
        <Box width="space60">
          <VersionSwitcher
            versions={versions}
            current={displayedVersion}
            onChange={setDisplayedVersion}
          />
        </Box>
      </Box>

      {/* Surface — the dot-grid background rides Box's typed `style` escape hatch (flex/minHeight/overflow live in canvas.base too). */}
      <Box style={canvas.base}>
        {current && view === 'code' ? (
          // Code view is full-bleed: a direct child of the scroll surface (no
          // padding / centering) so it covers the panel edge-to-edge and full
          // height. `display="block"` lets CodePreview's borderless block <pre>
          // fill the width; the backgroundSubtle plate masks the dot grid below
          // short snippets. CodePreview owns its prism theme + copy button.
          <Box
            display="block"
            width="full"
            minHeight="full"
            style={codeSurface.fill}
          >
            <CodePreview code={code} language="tsx" bordered={false} />
          </Box>
        ) : (
          <Box
            p="space6"
            minHeight="full"
            width="full"
            align="center"
            justify="center"
          >
            {!current && (
              <Box
                align="center"
                justify="center"
                minHeight="space40"
                direction="column"
                gap="space2"
                width="full"
              >
                {/* biome-ignore lint/performance/noImgElement: deliberate plain <img> for the static placeholder preview; not a next/image optimization candidate. */}
                <img
                  src="/placeholder.webp"
                  alt=""
                  width={315}
                  height={246}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            )}
            {current && view === 'canvas' && (
              <PreviewBoundary>
                <KenRenderer node={current.spec} />
              </PreviewBoundary>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
