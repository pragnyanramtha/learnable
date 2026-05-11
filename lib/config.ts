import { SubjectConfig, ExamEvent } from './types';

export const siteConfig = {
  name: 'MRVC Platform',
  shortName: 'MRVC Plat.',
  description: 'Student Hub',
  tagline: 'Student Portal',
  todayLabel: '12 Apr 2026',
} as const;

/**
 * ──────────────────────────────────────────────
 *  SUBJECTS
 *  Add / remove / reorder entries here.
 *  id is used for the URL slug and content files.
 * ──────────────────────────────────────────────
 */
export const subjects: SubjectConfig[] = [
  { id: 'french',  title: 'Foreign Language (French)', description: 'Reading material and question bank in French.' },
  { id: 'dsa',     title: 'Data Structures',           description: 'Core concepts, recursion, and complexity notes.' },
  { id: 'dbms',    title: 'Database Management Systems', description: 'Relational basics, schema, and normalization.' },
  { id: 'web',     title: 'Web Application Development-II', description: 'JavaScript, hoisting, async flow, and patterns.' },
  { id: 'uhv',     title: 'Universal Human Values',    description: 'Value education, natural acceptance, and ethics.' },
  { id: 'quantum', title: 'Fundamentals of Quantum Computing', description: 'Quantum basics, black-body laws, and matter waves.' },
  { id: 'caeg',    title: 'Computer Aided Engineering Graphics', description: 'CAD, dimensioning, and AutoCAD command basics.' },
  { id: 'maths',   title: 'Mathematics for Problem Solving', description: 'Clocks, calendars, pipes, and work problems.' },
];

/**
 * ──────────────────────────────────────────────
 *  CONTENT FILE CONVENTION
 *  public/{id}_C.md  → reading content
 *  public/{id}_Q.md  → quiz questions
 *  public/{id}.md    → fallback (content only)
 * ──────────────────────────────────────────────
 */

export function getSubject(id: string): SubjectConfig | undefined {
  return subjects.find((s) => s.id === id);
}

export function getSubjectTitle(id: string): string {
  return getSubject(id)?.title ?? id.replace(/-/g, ' ');
}

/**
 * ──────────────────────────────────────────────
 *  EXAM TIMELINE
 *  Edit the schedule here.
 * ──────────────────────────────────────────────
 */
export const examEvents: ExamEvent[] = [
  { date: '13-04-2026', day: 'Monday',    time: '10:00 AM - 12:00 PM', title: 'Foreign Language (French)',              slug: 'french' },
  { date: '15-04-2026', day: 'Wednesday', time: '10:00 AM - 12:00 PM', title: 'Mathematics for Problem Solving',         slug: 'maths' },
  { date: '15-04-2026', day: 'Wednesday', time: '1:30 PM - 3:30 PM',   title: 'Data Structures',                         slug: 'dsa' },
  { date: '16-04-2026', day: 'Thursday',  time: '10:00 AM - 12:00 PM', title: 'Database Management Systems',             slug: 'dbms' },
  { date: '16-04-2026', day: 'Thursday',  time: '1:30 PM - 3:30 PM',   title: 'Web Application Development-II',          slug: 'web' },
  { date: '17-04-2026', day: 'Friday',    time: '10:00 AM - 12:00 PM', title: 'Universal Human Values',                  slug: 'uhv' },
  { date: '17-04-2026', day: 'Friday',    time: '1:30 PM - 3:30 PM',   title: 'Fundamentals of Quantum Computing',       slug: 'quantum' },
  { date: '17-04-2026', day: 'Friday',    time: '1:30 PM - 3:30 PM',   title: 'Computer Aided Engineering Graphics',     slug: 'caeg' },
];
