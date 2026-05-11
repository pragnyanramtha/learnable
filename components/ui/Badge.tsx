import clsx from 'clsx';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'gold' | 'navy' | 'outline';
  className?: string;
}

const toneClasses = {
  gold: 'bg-[color:rgba(244,200,81,0.18)] text-[var(--color-action-primary)] ring-1 ring-[color:rgba(244,200,81,0.28)]',
  navy: 'bg-white/[0.06] text-[var(--color-text-primary)] ring-1 ring-white/10',
  outline: 'bg-transparent text-[var(--color-text-secondary)] ring-1 ring-white/14',
};

export default function Badge({ children, tone = 'navy', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]',
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
