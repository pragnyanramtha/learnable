import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { siteConfig } from '@/lib/config';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="overflow-x-hidden text-white">
        <Navigation />
        <main className="min-h-screen overflow-x-hidden pb-24 md:ml-72 md:pb-0">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
