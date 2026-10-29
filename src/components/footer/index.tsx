import Image from 'next/image';
import Link from 'next/link';
import { PartyLogo } from 'assets';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src={PartyLogo} alt="Easy Party" width={84} height={62} />
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            Um lugar para comparar buffet, decoração, música e mídia e montar a
            festa sem abrir dez conversas ao mesmo tempo.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Explorar</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:text-primary" href="/servicos">
                Serviços
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/assistente">
                Assistente de festa
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/create-party">
                Monte sua festa
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/cart">
                Carrinho
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/landing-page">
                Sobre o projeto
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Conta</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:text-primary" href="/login">
                Entrar
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/signup">
                Criar conta
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/saved-items">
                Itens salvos
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/create-service">
                Cadastrar serviço
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-muted-foreground sm:px-6">
          2025 Easy Party · projeto da disciplina Empreendimentos em Informática,
          CIn-UFPE.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
