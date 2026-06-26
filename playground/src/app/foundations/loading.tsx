import { DocsSkeleton } from '@/components/skeletons/DocsSkeleton';

// Route-transition fallback for the foundation docs (`/foundations/colors`,
// `/foundations/typography`). They share the DocLayout shell with the component
// docs, so they reuse the same skeleton. Closer to the destination than the root
// `app/loading.tsx`, so it wins here; draws the whole shell (sidebar + card) since
// the Sidebar is composed per-page inside AppWrapper, not a persistent layout.
export default function Loading() {
  return <DocsSkeleton />;
}
