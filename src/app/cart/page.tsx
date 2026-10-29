'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from 'data/catalog';
import PageShell from 'components/page-shell';
import EmptyState from 'components/empty-state';
import { Button } from 'components/ui/button';
import { formatBRL } from 'lib/format';
import { useCommerce } from 'providers/commerce';

export default function CartPage() {
  const { lines, ready, setQty, remove, subtotal, fee, total, count } =
    useCommerce();

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-4xl sm:text-5xl">Carrinho</h1>
        <p className="mt-2 text-muted-foreground">
          Os totais acompanham a quantidade e ficam salvos neste navegador.
        </p>

        {!ready ? (
          <p className="mt-10 text-muted-foreground">Carregando carrinho…</p>
        ) : lines.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="Seu carrinho está vazio"
              body="Escolha um serviço no catálogo. A quantidade e o total aparecem aqui."
              action={
                <Button asChild>
                  <Link href="/servicos">Ver serviços</Link>
                </Button>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <ul className="space-y-4">
              {lines.map((line) => {
                const product = getProduct(line.id);
                if (!product) return null;
                const lineTotal = product.price * line.qty;
                return (
                  <li
                    key={line.id}
                    className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-card sm:flex-row"
                  >
                    <Image
                      src={product.image}
                      alt=""
                      width={120}
                      height={120}
                      className="h-28 w-full rounded-2xl object-cover sm:w-28"
                    />
                    <div className="flex flex-1 flex-col">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {product.categoryLabel}
                      </p>
                      <h2 className="font-display text-2xl">
                        <Link
                          href={`/single-product-page?id=${product.id}`}
                          className="hover:text-primary"
                        >
                          {product.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {formatBRL(product.price)} {product.unit}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            className="h-10 w-10 rounded-full hover:bg-secondary"
                            aria-label={`Diminuir quantidade de ${product.title}`}
                            onClick={() => setQty(line.id, line.qty - 1)}
                            disabled={line.qty <= 1}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            className="h-10 w-10 rounded-full hover:bg-secondary"
                            aria-label={`Aumentar quantidade de ${product.title}`}
                            onClick={() => setQty(line.id, line.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                          onClick={() => remove(line.id)}
                        >
                          Remover
                        </button>
                        <p className="ml-auto font-semibold">
                          {formatBRL(lineTotal)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <aside className="h-fit rounded-3xl bg-primary p-6 text-primary-foreground shadow-card lg:sticky lg:top-24">
              <h2 className="font-display text-2xl">Resumo</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt>Itens</dt>
                  <dd>{count}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Subtotal</dt>
                  <dd>{formatBRL(subtotal)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Taxa de serviço (5%)</dt>
                  <dd>{formatBRL(fee)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-white/30 pt-3 text-lg font-semibold">
                  <dt>Total</dt>
                  <dd>{formatBRL(total)}</dd>
                </div>
              </dl>
              <Button
                variant="secondary"
                className="mt-6 w-full"
                asChild
              >
                <Link href="/payment">Seguir para o pagamento</Link>
              </Button>
            </aside>
          </div>
        )}
      </section>
    </PageShell>
  );
}
