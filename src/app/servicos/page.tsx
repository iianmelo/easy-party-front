'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories, filterProducts, products } from 'data/catalog';
import PageShell from 'components/page-shell';
import ServiceCard from 'components/service-card';
import EmptyState from 'components/empty-state';
import { Button } from 'components/ui/button';

export default function Servicos() {
  const [query, setQuery] = useState('');
  const results = useMemo(
    () => filterProducts(products, query, '', 'rating'),
    [query]
  );
  const visibleCategories = categories.filter((category) =>
    results.some((product) => product.category === category.id)
  );

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Serviços
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">
          Tudo o que a festa pede
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Quatro categorias e um catálogo com preço, foto e avaliação. A busca
          olha nome, fornecedor e ocasião.
        </p>

        <form
          className="mt-8"
          onSubmit={(event) => event.preventDefault()}
          role="search"
        >
          <label htmlFor="busca-servicos" className="text-sm font-medium">
            Buscar serviços
          </label>
          <input
            id="busca-servicos"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buffet, DJ, casamento, infantil..."
            className="mt-1 h-12 w-full rounded-full border border-input bg-card px-5 text-base shadow-card outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </form>

        {visibleCategories.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group overflow-hidden rounded-3xl border border-border shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl">
            {query.trim() ? 'Resultados' : 'Catálogo'}
          </h2>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {results.length} {results.length === 1 ? 'serviço' : 'serviços'}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((product) => (
              <ServiceCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              title="Nenhum serviço com esse termo"
              body="Busque por buffet, decoração, música, foto ou por uma ocasião como casamento."
              action={
                <Button variant="outline" onClick={() => setQuery('')}>
                  Limpar busca
                </Button>
              }
            />
          </div>
        )}
      </section>
    </PageShell>
  );
}
