import { DocsSkeleton } from '@/components/skeletons/DocsSkeleton';

// Route-transition fallback for every component doc (`/components/[slug]`). Closer
// to the destination than the root `app/loading.tsx`, so it wins here: the doc
// pages keep the DocLayout skeleton (breadcrumb → title → hero → sections) while
// the root falls back to Home's bespoke card layout. The Sidebar is composed
// per-page inside AppWrapper (not a persistent layout), so this draws the whole
// shell — sidebar + card.
export default function Loading() {
  return <DocsSkeleton />;
}
