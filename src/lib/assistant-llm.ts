import { getProduct, products } from 'data/catalog';
import { formatBRL, roundMoney } from 'lib/format';
import {
  lineTotal,
  missingFields,
  priceRecommendations,
  recommendFromCatalog
} from 'lib/assistant-engine';
import type {
  AssistantTurn,
  ChatMessage,
  PartyContext
} from 'lib/assistant-types';

const catalogBrief = products.map((product) => ({
  id: product.id,
  title: product.title,
  category: product.categoryLabel,
  supplier: product.supplier,
  price: product.price,
  unit: product.unit,
  rating: product.rating,
  tags: product.tags,
  events: product.events,
  description: product.description
}));

function toolSchema() {
  return {
    type: 'function',
    function: {
      name: 'atualizar_plano',
      description:
        'Atualiza o contexto da festa e, quando já der para decidir, recomenda serviços existentes pelo id do catálogo.',
      parameters: {
        type: 'object',
        additionalProperties: false,
        properties: {
          message: {
            type: 'string',
            description: 'Resposta em português, curta, para mostrar no chat.'
          },
          context: {
            type: 'object',
            properties: {
              eventType: { type: 'string' },
              date: { type: 'string' },
              time: { type: 'string' },
              audienceType: { type: 'string' },
              audienceSize: { type: 'number' },
              ageRange: { type: 'string' },
              venue: { type: 'string' },
              location: { type: 'string' },
              budget: { type: 'number' },
              style: { type: 'string' },
              preferences: { type: 'array', items: { type: 'string' } }
            }
          },
          readyToRecommend: { type: 'boolean' },
          recommendations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: { type: 'string' },
                quantity: { type: 'number' },
                reason: {
                  type: 'string',
                  description: 'Começa com "Por que recomendamos:".'
                }
              },
              required: ['productId', 'quantity', 'reason']
            }
          }
        },
        required: ['message', 'context', 'readyToRecommend']
      }
    }
  };
}

function asObject(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function readPayload(raw: unknown) {
  const data = asObject(raw);
  if (!data || typeof data.message !== 'string') return null;
  const context = asObject(data.context) || {};
  const recs = Array.isArray(data.recommendations) ? data.recommendations : [];
  return {
    message: data.message,
    ready: Boolean(data.readyToRecommend),
    context: context as PartyContext,
    recommendations: recs
      .map((item) => asObject(item))
      .filter((item): item is Record<string, unknown> => Boolean(item))
      .map((item) => ({
        productId: String(item.productId || ''),
        quantity: Number(item.quantity || 1),
        reason: typeof item.reason === 'string' ? item.reason : ''
      }))
  };
}

function parseChoice(payload: unknown) {
  const root = asObject(payload);
  const choice = Array.isArray(root?.choices) ? asObject(root.choices[0]) : null;
  const message = asObject(choice?.message);
  const toolCalls = Array.isArray(message?.tool_calls) ? message.tool_calls : [];
  const call = asObject(toolCalls[0]);
  const fn = asObject(call?.function);
  const args = fn?.arguments;
  if (typeof args === 'string') {
    try {
      return readPayload(JSON.parse(args));
    } catch {
      return null;
    }
  }
  if (args) return readPayload(args);
  if (typeof message?.content === 'string') {
    try {
      return readPayload(JSON.parse(message.content));
    } catch {
      return null;
    }
  }
  return null;
}

function mergeContext(base: PartyContext, extracted: PartyContext): PartyContext {
  const next: PartyContext = { ...base, preferences: [...(base.preferences || [])] };
  const keys = [
    'eventType',
    'date',
    'time',
    'audienceType',
    'ageRange',
    'venue',
    'location',
    'style'
  ] as const;
  for (const key of keys) {
    const value = extracted[key];
    if (typeof value === 'string' && value.trim()) next[key] = value.trim().slice(0, 80);
  }
  if (typeof extracted.audienceSize === 'number' && extracted.audienceSize > 0) {
    next.audienceSize = Math.round(extracted.audienceSize);
  }
  if (typeof extracted.budget === 'number' && extracted.budget > 0) {
    next.budget = Math.round(extracted.budget);
  }
  if (Array.isArray(extracted.preferences)) {
    next.preferences = Array.from(
      new Set([...(next.preferences || []), ...extracted.preferences.map(String)])
    ).slice(0, 12);
  }
  return next;
}

export function hasLlmKey() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function runLlmTurn(
  messages: ChatMessage[],
  base: PartyContext
): Promise<AssistantTurn | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(
    /\/$/,
    ''
  );
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      tools: [toolSchema()],
      tool_choice: { type: 'function', function: { name: 'atualizar_plano' } },
      messages: [
        {
          role: 'system',
          content: [
            'Você é o assistente de festas da Easy Party, em português do Brasil.',
            'Converse para completar o contexto: tipo, data, horário, público, quantidade, faixa etária, local, cidade, orçamento e estilo.',
            'Faça uma pergunta de cada vez enquanto faltar algo importante (tipo, quantidade ou orçamento).',
            'Quando der para recomendar, chame a ferramenta com readyToRecommend true e no máximo um serviço por categoria.',
            'Use somente productId existentes no catálogo. A quantidade de item "por pessoa" deve ser o número de convidados.',
            'Cada reason começa com "Por que recomendamos:".',
            'Não invente preço: o servidor recalcula.',
            `Catálogo: ${JSON.stringify(catalogBrief)}`
          ].join(' ')
        },
        {
          role: 'user',
          content: JSON.stringify({
            contextoAtual: base,
            conversa: messages.slice(-12)
          })
        }
      ]
    }),
    signal: AbortSignal.timeout(20000)
  });

  if (!response.ok) return null;
  const parsed = parseChoice(await response.json());
  if (!parsed) return null;

  const context = mergeContext(base, parsed.context);
  const recommendations = parsed.ready
    ? priceRecommendations(parsed.recommendations).map((item) => {
        const product = getProduct(item.productId);
        if (product?.unit.includes('pessoa') && context.audienceSize) {
          return {
            ...item,
            quantity: context.audienceSize,
            lineTotal: lineTotal(product, context.audienceSize)
          };
        }
        return item;
      })
    : [];
  const safeRecs = recommendations.length
    ? recommendations
    : parsed.ready
      ? recommendFromCatalog(context)
      : [];
  const estimatedTotal = roundMoney(safeRecs.reduce((sum, item) => sum + item.lineTotal, 0));
  const budgetNote =
    context.budget && safeRecs.length
      ? ` Estimado ${formatBRL(estimatedTotal)} frente a um teto de ${formatBRL(context.budget)}.`
      : '';

  return {
    source: 'llm',
    message: `${parsed.message.trim()}${budgetNote}`,
    context,
    recommendations: safeRecs,
    estimatedTotal,
    missing: missingFields(context)
  };
}
