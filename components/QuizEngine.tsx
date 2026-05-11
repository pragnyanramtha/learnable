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
    return <div className="py-4 text-sm text-neutral-400">No quiz available for this subject yet.</div>;
  }

  return (
    <div className="space-y-10 w-full">
      {questions.map((q, qIndex) => {
        const selectedIndex = selectedAnswers[q.id];
        const isAnswered = selectedIndex !== undefined;
        const correctIndex = q.options.findIndex((_, index) => getOptionLetter(index) === q.correctLetter);

        return (
          <div key={q.id} className="border-t border-white/10 pt-6">
            <h3 className="text-base font-semibold text-white sm:text-lg leading-snug">
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
                      'flex min-h-11 items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200',
                      !isAnswered && 'border-white/10 bg-white/[0.02] hover:border-blue-400/50 hover:bg-white/[0.04] cursor-pointer',
                      isAnswered && !isSelected && !isCorrect && 'border-white/10 bg-white/[0.02] opacity-60 cursor-default',
                      isCorrect && 'border-emerald-400/60 bg-emerald-400/10 text-emerald-300 cursor-default',
                      isWrong && 'border-rose-400/60 bg-rose-400/10 text-rose-300 cursor-default'
                    )}
                  >
                    <span className="flex-1 leading-relaxed text-sm sm:text-[15px]">
                      <span className="mr-3 font-semibold text-white/80">{getOptionLetter(oIndex)}.</span>
                      {opt}
                    </span>
                    {isCorrect && <CheckCircle className="h-5 w-5 shrink-0 text-emerald-300" />}
                    {isWrong && <XCircle className="h-5 w-5 shrink-0 text-rose-300" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="mt-4 border-t border-white/10 pt-4 text-sm">
                {selectedIndex === String(correctIndex) ? (
                  <span className="font-medium tracking-wide text-emerald-300">Excellent. That&apos;s correct.</span>
                ) : (
                  <span className="font-medium tracking-wide text-rose-300">
                    Incorrect. The right answer is <strong className="font-bold">{q.correctLetter}</strong>.
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
