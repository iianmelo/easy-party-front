'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import {
  BuffetCard,
  DJCard,
  Decoracao,
  ImgFesta,
  PhotoCard
} from 'assets';
import PageShell from 'components/page-shell';
import { Button } from 'components/ui/button';
import { getServices } from 'services/getServices';

const suggestions = [
  'Quero um aniversário temático de Hollywood para 50 pessoas.',
  'Preciso de um casamento íntimo na praia, com buffet e decoração.',
  'Quero uma festa com DJ e drinks personalizados para 100 convidados.'
];

interface Service {
  service_id: number;
  company_name: string;
  service_name: string;
  description: string;
  price_min: string;
  price_max: string;
  event_types: string[];
  specialties: string[];
  rating: string;
  location: string;
}

const groups = [
  'Alimentação',
  'Áudio Visual',
  'Entretenimento',
  'Local',
  'Ornamentação'
] as const;

function specialtiesOf(service: Service) {
  return Array.isArray(service.specialties) ? service.specialties : [];
}

function matches(service: Service, category: (typeof groups)[number]) {
  const list = specialtiesOf(service);
  if (category === 'Alimentação') {
    return list.includes('Buffet') || list.includes('Catering');
  }
  if (category === 'Áudio Visual') {
    return list.includes('Som') || list.includes('Iluminação');
  }
  if (category === 'Entretenimento') {
    return list.includes('Fotografia') || list.includes('DJ');
  }
  if (category === 'Local') return list.includes('Espaço');
  return list.includes('Decoração') || list.includes('Lembrancinhas');
}

function artFor(category: (typeof groups)[number]): StaticImageData {
  if (category === 'Alimentação') return BuffetCard;
  if (category === 'Áudio Visual') return DJCard;
  if (category === 'Entretenimento') return PhotoCard;
  if (category === 'Local') return ImgFesta;
  return Decoracao;
}

export default function CreateParty() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [haveNothing, setHaveNothing] = useState(false);
  const [usingMock, setUsingMock] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setHaveNothing(false);
    try {
      const data = await getServices({ prompt });
      const list = Array.isArray(data.services) ? data.services : [];
      setUsingMock(data.source === 'mock');
      setHaveNothing(list.length === 0);
      setServices(list);
    } catch (err) {
      console.log(err);
      setHaveNothing(true);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            Descreva a festa. A gente separa os serviços.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-primary-foreground/90">
            Conte o tamanho, o estilo e o que não pode faltar. As sugestões
            aparecem agrupadas para você comparar.
          </p>
          <form
            className="mt-8 flex flex-col gap-3 rounded-full bg-card p-2 text-left shadow-card sm:flex-row sm:items-center"
            onSubmit={(event) => {
              event.preventDefault();
              void handleSubmit();
            }}
          >
            <label htmlFor="pedido" className="sr-only">
              Descrição da festa
            </label>
            <input
              id="pedido"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              spellCheck={false}
              placeholder="Aniversário para 50 pessoas, com buffet e DJ"
              className="h-12 flex-1 rounded-full bg-transparent px-4 text-foreground outline-none placeholder:text-muted-foreground"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Buscando…' : 'Encontrar'}
            </Button>
          </form>
          <p className="mt-6 text-sm text-primary-foreground/80">Sugestões</p>
          <ul className="mt-3 space-y-2 text-left">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  onClick={() => setPrompt(suggestion)}
                  className="w-full rounded-2xl bg-white/15 px-4 py-3 text-left text-sm transition-colors hover:bg-white/25"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {loading && (
          <p className="text-center text-lg font-medium" role="status">
            Separando serviços para essa descrição…
          </p>
        )}
        {usingMock && services.length > 0 && (
          <p className="mb-6 rounded-2xl bg-secondary px-4 py-3 text-center text-sm">
            Modo demonstração: a API de recomendação não respondeu, então estas
            sugestões vêm de um catálogo local.
          </p>
        )}
        {groups.map((category) => {
          const filtered = services.filter((service) => matches(service, category));
          if (filtered.length === 0) return null;
          return (
            <div key={category} className="mb-10">
              <h2 className="font-display text-3xl">{category}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {filtered.map((service) => (
                  <article
                    key={service.service_id}
                    className="overflow-hidden rounded-3xl border border-border bg-card shadow-card"
                  >
                    <Image
                      src={artFor(category)}
                      alt=""
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-5">
                      <h3 className="font-display text-2xl">{service.service_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.company_name} · {service.location}
                      </p>
                      <p className="mt-2 text-sm leading-6">{service.description}</p>
                      <p className="mt-3 font-semibold">
                        {service.price_min} – {service.price_max}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Avaliação {service.rating}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
        {haveNothing && (
          <p className="rounded-3xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
            Nenhum serviço correspondente. Ajuste a descrição e tente de novo.
          </p>
        )}
      </section>
    </PageShell>
  );
}
