'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, BookOpen, Clock, ExternalLink, House } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import Button from '@/components/ui/Button';
import ContrastToggle from '@/components/ContrastToggle';

const navItems = [
  { label: 'Timeline', href: '/', icon: Clock, ariaLabel: 'Open class timeline' },
  { label: 'Hub', href: '/hub', icon: BookOpen, ariaLabel: 'Open subject hub' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <div className="surface-panel fixed left-3 right-3 top-3 z-50 flex items-center justify-between gap-3 rounded-[1.5rem] px-3 py-3 md:hidden">
        <Link
          href="https://learnableindia.org"
          target="_blank"
          rel="noreferrer"
          aria-label="Go to LearnABLE India main website"
          className="inline-flex rounded-[1rem] focus-visible:outline-none"
        >
          <Image
            src="/learnable-logo.png"
            alt="LearnABLE logo"
            width={132}
            height={42}
            priority
            className="h-auto w-[132px]"
          />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="https://learnableindia.org"
            target="_blank"
            rel="noreferrer"
            aria-label="Return to LearnABLE India main website"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:rgba(237,224,196,0.28)] px-3 text-[var(--color-text-primary)] transition hover:bg-white/[0.06] focus-visible:outline-none"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
          <ContrastToggle />
        </div>
      </div>

      <nav className="surface-panel fixed bottom-3 left-3 right-3 z-50 rounded-[2rem] px-4 py-2 pb-safe backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
        <div className="flex items-center justify-around gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith('/hub') && item.href === '/hub');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center rounded-full px-2 py-3 text-center transition-all ${
                  isActive
                    ? 'bg-[color:rgba(244,200,81,0.16)] text-[var(--color-action-primary)]'
                    : 'text-[var(--color-text-muted)] hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]'
                }`}
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] uppercase">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="hidden md:flex fixed left-4 top-4 bottom-4 w-64 rounded-[2rem] surface-panel flex-col px-5 py-6 z-50" aria-label="Primary navigation">
        <div className="mb-10 space-y-4 px-2">
          <Link
            href="https://learnableindia.org"
            target="_blank"
            rel="noreferrer"
            aria-label="Go to LearnABLE India main website"
            className="inline-flex rounded-[1rem] focus-visible:outline-none"
          >
            <Image
              src="/learnable-logo.png"
              alt="LearnABLE logo"
              width={180}
              height={58}
              priority
              className="h-auto w-[180px]"
            />
          </Link>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{siteConfig.tagline}</p>
          <ContrastToggle />
        </div>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith('/hub') && item.href === '/hub');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-full px-4 py-3 transition-all ${
                  isActive
                    ? 'bg-[color:rgba(244,200,81,0.16)] text-[var(--color-action-primary)] font-medium'
                    : 'text-[var(--color-text-secondary)] hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]'
                }`}
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
          <Link
            href="https://learnableindia.org"
            target="_blank"
            rel="noreferrer"
            aria-label="Return to LearnABLE India main site"
            className="mt-2 flex items-center gap-3 rounded-full px-4 py-3 text-[var(--color-text-secondary)] transition-all hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]"
          >
            <House className="h-5 w-5" />
            <span className="text-sm">Main Site</span>
            <ExternalLink className="ml-auto h-4 w-4" />
          </Link>
        </div>
        <div className="mt-auto rounded-[1.75rem] border border-[color:rgba(244,200,81,0.18)] bg-[linear-gradient(180deg,rgba(244,200,81,0.12),rgba(255,255,255,0.02))] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-action-primary)]">Student Access</p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            Class timelines, study notes, and quizzes in one focused workspace.
          </p>
          <Button
            href="/hub"
            variant="outline"
            size="sm"
            className="mt-4 w-full justify-between"
            aria-label="Open subject hub"
          >
            Open Hub
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </nav>
    </>
  );
}
