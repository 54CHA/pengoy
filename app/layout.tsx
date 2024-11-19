import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClientThemeProvider } from "@/components/providers/client-provider";
import { Toaster } from '@/components/ui/toaster';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'PolyEnjoyers',
  description: 'Compare and rate profiles in a modern, engaging way',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies })
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1">
            {children}
          </main>
          <Toaster />
        </ClientThemeProvider>
      </body>
    </html>
  );
}