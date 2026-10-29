import type { Metadata } from 'next';

import NextAuthSessionProvider from '../providers/sessionProvider';
import { ThemeProvider } from '../components/theme-provider';
import 'styles/globals.css';

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
    <html lang="pt-BR">
      <body>
        <NextAuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
