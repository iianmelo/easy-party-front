import Image from 'next/image';
import {
  ImgFesta,
  VictorProfile,
  IanProfile,
  GuiProfile,
  RafaProfile,
  JoaoProfile
} from 'assets';
import PageShell from 'components/page-shell';
import PersonalCard from 'components/personal-card';
import CompanySignupForm from 'components/company-form';

const team = [
  { image: RafaProfile, name: 'Rafael Alves', ocupation: 'Desenvolvedor de Software' },
  { image: JoaoProfile, name: 'João Fellows', ocupation: 'Desenvolvedor de Software' },
  { image: GuiProfile, name: 'Guilherme Montenegro', ocupation: 'Desenvolvedor de Software' },
  { image: VictorProfile, name: 'Victor Mendonça', ocupation: 'Desenvolvedor de Software' },
  { image: IanProfile, name: 'Ian Melo', ocupation: 'Desenvolvedor de Software' }
];

export default function LandingPage() {
  return (
    <PageShell>
      <section>
        <Image
          src={ImgFesta}
          alt="Festa com pessoas celebrando"
          priority
          className="h-[320px] w-full object-cover sm:h-[420px]"
        />
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            Feito em equipe, para quem organiza a festa.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            A Easy Party nasceu na disciplina Empreendimentos em Informática,
            no CIn-UFPE, entre fevereiro e maio de 2025.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">O que o produto tenta resolver</h2>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Organizar um evento junta buffet, espaço, música, decoração e registro.
          Quem faz isso pela primeira vez pesquisa cada peça num canal diferente.
          A plataforma concentra essas frentes e deixa a pessoa descrever a festa
          antes de sair comparando fornecedor por fornecedor.
        </p>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">Quem construiu</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            O time aparece aqui com o papel que está no produto.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {team.map((person) => (
              <PersonalCard
                key={person.name}
                image={person.image}
                name={person.name}
                ocupation={person.ocupation}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Cadastre sua empresa</h2>
          <p className="mt-2 text-muted-foreground">
            Formulário de demonstração para um fornecedor se apresentar. O envio
            não sai deste navegador.
          </p>
        </div>
        <CompanySignupForm />
      </section>
    </PageShell>
  );
}
