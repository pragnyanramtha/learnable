# LearnABLE Exam Portal Design

## Source Snapshot

Source reviewed: `https://learnableindia.netlify.app`

Captured artifact: `/home/pik/dev/learnableindia-site.png`

The current LearnABLE class platform is a calm, accessible study workspace. It uses a fixed side navigation on desktop, a compact top bar plus bottom navigation on mobile, high-contrast support, soft elevated panels, and direct calls to reading or quiz modules.

## Existing Visual System

- Brand tone: supportive, accessible, low-noise, student-first.
- Primary palette: deep navy background, cream/gold action color, off-white text, muted cream secondary text.
- Typography: Cormorant Garamond for expressive headings; Plus Jakarta Sans for UI and body text.
- Surface language: translucent dark panels, fine cream borders, restrained shadow, rounded panel shapes.
- Interaction language: one clear action per panel, large touch targets, icon-backed navigation, high-contrast toggle.
- Layout pattern: desktop sidebar with content offset; mobile fixed top identity bar and bottom tab navigation.

## Exam Portal Product Direction

The exam portal should feel more formal than the current quick quizzes. The student must register before starting, answer MCQs without instant feedback, submit once, then receive marks immediately.

Primary route: `/examportal`

Core states:

- Candidate details: name and email required; phone optional.
- Active exam: question panel, accessible radio-button MCQs, code-answer text areas, progress, difficulty metadata, marks metadata, submit action.
- Result: thank-you confirmation only, with no score, answer review, or correct answers shown to the student.

## Exam Rules

- 20 hard MCQs followed by 3 code-writing questions.
- The current exam source is `public/object-oriented-programming_Q.md`.
- One correct answer per MCQ.
- One auto-graded mark per MCQ.
- Code-writing questions are saved for instructor review and are not auto-graded by the website.
- No answer feedback before final submission.
- Unanswered questions receive zero marks.
- Marks are calculated as `correct MCQs / auto-graded MCQ marks`.
- Students do not see correct answers after submission.
- Basic integrity guard records warnings for tab switching, focus loss, exiting fullscreen, and copy/paste/context-menu attempts.

## Storage Plan

Current Vercel implementation:

- The project is linked to Vercel as `pragnyanramthas/learnable`.
- A private Vercel Blob store named `learnable-exam-results` stores immutable submission JSON files.
- Browser submissions send selected option indexes and code-task text to `POST /api/exam-submissions`.
- The API route grades against server-side syllabus files and returns only a submission receipt.
- Saved fields: candidate name, email, optional phone, score, total auto-graded marks, percentage, correct count, attempted count, total question count, submitted timestamp, integrity warning summary, and code-task answers.
- Raw selected answers are not written to storage.

Future relational result collection:

- Use a Vercel Marketplace Postgres provider such as Neon, Prisma Postgres, or Supabase for central storage.
- Keep the server route `POST /api/exam-submissions`.
- Grade on the server so answer keys are not shipped to the browser.
- Store one immutable row per attempt.

Suggested table:

```sql
create table exam_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  score integer not null,
  total_marks integer not null,
  percentage numeric(5,2) not null,
  answers jsonb not null,
  submitted_at timestamptz not null default now()
);
```

## Accessibility Notes

- Inputs need visible labels, not placeholder-only labels.
- Question navigation must be keyboard reachable.
- MCQ answers must use native radio inputs with checked state available to screen readers.
- Selected answer state must not rely on color alone.
- Selection changes should be announced through a polite live region.
- Result state should include numeric marks in text.
- High-contrast mode must continue to work because the current audience includes blind and visually impaired learners.
