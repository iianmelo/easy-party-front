'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageShell from 'components/page-shell';
import EmptyState from 'components/empty-state';
import { Button } from 'components/ui/button';
import { formatBRL } from 'lib/format';

interface DemoOrder {
  id: string;
  total: number;
  count: number;
  name: string;
}

export default function PaymentSuccessPage() {
  const [order, setOrder] = useState<DemoOrder | null | undefined>(undefined);

  useEffect(() => {
    const raw = sessionStorage.getItem('easyparty.lastOrder');
    if (!raw) {
      setOrder(null);
      return;
    }
    try {
      setOrder(JSON.parse(raw) as DemoOrder);
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        {order === undefined ? (
          <p className="text-muted-foreground">Carregando confirmação…</p>
        ) : order === null ? (
          <EmptyState
            title="Nenhum pedido por aqui"
            body="Confirme um checkout de demonstração para ver esta tela."
            action={
              <Button asChild>
                <Link href="/servicos">Ver serviços</Link>
              </Button>
            }
          />
        ) : (
          <div className="rounded-[2rem] border border-border bg-card px-6 py-12 text-center shadow-card sm:px-10">
            <p className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground">
              ✓
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Pedido de demonstração
            </p>
            <h1 className="mt-2 font-display text-4xl">Pedido registrado</h1>
            <p className="mt-3 text-muted-foreground">
              Nenhum pagamento foi processado. Este recibo existe só nesta aba.
            </p>
            <dl className="mx-auto mt-8 max-w-sm space-y-2 text-left text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Número</dt>
                <dd className="font-semibold">{order.id}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Nome</dt>
                <dd className="font-semibold">{order.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Itens</dt>
                <dd className="font-semibold">{order.count}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Total</dt>
                <dd className="font-semibold">{formatBRL(order.total)}</dd>
              </div>
            </dl>
            <Button className="mt-8" asChild>
              <Link href="/">Voltar ao início</Link>
            </Button>
          </div>
        )}
      </section>
    </PageShell>
  );
}
