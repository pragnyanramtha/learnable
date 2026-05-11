'use client';

import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Calendar, ChevronRight, Clock, MapPin } from 'lucide-react';
import { examEvents, siteConfig, subjects } from '@/lib/config';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function Timeline() {
  const nextEvent = examEvents[0];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 overflow-x-hidden pb-8">
      <section className="surface-panel rounded-[2rem] p-4 sm:p-6" aria-labelledby="announcement-heading">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="announcement-heading" className="sr-only">Platform announcement</h2>
          <Badge tone="gold">New</Badge>
          <Badge tone="navy">Zero Cost Access</Badge>
          <span className="text-sm text-[var(--color-text-secondary)]">
            Built to keep revision materials reachable, clear, and fast.
          </span>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]" aria-labelledby="hero-heading">
        <div className="surface-panel rounded-[2.5rem] p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-action-primary)]">
            <MapPin className="h-3.5 w-3.5" />
            Today · {siteConfig.todayLabel}
          </div>
          <h1 id="hero-heading" className="font-display max-w-4xl text-5xl leading-[0.94] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
            Study access should feel calm, clear, and within reach.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
            Browse accessible Python classes, move between reading and quiz practice, and jump back to the main LearnABLE site whenever you need the wider program.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/hub" size="lg" aria-label="Open the subject hub">
              Open Subject Hub
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href={`/${nextEvent ? `hub/${nextEvent.slug}` : 'hub'}`}
              variant="outline"
              size="lg"
              aria-label={nextEvent ? `Open next class module for ${nextEvent.title}` : 'Open next class module'}
            >
              Start With Next Class
            </Button>
            <Button
              href="https://learnableindia.org"
              variant="outline"
              size="lg"
              aria-label="Return to LearnABLE India main website"
            >
              Back to learnableindia.org
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="surface-panel rounded-[2rem] p-6">
            <Badge tone="outline">Next Priority</Badge>
            <p className="mt-4 font-display text-3xl leading-tight text-[var(--color-text-primary)]">
              {nextEvent?.title ?? 'Class schedule coming soon'}
            </p>
            <div className="mt-5 space-y-3 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-[var(--color-action-primary)]" />
                <span>{nextEvent?.date ?? 'TBD'} · {nextEvent?.day ?? 'TBD'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[var(--color-action-primary)]" />
                <span>{nextEvent?.time ?? 'TBD'}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="surface-soft rounded-[1.75rem] p-5">
              <p className="font-display text-4xl text-[var(--color-text-primary)]">{subjects.length}</p>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Topics organized into one hub.</p>
            </div>
            <div className="surface-soft rounded-[1.75rem] p-5">
              <p className="font-display text-4xl text-[var(--color-text-primary)]">{examEvents.length}</p>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Class sessions tracked on the timeline.</p>
            </div>
            <div className="surface-soft rounded-[1.75rem] p-5">
              <p className="font-display text-4xl text-[var(--color-text-primary)]">24/7</p>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Anytime access to notes and quizzes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]" aria-labelledby="timeline-heading">
        <div className="surface-panel rounded-[2.25rem] p-6 sm:p-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge tone="navy">Class Timeline</Badge>
              <h2 id="timeline-heading" className="font-display mt-4 text-4xl text-[var(--color-text-primary)]">What’s coming up next</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--color-text-secondary)]">
              Large dates, calm contrast, and one clear action per item keep the class plan easy to scan.
            </p>
          </div>

          <div className="relative pl-4">
            <div className="absolute bottom-0 left-2 top-0 w-px bg-white/10" />
            <div className="relative mb-8 pl-4">
              <div className="absolute -left-2 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-action-primary)] shadow-[0_0_0_6px_rgba(244,200,81,0.12)]" />
              <p className="text-sm text-[var(--color-text-secondary)]">
                The next class is on {nextEvent?.date ?? 'TBD'}. Open the related module to get ready right away.
              </p>
            </div>

            <div className="space-y-3">
              {examEvents.map((event) => (
                <Link
                  key={`${event.slug}-${event.date}-${event.time}`}
                  href={`/hub/${event.slug}`}
                  aria-label={`Open module for ${event.title} on ${event.date} at ${event.time}`}
                  className="group relative block rounded-[1.75rem] border border-white/8 bg-white/[0.02] py-5 pl-6 pr-5 transition-all hover:border-[color:rgba(244,200,81,0.28)] hover:bg-white/[0.05]"
                >
                  <div className="absolute -left-2 top-8 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white/35 transition-colors group-hover:bg-[var(--color-action-primary)]" />

                  <div className="min-w-0">
                    <h3 className="break-words text-xl font-semibold leading-tight text-[var(--color-text-primary)]">
                      {event.title}
                    </h3>

                    <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--color-text-secondary)] sm:text-[15px]">
                      <span className="flex items-center gap-2 whitespace-normal">
                        <Calendar className="h-4 w-4 shrink-0 text-[var(--color-action-primary)]" />
                        <span>{event.date}</span>
                        <span className="text-[var(--color-text-muted)]">({event.day})</span>
                      </span>
                      <span className="flex items-center gap-2 whitespace-normal">
                        <Clock className="h-4 w-4 shrink-0 text-[var(--color-action-primary)]" />
                        <span>{event.time}</span>
                      </span>
                    </div>

                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-action-primary)] transition-colors group-hover:text-[#ffe19a]">
                      Open module
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <section className="grid gap-6" aria-labelledby="flow-heading">
          <div className="surface-panel rounded-[2.25rem] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:rgba(244,200,81,0.16)] text-[var(--color-action-primary)]">
                <BookOpenCheck className="h-5 w-5" />
              </div>
              <div>
                <p id="flow-heading" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-action-primary)]">Focused Flow</p>
                <p className="text-sm text-[var(--color-text-secondary)]">A simpler path from plan to practice.</p>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.02] p-4">
                <p className="font-display text-2xl text-[var(--color-text-primary)]">1. Check the date</p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">See the next class and jump straight into the topic module.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.02] p-4">
                <p className="font-display text-2xl text-[var(--color-text-primary)]">2. Read with less noise</p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Study content now sits on softer elevated panels with better text hierarchy.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.02] p-4">
                <p className="font-display text-2xl text-[var(--color-text-primary)]">3. Practice fast</p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Quiz states are clearer, with stronger success and error contrast.</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
