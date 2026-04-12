import SubjectCard from '@/components/SubjectCard';
import TopBar from '@/components/TopBar';

const subjects = [
  { title: 'Foreign Language (French)', slug: 'french', description: 'Reading material and question bank in French.', isAvailable: true },
  { title: 'Data Structures', slug: 'dsa', description: 'Core concepts, recursion, and complexity notes.', isAvailable: true },
  { title: 'Database Management Systems', slug: 'dbms', description: 'Relational basics, schema, and normalization.', isAvailable: true },
  { title: 'Web Application Development-II', slug: 'web', description: 'JavaScript, hoisting, async flow, and patterns.', isAvailable: true },
  { title: 'Universal Human Values', slug: 'uhv', description: 'Value education, natural acceptance, and ethics.', isAvailable: true },
  { title: 'Fundamentals of Quantum Computing', slug: 'quantum', description: 'Quantum basics, black-body laws, and matter waves.', isAvailable: true },
  { title: 'Computer Aided Engineering Graphics', slug: 'caeg', description: 'CAD, dimensioning, and AutoCAD command basics.', isAvailable: true },
  { title: 'Mathematics for Problem Solving', slug: 'maths', description: 'Clocks, calendars, pipes, and work problems.', isAvailable: true },
];

export default function Hub() {
  return (
    <>
      <TopBar />
      <div className="flex flex-col min-h-[calc(100vh-80px)] md:py-12">
        <div className="mb-10 text-left space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Subject Hub</h1>
          <p className="text-neutral-400 font-medium">Select a subject for interactive materials.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.slug} {...subject} />
          ))}
        </div>
      </div>
    </>
  );
}
