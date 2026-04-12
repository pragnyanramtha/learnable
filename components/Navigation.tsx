'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, BookOpen } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Timeline', href: '/', icon: Clock },
    { label: 'Subject Hub', href: '/hub', icon: BookOpen }
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-2 pb-safe">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith('/hub') && item.href === '/hub');
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-white/10 flex-col py-8 px-4 z-50">
        <div className="mb-12 px-4">
          <h2 className="text-xl font-bold tracking-tight text-white">MRVC Plat.</h2>
          <p className="text-xs text-neutral-500 mt-1">Student Portal</p>
        </div>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith('/hub') && item.href === '/hub');
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white font-medium' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
