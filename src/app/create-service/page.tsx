'use client';

import { FormEvent, useState } from 'react';
import PageShell from 'components/page-shell';
import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';

const categories = ['Alimentação', 'Decoração', 'Mídia', 'Música'];

export default function CreateService() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl sm:text-5xl">Cadastre seu serviço</h1>
        <p className="mt-3 text-muted-foreground">
          Formulário de demonstração para um fornecedor. Salvar não envia os
          dados a um servidor.
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-card"
        >
          <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-secondary text-sm text-muted-foreground">
            Anexe imagens quando houver um envio real
          </div>
          <div>
            <label htmlFor="titulo" className="text-sm font-medium">
              Título do serviço
            </label>
            <input
              id="titulo"
              required
              className="mt-1 h-11 w-full rounded-2xl border border-input bg-background px-3"
            />
          </div>
          <div>
            <label htmlFor="preco" className="text-sm font-medium">
              Preço
            </label>
            <input
              id="preco"
              required
              className="mt-1 h-11 w-full rounded-2xl border border-input bg-background px-3"
            />
          </div>
          <div>
            <label htmlFor="descricao" className="text-sm font-medium">
              Descrição
            </label>
            <textarea
              id="descricao"
              required
              className="mt-1 h-32 w-full rounded-2xl border border-input bg-background px-3 py-2"
            />
          </div>
          <fieldset>
            <legend className="text-sm font-medium">Categorias</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((category) => {
                const active = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleCategory(category)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-sm',
                      active
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background hover:bg-secondary'
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <Button type="submit">Salvar rascunho local</Button>
          {saved && (
            <p role="status" className="text-sm text-muted-foreground">
              Rascunho guardado só nesta tela. Nada foi publicado.
            </p>
          )}
        </form>
      </section>
    </PageShell>
  );
}
