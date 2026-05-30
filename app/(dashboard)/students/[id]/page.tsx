import { notFound } from "next/navigation";
import { ProfileTabs } from "@/components/profile-tabs";
import { SectionCard } from "@/components/section-card";
import {
  demoCheckins,
  demoDocuments,
  demoParents,
  demoSchoolDecisions,
  demoStudents,
  demoTasks,
  demoUsers
} from "@/lib/demo-data";

export default async function StudentProfilePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = demoStudents.find((item) => item.id === id);

  if (!student) {
    notFound();
  }

  const parent = demoParents.find((item) => item.student_id === id);
  const decision = demoSchoolDecisions.find((item) => item.student_id === id);
  const mentor = demoUsers.find((user) => user.id === student.assigned_mentor_id);
  const checkins = demoCheckins.filter((item) => item.student_id === id);
  const documents = demoDocuments.filter((item) => item.student_id === id);
  const tasks = demoTasks.filter((item) => item.student_id === id);

  return (
    <div className="space-y-6">
      <SectionCard title="Student Profile" eyebrow="Scholar detail">
        <ProfileTabs
          student={student}
          parent={parent}
          decision={decision}
          mentor={mentor}
          checkins={checkins}
          documents={documents}
          tasks={tasks}
        />
      </SectionCard>
    </div>
  );
}
