import { AiBuilder } from '@/containers/AiBuilder';

export const dynamic = 'force-dynamic';

// No conversation selected yet — AiBuilder renders the empty canvas + composer;
// the first send creates a conversation and routes to /ai-builder/<id>.
export default function AiBuilderPage() {
  return <AiBuilder />;
}
