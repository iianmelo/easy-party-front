'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Bookmark, MapPin, Menu, ShoppingBag, X } from 'lucide-react';
import { PartyLogo } from 'assets';
import { Button } from 'components/ui/button';
import { useCommerce } from 'providers/commerce';
import { cn } from 'lib/utils';

const links = [
  { href: '/', label: 'Início' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/assistente', label: 'Assistente' },
  { href: '/create-party', label: 'Monte sua festa' },
  { href: '/landing-page', label: 'Sobre' }
];

function NavLinks({
  onNavigate,
  className
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label="Principal">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-full px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

const TopBar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { count } = useCommerce();
  const [open, setOpen] = useState(false);
  const demo = Boolean(session?.user?.demo);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      {demo && (
        <p className="bg-secondary px-4 py-2 text-center text-sm text-foreground">
          Sessão de demonstração. O servidor de login não respondeu; esta conta
          existe só neste navegador.
        </p>
      )}
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 rounded-full">
          <Image src={PartyLogo} alt="Easy Party" width={72} height={52} />
        </Link>
        <NavLinks className="ml-4 hidden items-center gap-1 md:flex" />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <p className="mr-2 hidden items-center gap-1 text-sm text-muted-foreground lg:flex">
            <MapPin className="h-4 w-4" aria-hidden />
            Recife — PE
          </p>
          <Link
            href="/saved-items"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-secondary"
            aria-label="Itens salvos"
          >
            <Bookmark className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-secondary"
            aria-label={
              count > 0 ? `Carrinho, ${count} itens` : 'Carrinho vazio'
            }
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute right-1 top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          {status === 'loading' ? (
            <span className="hidden h-10 w-24 rounded-full bg-secondary sm:inline-block" />
          ) : session?.user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-[9rem] truncate text-sm font-medium">
                {session.user.name || 'Conta'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sair
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Criar conta</Link>
              </Button>
            </div>
          )}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-secondary md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="menu-mobile" className="border-t border-border px-4 py-4 md:hidden">
          <NavLinks
            className="flex flex-col gap-1"
            onNavigate={() => setOpen(false)}
          />
          <p className="mt-3 flex items-center gap-1 px-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden />
            Recife — PE
          </p>
          <div className="mt-3 flex flex-col gap-2 px-1">
            {session?.user ? (
              <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: pathname || '/' })}
              >
                Sair
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Entrar
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    Criar conta
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;
