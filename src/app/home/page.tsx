import Image from 'next/image';
import Link from 'next/link';
import { PartyHome } from 'assets';
import { categories, featuredProducts } from 'data/catalog';
import PageShell from 'components/page-shell';
import ServiceCard from 'components/service-card';
import { Button } from 'components/ui/button';

const steps = [
  {
    number: '01',
    title: 'Conte a festa',
    text: 'Tipo, tamanho e estilo. Uma descrição já serve de ponto de partida.'
  },
  {
    number: '02',
    title: 'Compare do mesmo jeito',
    text: 'Preço, foto e avaliação no mesmo card, em vez de prints soltos.'
  },
  {
    number: '03',
    title: 'Monte o pedido',
    text: 'Carrinho, lista de salvos e um checkout de demonstração para fechar o fluxo.'
  }
];

const quotes = [
  {
    name: 'Ana Lima',
    context: 'Aniversário · depoimento fictício',
    text: 'Juntei buffet e DJ no mesmo lugar e parei de pedir orçamento em cinco conversas diferentes.'
  },
  {
    name: 'Carlos Prado',
    context: 'Casamento íntimo · depoimento fictício',
    text: 'O que ajudou foi ver preço e foto lado a lado antes de chamar o fornecedor.'
  },
  {
    name: 'Marina Costa',
    context: 'Confraternização · depoimento fictício',
    text: 'Descrevi a festa em uma frase e saí com uma lista curta para comparar, não com um catálogo infinito.'
  }
];

export default function Home() {
  const featured = featuredProducts();

  return (
    <PageShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Festas em Recife e região
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.1] text-foreground sm:text-6xl">
            A festa inteira, num só lugar.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Descreva o evento e compare buffet, decoração, música e mídia sem
            abrir dez conversas. A Easy Party organiza as opções para você
            decidir com calma.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/create-party">Monte sua festa</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/servicos">Explorar serviços</Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-card">
            <Image
              src={PartyHome}
              alt="Ilustração de uma festa com mesa, bolo e pista"
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number}>
              <p className="font-display text-3xl text-primary">{step.number}</p>
              <h2 className="mt-2 font-display text-2xl">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Por onde começar</h2>
            <p className="mt-2 text-muted-foreground">
              Quatro frentes que quase toda festa precisa resolver.
            </p>
          </div>
          <Link href="/servicos" className="hidden text-sm font-semibold text-primary sm:inline">
            Ver tudo
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-2xl">{category.label}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {category.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">Em destaque</h2>
        <p className="mt-2 text-muted-foreground">
          Serviços do catálogo local, ordenados pela avaliação de demonstração.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ServiceCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-[2rem] bg-secondary px-6 py-10 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Conteúdo de demonstração
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            O que um anfitrião poderia dizer
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Textos fictícios para mostrar o espaço de prova social. Não são
            avaliações reais e não medem o projeto.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {quotes.map((quote) => (
              <figure
                key={quote.name}
                className="rounded-3xl bg-card p-5 shadow-card"
              >
                <blockquote className="text-base leading-7">
                  “{quote.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{quote.name}</span>
                  <span className="mt-1 block text-muted-foreground">
                    {quote.context}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
