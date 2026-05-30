import Link from "next/link";
import { StudentDirectory } from "@/components/student-directory";
import { SectionCard } from "@/components/section-card";
import { demoStudents, demoUsers } from "@/lib/demo-data";

export default function StudentDirectoryPage() {
  const mentors = demoUsers.filter((user) => user.role === "mentor");

  return (
    <div className="space-y-6">
      <section className="border-b border-stone-200 pb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b6a1c]">
              Scholar Directory
            </p>
            <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-stone-900">
              View the students, schools, mentors, and milestones connected to this year’s scholarship work.
            </h2>
          </div>
          <Link href="/students/new" className="button-primary">
            Add Student
          </Link>
        </div>
      </section>

      <SectionCard title="Student Directory" eyebrow="Search and filter">
        <StudentDirectory students={demoStudents} mentors={mentors} />
      </SectionCard>
    </div>
  );
}
