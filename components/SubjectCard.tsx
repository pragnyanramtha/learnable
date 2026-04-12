import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface SubjectCardProps {
  title: string;
  slug: string;
  description: string;
  isAvailable?: boolean;
}

export default function SubjectCard({ title, slug, description, isAvailable = true }: SubjectCardProps) {
  return (
    <Link 
      href={isAvailable ? `/hub/${slug}` : '#'}
      className={`group block rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-200 hover:bg-white/[0.04] hover:border-white/20 ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50 grayscale'}`}
    >
      <div className="flex flex-col h-full min-h-[9rem]">
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white mb-4 ring-1 ring-white/10">
          <BookOpen className="w-5 h-5 text-neutral-300 transition-colors group-hover:text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1.5 leading-tight">{title}</h3>
        <p className="text-neutral-400 text-sm flex-grow leading-relaxed">{description}</p>
        
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-white transition-colors">
            {isAvailable ? 'Access Module' : 'Coming Soon'}
          </span>
        </div>
      </div>
    </Link>
  );
}
