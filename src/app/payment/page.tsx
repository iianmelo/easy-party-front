'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mastercard, pix, visa } from 'assets';
import { getProduct } from 'data/catalog';
import PageShell from 'components/page-shell';
import EmptyState from 'components/empty-state';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { formatBRL } from 'lib/format';
import { useCommerce } from 'providers/commerce';

const ORDER_KEY = 'easyparty.lastOrder';

export default function PaymentPage() {
  const router = useRouter();
  const { lines, ready, subtotal, fee, total, count, clearCart } = useCommerce();
  const [error, setError] = useState('');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const card = String(data.get('card') || '').replace(/\s/g, '');
    const expiry = String(data.get('expiry') || '').trim();
    const cvv = String(data.get('cvv') || '').trim();

    if (name.length < 3) {
      setError('Informe o nome como está no cartão.');
      return;
    }
    if (!/^\d{13,19}$/.test(card)) {
      setError('O número do cartão precisa ter entre 13 e 19 dígitos.');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError('Use a validade no formato MM/AA.');
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setError('O CVV tem 3 ou 4 dígitos.');
      return;
    }

    const order = {
      id: `EP-${Date.now().toString().slice(-6)}`,
      total,
      count,
      name,
      at: new Date().toISOString()
    };
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    clearCart();
    router.push('/payment/sucesso');
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-4xl sm:text-5xl">Pagamento</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Checkout de demonstração. Nenhum valor é cobrado e os dados do cartão
          não saem deste navegador.
        </p>

        {!ready ? (
          <p className="mt-10 text-muted-foreground">Carregando pedido…</p>
        ) : lines.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="Não há itens para pagar"
              body="Adicione um serviço ao carrinho antes de abrir o checkout."
              action={
                <Button asChild>
                  <Link href="/servicos">Ver serviços</Link>
                </Button>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <ul className="space-y-3">
              {lines.map((line) => {
                const product = getProduct(line.id);
                if (!product) return null;
                return (
                  <li
                    key={line.id}
                    className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm"
                  >
                    <Image
                      src={product.image}
                      alt=""
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{product.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {line.qty} × {formatBRL(product.price)}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {formatBRL(product.price * line.qty)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <form
              onSubmit={onSubmit}
              className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-card"
              noValidate
            >
              <h2 className="font-display text-2xl">Dados do cartão</h2>
              <div className="mt-4 flex items-center gap-4">
                <Image src={mastercard} alt="Mastercard" width={56} height={36} />
                <Image src={visa} alt="Visa" width={56} height={36} />
                <Image src={pix} alt="Pix" width={56} height={36} />
              </div>
              <div className="mt-5 space-y-3">
                <div>
                  <Label htmlFor="name">Nome no cartão</Label>
                  <Input id="name" name="name" autoComplete="cc-name" required className="mt-1 text-foreground" />
                </div>
                <div>
                  <Label htmlFor="card">Número do cartão</Label>
                  <Input
                    id="card"
                    name="card"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000"
                    required
                    className="mt-1 text-foreground"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiry">Validade</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      autoComplete="cc-exp"
                      placeholder="MM/AA"
                      required
                      className="mt-1 text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      required
                      className="mt-1 text-foreground"
                    />
                  </div>
                </div>
              </div>
              <dl className="mt-5 space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{formatBRL(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Taxa de serviço (5%)</dt>
                  <dd>{formatBRL(fee)}</dd>
                </div>
                <div className="flex justify-between pt-2 text-lg font-semibold">
                  <dt>Total</dt>
                  <dd>{formatBRL(total)}</dd>
                </div>
              </dl>
              {error && (
                <p className="mt-3 rounded-2xl bg-white/15 px-3 py-2 text-sm" role="alert">
                  {error}
                </p>
              )}
              <Button type="submit" variant="secondary" className="mt-5 w-full">
                Confirmar pedido de demonstração
              </Button>
            </form>
          </div>
        )}
      </section>
    </PageShell>
  );
}
