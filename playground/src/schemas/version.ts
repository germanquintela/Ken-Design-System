import type { KenNode, Observation } from '@ken/ai';

// A navigable canvas version, derived from the assistant messages that carry a
// spec. The derivation logic lives in util/versions.ts.
export interface VersionEntry {
  messageId: string;
  version: number;
  spec: KenNode;
  observations: Observation[];
}
