import Link from 'next/link';
import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline';
type ButtonSize = 'sm' | 'lg';

type SharedProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  iconOnly?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ActionProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-action-primary)] text-[var(--color-ink-strong)] shadow-[0_18px_40px_-24px_rgba(244,200,81,0.85)] hover:bg-[var(--color-action-primary-hover)]',
  outline:
    'border border-white/18 bg-white/[0.02] text-white hover:border-[var(--color-action-primary)] hover:bg-white/[0.06]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 text-sm',
  lg: 'min-h-13 px-6 text-sm sm:px-7 sm:text-base',
};

export default function Button({
  children,
  className,
  href,
  iconOnly = false,
  size = 'lg',
  variant = 'primary',
  ...props
}: ActionProps) {
  if (iconOnly && !props['aria-label']) {
    throw new Error('Icon-only buttons require an aria-label.');
  }

  const classes = clsx(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]',
    'disabled:pointer-events-none disabled:opacity-60',
    sizeClasses[size],
    variantClasses[variant],
    iconOnly && 'aspect-square px-0',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={props['aria-label']}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}
