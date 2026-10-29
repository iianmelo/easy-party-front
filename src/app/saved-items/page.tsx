'use client';

import Link from 'next/link';
import { getProduct } from 'data/catalog';
import PageShell from 'components/page-shell';
import ServiceCard from 'components/service-card';
import EmptyState from 'components/empty-state';
import { Button } from 'components/ui/button';
import { useCommerce } from 'providers/commerce';

export default function SavedItemsPage() {
  const { savedIds, ready } = useCommerce();
  const saved = savedIds
    .map((id) => getProduct(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-4xl sm:text-5xl">Salvos</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Serviços que você marcou para comparar depois. A lista fica neste
          navegador.
        </p>
        {!ready ? (
          <p className="mt-10 text-muted-foreground">Carregando lista…</p>
        ) : saved.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="Nenhum serviço salvo"
              body="Use o marcador no card ou o botão Salvar na página do serviço."
              action={
                <Button asChild>
                  <Link href="/servicos">Explorar serviços</Link>
                </Button>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((product) => (
              <ServiceCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
