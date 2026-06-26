import { handleBuild } from '@/services/build';

export const dynamic = 'force-dynamic';

export function POST(request: Request) {
  return handleBuild(request);
}
