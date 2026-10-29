import Image from 'next/image';
import Link from 'next/link';
import { PartyLogo } from 'assets';

export default function AuthLayout({
  title,
  lede,
  children
}: {
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-primary px-10 py-12 text-primary-foreground lg:flex">
        <Link href="/" className="inline-flex w-fit rounded-full bg-white/95 px-3 py-1">
          <Image src={PartyLogo} alt="Easy Party" width={84} height={62} />
        </Link>
        <div>
          <h1 className="font-display text-5xl leading-tight">{title}</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-primary-foreground/90">
            {lede}
          </p>
        </div>
        <p className="text-sm text-primary-foreground/80">
          Projeto de Empreendimentos em Informática · CIn-UFPE
        </p>
      </aside>
      <main id="conteudo" className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 inline-flex lg:hidden">
            <Image src={PartyLogo} alt="Easy Party" width={72} height={52} />
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
