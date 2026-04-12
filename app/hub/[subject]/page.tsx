import fs from 'fs/promises';
import path from 'path';
import ClientTabs from './ClientTabs';
import TopBar from '@/components/TopBar';
import { QuizQuestion } from '@/components/QuizEngine';

const subjectTitles: Record<string, string> = {
  french: 'Foreign Language (French)',
  dsa: 'Data Structures',
  dbms: 'Database Management Systems',
  web: 'Web Application Development-II',
  uhv: 'Universal Human Values',
  quantum: 'Fundamentals of Quantum Computing',
  caeg: 'Computer Aided Engineering Graphics',
  maths: 'Mathematics for Problem Solving',
};

interface PageProps {
  params: Promise<{ subject: string }>;
}

function normalizeQuizText(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[“”"'`’.,!?;:()[\]{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function parseQuizQuestions(subject: string, quizStr: string): QuizQuestion[] {
  const cleanedQuiz = quizStr
    .replace(/^```markdown\s*/i, '')
    .replace(/\n```[\s\n]*$/i, '')
    .trim();

  const quizQuestions: QuizQuestion[] = [];
  const lines = cleanedQuiz.split('\n');

  let questionText = '';
  let blockLines: string[] = [];

  const flushBlock = () => {
    if (!questionText) return;

    const trimmedLines = blockLines.map((line) => line.trim()).filter(Boolean);
    const optionsLine = trimmedLines.find((line) => line.includes('|'));
    const answerLine = trimmedLines.find((line) => /^<Answer:/i.test(line));
    const extraQuestionLines = trimmedLines.filter(
      (line) => !line.includes('|') && !/^<Answer:/i.test(line)
    );

    questionText = [questionText, ...extraQuestionLines].join(' ').trim();

    if (!optionsLine || !answerLine) {
      questionText = '';
      blockLines = [];
      return;
    }

    const options = optionsLine
      .split('|')
      .map((option) => option.trim().replace(/^[A-Da-d][.)]\s*/, '').trim())
      .filter(Boolean);

    const answerBody = answerLine.match(/^<Answer:\s*(.+?)>\s*$/i)?.[1]?.trim();
    if (!answerBody || options.length === 0) {
      questionText = '';
      blockLines = [];
      return;
    }

    const answerWithLetter = answerBody.match(/^([A-Da-d])[.)]\s*(.+)$/);
    let correctLetter = '';
    let correctAnswer = '';

    if (answerWithLetter) {
      correctLetter = answerWithLetter[1].toUpperCase();
      correctAnswer = answerWithLetter[2].trim();
    } else {
      const normalizedAnswer = normalizeQuizText(answerBody);
      const answerIndex = options.findIndex((option) => {
        const normalizedOption = normalizeQuizText(option);
        return (
          normalizedOption === normalizedAnswer ||
          normalizedOption.includes(normalizedAnswer) ||
          normalizedAnswer.includes(normalizedOption)
        );
      });

      if (answerIndex === -1) {
        questionText = '';
        blockLines = [];
        return;
      }

      correctLetter = String.fromCharCode(65 + answerIndex);
      correctAnswer = options[answerIndex];
    }

    quizQuestions.push({
      id: `${subject}-${quizQuestions.length + 1}`,
      question: questionText,
      options,
      correctLetter,
      correctAnswer,
    });

    questionText = '';
    blockLines = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line === '---' || /^###\s+Part\b/i.test(line)) {
      continue;
    }

    const questionMatch = line.match(/^\*\*(\d+)\.\s+(.+?)\*\*$/);
    if (questionMatch) {
      flushBlock();
      questionText = questionMatch[2].trim();
      blockLines = [];
      continue;
    }

    if (questionText) {
      blockLines.push(line);
    }
  }

  flushBlock();
  return quizQuestions;
}

export default async function SubjectPage({ params }: PageProps) {
  const { subject } = await params;
  const subjectTitle = subjectTitles[subject] ?? subject.replace(/-/g, ' ');
  
  // Read content
  let contentStr = '';
  try {
    const cPath = path.join(process.cwd(), 'public', `${subject}_C.md`);
    contentStr = await fs.readFile(cPath, 'utf8');
  } catch {
    try {
      const bPath = path.join(process.cwd(), 'public', `${subject}.md`);
      contentStr = await fs.readFile(bPath, 'utf8');
    } catch {
      contentStr = ''; // Not found
    }
  }

  contentStr = contentStr.replace(/^Here is the clean Markdown[\s\S]*?(?=#+ \w+)/i, '').trim();

  // Read quiz
  let quizStr = '';
  try {
    const qPath = path.join(process.cwd(), 'public', `${subject}_Q.md`);
    quizStr = await fs.readFile(qPath, 'utf8');
  } catch {
    quizStr = '';
  }

  // Parse Quiz
  const quizQuestions = quizStr ? parseQuizQuestions(subject, quizStr) : [];

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
