import SubjectCard from '@/components/SubjectCard';
import TopBar from '@/components/TopBar';
import { subjects } from '@/lib/config';
import Badge from '@/components/ui/Badge';

export default function Hub() {
  return (
    <>
      <TopBar />
      <div className="flex flex-col min-h-[calc(100vh-80px)] md:py-12">
        <div className="surface-panel mb-10 rounded-[2.5rem] p-6 sm:p-8 text-left">
          <Badge tone="gold">Subject Hub</Badge>
          <h1 className="font-display mt-5 text-5xl leading-[0.96] text-[var(--color-text-primary)]">Choose where to revise next.</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-text-secondary)]">
            Every class topic now follows the same ABLE system so materials feel consistent, approachable, and quick to scan.
          </p>
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
