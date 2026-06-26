/** Format one Server-Sent-Events frame. */
export function sse(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

/**
 * Extract the content delta (or DONE) from one OpenAI-style SSE `data:` payload
 * (Groq, OpenRouter, …). SSE framing — the `data:` prefix, comment/keep-alive
 * lines, partial-line buffering — is handled upstream by `EventSourceParserStream`;
 * this only reads the already-unframed JSON payload.
 */
export function parseOpenAIDelta(data: string): {
  content?: string;
  done?: boolean;
} {
  if (data === '[DONE]') return { done: true };
  try {
    const j = JSON.parse(data) as {
      choices?: { delta?: { content?: string } }[];
    };
    const content = j.choices?.[0]?.delta?.content;
    return typeof content === 'string' ? { content } : {};
  } catch {
    return {};
  }
}
