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
  const quizQuestions: QuizQuestion[] = [];
  if (quizStr) {
    const blocks = quizStr.split(/\*\*\d+\.\s/g).filter(Boolean);
    blocks.forEach((block, idx) => {
      const lines = block.split('\n').filter(l => l.trim().length > 0);
      if (lines.length >= 3) {
        const questionText = lines[0].replace(/\*\*/g, '').trim();
        let optionsLine = lines[1];
        let answerLine = lines[2];
        
        if (lines[1].startsWith('<Answer')) {
          answerLine = lines[1];
          optionsLine = lines[2];
        }
        
        const options = optionsLine.split('|').map(o => {
          return o.trim().replace(/^[A-Z]\.\s*/, '');
        }).filter(o => o.length > 0);

        const answerMatch = answerLine.match(/<Answer:\s*([A-Z])\.\s*(.*)>/);
        if (answerMatch && options.length > 0) {
          quizQuestions.push({
            id: `${subject}-${idx}`,
            question: questionText,
            options,
            correctLetter: answerMatch[1],
            correctAnswer: answerMatch[2].trim()
          });
        }
      }
    });
  }

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
