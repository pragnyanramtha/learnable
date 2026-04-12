'use client';

import { useState } from 'react';
import MarkdownReader from '@/components/MarkdownReader';
import QuizEngine, { QuizQuestion } from '@/components/QuizEngine';

interface ClientTabsProps {
  contentStr: string;
  quizQuestions: QuizQuestion[];
  subjectTitle: string;
}

export default function ClientTabs({ contentStr, quizQuestions, subjectTitle }: ClientTabsProps) {
  const [activeTab, setActiveTab] = useState<'reading' | 'quiz'>('reading');

  return (
    <div className="flex w-full flex-col gap-8 py-4 sm:py-8">
      <div className="space-y-3">
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl break-words">
          {subjectTitle}
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-neutral-400">
          Read the material or switch to the quiz without leaving the page.
        </p>
      </div>

      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('reading')}
          className={`-mb-px border-b-2 px-1 pb-3 text-sm font-semibold transition-colors sm:text-base ${
            activeTab === 'reading'
              ? 'border-blue-400 text-white'
              : 'border-transparent text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Reading Material
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`-mb-px ml-6 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors sm:text-base ${
            activeTab === 'quiz'
              ? 'border-blue-400 text-white'
              : 'border-transparent text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Quick Quiz
        </button>
      </div>

      <div className="min-h-[50vh] w-full">
        {activeTab === 'reading' ? (
          contentStr ? (
            <MarkdownReader content={contentStr} />
          ) : (
            <p className="text-neutral-400">No reading material available for this subject yet.</p>
          )
        ) : (
          <QuizEngine questions={quizQuestions} />
        )}
      </div>
    </div>
  );
}
