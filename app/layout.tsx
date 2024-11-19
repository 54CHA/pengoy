import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClientThemeProvider } from "@/components/providers/client-provider";
import { Toaster } from '@/components/ui/toaster';
import { Heart } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PolyEnjoyers',
  description: 'Compare and rate profiles in a modern, engaging way',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          
          <footer className="py-6 text-center text-sm text-gray-400">
            <p className="flex items-center justify-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by ITMO students
            </p>
          </footer>
          <Toaster />
        </ClientThemeProvider>
      </body>
    </html>
  );
}