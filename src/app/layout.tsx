import type { Metadata } from 'next';
import { Fraunces, Outfit } from 'next/font/google';

import { AppProviders } from 'providers/app-providers';
import 'styles/globals.css';

const sans = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Easy Party',
  description:
    'Monte sua festa sem complicação. Encontre buffet, decoração, música e mais.',
  manifest: '/manifest.json'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Ir para o conteúdo
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
