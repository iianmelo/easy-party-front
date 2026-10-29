'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { getProduct } from 'data/catalog';
import PageShell from 'components/page-shell';
import { Button } from 'components/ui/button';
import { formatBRL } from 'lib/format';
import type {
  PartyContext,
  ServiceRecommendation
} from 'lib/assistant-types';
import { useCommerce } from 'providers/commerce';

interface UiMessage {
  role: 'user' | 'assistant';
  content: string;
  recommendations?: ServiceRecommendation[];
  estimatedTotal?: number;
}

const prompts = [
  'Quero um aniversário para 40 amigos',
  'Casamento íntimo na praia para 80 pessoas',
  'Confraternização da empresa com orçamento de 12 mil'
];

const fields: {
  key: keyof PartyContext;
  label: string;
  kind: 'text' | 'number';
}[] = [
  { key: 'eventType', label: 'Tipo', kind: 'text' },
  { key: 'date', label: 'Data', kind: 'text' },
  { key: 'time', label: 'Horário', kind: 'text' },
  { key: 'audienceType', label: 'Público', kind: 'text' },
  { key: 'audienceSize', label: 'Pessoas', kind: 'number' },
  { key: 'ageRange', label: 'Idade', kind: 'text' },
  { key: 'venue', label: 'Espaço', kind: 'text' },
  { key: 'location', label: 'Local', kind: 'text' },
  { key: 'budget', label: 'Orçamento', kind: 'number' },
  { key: 'style', label: 'Estilo', kind: 'text' }
];

function displayValue(key: keyof PartyContext, context: PartyContext) {
  const value = context[key];
  if (value == null || value === '') return '';
  if (key === 'budget' && typeof value === 'number') return formatBRL(value);
  if (key === 'audienceSize') return String(value);
  if (Array.isArray(value)) return value.join(', ');
  return String(value);
}

