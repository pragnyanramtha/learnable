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
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});
  const [codeAnswers, setCodeAnswers] = useState<Record<string, string>>({});
  const [announcements, setAnnouncements] = useState<Record<string, string>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (checkedAnswers[questionId]) return;

    const selectedLetter = getOptionLetter(optionIndex);
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: String(optionIndex) }));
    setAnnouncements((prev) => ({
      ...prev,
      [questionId]: `Selected answer ${selectedLetter}. Press Check answer to hear the result.`,
    }));
  };

  const handleCheckAnswer = (questionId: string, correctLetter: string) => {
    const selectedIndex = selectedAnswers[questionId];

    if (selectedIndex === undefined) {
      setAnnouncements((prev) => ({
        ...prev,
        [questionId]: 'Choose one answer before checking this question.',
      }));
      return;
    }

    const selectedLetter = getOptionLetter(Number(selectedIndex));
    const isCorrect = selectedLetter === correctLetter;

    setCheckedAnswers((prev) => ({ ...prev, [questionId]: true }));
    setAnnouncements((prev) => ({
      ...prev,
      [questionId]: isCorrect
        ? `Correct. Selected answer ${selectedLetter}.`
        : `Incorrect. Selected answer ${selectedLetter}. Correct answer is ${correctLetter}.`,
    }));
  };

  const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

  if (!questions || questions.length === 0) {
    return <div className="surface-panel rounded-[2rem] p-6 text-sm text-[var(--color-text-secondary)]">No quiz available for this subject yet.</div>;
  }

  return (
    <div className="surface-panel w-full rounded-[2rem] p-6 sm:p-8">
      <div className="mb-8 rounded-[1.5rem] border border-[color:rgba(244,200,81,0.2)] bg-white/[0.03] p-4 text-sm leading-7 text-[var(--color-text-secondary)]">
        <p className="font-semibold text-[var(--color-text-primary)]">Quiz instructions</p>
        <p className="mt-2">
          Each multiple-choice question uses radio buttons. Use Tab to move to an answer group, arrow keys to review answers, and Space or Enter to select an answer. Then press Check answer to hear the result.
        </p>
        <p className="mt-2">
          Code-writing questions have a text area. Write Python code there for practice; these answers are not checked automatically on this page.
        </p>
      </div>
      <p className="sr-only">
        Quiz instructions: each multiple-choice question has radio button answers. Use arrow keys to move through answers, Space or Enter to select, then press Check answer. Code-writing questions use text areas.
      </p>
      <div className="space-y-10">
      {questions.map((q, qIndex) => {
        const selectedIndex = selectedAnswers[q.id];
        const isAnswered = Boolean(checkedAnswers[q.id]);
        const correctIndex = q.options.findIndex((_, index) => getOptionLetter(index) === q.correctLetter);
        const groupName = `quiz-question-${q.id}`;
        const legendId = `${q.id}-legend`;
        const statusId = `${q.id}-status`;

        if (q.type === 'code') {
          return (
            <fieldset key={q.id} className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
              <legend className="text-base font-semibold text-[var(--color-text-primary)] sm:text-lg leading-snug">
                {qIndex + 1}. {q.question}
              </legend>
              <div className="mt-4 rounded-[1.25rem] border border-[color:rgba(244,200,81,0.18)] bg-white/[0.03] p-4 text-sm leading-7 text-[var(--color-text-secondary)]">
                <p className="font-semibold text-[var(--color-text-primary)]">Code-writing instructions</p>
                <p className="mt-2">
                  {q.instructions ?? 'Write Python code that solves the task. Include clear names and handle invalid input where the question asks for validation.'}
                </p>
                <p className="mt-2">
                  This is a practice text area. It saves only while this page is open and is intended for instructor or self review.
                </p>
              </div>
              <label htmlFor={`${q.id}-code`} className="mt-5 block text-sm font-semibold text-[var(--color-text-secondary)]">
                Python code answer for question {qIndex + 1}
              </label>
              <textarea
                id={`${q.id}-code`}
                value={codeAnswers[q.id] ?? ''}
                onChange={(event) => setCodeAnswers((prev) => ({ ...prev, [q.id]: event.target.value }))}
                spellCheck={false}
                className="mt-2 min-h-64 w-full resize-y rounded-[1.25rem] border border-white/12 bg-[#071321] p-4 font-mono text-sm leading-7 text-[#e5edf7] outline-none transition-colors focus:border-[var(--color-action-primary)] focus:ring-2 focus:ring-[var(--color-action-primary)]"
                placeholder="Write your Python code here."
              />
              {q.explanation && (
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                  Review note: {q.explanation}
                </p>
              )}
            </fieldset>
          );
        }

        return (
          <fieldset key={q.id} className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0" aria-describedby={statusId}>
            <legend id={legendId} className="text-base font-semibold text-[var(--color-text-primary)] sm:text-lg leading-snug">
              {qIndex + 1}. {q.question}
            </legend>
            <p id={statusId} role="status" aria-live="polite" aria-atomic="true" className="mt-3 text-sm font-semibold text-[var(--color-action-primary)]">
              {announcements[q.id] ?? 'No answer selected yet.'}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {q.options.map((opt, oIndex) => {
                const isSelected = selectedIndex === String(oIndex);
                const isCorrect = isAnswered && oIndex === correctIndex;
                const isWrong = isSelected && !isCorrect;
                const optionId = `${q.id}-option-${oIndex}`;

                return (
                  <label
                    key={oIndex}
                    htmlFor={optionId}
                    className={clsx(
                      'flex min-h-14 cursor-pointer items-start justify-between gap-3 rounded-[1.5rem] border px-4 py-3 text-left transition-colors duration-200 focus-within:border-[var(--color-action-primary)] focus-within:ring-2 focus-within:ring-[var(--color-action-primary)]',
                      !isAnswered && !isSelected && 'border-white/10 bg-white/[0.02] hover:border-[color:rgba(244,200,81,0.28)] hover:bg-white/[0.05]',
                      !isAnswered && isSelected && 'border-[var(--color-action-primary)] bg-[color:rgba(244,200,81,0.14)] text-[var(--color-text-primary)]',
                      isAnswered && !isSelected && !isCorrect && 'border-white/10 bg-white/[0.02] opacity-70',
                      isCorrect && 'border-emerald-400/60 bg-emerald-400/10 text-emerald-200',
                      isWrong && 'border-rose-400/60 bg-rose-400/10 text-rose-200'
                    )}
                  >
                    <span className="flex flex-1 items-start gap-3 leading-relaxed text-sm sm:text-[15px]">
                      <input
                        id={optionId}
                        type="radio"
                        name={groupName}
                        value={String(oIndex)}
                        checked={isSelected}
                        disabled={isAnswered}
                        onChange={() => handleSelect(q.id, oIndex)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            handleSelect(q.id, oIndex);
                          }
                        }}
                        className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-action-primary)]"
                        aria-describedby={statusId}
                      />
                      <span>
                      <span className="mr-3 font-semibold text-[var(--color-action-primary)]">{getOptionLetter(oIndex)}.</span>
                      {opt}
                      {isSelected && <span className="ml-2 font-semibold">(selected)</span>}
                      {isCorrect && <span className="ml-2 font-semibold">(correct)</span>}
                      {isWrong && <span className="ml-2 font-semibold">(incorrect)</span>}
                      </span>
                    </span>
                    {isCorrect && <CheckCircle aria-hidden="true" className="h-5 w-5 shrink-0 text-emerald-300" />}
                    {isWrong && <XCircle aria-hidden="true" className="h-5 w-5 shrink-0 text-rose-300" />}
                  </label>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => handleCheckAnswer(q.id, q.correctLetter)}
              disabled={isAnswered}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-[color:rgba(237,224,196,0.28)] bg-white/[0.04] px-5 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-white/[0.08] disabled:cursor-default disabled:opacity-70"
            >
              {isAnswered ? 'Answer checked' : 'Check answer'}
            </button>

            {isAnswered && (
              <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-4 text-sm" aria-live="polite">
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
          </fieldset>
        );
      })}
      </div>
    </div>
  );
}
