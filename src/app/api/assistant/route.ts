import { hasLlmKey, runLlmTurn } from 'lib/assistant-llm';
import { runDemoTurn } from 'lib/assistant-engine';
import type { AssistantTurn, ChatMessage, PartyContext } from 'lib/assistant-types';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ mode: hasLlmKey() ? 'llm' : 'demo' });
}

function sanitizeContext(input: unknown): PartyContext {
  if (!input || typeof input !== 'object') return {};
  const source = input as Record<string, unknown>;
  const text = (key: string) =>
    typeof source[key] === 'string' ? source[key].trim().slice(0, 80) : undefined;
  const context: PartyContext = {};
  const eventType = text('eventType');
  const date = text('date');
  const time = text('time');
  const audienceType = text('audienceType');
  const ageRange = text('ageRange');
  const venue = text('venue');
  const location = text('location');
  const style = text('style');
  if (eventType) context.eventType = eventType;
  if (date) context.date = date;
  if (time) context.time = time;
  if (audienceType) context.audienceType = audienceType;
  if (ageRange) context.ageRange = ageRange;
  if (venue) context.venue = venue;
  if (location) context.location = location;
  if (style) context.style = style;
  if (typeof source.audienceSize === 'number' && source.audienceSize > 0 && source.audienceSize < 5000) {
    context.audienceSize = Math.round(source.audienceSize);
  }
  if (typeof source.budget === 'number' && source.budget > 0 && source.budget < 100000000) {
    context.budget = Math.round(source.budget);
  }
  if (Array.isArray(source.preferences)) {
    context.preferences = source.preferences
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.slice(0, 40))
      .slice(0, 12);
  }
  return context;
}

function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const role = (item as ChatMessage).role;
      const content = (item as ChatMessage).content;
      if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
      const trimmed = content.trim().slice(0, 2000);
      if (!trimmed) return null;
      return { role, content: trimmed };
    })
    .filter((item): item is ChatMessage => Boolean(item))
    .slice(-12);
}

function streamTurn(turn: AssistantTurn) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const parts = turn.message.split(/(\s+)/);
      for (const part of parts) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'delta', text: part })}\n\n`)
        );
        await new Promise((resolve) => setTimeout(resolve, 12));
      }
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: 'done',
            source: turn.source,
            message: turn.message,
            context: turn.context,
            recommendations: turn.recommendations,
            estimatedTotal: turn.estimatedTotal,
            missing: turn.missing
          })}\n\n`
        )
      );
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform'
    }
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const messages = sanitizeMessages(body?.messages);
  const context = sanitizeContext(body?.context);
  const latest = [...messages].reverse().find((message) => message.role === 'user');
  if (!latest) {
    return Response.json({ error: 'Envie uma mensagem.' }, { status: 400 });
  }

  const userTurns = messages.filter((message) => message.role === 'user').length;
  let turn = runDemoTurn(latest.content, context, userTurns);
  if (hasLlmKey()) {
    try {
      const llm = await runLlmTurn(messages, context);
      if (llm) turn = llm;
    } catch {
      console.error('Falha ao chamar o modelo; usando o modo demonstração.');
      turn = { ...runDemoTurn(latest.content, context, userTurns), source: 'demo' };
    }
  }

  return streamTurn(turn);
}
