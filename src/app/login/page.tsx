'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import AuthLayout from 'components/auth-layout';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [role, setRole] = useState<'cliente' | 'fornecedor'>('cliente');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') router.replace('/');
  }, [router, status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') || '').trim();
    const password = String(data.get('password') || '');
    if (!email || !password) {
      setError('Preencha e-mail e senha.');
      return;
    }
    setPending(true);
    setError('');
    const result = await signIn('credentials', {
      username: email,
      email,
      password,
      name: email,
      role,
      redirect: false
    });
    setPending(false);
    if (result?.error) {
      setError('Não foi possível entrar. Confira e-mail e senha.');
      return;
    }
    router.push('/');
    router.refresh();
  }

  return (
    <AuthLayout
      title="Entre para continuar a festa."
      lede="Salve serviços e volte ao carrinho neste navegador. Sem a API, a entrada fica marcada como demonstração."
    >
      <h2 className="font-display text-4xl">Entrar</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Cliente ou fornecedor usam o mesmo acesso neste MVP.
      </p>
      <p className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-sm leading-6">
        <strong>Modo demonstração.</strong> Se o servidor de login não responder,
        qualquer e-mail e senha criam uma sessão só neste navegador. Nada é
        gravado em um backend.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <fieldset>
          <legend className="text-sm font-medium">Entrar como</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(['cliente', 'fornecedor'] as const).map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center justify-center rounded-full border px-3 py-2 text-sm font-medium ${
                  role === option
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={option}
                  checked={role === option}
                  onChange={() => setRole(option)}
                  className="sr-only"
                />
                {option === 'cliente' ? 'Cliente' : 'Fornecedor'}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1"
            placeholder="voce@email.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1"
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Ainda não tem conta?{' '}
        <Link href="/signup" className="font-semibold text-primary">
          Criar conta
        </Link>
      </p>
    </AuthLayout>
  );
}
