# ABLE Platform

Config-driven educational hub with class timelines, topic cards, markdown reading material, and interactive quizzes.

All content and structure is driven by a single config file — swap subjects, schedule, and branding by editing `lib/config.ts`.

## Project Structure

```
lib/
  config.ts    ← all topics, classes, site metadata
  types.ts     ← shared TypeScript types
app/
  page.tsx                 ← timeline (homepage)
  hub/page.tsx             ← subject grid
  hub/[subject]/page.tsx   ← subject detail page (server)
  hub/[subject]/ClientTabs.tsx  ← reading/quiz tabs (client)
  hub/[subject]/quizParser.ts   ← quiz file parser
components/
  Navigation.tsx
  Timeline.tsx
  SubjectCard.tsx
  TopBar.tsx
  MarkdownReader.tsx
  QuizEngine.tsx
public/
  {id}_C.md    ← reading content for subject
  {id}_Q.md    ← quiz questions for subject
  {id}.md      ← fallback content file
```

## Quick Start

```bash
npm install
npm run dev
```

## Customization

### 1. Site metadata
In `lib/config.ts`, change `siteConfig`:

```ts
export const siteConfig = {
  name: 'Your Platform',
  shortName: 'Your Plat.',
  description: 'Description',
  tagline: 'Tagline',
  todayLabel: '1 Jan 2026',
};
```

### 2. Subjects
Edit the `subjects` array in `lib/config.ts`:

```ts
export const subjects: SubjectConfig[] = [
  { id: 'my-subject', title: 'My Subject', description: 'Short description.' },
];
```

Each entry requires:
- `id` — used for URL slug (`/hub/my-subject`) and content file names
- `title` — displayed on cards and page header
- `description` — shown on subject card

### 3. Class timeline
Edit the class schedule in `lib/config.ts`:

```ts
export const classEvents: ClassEvent[] = [
  { date: '01-01-2026', day: 'Thursday', time: '10:00 AM - 12:00 PM', title: 'My Subject', slug: 'my-subject' },
];
```

The slug must match a subject `id` — clicking a timeline entry links to that subject's page.

### 4. Content files
Place markdown files in `public/`:

| File | Purpose |
|------|---------|
| `public/{id}_C.md` | Reading material (primary) |
| `public/{id}.md` | Reading material (fallback) |
| `public/{id}_Q.md` | Quiz questions |

### 5. Quiz file format

Standard markdown with bold-numbered questions, pipe-delimited options, and `<Answer:>` tags:

```markdown
**1. What is 2 + 2?**
A. 3 | B. 4 | C. 5 | D. 6
<Answer: B. 4>

**2. Which planet is closest to the Sun?**
A. Venus | B. Earth | C. Mercury | D. Mars
<Answer: C. Mercury>
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- react-markdown + remark-math + rehype-katex (LaTeX rendering)
- lucide-react (icons)
