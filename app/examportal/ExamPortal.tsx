'use client';

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  Phone,
  RotateCcw,
  Save,
  Timer,
  UserRound,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  EXAM_DURATION_SECONDS,
  optionLetter,
  type CandidateDetails,
  type ExamAnswerMap,
  type ExamCodeAnswerMap,
  type ExamSubmissionReceipt,
  type PublicExamQuestion,
} from '@/lib/exam';

interface ExamPortalProps {
  questions: PublicExamQuestion[];
}

type ExamState = 'details' | 'exam' | 'result';
const INTEGRITY_WARNING_LIMIT = 3;

const emptyCandidate: CandidateDetails = {
  email: '',
  name: '',
  phone: '',
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function ExamPortal({ questions }: ExamPortalProps) {
  const [answers, setAnswers] = useState<ExamAnswerMap>({});
  const [codeAnswers, setCodeAnswers] = useState<ExamCodeAnswerMap>({});
  const [candidate, setCandidate] = useState<CandidateDetails>(emptyCandidate);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenGuardActive, setFullscreenGuardActive] = useState(false);
  const [formError, setFormError] = useState('');
  const [integrityMessage, setIntegrityMessage] = useState('');
  const [integrityWarnings, setIntegrityWarnings] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(EXAM_DURATION_SECONDS);
  const [receipt, setReceipt] = useState<ExamSubmissionReceipt | null>(null);
  const [selectionMessage, setSelectionMessage] = useState('');
  const [state, setState] = useState<ExamState>('details');
  const [submitError, setSubmitError] = useState('');
  const lastIntegrityEventAt = useRef(0);

  const currentQuestion = questions[currentIndex];
  const answeredCount = useMemo(
    () =>
      questions.filter((question) =>
        question.type === 'code'
          ? Boolean(codeAnswers[question.id]?.trim())
          : answers[question.id] !== undefined
      ).length,
    [answers, codeAnswers, questions]
  );
  const mcqCount = useMemo(
    () => questions.filter((question) => question.type === 'multiple-choice').length,
    [questions]
  );
  const codeQuestionCount = useMemo(
    () => questions.filter((question) => question.type === 'code').length,
    [questions]
  );
  const totalMarks = useMemo(
    () => questions.reduce((total, question) => total + question.marks, 0),
    [questions]
  );

  const recordIntegrityEvent = useCallback((message: string) => {
    const now = Date.now();
    if (now - lastIntegrityEventAt.current < 1200) return;

    lastIntegrityEventAt.current = now;
    setIntegrityMessage(message);
    setIntegrityWarnings((count) => Math.min(count + 1, INTEGRITY_WARNING_LIMIT));
  }, []);

  const submitExam = useCallback(async (reasonOverride = '') => {
    if (state !== 'exam' || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/exam-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          candidate,
          codeAnswers,
          integrity: {
            autoSubmitted: Boolean(reasonOverride),
            reason: reasonOverride || undefined,
            warningCount: integrityWarnings,
          },
        }),
      });
      const payload = (await response.json()) as { error?: string; receipt?: ExamSubmissionReceipt };

      if (!response.ok || !payload.receipt) {
        throw new Error(payload.error || 'Could not submit exam.');
      }

      setReceipt(payload.receipt);
      setFullscreenGuardActive(false);
      if (document.fullscreenElement) {
        void document.exitFullscreen().catch(() => undefined);
      }
      setState('result');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not submit exam.');
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, candidate, codeAnswers, integrityWarnings, isSubmitting, state]);

  useEffect(() => {
    if (state !== 'exam') return;

    if (remainingSeconds <= 0) {
      const submitId = window.setTimeout(() => {
        void submitExam();
      }, 0);
      return () => window.clearTimeout(submitId);
    }

    const timerId = window.setInterval(() => {
      setRemainingSeconds((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [remainingSeconds, state, submitExam]);

  useEffect(() => {
    if (state !== 'exam') return;

    const preventRestrictedAction = (event: Event) => {
      event.preventDefault();
      recordIntegrityEvent('Copy, paste, and context-menu actions are disabled during the exam.');
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordIntegrityEvent('Please stay on the exam tab until you submit.');
      }
    };
    const handleWindowBlur = () => {
      recordIntegrityEvent('The exam window lost focus.');
    };
    const handleFullscreenChange = () => {
      if (fullscreenGuardActive && !document.fullscreenElement) {
        recordIntegrityEvent('Fullscreen mode was exited during the exam.');
      }
    };

    document.addEventListener('copy', preventRestrictedAction);
    document.addEventListener('cut', preventRestrictedAction);
    document.addEventListener('paste', preventRestrictedAction);
    document.addEventListener('contextmenu', preventRestrictedAction);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('copy', preventRestrictedAction);
      document.removeEventListener('cut', preventRestrictedAction);
      document.removeEventListener('paste', preventRestrictedAction);
      document.removeEventListener('contextmenu', preventRestrictedAction);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [fullscreenGuardActive, recordIntegrityEvent, state]);

  useEffect(() => {
    if (state !== 'exam' || integrityWarnings < INTEGRITY_WARNING_LIMIT || isSubmitting) return;

    const submitId = window.setTimeout(() => {
      void submitExam('Auto-submitted after repeated exam integrity warnings.');
    }, 250);

    return () => window.clearTimeout(submitId);
  }, [integrityWarnings, isSubmitting, state, submitExam]);

  const handleDetailsSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const nextCandidate = {
      email: candidate.email.trim(),
      name: candidate.name.trim(),
      phone: candidate.phone?.trim() || undefined,
    };

    if (!form.checkValidity() || !nextCandidate.name || !nextCandidate.email) {
      setFormError('Enter a valid name and email to start.');
      return;
    }

    if (questions.length === 0) {
      setFormError('No exam questions are available yet.');
      return;
    }

    if (document.fullscreenEnabled && !document.fullscreenElement) {
      void document.documentElement
        .requestFullscreen()
        .then(() => setFullscreenGuardActive(true))
        .catch(() => setFullscreenGuardActive(false));
    }

    setAnswers({});
    setCodeAnswers({});
    setCandidate(nextCandidate);
    setCurrentIndex(0);
    setFormError('');
    setIntegrityMessage('');
    setIntegrityWarnings(0);
    setIsSubmitting(false);
    setSubmitError('');
    setRemainingSeconds(EXAM_DURATION_SECONDS);
    setReceipt(null);
    setSelectionMessage('');
    setState('exam');
  };

  const handleAnswer = (questionId: string, optionIndex: number) => {
    const selectedLetter = optionLetter(optionIndex);

    setAnswers((previous) => ({
      ...previous,
      [questionId]: optionIndex,
    }));
    setSelectionMessage(`Selected answer ${selectedLetter}. Your answer has been saved for this question.`);
  };

  const handleCodeAnswer = (questionId: string, value: string) => {
    setCodeAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }));
  };

  const startNewAttempt = () => {
    setAnswers({});
    setCodeAnswers({});
    setCandidate(emptyCandidate);
    setCurrentIndex(0);
    setFullscreenGuardActive(false);
    setFormError('');
    setIntegrityMessage('');
    setIntegrityWarnings(0);
    setIsSubmitting(false);
    setSubmitError('');
    setRemainingSeconds(EXAM_DURATION_SECONDS);
    setReceipt(null);
    setSelectionMessage('');
    setState('details');
  };

  return (
    <section className="flex w-full flex-col gap-8 py-4 sm:py-8" aria-labelledby="exam-heading">
      <div className="surface-panel rounded-[2.5rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Badge tone="gold">Exam Portal</Badge>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-[var(--color-text-secondary)]">
            <ClipboardCheck className="h-4 w-4 text-[var(--color-action-primary)]" />
            {questions.length} Questions · {totalMarks} Auto-graded marks
          </div>
        </div>
        <h1 id="exam-heading" className="mt-5 max-w-4xl text-4xl leading-none text-[var(--color-text-primary)] sm:text-5xl">
          Python Foundation MCQ Exam
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-text-secondary)]">
          The test has {mcqCount} hard multiple-choice questions followed by {codeQuestionCount} code-writing tasks.
          Multiple-choice marks are auto-calculated after final submission. Code answers are saved for instructor review.
        </p>
      </div>

      {state === 'details' && (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleDetailsSubmit} className="surface-panel rounded-[2.25rem] p-6 sm:p-8" noValidate>
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Candidate Details</h2>
            <div className="mt-6 grid gap-5">
              <label className="block text-sm font-semibold text-[var(--color-text-secondary)]">
                Full name
                <span className="mt-2 flex min-h-13 items-center gap-3 rounded-[1.25rem] border border-white/12 bg-white/[0.03] px-4 focus-within:border-[var(--color-action-primary)]">
                  <UserRound className="h-4 w-4 text-[var(--color-action-primary)]" />
                  <input
                    required
                    type="text"
                    value={candidate.name}
                    onChange={(event) => setCandidate((value) => ({ ...value, name: event.target.value }))}
                    className="min-h-12 flex-1 bg-transparent text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                    placeholder="Student name"
                  />
                </span>
              </label>

              <label className="block text-sm font-semibold text-[var(--color-text-secondary)]">
                Email
                <span className="mt-2 flex min-h-13 items-center gap-3 rounded-[1.25rem] border border-white/12 bg-white/[0.03] px-4 focus-within:border-[var(--color-action-primary)]">
                  <Mail className="h-4 w-4 text-[var(--color-action-primary)]" />
                  <input
                    required
                    type="email"
                    value={candidate.email}
                    onChange={(event) => setCandidate((value) => ({ ...value, email: event.target.value }))}
                    className="min-h-12 flex-1 bg-transparent text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                    placeholder="student@example.com"
                  />
                </span>
              </label>

              <label className="block text-sm font-semibold text-[var(--color-text-secondary)]">
                Phone number <span className="font-normal text-[var(--color-text-muted)]">(optional)</span>
                <span className="mt-2 flex min-h-13 items-center gap-3 rounded-[1.25rem] border border-white/12 bg-white/[0.03] px-4 focus-within:border-[var(--color-action-primary)]">
                  <Phone className="h-4 w-4 text-[var(--color-action-primary)]" />
                  <input
                    type="tel"
                    value={candidate.phone}
                    onChange={(event) => setCandidate((value) => ({ ...value, phone: event.target.value }))}
                    className="min-h-12 flex-1 bg-transparent text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                    placeholder="Optional"
                  />
                </span>
              </label>
            </div>

            {formError && (
              <p className="mt-5 rounded-[1.25rem] border border-rose-300/40 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-200">
                {formError}
              </p>
            )}

            <Button type="submit" className="mt-7 w-full sm:w-auto">
              Start Exam
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <aside className="surface-panel rounded-[2.25rem] p-6 sm:p-8" aria-label="Exam summary">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{formatTime(EXAM_DURATION_SECONDS)}</p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Exam duration</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{totalMarks} auto-graded marks</p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">One mark for each correct MCQ; code tasks are reviewed manually</p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[color:rgba(244,200,81,0.18)] bg-white/[0.03] p-5">
              <div className="flex items-center gap-3 text-[var(--color-action-primary)]">
                <Save className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Stored Centrally</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                Name, contact fields, MCQ score, submission time, integrity warnings, and code-task answers are stored for review.
              </p>
            </div>
            <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-action-primary)]">Accessible Answering</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                MCQ answers are radio buttons. Use Tab to reach the answer group, arrow keys to move between options, and Space or Enter to select. The page announces the selected answer.
              </p>
            </div>
          </aside>
        </div>
      )}

      {state === 'exam' && currentQuestion && (
        <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="surface-panel rounded-[2rem] p-5 sm:p-6" aria-label="Exam progress">
            <div className="flex items-center justify-between gap-4">
              <Badge tone="outline">{candidate.name}</Badge>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-2 text-sm font-semibold text-[var(--color-text-primary)]">
                <Timer className="h-4 w-4 text-[var(--color-action-primary)]" />
                {formatTime(remainingSeconds)}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-[var(--color-text-secondary)]">
                Answered {answeredCount} of {questions.length}
              </p>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-[var(--color-action-primary)]"
                  style={{ width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-action-primary)]">
                Integrity Guard
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                Warnings {integrityWarnings}/{INTEGRITY_WARNING_LIMIT}. Keep this tab active and avoid copy/paste actions.
              </p>
              {integrityMessage && (
                <p className="mt-2 text-sm font-semibold leading-6 text-rose-200">
                  {integrityMessage}
                </p>
              )}
            </div>
            <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-5">
              {questions.map((question, index) => {
                const isCurrent = currentIndex === index;
                const isAnswered =
                  question.type === 'code'
                    ? Boolean(codeAnswers[question.id]?.trim())
                    : answers[question.id] !== undefined;

                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(index);
                      setSelectionMessage('');
                    }}
                    aria-label={`Go to question ${index + 1}, ${isAnswered ? 'answered' : 'not answered'}`}
                    aria-current={isCurrent ? 'step' : undefined}
                    className={clsx(
                      'flex aspect-square min-h-11 items-center justify-center rounded-full border text-sm font-semibold transition-all',
                      isCurrent && 'border-[var(--color-action-primary)] bg-[var(--color-action-primary)] text-[var(--color-ink-strong)]',
                      !isCurrent && isAnswered && 'border-[color:rgba(244,200,81,0.36)] bg-[color:rgba(244,200,81,0.14)] text-[var(--color-action-primary)]',
                      !isCurrent && !isAnswered && 'border-white/12 bg-white/[0.03] text-[var(--color-text-secondary)] hover:border-white/28'
                    )}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            {submitError && (
              <p className="mt-5 rounded-[1.25rem] border border-rose-300/40 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-200">
                {submitError}
              </p>
            )}
            <Button type="button" onClick={() => void submitExam()} disabled={isSubmitting} className="mt-6 w-full">
              {isSubmitting ? 'Submitting...' : 'Submit Exam'}
              <ClipboardCheck className="h-4 w-4" />
            </Button>
          </aside>

          <article className="surface-panel rounded-[2.25rem] p-6 sm:p-8 xl:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <Badge tone="navy">{currentQuestion.subjectTitle}</Badge>
                <Badge tone="outline">{currentQuestion.difficulty}</Badge>
              </div>
              <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
                Question {currentIndex + 1} of {questions.length} · {currentQuestion.marks} mark
              </p>
            </div>
            <h2 className="mt-6 text-2xl font-semibold leading-snug text-[var(--color-text-primary)]">
              {currentQuestion.question}
            </h2>
            {currentQuestion.type === 'code' ? (
              <div className="mt-6">
                <div className="rounded-[1.25rem] border border-[color:rgba(244,200,81,0.2)] bg-white/[0.03] p-4 text-sm leading-7 text-[var(--color-text-secondary)]">
                  <p className="font-semibold text-[var(--color-text-primary)]">Code-writing instructions</p>
                  <p className="mt-2">
                    {currentQuestion.instructions ?? 'Write Python code that solves the task. Use clear names and include validation when requested.'}
                  </p>
                  <p className="mt-2">
                    This task is saved for instructor review and is not auto-graded by the website. Do not paste from outside sources during the exam.
                  </p>
                </div>
                <label htmlFor={`${currentQuestion.id}-code`} className="mt-5 block text-sm font-semibold text-[var(--color-text-secondary)]">
                  Python code answer for question {currentIndex + 1}
                </label>
                <textarea
                  id={`${currentQuestion.id}-code`}
                  value={codeAnswers[currentQuestion.id] ?? ''}
                  onChange={(event) => handleCodeAnswer(currentQuestion.id, event.target.value)}
                  spellCheck={false}
                  className="mt-2 min-h-80 w-full resize-y rounded-[1.25rem] border border-white/12 bg-[#071321] p-4 font-mono text-sm leading-7 text-[#e5edf7] outline-none transition-colors focus:border-[var(--color-action-primary)] focus:ring-2 focus:ring-[var(--color-action-primary)]"
                  placeholder="Write your Python code here."
                  aria-describedby={`${currentQuestion.id}-code-help`}
                />
                <p id={`${currentQuestion.id}-code-help`} className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                  Your code answer is saved while you type and submitted with the exam.
                </p>
              </div>
            ) : (
              <fieldset className="mt-6" aria-describedby={`${currentQuestion.id}-selection-status`}>
                <legend className="sr-only">Answer choices for question {currentIndex + 1}</legend>
                <p id={`${currentQuestion.id}-selection-status`} role="status" aria-live="polite" aria-atomic="true" className="mb-4 text-sm font-semibold text-[var(--color-action-primary)]">
                  {selectionMessage || (
                    answers[currentQuestion.id] !== undefined
                      ? `Selected answer ${optionLetter(answers[currentQuestion.id])}.`
                      : 'No answer selected for this question.'
                  )}
                </p>
                <div className="grid gap-3">
                  {currentQuestion.options.map((option, optionIndex) => {
                    const selected = answers[currentQuestion.id] === optionIndex;
                    const optionId = `${currentQuestion.id}-option-${optionIndex}`;

                    return (
                      <label
                        key={option}
                        htmlFor={optionId}
                        className={clsx(
                          'flex min-h-14 cursor-pointer items-start gap-4 rounded-[1.25rem] border px-4 py-4 text-left transition-all focus-within:border-[var(--color-action-primary)] focus-within:ring-2 focus-within:ring-[var(--color-action-primary)]',
                          selected
                            ? 'border-[var(--color-action-primary)] bg-[color:rgba(244,200,81,0.14)] text-[var(--color-text-primary)]'
                            : 'border-white/12 bg-white/[0.03] text-[var(--color-text-secondary)] hover:border-[color:rgba(244,200,81,0.35)] hover:bg-white/[0.05]'
                        )}
                      >
                        <input
                          id={optionId}
                          type="radio"
                          name={`exam-question-${currentQuestion.id}`}
                          value={String(optionIndex)}
                          checked={selected}
                          onChange={() => handleAnswer(currentQuestion.id, optionIndex)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              event.preventDefault();
                              handleAnswer(currentQuestion.id, optionIndex);
                            }
                          }}
                          className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-action-primary)]"
                          aria-describedby={`${currentQuestion.id}-selection-status`}
                        />
                        <span className="leading-7">
                          <span className="mr-3 font-semibold text-[var(--color-action-primary)]">{optionLetter(optionIndex)}.</span>
                          {option}
                          {selected && <span className="ml-2 font-semibold">(selected)</span>}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}
            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCurrentIndex((index) => Math.max(index - 1, 0));
                  setSelectionMessage('');
                }}
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
                  setSelectionMessage('');
                }}
                disabled={currentIndex === questions.length - 1}
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </article>
        </div>
      )}

      {state === 'result' && receipt && (
        <section className="surface-panel mx-auto max-w-3xl rounded-[2.25rem] p-6 text-center sm:p-10" aria-live="polite">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:rgba(244,200,81,0.16)] text-[var(--color-action-primary)]">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <Badge tone="gold" className="mt-6">Submitted</Badge>
          <h2 className="mt-5 text-4xl font-semibold leading-tight text-[var(--color-text-primary)]">
            Thanks for attempting the examination.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[var(--color-text-secondary)]">
            Your response has been submitted successfully. The LearnABLE team has received your exam record.
          </p>
          <dl className="mx-auto mt-8 grid max-w-xl gap-3 text-sm text-left">
            <div className="flex justify-between gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3">
              <dt className="text-[var(--color-text-secondary)]">Submission ID</dt>
              <dd className="max-w-[12rem] truncate text-right font-semibold text-[var(--color-text-primary)]">{receipt.id}</dd>
            </div>
            <div className="flex justify-between gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3">
              <dt className="text-[var(--color-text-secondary)]">Questions</dt>
              <dd className="font-semibold text-[var(--color-text-primary)]">{receipt.totalQuestions}</dd>
            </div>
            <div className="flex justify-between gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3">
              <dt className="text-[var(--color-text-secondary)]">Submitted</dt>
              <dd className="text-right font-semibold text-[var(--color-text-primary)]">
                {new Date(receipt.submittedAt).toLocaleString()}
              </dd>
            </div>
          </dl>
          <Button type="button" onClick={startNewAttempt} variant="outline" className="mt-8">
            <RotateCcw className="h-4 w-4" />
            New Attempt
          </Button>
        </section>
      )}
    </section>
  );
}
