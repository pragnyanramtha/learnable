'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, ChevronRight, Clock, MapPin } from 'lucide-react';

interface ExamEvent {
  date: string;
  day: string;
  time: string;
  title: string;
  slug: string;
}

const timelineData: ExamEvent[] = [
  { date: '13-04-2026', day: 'Monday', time: '10:00 AM - 12:00 PM', title: 'Foreign Language (French)', slug: 'french' },
  { date: '15-04-2026', day: 'Wednesday', time: '10:00 AM - 12:00 PM', title: 'Mathematics for Problem Solving', slug: 'maths' },
  { date: '15-04-2026', day: 'Wednesday', time: '1:30 PM - 3:30 PM', title: 'Data Structures', slug: 'dsa' },
  { date: '16-04-2026', day: 'Thursday', time: '10:00 AM - 12:00 PM', title: 'Database Management Systems', slug: 'dbms' },
  { date: '16-04-2026', day: 'Thursday', time: '1:30 PM - 3:30 PM', title: 'Web Application Development-II', slug: 'web' },
  { date: '17-04-2026', day: 'Friday', time: '10:00 AM - 12:00 PM', title: 'Universal Human Values', slug: 'uhv' },
  { date: '17-04-2026', day: 'Friday', time: '1:30 PM - 3:30 PM', title: 'Fundamentals of Quantum Computing', slug: 'quantum' },
  { date: '17-04-2026', day: 'Friday', time: '1:30 PM - 3:30 PM', title: 'Computer Aided Engineering Graphics', slug: 'caeg' },
];

export default function Timeline() {
  return (
    <section className="w-full max-w-3xl mx-auto overflow-x-hidden">
      <div className="mb-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-400/80">
        <MapPin className="h-3.5 w-3.5" />
        Today · 12 Apr 2026
      </div>

      <div className="relative pl-6 sm:pl-8">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />

        <div className="relative mb-8 pl-6 sm:pl-8">
          <div className="absolute left-2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-400 shadow-[0_0_0_4px_rgba(59,130,246,0.15)]" />
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <ArrowRight className="h-4 w-4 text-blue-400" />
            <span>You are here</span>
          </div>
          <p className="mt-1 text-sm text-neutral-500">The next exam is on 13 Apr 2026.</p>
        </div>

        <div className="space-y-1">
          {timelineData.map((event) => (
            <Link
              key={`${event.slug}-${event.date}-${event.time}`}
              href={`/hub/${event.slug}`}
              className="group relative block border-l border-white/10 py-5 pl-6 sm:pl-8 transition-colors hover:border-blue-400/50 hover:bg-white/[0.02]"
            >
              <div className="absolute left-2 top-8 h-2 w-2 -translate-x-1/2 rounded-full bg-white/35 transition-colors group-hover:bg-blue-400" />

              <div className="min-w-0 pr-6">
                <h3 className="break-words text-lg font-semibold tracking-tight text-white sm:text-xl leading-tight">
                  {event.title}
                </h3>

                <div className="mt-2 flex flex-col gap-1 text-sm text-neutral-400 sm:text-[15px]">
                  <span className="flex items-center gap-2 whitespace-normal">
                    <Calendar className="h-4 w-4 shrink-0 text-neutral-500" />
                    <span>{event.date}</span>
                    <span className="text-neutral-500">({event.day})</span>
                  </span>
                  <span className="flex items-center gap-2 whitespace-normal">
                    <Clock className="h-4 w-4 shrink-0 text-neutral-500" />
                    <span>{event.time}</span>
                  </span>
                </div>

                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400/80 transition-colors group-hover:text-blue-300">
                  Open module
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
