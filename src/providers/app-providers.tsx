'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'components/theme-provider';
import { CommerceProvider } from 'providers/commerce';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <CommerceProvider>{children}</CommerceProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
