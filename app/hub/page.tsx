import SubjectCard from '@/components/SubjectCard';
import TopBar from '@/components/TopBar';
import { subjects } from '@/lib/config';

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
            <SubjectCard key={subject.id} {...subject} isAvailable />
          ))}
        </div>
      </div>
    </>
  );
}
