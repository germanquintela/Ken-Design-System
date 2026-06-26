import type { KenNode, Observation } from '@ken/ai';
import type { BuildHandlers, BuildRequest, BuildResult } from '@/schemas/build';
import { sseEvents } from '@/util/sse';

export async function streamBuild(
  req: BuildRequest,
  handlers: BuildHandlers,
): Promise<BuildResult> {
  const res = await fetch('/api/build', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok || !res.body) {
    const payload = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(payload.error ?? 'Generation failed.');
  }

  let message = '';
  let finalSpec: KenNode | null = null;
  let finalObs: Observation[] = [];
  let streamError: string | null = null;

  for await (const { event, data } of sseEvents(res)) {
    if (!event) continue;
    const payload = JSON.parse(data);
    switch (event) {
      case 'observation':
        handlers.onObservation(payload as Observation);
        break;
      case 'message':
        message += payload.delta as string;
        handlers.onMessage(message);
        break;
      case 'spec':
        finalSpec = payload.spec as KenNode;
        finalObs = (payload.observations as Observation[]) ?? [];
        message = (payload.message as string) ?? '';
        handlers.onMessage(message);
        break;
      case 'error':
        streamError = payload.error as string;
        break;
    }
  }

  if (streamError || !finalSpec)
    throw new Error(streamError ?? 'Generation failed.');
  return { spec: finalSpec, observations: finalObs, message };
}
