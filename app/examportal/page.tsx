import type { Metadata } from 'next';
import TopBar from '@/components/TopBar';
import { getExamQuestions } from '@/lib/exam-bank';
import { toPublicExamQuestion } from '@/lib/exam';
import ExamPortal from './ExamPortal';

export const metadata: Metadata = {
  title: 'Exam Portal | LearnABLE',
  description: 'Formal MCQ exam portal for LearnABLE students.',
};

export default async function ExamPortalPage() {
  const questions = (await getExamQuestions()).map(toPublicExamQuestion);

  return (
    <>
      <TopBar />
      <ExamPortal questions={questions} />
    </>
  );
}
