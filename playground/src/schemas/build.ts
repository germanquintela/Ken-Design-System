import type { KenNode, Observation } from '@ken/ai';

// Contracts for the AI build/stream round-trip. The transport logic lives in
// services/buildStream.ts (client) and services/build.ts (route).

export interface BuildRequest {
  prompt: string;
  history: { role: 'user' | 'assistant'; content: string }[];
  baseSpec: unknown;
}

export interface BuildResult {
  spec: KenNode;
  observations: Observation[];
  message: string;
}

export interface BuildHandlers {
  onObservation(o: Observation): void;
  onMessage(fullMessage: string): void;
}
