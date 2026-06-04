import fs from 'fs/promises';
import path from 'path';
import { subjects } from './config';
import {
  CODE_WRITING_QUESTIONS,
  type ExamQuestion,
  HARD_MCQ_QUESTIONS,
} from './exam';
import { parseQuizQuestions } from './quiz-parser';

const examSourceSubjectId = 'object-oriented-programming';

export async function getExamQuestions(): Promise<ExamQuestion[]> {
  const subject = subjects.find((item) => item.id === examSourceSubjectId) ?? {
    id: examSourceSubjectId,
    title: 'Object-Oriented Programming',
  };
  const quizPath = path.join(process.cwd(), 'public', `${subject.id}_Q.md`);
  const quiz = await fs.readFile(quizPath, 'utf8');
  const questions = parseQuizQuestions(subject.id, quiz);
  const multipleChoiceQuestions = questions
    .filter((question) => question.type === 'multiple-choice')
    .slice(0, HARD_MCQ_QUESTIONS)
    .map<ExamQuestion>((question) => ({
      ...question,
      difficulty: 'Hard',
      marks: 1,
      subjectId: subject.id,
      subjectTitle: subject.title,
    }));
  const codeQuestions = questions
    .filter((question) => question.type === 'code')
    .slice(0, CODE_WRITING_QUESTIONS)
    .map<ExamQuestion>((question) => ({
      ...question,
      difficulty: 'Hard',
      marks: 0,
      subjectId: subject.id,
      subjectTitle: subject.title,
    }));

  return [...multipleChoiceQuestions, ...codeQuestions];
}
