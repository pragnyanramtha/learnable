import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import type { SubjectConfig } from '@/lib/types';
import Badge from '@/components/ui/Badge';

interface SubjectCardProps extends SubjectConfig {
  isAvailable?: boolean;
}

export default function SubjectCard({ id, title, description, isAvailable = true }: SubjectCardProps) {
  return (
    <Link
      href={isAvailable ? `/hub/${id}` : '#'}
      className={`surface-panel group block rounded-[2rem] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:rgba(244,200,81,0.22)] hover:bg-white/[0.05] ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50 grayscale'}`}
    >
      <div className="flex flex-col h-full min-h-[9rem]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:rgba(244,200,81,0.16)] text-[var(--color-action-primary)] ring-1 ring-[color:rgba(244,200,81,0.14)]">
            <BookOpen className="w-5 h-5 transition-colors" />
          </div>
          <Badge tone={isAvailable ? 'gold' : 'outline'}>{isAvailable ? 'Ready' : 'Soon'}</Badge>
        </div>
        <h3 className="font-display mb-2 text-2xl leading-tight text-[var(--color-text-primary)]">{title}</h3>
        <p className="flex-grow text-sm leading-7 text-[var(--color-text-secondary)]">{description}</p>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-action-primary)]">
            {isAvailable ? 'Access Module' : 'Coming Soon'}
          </span>
          <ArrowUpRight className="h-4 w-4 text-[var(--color-action-primary)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
