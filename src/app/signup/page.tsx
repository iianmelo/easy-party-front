'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import AuthLayout from 'components/auth-layout';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';

export default function SignupPage() {
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
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const password = String(data.get('password') || '');
    const confirm = String(data.get('confirm') || '');
    if (name.length < 2) {
      setError('Informe seu nome ou o da empresa.');
      return;
    }
    if (password.length < 4) {
      setError('Use uma senha com pelo menos 4 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    setPending(true);
    setError('');
    const result = await signIn('credentials', {
      username: email,
      email,
      password,
      name,
      role,
      redirect: false
    });
    setPending(false);
    if (result?.error) {
      setError('Não foi possível criar a conta de demonstração.');
      return;
    }
    router.push('/');
    router.refresh();
  }

  return (
    <AuthLayout
      title="Crie uma conta para guardar a festa."
      lede="O cadastro de demonstração entra na hora e fica marcado no topo do site. Nenhum dado vai para um servidor se a API estiver fora."
    >
      <h2 className="font-display text-4xl">Criar conta</h2>
      <p className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-sm leading-6">
        <strong>Modo demonstração.</strong> Esta conta não é gravada em banco.
        Se o login real não responder, você entra com uma sessão local.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <fieldset>
          <legend className="text-sm font-medium">Tipo de conta</legend>
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
          <Label htmlFor="name">
            {role === 'cliente' ? 'Nome' : 'Nome da empresa'}
          </Label>
          <Input id="name" name="name" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="confirm">Confirme a senha</Label>
          <Input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
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
          {pending ? 'Criando…' : 'Criar conta de demonstração'}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Já tem acesso?{' '}
        <Link href="/login" className="font-semibold text-primary">
          Entrar
        </Link>
      </p>
    </AuthLayout>
  );
}
