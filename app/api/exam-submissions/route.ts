import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getExamQuestions } from '@/lib/exam-bank';
import {
  calculateExamResult,
  toStoredExamSubmission,
  type ExamCodeAnswerMap,
  type CandidateDetails,
  type ExamAnswerMap,
  type ExamIntegritySummary,
} from '@/lib/exam';

export const runtime = 'nodejs';

interface SubmissionBody {
  answers?: unknown;
  candidate?: Partial<CandidateDetails>;
  codeAnswers?: unknown;
  integrity?: Partial<ExamIntegritySummary>;
}

function sanitizeCandidate(candidate?: Partial<CandidateDetails>): CandidateDetails | null {
  const name = candidate?.name?.trim();
  const email = candidate?.email?.trim();
  const phone = candidate?.phone?.trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }

  return {
    email,
    name,
    phone: phone || undefined,
  };
}

function sanitizeAnswers(value: unknown): ExamAnswerMap {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  return Object.entries(value).reduce<ExamAnswerMap>((answers, [questionId, selectedIndex]) => {
    if (typeof selectedIndex === 'number' && Number.isInteger(selectedIndex) && selectedIndex >= 0 && selectedIndex <= 3) {
      answers[questionId] = selectedIndex;
    }

    return answers;
  }, {});
}

function sanitizeCodeAnswers(value: unknown): ExamCodeAnswerMap {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  return Object.entries(value).reduce<ExamCodeAnswerMap>((answers, [questionId, answer]) => {
    if (typeof answer === 'string') {
      answers[questionId] = answer.slice(0, 12000);
    }

    return answers;
  }, {});
}

function sanitizeIntegrity(value?: Partial<ExamIntegritySummary>): ExamIntegritySummary {
  const warningCount =
    typeof value?.warningCount === 'number' && Number.isFinite(value.warningCount)
      ? Math.max(0, Math.min(Math.trunc(value.warningCount), 20))
      : 0;
  const reason = typeof value?.reason === 'string' ? value.reason.trim().slice(0, 160) : undefined;

  return {
    autoSubmitted: Boolean(value?.autoSubmitted),
    reason: reason || undefined,
    warningCount,
  };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SubmissionBody | null;
  const candidate = sanitizeCandidate(body?.candidate);

  if (!candidate) {
    return NextResponse.json({ error: 'Valid name and email are required.' }, { status: 400 });
  }

  const questions = await getExamQuestions();
  const answers = sanitizeAnswers(body?.answers);
  const codeAnswers = sanitizeCodeAnswers(body?.codeAnswers);
  const integrity = sanitizeIntegrity(body?.integrity);
  const result = calculateExamResult(questions, answers, codeAnswers, candidate, integrity);
  const storedSubmission = toStoredExamSubmission(result);
  const submittedDay = result.submittedAt.slice(0, 10);

  try {
    await put(
      `exam-submissions/${submittedDay}/${result.id}.json`,
      JSON.stringify(storedSubmission, null, 2),
      {
        access: 'private',
        contentType: 'application/json',
      }
    );
  } catch {
    return NextResponse.json({ error: 'Could not save exam result. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({
    receipt: {
      id: result.id,
      stored: true,
      submittedAt: result.submittedAt,
      totalQuestions: result.totalQuestions,
    },
  });
}
