'use client';

import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';
import type { QuizQuestion } from '@/lib/types';

interface QuizEngineProps {
  questions: QuizQuestion[];
}

export default function QuizEngine({ questions }: QuizEngineProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (selectedAnswers[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: String(optionIndex) }));
  };

  const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

  if (!questions || questions.length === 0) {
    return <div className="surface-panel rounded-[2rem] p-6 text-sm text-[var(--color-text-secondary)]">No quiz available for this subject yet.</div>;
  }

  return (
    <div className="surface-panel w-full rounded-[2rem] p-6 sm:p-8">
      <div className="space-y-10">
      {questions.map((q, qIndex) => {
        const selectedIndex = selectedAnswers[q.id];
        const isAnswered = selectedIndex !== undefined;
        const correctIndex = q.options.findIndex((_, index) => getOptionLetter(index) === q.correctLetter);

        return (
          <div key={q.id} className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] sm:text-lg leading-snug">
              {qIndex + 1}. {q.question}
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {q.options.map((opt, oIndex) => {
                const isSelected = selectedIndex === String(oIndex);
                const isCorrect = isAnswered && oIndex === correctIndex;
                const isWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleSelect(q.id, oIndex)}
                    disabled={isAnswered}
                    className={clsx(
                      'flex min-h-12 items-start justify-between gap-3 rounded-[1.5rem] border px-4 py-3 text-left transition-colors duration-200',
                      !isAnswered && 'border-white/10 bg-white/[0.02] hover:border-[color:rgba(244,200,81,0.28)] hover:bg-white/[0.05] cursor-pointer',
                      isAnswered && !isSelected && !isCorrect && 'border-white/10 bg-white/[0.02] opacity-60 cursor-default',
                      isCorrect && 'border-emerald-400/60 bg-emerald-400/10 text-emerald-200 cursor-default',
                      isWrong && 'border-rose-400/60 bg-rose-400/10 text-rose-200 cursor-default'
                    )}
                  >
                    <span className="flex-1 leading-relaxed text-sm sm:text-[15px]">
                      <span className="mr-3 font-semibold text-[var(--color-action-primary)]">{getOptionLetter(oIndex)}.</span>
                      {opt}
                    </span>
                    {isCorrect && <CheckCircle className="h-5 w-5 shrink-0 text-emerald-300" />}
                    {isWrong && <XCircle className="h-5 w-5 shrink-0 text-rose-300" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-4 text-sm">
                {selectedIndex === String(correctIndex) ? (
                  <p className="font-medium tracking-wide text-emerald-300">Excellent. That&apos;s correct.</p>
                ) : (
                  <p className="font-medium tracking-wide text-rose-300">Incorrect.</p>
                )}
                <p className="mt-2 leading-7 text-[var(--color-text-secondary)]">
                  Correct answer: <strong className="text-[var(--color-text-primary)]">{q.correctLetter}. {q.correctAnswer}</strong>
                </p>
                {q.explanation && (
                  <p className="mt-2 leading-7 text-[var(--color-text-secondary)]">
                    Explanation: {q.explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}
