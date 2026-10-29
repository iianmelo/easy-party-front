import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import api from 'services/api';

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'easy-party-local-demo',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text' },
        password: { label: 'Senha', type: 'password' },
        name: { label: 'Nome', type: 'text' },
        email: { label: 'Email', type: 'text' },
        role: { label: 'Papel', type: 'text' }
      },

      async authorize(credentials) {
        const username = credentials?.username?.trim() ?? '';
        const password = credentials?.password ?? '';
        if (!username || !password) return null;

        try {
          const response = await api.post('/sessions', {
            username,
            password
          });
          const user = response.data?.data?.user;
          if (user) {
            return { ...user, demo: false };
          }
        } catch {
          // API fora do ar: a sessão abaixo é só local e fica marcada como demo.
        }

        return {
          id: 'demo-user',
          name: credentials?.name?.trim() || username,
          email: credentials?.email?.trim() || username,
          demo: true,
          role: credentials?.role || 'cliente'
        };
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          image: user.image,
          demo: user.demo,
          role: user.role
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token.user
      };
      return session;
    }
  }
};
