'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const STORAGE_KEY = 'learnable-contrast-mode';

export default function ContrastToggle() {
  const [highContrast, setHighContrast] = useState(
    () => typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === 'high'
  );

  useEffect(() => {
    document.documentElement.dataset.contrast = highContrast ? 'high' : 'default';
  }, [highContrast]);

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    document.documentElement.dataset.contrast = next ? 'high' : 'default';
    window.localStorage.setItem(STORAGE_KEY, next ? 'high' : 'default');
  };

  return (
    <button
      type="button"
      onClick={toggleContrast}
      aria-label={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
      aria-pressed={highContrast}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:rgba(237,224,196,0.28)] bg-white/[0.04] px-4 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-white/[0.08] focus-visible:outline-none"
    >
      <Eye className="h-4 w-4" />
      {highContrast ? 'High Contrast On' : 'High Contrast'}
    </button>
  );
}
