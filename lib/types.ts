export interface SubjectConfig {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ExamEvent {
  date: string;
  day: string;
  time: string;
  title: string;
  slug: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  correctLetter: string;
}
