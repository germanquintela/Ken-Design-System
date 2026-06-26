import {
  EventSourceParserStream,
  type EventSourceMessage,
} from 'eventsource-parser/stream';

/**
 * Read a `text/event-stream` Response body as an async-iterable of parsed SSE
 * events, so call sites can use a plain `for await … of` + `switch` instead of
 * hand-rolling `getReader()`. EventSourceParserStream owns all SSE framing (the
 * `data:` prefix, keep-alive comments, partial-line buffering).
 *
 * Why a generator and not `for await (… of res.body)` directly: async-iteration
 * of a raw ReadableStream isn't shipped in Chrome/Safari yet, whereas iterating
 * an async generator is universal — so this one wrapped reader loop stays
 * portable on both the client (buildStream) and the server (build route).
 */
export async function* sseEvents(
  res: Response,
): AsyncGenerator<EventSourceMessage> {
  if (!res.body) return;
  const reader = res.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new EventSourceParserStream())
    .getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
