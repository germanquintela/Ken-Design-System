import { HomeSkeleton } from '@/components/skeletons/HomeSkeleton';

// Root route-transition fallback. Next wraps `{children}` of the root layout in a
// Suspense boundary with this as the fallback, so a navigation to `/` (and the
// post-login hop to `/`) shows Home's skeleton instantly instead of a frozen blank
// screen. The component/foundation doc pages have their own closer `loading.tsx`
// boundaries (DocsSkeleton), so they no longer fall back to this.
export default function Loading() {
  return <HomeSkeleton />;
}
