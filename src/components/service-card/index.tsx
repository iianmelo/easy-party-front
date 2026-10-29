'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import type { Product } from 'data/catalog';
import Rating from 'components/rating';
import { formatBRL } from 'lib/format';
import { useCommerce } from 'providers/commerce';
import { cn } from 'lib/utils';

export default function ServiceCard({ product }: { product: Product }) {
  const { isSaved, toggleSaved } = useCommerce();
  const saved = isSaved(product.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        href={`/single-product-page?id=${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-secondary"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {product.categoryLabel}
          </p>
          <button
            type="button"
            aria-pressed={saved}
            aria-label={
              saved
                ? `Remover ${product.title} dos salvos`
                : `Salvar ${product.title}`
            }
            onClick={() => toggleSaved(product.id)}
            className={cn(
              'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors',
              saved
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:bg-secondary'
            )}
          >
            <Bookmark className="h-4 w-4" fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
        <h3 className="font-display text-xl leading-tight">
          <Link
            href={`/single-product-page?id=${product.id}`}
            className="hover:text-primary"
          >
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{product.supplier}</p>
        <Rating value={product.rating} reviews={product.reviews} />
        <p className="mt-auto pt-3 text-base">
          <span className="font-semibold">{formatBRL(product.price)}</span>{' '}
          <span className="text-sm text-muted-foreground">{product.unit}</span>
        </p>
      </div>
    </article>
  );
}
