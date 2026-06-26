import type { ChatMessage } from '@/schemas/message';
import type { VersionEntry } from '@/schemas/version';

/** Assistant messages that carry a spec, in chat order, as navigable versions. */
export function deriveVersions(messages: ChatMessage[]): VersionEntry[] {
  const out: VersionEntry[] = [];
  for (const m of messages) {
    if (m.role !== 'assistant' || m.spec == null) continue;
    out.push({
      messageId: m.id,
      version: m.version ?? out.length + 1,
      spec: m.spec,
      observations: m.observations ?? [],
    });
  }
  return out;
}
