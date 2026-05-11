import fs from 'fs/promises';
import path from 'path';
import ClientTabs from './ClientTabs';
import TopBar from '@/components/TopBar';
import { getSubjectTitle } from '@/lib/config';
import { parseQuizQuestions } from './quizParser';
import type { QuizQuestion } from '@/lib/types';

interface PageProps {
  params: Promise<{ subject: string }>;
}

export default async function SubjectPage({ params }: PageProps) {
  const { subject } = await params;
  const subjectTitle = getSubjectTitle(subject);

  let contentStr = '';
  try {
    const cPath = path.join(process.cwd(), 'public', `${subject}_C.md`);
    contentStr = await fs.readFile(cPath, 'utf8');
  } catch {
    try {
      const bPath = path.join(process.cwd(), 'public', `${subject}.md`);
      contentStr = await fs.readFile(bPath, 'utf8');
    } catch {
      contentStr = '';
    }
  }

  contentStr = contentStr.replace(/^Here is the clean Markdown[\s\S]*?(?=#+ \w+)/i, '').trim();

  let quizStr = '';
  try {
    const qPath = path.join(process.cwd(), 'public', `${subject}_Q.md`);
    quizStr = await fs.readFile(qPath, 'utf8');
  } catch {
    quizStr = '';
  }

  const quizQuestions: QuizQuestion[] = quizStr ? parseQuizQuestions(subject, quizStr) : [];

  return (
    <>
      <TopBar />
      <ClientTabs
        subjectTitle={subjectTitle}
        contentStr={contentStr}
        quizQuestions={quizQuestions}
      />
    </>
  );
}
