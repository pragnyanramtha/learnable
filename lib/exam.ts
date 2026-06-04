import type { QuizQuestion } from './types';
import {
  CODE_SIMILARITY_PASS_THRESHOLD,
  getCodeSimilarity,
} from './code-similarity';

export const EXAM_DURATION_SECONDS = 30 * 60;
export const HARD_MCQ_QUESTIONS = 20;
export const CODE_WRITING_QUESTIONS = 10;
export const TOTAL_EXAM_QUESTIONS = HARD_MCQ_QUESTIONS + CODE_WRITING_QUESTIONS;

export type ExamDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface ExamQuestion extends QuizQuestion {
  difficulty: ExamDifficulty;
  marks: number;
  subjectId: string;
  subjectTitle: string;
}

export type PublicExamQuestion = Omit<ExamQuestion, 'correctAnswer' | 'correctLetter' | 'explanation'>;

export interface CandidateDetails {
  email: string;
  name: string;
  phone?: string;
}

export type ExamAnswerMap = Record<string, number>;
export type ExamCodeAnswerMap = Record<string, string>;

export interface ExamIntegritySummary {
  autoSubmitted: boolean;
  reason?: string;
  warningCount: number;
}

export interface ExamResult {
  attempted: number;
  candidate: CandidateDetails;
  codeAttempted: number;
  codeCorrect: number;
  codeResponses: StoredCodeResponse[];
  correct: number;
  id: string;
  integrity: ExamIntegritySummary;
  percentage: number;
  score: number;
  submittedAt: string;
  totalMarks: number;
  totalQuestions: number;
}

export interface StoredExamSubmission {
  attempted: number;
  candidate: CandidateDetails;
  codeAttempted: number;
  codeCorrect: number;
  codeResponses: StoredCodeResponse[];
  correct: number;
  id: string;
  integrity: ExamIntegritySummary;
  percentage: number;
  score: number;
  submittedAt: string;
  totalMarks: number;
  totalQuestions: number;
}

export interface ExamSubmissionReceipt {
  id: string;
  stored: boolean;
  submittedAt: string;
  totalQuestions: number;
}

export interface StoredCodeResponse {
  answer: string;
  passed: boolean;
  question: string;
  questionId: string;
  requiredSimilarity: number;
  similarity: number;
  subjectTitle: string;
}

export function optionLetter(index: number) {
  return String.fromCharCode(65 + index);
}

export function toPublicExamQuestion(question: ExamQuestion): PublicExamQuestion {
  return {
    difficulty: question.difficulty,
    id: question.id,
    instructions: question.instructions,
    marks: question.marks,
    options: question.options,
    question: question.question,
    subjectId: question.subjectId,
    subjectTitle: question.subjectTitle,
    type: question.type,
  };
}

export function calculateExamResult(
  questions: ExamQuestion[],
  answers: ExamAnswerMap,
  codeAnswers: ExamCodeAnswerMap,
  candidate: CandidateDetails,
  integrity: ExamIntegritySummary = { autoSubmitted: false, warningCount: 0 }
): ExamResult {
  let correct = 0;

  const score = questions.reduce((total, question) => {
    if (question.type === 'code') return total;

    const selectedIndex = answers[question.id];
    if (selectedIndex === undefined) return total;

    if (optionLetter(selectedIndex) !== question.correctLetter) return total;

    correct += 1;
    return total + question.marks;
  }, 0);
  const totalMarks = questions.reduce((total, question) => total + question.marks, 0);
  const attempted = questions.filter((question) => {
    if (question.type === 'code') return Boolean(codeAnswers[question.id]?.trim());
    return answers[question.id] !== undefined;
  }).length;
  const codeResponses = questions
    .filter((question) => question.type === 'code')
    .map((question) => ({
      answer: codeAnswers[question.id]?.trim() ?? '',
      passed: false,
      question: question.question,
      questionId: question.id,
      requiredSimilarity: CODE_SIMILARITY_PASS_THRESHOLD,
      similarity: 0,
      subjectTitle: question.subjectTitle,
    }));
  let codeCorrect = 0;
  for (const response of codeResponses) {
    const question = questions.find((item) => item.id === response.questionId);
    const similarity = getCodeSimilarity(response.answer, question?.correctAnswer ?? '');
    const passed = Boolean(response.answer && similarity >= CODE_SIMILARITY_PASS_THRESHOLD);

    response.similarity = similarity;
    response.passed = passed;

    if (passed) {
      codeCorrect += 1;
      correct += 1;
    }
  }
  const codeAttempted = codeResponses.filter((response) => response.answer).length;
  const codeScore = questions
    .filter((question) => question.type === 'code')
    .filter((question) => codeResponses.find((response) => response.questionId === question.id)?.passed)
    .reduce((total, question) => total + question.marks, 0);
  const finalScore = score + codeScore;

  return {
    attempted,
    candidate,
    codeAttempted,
    codeCorrect,
    codeResponses,
    correct,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    integrity,
    percentage: totalMarks > 0 ? Math.round((finalScore / totalMarks) * 10000) / 100 : 0,
    score: finalScore,
    submittedAt: new Date().toISOString(),
    totalMarks,
    totalQuestions: questions.length,
  };
}

export function toStoredExamSubmission(result: ExamResult): StoredExamSubmission {
  return {
    attempted: result.attempted,
    candidate: result.candidate,
    codeAttempted: result.codeAttempted,
    codeCorrect: result.codeCorrect,
    codeResponses: result.codeResponses,
    correct: result.correct,
    id: result.id,
    integrity: result.integrity,
    percentage: result.percentage,
    score: result.score,
    submittedAt: result.submittedAt,
    totalMarks: result.totalMarks,
    totalQuestions: result.totalQuestions,
  };
}
