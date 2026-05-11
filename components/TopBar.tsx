'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function TopBar() {
  const router = useRouter();
  
  return (
    <div className="surface-panel sticky top-22 z-40 mb-6 flex h-14 w-full items-center rounded-full px-4 backdrop-blur-xl md:hidden">
      <button 
        onClick={() => router.back()}
        aria-label="Go back"
        className="rounded-full p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-white/[0.05] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
      >
        <ArrowLeft className="w-5 h-5 stroke-2" />
      </button>
      <span className="ml-2 text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-text-secondary)]">Back</span>
    </div>
  );
}
