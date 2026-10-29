'use client';

import { useMemo, useState } from 'react';
import {
  filterProducts,
  productsByCategory,
  tagsIn,
  type CategoryId,
  type SortKey
} from 'data/catalog';
import PageShell from 'components/page-shell';
import ServiceCard from 'components/service-card';
import EmptyState from 'components/empty-state';
import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';

export default function CatalogView({
  category,
  title,
  lede
}: {
  category: CategoryId;
  title: string;
  lede: string;
}) {
  const source = useMemo(() => productsByCategory(category), [category]);
  const tags = useMemo(() => tagsIn(source), [source]);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');
  const [sort, setSort] = useState<SortKey>('rating');
  const results = filterProducts(source, query, tag, sort);

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Catálogo
        </p>
        <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          {lede}
        </p>

        <form
          className="mt-8 grid gap-3 rounded-3xl border border-border bg-card p-4 shadow-card sm:grid-cols-[1fr_auto]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div>
            <label htmlFor="busca-categoria" className="text-sm font-medium">
              Buscar nesta categoria
            </label>
            <input
              id="busca-categoria"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nome, fornecedor ou ocasião"
              className="mt-1 h-11 w-full rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="ordem" className="text-sm font-medium">
              Ordenar
            </label>
            <select
              id="ordem"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="mt-1 h-11 w-full rounded-full border border-input bg-background px-4 text-sm sm:min-w-48"
            >
              <option value="rating">Melhor avaliação</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm font-medium" id="filtros-ocasiao">
              Ocasião
            </p>
            <div
              className="mt-2 flex flex-wrap gap-2"
              role="group"
              aria-labelledby="filtros-ocasiao"
            >
              <button
                type="button"
                aria-pressed={tag === ''}
                onClick={() => setTag('')}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-sm transition-colors',
                  tag === ''
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background hover:bg-secondary'
                )}
              >
                Todas
              </button>
              {tags.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={tag === item}
                  onClick={() => setTag(item === tag ? '' : item)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-sm transition-colors',
                    tag === item
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background hover:bg-secondary'
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </form>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {results.length === 1
            ? '1 serviço'
            : `${results.length} serviços`}
        </p>

        {results.length > 0 ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((product) => (
              <ServiceCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              title="Nada com esses filtros"
              body="Tente outro nome ou limpe a ocasião. O catálogo desta categoria continua aqui."
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery('');
                    setTag('');
                  }}
                >
                  Limpar filtros
                </Button>
              }
            />
          </div>
        )}
      </section>
    </PageShell>
  );
}
