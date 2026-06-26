import { BuilderFullSkeleton } from '@/components/skeletons/BuilderFullSkeleton';

// Full-shell builder fallback. The `(builder)` route group exists purely to seat this
// Suspense boundary ABOVE `ai-builder/layout.tsx` (the AppWrapper shell). On the first
// entry into the builder from another route, that layout is itself still rendering, so
// the inner `ai-builder/loading.tsx` (canvas-only) can't apply — without this boundary
// the root `HomeSkeleton` would flash. This draws the whole builder shell instead. The
// route group adds no URL segment, so the path stays `/ai-builder`. (Same override
// trick `(auth)/loading.tsx` uses for the auth screens.)
export default function Loading() {
  return <BuilderFullSkeleton />;
}
