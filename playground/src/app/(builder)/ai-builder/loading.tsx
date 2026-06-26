import { BuilderSkeleton } from '@/components/skeletons/BuilderSkeleton';

// AI-builder fallback (conversation switches). This route's layout (AppWrapper,
// contentFill) persists the shell — sidebar + card header — across conversation
// switches, so only the card body reloads. A canvas-only skeleton here avoids
// re-flashing the (still-present) sidebar. The FIRST entry into the builder is a
// layout render, which this boundary sits inside and can't cover — the parent
// `(builder)/loading.tsx` (BuilderFullSkeleton) draws the whole shell for that.
export default function Loading() {
  return <BuilderSkeleton />;
}
