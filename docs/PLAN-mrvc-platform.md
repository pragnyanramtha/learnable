# MRVC Student Group Platform Plan

## Overview
The MRVC platform is a unified, mobile-optimized hub to solve the issue of scattered educational resources. It centralizes exam timelines, direct markdown-rendered reading materials, PDF downloads, and interactive immediate-feedback quizzes. The primary goal is delivering an unparalleled, native reading and study experience on mobile devices. 

## Project Type
WEB

## Success Criteria
- Mobile-first responsiveness across all interfaces.
- Syllabus markdown files render beautifully and natively on both mobile and PC.
- Quick quizzes provide instant feedback per question (client-side only).
- Smooth navigation between the Timeline (Page 1) and Reading Hub (Page 2).

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: TailwindCSS
- **Markdown**: `react-markdown` and `remark-gfm`
- **Icons**: `lucide-react`
- **State**: React Context/Hooks (useState)

## File Structure
```
├── app
│   ├── page.tsx           # Home (Timeline for upcoming exams)
│   ├── hub                # Reading Materials & Question Banks
│   │   ├── page.tsx       # Subject Selector
│   │   ├── [subject]      
│   │   │   └── page.tsx   # Subject details (MD reader, PDFs, Quizzes)
│   ├── layout.tsx         # Global layout & Mobile Navigation
│   └── globals.css        # Tailwind directives
├── components
│   ├── Timeline.tsx       # Exam timeline UI
│   ├── MarkdownReader.tsx # Renders Subject MD
│   ├── QuizEngine.tsx     # Client-side quick quiz
│   ├── SubjectCard.tsx
│   └── ui                 # Shared styled UI components
├── content
│   └── subjects           # Markdown files (French, DSA, DBMS, Web, UHV, Physics/CAD, Maths)
└── public                 # PDFs and assets
```

## Task Breakdown

### TASK-1: Project Initialization & Scaffold
- **Agent**: `frontend-specialist`
- **Skills**: `app-builder`, `clean-code`
- **Priority**: P0
- **Dependencies**: None
- **INPUT**: This plan file.
- **OUTPUT**: Next.js + Tailwind initialized project, basic layout with responsive navigation.
- **VERIFY**: Project builds successfully (`npm run build`) and renders a placeholder home page.

### TASK-2: Exam Timeline Component
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P1
- **Dependencies**: TASK-1
- **INPUT**: Next.js setup.
- **OUTPUT**: Responsive vertical timeline component with placeholder dates, animated entry.
- **VERIFY**: Timeline displays correctly without overflow on screens as small as 320px wide.

### TASK-3: MDX/Markdown Integration & Subject Data Structure
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`, `clean-code`
- **Priority**: P1
- **Dependencies**: TASK-1
- **INPUT**: Next.js setup, list of subjects: French, DSA, DBMS, Web App Dev, UHV, Quantum Physics/CAD, Maths.
- **OUTPUT**: Markdown reader component configured with typography plugin. Routing for `/hub/[subject]`.
- **VERIFY**: Navigating to `/hub/data-structures` renders sample markdown content flawlessly on desktop and mobile viewports.

### TASK-4: Quick Quiz Engine (Client-side)
- **Agent**: `frontend-specialist`
- **Skills**: `react-best-practices`
- **Priority**: P2
- **Dependencies**: TASK-2
- **INPUT**: Subject pages.
- **OUTPUT**: Component that takes JSON questions, shows one at a time or together, and instantly highlights right/wrong on selection. 
- **VERIFY**: Clicking an option immediately reveals success/failure state and rationale.

### TASK-5: Styling Polish & UI Excellence
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Priority**: P2
- **Dependencies**: TASK-1, TASK-2, TASK-3, TASK-4
- **INPUT**: All built components.
- **OUTPUT**: Harmonious color palette (e.g., sleek dark mode), glassmorphic elements, modern Google Fonts applied, hover micro-interactions.
- **VERIFY**: Lighthouse accessibility scores > 90. No generic raw colors used.

## ✅ PHASE X: VERIFICATION
- [ ] Run `npm run lint` and `npx tsc --noEmit`
- [ ] Accessibility manual check for touch targets (mobile usability)
- [ ] No purple/violet hex codes used (Agent strictly forbidden colors)
- [ ] Build testing (`npm run build`)
