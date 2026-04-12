'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function TopBar() {
  const router = useRouter();
  
  return (
    <div className="flex md:hidden h-14 w-full items-center px-4 sticky top-0 bg-black/80 backdrop-blur-xl border-b border-white/10 z-50 mb-6">
      <button 
        onClick={() => router.back()} 
        className="p-2 -ml-2 rounded-full hover:bg-white/10 text-neutral-300 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 stroke-2" />
      </button>
      <span className="ml-2 font-medium text-sm tracking-tight text-white">Back</span>
    </div>
  );
}
