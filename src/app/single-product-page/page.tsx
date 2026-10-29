'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getProduct } from 'data/catalog';
import PageShell from 'components/page-shell';
import Rating from 'components/rating';
import EmptyState from 'components/empty-state';
import { Button } from 'components/ui/button';
import { formatBRL } from 'lib/format';
import { useCommerce } from 'providers/commerce';
import { Suspense } from 'react';

function ProductContent() {
  const params = useSearchParams();
  const product = getProduct(params.get('id'));
  const { addToCart, toggleSaved, isSaved } = useCommerce();
  const [imageIndex, setImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [notice, setNotice] = useState('');

  if (!product) {
    return (
      <PageShell>
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <EmptyState
            title="Serviço não encontrado"
            body="Esse link não corresponde a um item do catálogo."
            action={
              <Button asChild>
                <Link href="/servicos">Voltar aos serviços</Link>
              </Button>
            }
          />
        </section>
      </PageShell>
    );
  }

  const image = product.gallery[imageIndex] ?? product.image;
  const saved = isSaved(product.id);

  return (
    <PageShell>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
        <div>
          <nav aria-label="Trilha" className="mb-4 text-sm text-muted-foreground">
            <Link href="/servicos" className="hover:text-primary">
              Serviços
            </Link>
            <span aria-hidden> / </span>
            <Link
              href={
                product.category === 'alimentacao'
                  ? '/subcategoria-alimentacao'
                  : product.category === 'musica'
                    ? '/subcategoria-musica'
                    : product.category === 'decoracao'
                      ? '/subcategoria-decoracao'
                      : '/subcategoria-midia'
              }
              className="hover:text-primary"
            >
              {product.categoryLabel}
            </Link>
            <span aria-hidden> / </span>
            <span className="text-foreground">{product.title}</span>
          </nav>
          <div className="overflow-hidden rounded-[2rem] bg-secondary shadow-card">
            <Image
              src={image}
              alt={product.title}
              className="h-auto max-h-[560px] w-full object-cover"
              priority
            />
          </div>
          {product.gallery.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.gallery.map((shot, index) => (
                <button
                  key={`${product.id}-${index}`}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={`Ver foto ${index + 1} de ${product.title}`}
                  aria-pressed={index === imageIndex}
                  className={`overflow-hidden rounded-2xl border-2 ${
                    index === imageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image src={shot} alt="" width={84} height={84} className="h-16 w-16 object-cover sm:h-20 sm:w-20" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            {product.supplier}
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">{product.title}</h1>
          <p className="mt-3 text-2xl font-semibold">
            {formatBRL(product.price)}{' '}
            <span className="text-base font-normal text-muted-foreground">
              {product.unit}
            </span>
          </p>
          <div className="mt-3">
            <Rating value={product.rating} reviews={product.reviews} />
          </div>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {product.description}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Ocasiões: {product.events.join(', ')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <label htmlFor="quantidade" className="text-sm font-medium">
              Quantidade
            </label>
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button
                type="button"
                className="h-11 w-11 rounded-full hover:bg-secondary"
                aria-label="Diminuir quantidade"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
              >
                −
              </button>
              <span id="quantidade" className="w-8 text-center font-semibold">
                {qty}
              </span>
              <button
                type="button"
                className="h-11 w-11 rounded-full hover:bg-secondary"
                aria-label="Aumentar quantidade"
                onClick={() => setQty((value) => value + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                addToCart(product.id, qty);
                setNotice(
                  `${product.title} adicionado ao carrinho (${qty}).`
                );
              }}
            >
              Adicionar ao carrinho
            </Button>
            <Button
              variant="outline"
              aria-pressed={saved}
              onClick={() => toggleSaved(product.id)}
            >
              {saved ? 'Salvo na lista' : 'Salvar'}
            </Button>
          </div>
          <p className="mt-3 text-sm text-primary" aria-live="polite">
            {notice}
          </p>
        </div>
      </section>
    </PageShell>
  );
}

export default function SingleProductPage() {
  return (
    <Suspense
      fallback={
        <PageShell>
          <p className="px-6 py-16 text-muted-foreground">Carregando serviço…</p>
        </PageShell>
      }
    >
      <ProductContent />
    </Suspense>
  );
}