function RecommendationCards({
  items,
  estimatedTotal,
  budget
}: {
  items: ServiceRecommendation[];
  estimatedTotal?: number;
  budget?: number;
}) {
  const { addToCart, toggleSaved, isSaved } = useCommerce();
  const [notice, setNotice] = useState('');
  if (!items.length) return null;
  const within = budget != null && (estimatedTotal || 0) <= budget;

  return (
    <div className="mt-4 space-y-3">
      {estimatedTotal != null && (
        <p className="rounded-2xl bg-secondary px-4 py-3 text-sm">
          Estimado <strong>{formatBRL(estimatedTotal)}</strong>
          {budget != null && (
            <>
              {' '}
              · orçamento <strong>{formatBRL(budget)}</strong> ·{' '}
              {within ? 'dentro do teto' : 'acima do teto'}
            </>
          )}
        </p>
      )}
      <ul className="space-y-3">
        {items.map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          const saved = isSaved(product.id);
          return (
            <li
              key={item.productId}
              className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm"
            >
              <div className="grid gap-3 p-3 sm:grid-cols-[112px_1fr]">
                <Link
                  href={`/single-product-page?id=${product.id}`}
                  className="relative block h-28 overflow-hidden rounded-2xl bg-secondary"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </Link>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {product.categoryLabel}
                  </p>
                  <h3 className="font-display text-xl">
                    <Link href={`/single-product-page?id=${product.id}`} className="hover:text-primary">
                      {product.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{product.supplier}</p>
                  <p className="mt-2 text-sm leading-6">{item.reason}</p>
                  <p className="mt-2 text-sm font-semibold">
                    {formatBRL(item.lineTotal)}{' '}
                    <span className="font-normal text-muted-foreground">
                      · {item.quantity} × {formatBRL(product.price)} {product.unit}
                    </span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        addToCart(product.id, item.quantity);
                        setNotice(`${product.title} adicionado ao carrinho.`);
                      }}
                    >
                      Adicionar ao carrinho
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      aria-pressed={saved}
                      onClick={() => toggleSaved(product.id)}
                    >
                      {saved ? 'Salvo' : 'Salvar'}
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-primary" aria-live="polite">
        {notice}
      </p>
    </div>
  );
}

export default function AssistentePage() {
  const [mode, setMode] = useState<'demo' | 'llm' | null>(null);
  const [context, setContext] = useState<PartyContext>({});
  const [messages, setMessages] = useState<UiMessage[]>([
    {
      role: 'assistant',
      content:
        'Olá. Conta a festa em uma frase: o tipo, para quantas pessoas e o que não pode faltar. Eu pergunto o que ainda faltar e depois monto um conjunto do catálogo.'
    }
  ]);
  const [draft, setDraft] = useState('');
  const [streaming, setStreaming] = useState('');
  const [pending, setPending] = useState(false);
  const [editing, setEditing] = useState<keyof PartyContext | null>(null);
  const [editValue, setEditValue] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef(messages);
  const contextRef = useRef(context);
  messagesRef.current = messages;
  contextRef.current = context;

  useEffect(() => {
    fetch('/api/assistant')
      .then((response) => response.json())
      .then((data) => setMode(data.mode === 'llm' ? 'llm' : 'demo'))
      .catch(() => setMode('demo'));
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streaming, pending]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;
    const history = [
      ...messagesRef.current.map(({ role, content: value }) => ({ role, content: value })),
      { role: 'user' as const, content }
    ];
    setMessages((current) => [...current, { role: 'user', content }]);
    setDraft('');
    setPending(true);
    setStreaming('');
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, context: contextRef.current })
      });
      if (!response.ok || !response.body) throw new Error('resposta inválida');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split('\n\n');
        buffer = chunks.pop() || '';
        for (const chunk of chunks) {
          const line = chunk.split('\n').find((item) => item.startsWith('data: '));
          if (!line) continue;
          const data = JSON.parse(line.slice(6));
          if (data.type === 'delta') {
            acc += data.text;
            setStreaming(acc);
          }
          if (data.type === 'done') {
            setContext(data.context || {});
            setMode(data.source === 'llm' ? 'llm' : 'demo');
            setMessages((current) => [
              ...current,
              {
                role: 'assistant',
                content: data.message,
                recommendations: data.recommendations || [],
                estimatedTotal: data.estimatedTotal
              }
            ]);
            setStreaming('');
          }
        }
      }
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: 'Não consegui responder agora. Tente de novo em instantes.'
        }
      ]);
      setStreaming('');
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(draft);
  }

  function startEdit(key: keyof PartyContext) {
    const value = context[key];
    setEditing(key);
    setEditValue(value == null ? '' : String(value));
  }

  function commitEdit(key: keyof PartyContext) {
    const field = fields.find((item) => item.key === key);
    setContext((current) => {
      const next = { ...current };
      const raw = editValue.trim();
      if (!raw) {
        delete next[key];
        return next;
      }
      if (field?.kind === 'number') {
        const parsed = Number(raw.replace(/\./g, '').replace(',', '.'));
        if (!Number.isFinite(parsed) || parsed <= 0) return current;
        if (key === 'audienceSize') next.audienceSize = Math.round(parsed);
        if (key === 'budget') next.budget = Math.round(parsed);
        return next;
      }
      return { ...next, [key]: raw };
    });
    setEditing(null);
  }

  const filled = fields.filter((field) => displayValue(field.key, context));

  return (
    <PageShell>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-8">
        <section aria-labelledby="assistente-titulo" className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Planeje com IA
          </p>
          <h1 id="assistente-titulo" className="mt-2 flex items-center gap-2 font-display text-4xl sm:text-5xl">
            <Sparkles className="h-8 w-8 text-primary" aria-hidden />
            Assistente de festa
          </h1>
          <p
            className="mt-3 rounded-2xl bg-secondary px-4 py-3 text-sm leading-6"
            role="status"
          >
            {mode === 'llm'
              ? 'Conectado a um modelo de linguagem. As recomendações usam o catálogo da Easy Party.'
              : 'Modo demonstração: as respostas vêm de um motor local em português, sem modelo de linguagem. Para usar um LLM, defina OPENAI_API_KEY no servidor.'}
          </p>

          <div
            ref={listRef}
            className="mt-4 flex max-h-[68vh] flex-col gap-3 overflow-y-auto rounded-[2rem] border border-border bg-card p-4 shadow-card"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={
                  message.role === 'user'
                    ? 'ml-auto max-w-[90%] rounded-3xl bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground'
                    : 'max-w-[95%] rounded-3xl bg-secondary px-4 py-3 text-sm leading-6'
                }
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.role === 'assistant' && message.recommendations && (
                  <RecommendationCards
                    items={message.recommendations}
                    estimatedTotal={message.estimatedTotal}
                    budget={context.budget}
                  />
                )}
              </article>
            ))}
            {streaming && (
              <article className="max-w-[95%] rounded-3xl bg-secondary px-4 py-3 text-sm leading-6">
                <p>{streaming}</p>
              </article>
            )}
            {pending && !streaming && (
              <p className="text-sm text-muted-foreground" role="status">
                Escrevendo…
              </p>
            )}
          </div>

          {messages.length < 3 && (
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Sugestões para começar">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="rounded-full border border-border bg-card px-3 py-2 text-left text-sm hover:bg-secondary"
                  onClick={() => void send(prompt)}
                  disabled={pending}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="mensagem" className="sr-only">
              Mensagem para o assistente
            </label>
            <input
              id="mensagem"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ex.: aniversário para 40 pessoas, em Boa Viagem"
              className="h-12 flex-1 rounded-full border border-input bg-card px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={pending}
            />
            <Button type="submit" disabled={pending || !draft.trim()}>
              Enviar
            </Button>
          </form>
        </section>

        <aside className="h-fit rounded-[2rem] border border-border bg-card p-5 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-2xl">Contexto da festa</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            O que o assistente já entendeu. Edite um chip e mande outra mensagem para recalcular.
          </p>
          {filled.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Ainda não há dados. Comece pela conversa ou por uma sugestão.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {filled.map((field) => (
                <li key={field.key}>
                  {editing === field.key ? (
                    <form
                      className="flex gap-2"
                      onSubmit={(event) => {
                        event.preventDefault();
                        commitEdit(field.key);
                      }}
                    >
                      <label className="sr-only" htmlFor={`edit-${field.key}`}>
                        Editar {field.label}
                      </label>
                      <input
                        id={`edit-${field.key}`}
                        value={editValue}
                        onChange={(event) => setEditValue(event.target.value)}
                        className="h-10 flex-1 rounded-full border border-input px-3 text-sm"
                        autoFocus
                      />
                      <Button type="submit" size="sm">
                        Ok
                      </Button>
                    </form>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(field.key)}
                        className="flex-1 rounded-full border border-border bg-secondary px-3 py-2 text-left text-sm hover:bg-background"
                      >
                        <span className="text-muted-foreground">{field.label}: </span>
                        <span className="font-medium">{displayValue(field.key, context)}</span>
                      </button>
                      <button
                        type="button"
                        className="h-10 w-10 rounded-full border border-border text-sm hover:bg-secondary"
                        aria-label={`Remover ${field.label}`}
                        onClick={() =>
                          setContext((current) => {
                            const next = { ...current };
                            delete next[field.key];
                            return next;
                          })
                        }
                      >
                        ×
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          {context.preferences && context.preferences.length > 0 && (
            <p className="mt-4 text-sm">
              <span className="text-muted-foreground">Preferências: </span>
              {context.preferences.join(', ')}
            </p>
          )}
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Os preços saem do catálogo local. Nada é contratado até você adicionar ao carrinho.
          </p>
        </aside>
      </div>
    </PageShell>
  );
}
