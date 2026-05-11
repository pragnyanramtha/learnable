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
      <body className="bg-black text-white font-sans selection:bg-white/30 overflow-x-hidden">
        <Navigation />
        <main className="md:ml-64 pb-24 md:pb-0 min-h-screen overflow-x-hidden">
          <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
