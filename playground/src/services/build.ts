import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { sseEvents } from '@/util/sse';
import {
  buildSystemPrompt,
  FEW_SHOT,
  refinementMessage,
  parseEnvelope,
  extractClosedObservations,
  extractMessageDelta,
  isKnownType,
  sse,
  parseOpenAIDelta,
} from '@ken/ai';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'meta-llama/llama-3.3-70b-instruct';

async function fallbackBuild(messages: unknown[], apiKey: string) {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok)
    return { ok: false as const, error: `Model error (${res.status}).` };
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return parseEnvelope(data.choices?.[0]?.message?.content ?? '', isKnownType);
}

export async function handleBuild(request: Request): Promise<Response> {
  // No anonymous LLM calls.
  let user = null;
  try {
    const supabase = await getServerSupabase();
    user = (await supabase.auth.getUser()).data.user;
  } catch {
    user = null;
  }
  if (!user)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: {
    prompt?: string;
    history?: { role: 'user' | 'assistant'; content: string }[];
    baseSpec?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }
  const { prompt, history = [], baseSpec = null } = body;
  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ error: 'Missing prompt.' }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey)
    return NextResponse.json(
      { error: 'Server is missing OPENROUTER_API_KEY.' },
      { status: 500 },
    );

  const messages = [
    { role: 'system', content: buildSystemPrompt() },
    ...FEW_SHOT,
    ...(baseSpec ? [refinementMessage(baseSpec)] : []),
    ...history.slice(-6),
    { role: 'user', content: prompt },
  ];

  let modelRes: Response;
  try {
    modelRes = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ken.local',
        'X-Title': 'Ken AI Builder',
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.3,
        stream: true,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: 'Could not reach the model.' },
      { status: 502 },
    );
  }
  if (!modelRes.ok || !modelRes.body) {
    // Surface OpenRouter's actual reason (especially which rate limit) instead of a bare status.
    const raw = await modelRes.text().catch(() => '');
    let upstream = '';
    try {
      upstream =
        (JSON.parse(raw) as { error?: { message?: string } }).error?.message ??
        '';
    } catch {
      /* non-JSON body */
    }
    const msg =
      modelRes.status === 429
        ? `Rate limited by OpenRouter${upstream ? ` — ${upstream}` : '. Wait a moment and retry.'}`
        : modelRes.status === 402
          ? 'OpenRouter credit exhausted — top up your balance to continue.'
          : `Model error (${modelRes.status})${upstream ? ` — ${upstream}` : '.'}`;
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  // sseEvents owns all SSE framing (the `data:` prefix, keep-alive comments,
  // partial-line buffering) — here we only read each delta.
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, data: unknown) =>
        controller.enqueue(encoder.encode(sse(event, data)));
      let content = '';
      let emitted = 0; // observations already sent
      let msgEmitted = 0; // message chars already sent

      try {
        for await (const ev of sseEvents(modelRes)) {
          const delta = parseOpenAIDelta(ev.data);
          if (delta.done) break;
          if (delta.content) content += delta.content;

          const obs = extractClosedObservations(content);
          for (; emitted < obs.length; emitted++)
            send('observation', obs[emitted]);

          const msg = extractMessageDelta(content);
          if (msg.text.length > msgEmitted) {
            send('message', { delta: msg.text.slice(msgEmitted) });
            msgEmitted = msg.text.length;
          }
        }

        // Sanitize server-side. If the streamed (non-JSON-mode) output didn't
        // parse, retry once in strict JSON mode as a fallback.
        let result = parseEnvelope(content, isKnownType);
        if (!result.ok) {
          const fb = await fallbackBuild(messages, apiKey);
          if (fb.ok) result = fb;
        }
        if (!result.ok) {
          send('error', { error: result.error });
        } else {
          for (; emitted < result.observations.length; emitted++)
            send('observation', result.observations[emitted]);
          send('spec', {
            spec: result.spec,
            observations: result.observations,
            message: result.message,
          });
        }
      } catch {
        send('error', { error: 'The stream was interrupted.' });
      } finally {
        send('done', {});
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
