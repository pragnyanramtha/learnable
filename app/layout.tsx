import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { siteConfig } from '@/lib/config';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} Class Platform`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${cormorantGaramond.variable} antialiased`}>
      <body className="overflow-x-hidden text-white">
        <Navigation />
        <main className="min-h-screen overflow-x-hidden pb-24 pt-22 md:ml-72 md:pb-0 md:pt-0">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-8">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
