import { AuthSkeleton } from '@/components/skeletons/AuthSkeleton';

// Auth-group fallback — OVERRIDES the root full-shell skeleton for /login and
// /register (a route group is transparent to loading inheritance, so without this
// the app-shell skeleton would wrongly flash on a logout → /login hop). Mirrors
// AuthWrapper's two-column layout instead.
export default function Loading() {
  return <AuthSkeleton />;
}
