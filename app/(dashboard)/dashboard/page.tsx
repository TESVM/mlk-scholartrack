import {
  AlertTriangle,
  BadgeDollarSign,
  CircleHelp,
  GraduationCap,
  ListChecks,
  School,
  UserCheck,
  UserRound
} from "lucide-react";
import { DashboardCard } from "@/components/dashboard-card";
import { SectionCard } from "@/components/section-card";
import { StudentStatusBadge, TaskStatusBadge } from "@/components/status-badge";
import { demoStudents, demoTasks, getDashboardStats } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const stats = getDashboardStats();
  const urgentStudents = demoStudents.filter((student) =>
    [
      "Awarded — Awaiting School Decision",
      "School Decision Needed",
      "School Selected"
    ].includes(student.status)
  );

  return (
    <div className="space-y-6">
      <section className="border-b border-stone-200 pb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b6a1c]">
          MLK ScholarTrack
        </p>
        <h2 className="mx-auto mt-5 max-w-4xl font-serif text-5xl leading-tight text-stone-900">
          Stay close to every scholar from the January celebration to alumni connection.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600">
          This internal portal helps the committee follow students, verify enrollment,
          coordinate support, and build lasting relationships without losing the warmth of the public site.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="panel p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6a1c]">About ScholarTrack</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Community",
                text: "Keep committee members, mentors, parents, and students connected with one secure record."
              },
              {
                title: "Amazing Students",
                text: "Follow recipients through college, trade school, military service, or workforce transition."
              },
              {
                title: "Legacy",
                text: "Carry each scholar forward from award night to graduation, alumni engagement, and future leadership."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[1.1rem] bg-stone-50 p-5 text-left">
                <p className="font-serif text-2xl text-stone-900">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6a1c]">This Month</p>
          <div className="mt-5 space-y-4">
            {[
              `${stats.needingMayFollowUp} scholars still need May school decision follow-up.`,
              `${stats.missingProof} scholars are missing proof of enrollment.`,
              `${stats.needingSupport} scholars have active support needs.`
            ].map((item) => (
              <div key={item} className="rounded-[1rem] border border-stone-200 px-4 py-4 text-sm text-stone-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <DashboardCard label="Total Awarded Students" value={stats.totalAwarded} detail="All scholars in the current demo dataset." icon={<UserRound className="h-6 w-6" />} />
        <DashboardCard label="Awaiting School Decision" value={stats.awaitingDecision} detail="Students entered after the January event and still awaiting updates." icon={<CircleHelp className="h-6 w-6" />} />
        <DashboardCard label="Students Needing May Follow-Up" value={stats.needingMayFollowUp} detail="Scholars who still need a May contact or school selection update." icon={<ListChecks className="h-6 w-6" />} />
        <DashboardCard label="Missing Proof of Enrollment" value={stats.missingProof} detail="Students with a school selected but no verification document on file." icon={<School className="h-6 w-6" />} />
        <DashboardCard label="Active Scholars" value={stats.activeScholars} detail="Scholars already matriculated and still being supported." icon={<GraduationCap className="h-6 w-6" />} />
        <DashboardCard label="Students Enrolled" value={stats.enrolled} detail="Enrollment verified or beyond." icon={<UserCheck className="h-6 w-6" />} />
        <DashboardCard label="Students Needing Support" value={stats.needingSupport} detail="Students with financial, academic, or personal follow-up needed." icon={<AlertTriangle className="h-6 w-6" />} />
        <DashboardCard label="Graduated Scholars" value={stats.graduated} detail="Graduated scholars will continue into alumni engagement." icon={<GraduationCap className="h-6 w-6" />} />
        <DashboardCard label="Alumni Scholars" value={stats.alumni} detail="Alumni scholars available for future mentorship and celebration." icon={<UserRound className="h-6 w-6" />} />
        <DashboardCard label="Open Tasks" value={stats.openTasks} detail="Workflow tasks still requiring attention by committee or mentors." icon={<BadgeDollarSign className="h-6 w-6" />} />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard title="Urgent Follow-Ups" eyebrow="Priority queue">
          <div className="space-y-4">
            {urgentStudents.map((student) => (
              <div key={student.id} className="rounded-[1.2rem] bg-stone-50 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-stone-900">
                      {student.first_name} {student.last_name}
                    </p>
                    <p className="text-sm text-stone-600">
                      {student.phone} • {student.email}
                    </p>
                    <p className="mt-2 text-sm text-stone-600">
                      {student.high_school} • Award year {student.award_year}
                    </p>
                  </div>
                  <StudentStatusBadge status={student.status} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Tasks" eyebrow="Workflow">
          <div className="space-y-4">
            {demoTasks.map((task) => (
              <div key={task.id} className="rounded-[1.2rem] bg-stone-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-stone-900">{task.task_title}</p>
                  <TaskStatusBadge status={task.status} />
                </div>
                <p className="mt-2 text-sm text-stone-600">{task.task_description}</p>
                <p className="mt-2 text-sm text-stone-600">Due {formatDate(task.due_date)}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
