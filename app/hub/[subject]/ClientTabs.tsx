'use client';

import { useState } from 'react';
import { BookOpenText, CircleHelp } from 'lucide-react';
import MarkdownReader from '@/components/MarkdownReader';
import QuizEngine from '@/components/QuizEngine';
import type { QuizQuestion } from '@/lib/types';
import Badge from '@/components/ui/Badge';

interface ClientTabsProps {
  contentStr: string;
  quizQuestions: QuizQuestion[];
  subjectTitle: string;
}

export default function ClientTabs({ contentStr, quizQuestions, subjectTitle }: ClientTabsProps) {
  const [activeTab, setActiveTab] = useState<'reading' | 'quiz'>('reading');

  return (
    <div className="flex w-full flex-col gap-8 py-4 sm:py-8">
      <div className="surface-panel rounded-[2.5rem] p-6 sm:p-8 space-y-4">
        <Badge tone="gold">Active Subject</Badge>
        <h1 className="font-display max-w-4xl break-words text-4xl leading-[0.98] text-[var(--color-text-primary)] sm:text-5xl">
          {subjectTitle}
        </h1>
        <p className="max-w-2xl text-sm sm:text-base leading-7 text-[var(--color-text-secondary)]">
          Read the material or switch to the quiz without leaving the page.
        </p>
      </div>

      <div className="surface-panel flex w-full flex-wrap gap-3 rounded-full p-2">
        <button
          onClick={() => setActiveTab('reading')}
          className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all sm:text-base ${
            activeTab === 'reading'
              ? 'bg-[var(--color-action-primary)] text-[var(--color-ink-strong)]'
              : 'text-[var(--color-text-secondary)] hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <BookOpenText className="h-4 w-4" />
          Reading Material
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all sm:text-base ${
            activeTab === 'quiz'
              ? 'bg-[var(--color-action-primary)] text-[var(--color-ink-strong)]'
              : 'text-[var(--color-text-secondary)] hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <CircleHelp className="h-4 w-4" />
          Quick Quiz
        </button>
      </div>

      <div className="min-h-[50vh] w-full">
        {activeTab === 'reading' ? (
          contentStr ? (
            <MarkdownReader content={contentStr} />
          ) : (
            <div className="surface-panel rounded-[2rem] p-6 text-[var(--color-text-secondary)]">No reading material available for this subject yet.</div>
          )
        ) : (
          <QuizEngine questions={quizQuestions} />
        )}
      </div>
    </div>
  );
}
