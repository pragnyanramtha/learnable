import { SubjectConfig, ClassEvent } from './types';

export const siteConfig = {
  name: 'LEARNABLE',
  shortName: 'LEARNABLE',
  description: 'Accessible class hub',
  tagline: 'Classes, notes, and practice in one place',
  todayLabel: '11 May 2026',
} as const;

/**
 * ──────────────────────────────────────────────
 *  SUBJECTS
 *  Add / remove / reorder entries here.
 *  id is used for the URL slug and content files.
 * ──────────────────────────────────────────────
 */
export const subjects: SubjectConfig[] = [
  { id: 'functions-variables', title: 'Functions, Variables', description: 'Core syntax, naming, parameters, and reusable building blocks.' },
  { id: 'conditionals', title: 'Conditionals', description: 'Branching logic with clear decision-making and control flow.' },
  { id: 'loops', title: 'Loops', description: 'Iteration patterns for repeated work across data and tasks.' },
  { id: 'exceptions', title: 'Exceptions', description: 'Handling errors cleanly so programs fail safely and predictably.' },
  { id: 'libraries', title: 'Libraries', description: 'Using built-in and external modules to move faster with proven tools.' },
  { id: 'unit-tests', title: 'Unit Tests', description: 'Writing small, reliable tests that protect behavior and catch regressions.' },
  { id: 'file-io', title: 'File I/O', description: 'Reading from and writing to files with safe, practical workflows.' },
  { id: 'regular-expressions', title: 'Regular Expressions', description: 'Pattern matching for validation, search, and text processing.' },
  { id: 'object-oriented-programming', title: 'Object-Oriented Programming', description: 'Structuring code with classes, objects, and shared behavior.' },
  { id: 'et-cetera', title: 'Et Cetera', description: 'Flexible space for review, extensions, and anything the class needs next.' },
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
export const examEvents: ClassEvent[] = [
  { date: '11-05-2026', day: 'Monday', time: '6:00 PM - 7:00 PM', title: 'Functions, Variables', slug: 'functions-variables' },
  { date: '14-05-2026', day: 'Thursday', time: '6:00 PM - 7:00 PM', title: 'Conditionals', slug: 'conditionals' },
  { date: '18-05-2026', day: 'Monday', time: '6:00 PM - 7:00 PM', title: 'Loops', slug: 'loops' },
  { date: '21-05-2026', day: 'Thursday', time: '6:00 PM - 7:00 PM', title: 'Exceptions', slug: 'exceptions' },
  { date: '25-05-2026', day: 'Monday', time: '6:00 PM - 7:00 PM', title: 'Libraries', slug: 'libraries' },
  { date: '28-05-2026', day: 'Thursday', time: '6:00 PM - 7:00 PM', title: 'Unit Tests', slug: 'unit-tests' },
  { date: '01-06-2026', day: 'Monday', time: '6:00 PM - 7:00 PM', title: 'File I/O', slug: 'file-io' },
  { date: '04-06-2026', day: 'Thursday', time: '6:00 PM - 7:00 PM', title: 'Regular Expressions', slug: 'regular-expressions' },
  { date: '08-06-2026', day: 'Monday', time: '6:00 PM - 7:00 PM', title: 'Object-Oriented Programming', slug: 'object-oriented-programming' },
  { date: '11-06-2026', day: 'Thursday', time: '6:00 PM - 7:00 PM', title: 'Et Cetera', slug: 'et-cetera' },
];
