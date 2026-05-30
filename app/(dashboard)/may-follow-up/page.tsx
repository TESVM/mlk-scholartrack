import { SectionCard } from "@/components/section-card";
import { StudentStatusBadge } from "@/components/status-badge";
import { demoParents, demoStudents, demoTasks } from "@/lib/demo-data";

const emailTemplate = `Subject: MLK Scholarship Follow-Up — School Selection Information Needed

Dear [Student Name],

Congratulations again on being selected as a scholarship recipient by the MLK Advocacy for Justice Committee. We are proud of you and excited about your future.

As you prepare for your next step after high school, we are updating our scholarship records and need to know which school, program, or pathway you plan to attend.

Please reply with the following information:
1. The name of the school, college, university, trade school, military branch, or career program you plan to attend
2. Your intended major or program
3. Your expected start date
4. A copy of your proof of enrollment or acceptance letter, if available
5. The best phone number and email address to reach you

This information helps us stay connected with you, properly process scholarship records, and support you during your matriculation journey.

Sincerely,
MLK Advocacy for Justice Committee`;

const textTemplate =
  "Hello [Student Name], this is the MLK Advocacy for Justice Committee. We are following up with our scholarship recipients to confirm which school or program you will attend this fall. Please reply with your school name, intended major/program, start date, and proof of enrollment if available. We are proud of you and want to stay connected as you move forward.";

export default function MayFollowUpPage() {
  const followUpStudents = demoStudents.filter((student) =>
    ["Awarded — Awaiting School Decision", "School Decision Needed"].includes(student.status)
  );

  return (
    <div className="space-y-6">
      <section className="border-b border-stone-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b6a1c]">
          May Follow-Up
        </p>
        <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-stone-900">
          Reach scholars and families in a way that feels consistent with the committee’s public website voice.
        </h2>
      </section>

      <SectionCard title="May Follow-Up" eyebrow="Annual outreach queue">
        <div className="space-y-4">
          {followUpStudents.map((student) => {
            const parent = demoParents.find((item) => item.student_id === student.id);
            const task = demoTasks.find(
              (item) => item.student_id === student.id && item.task_type === "May Follow-Up"
            );

            return (
              <div key={student.id} className="panel p-5">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="space-y-2 text-sm text-stone-600">
                    <p className="font-serif text-2xl text-stone-900">
                      {student.first_name} {student.last_name}
                    </p>
                    <p>
                      {student.phone} • {student.email}
                    </p>
                    <p>
                      Parent: {parent?.full_name ?? "No parent linked"} • {parent?.phone ?? "No parent phone"}
                    </p>
                    <p>
                      {student.high_school} • Award year {student.award_year}
                    </p>
                    <p>
                      Follow-up task status: <span className="font-semibold text-stone-900">{task?.status ?? "Not created"}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <StudentStatusBadge status={student.status} />
                    <button className="button-secondary">Mark Contacted</button>
                    <button className="button-primary">Update School Decision</button>
                    <button className="button-secondary">Needs Support</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Email Template" eyebrow="Committee outreach">
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-[1.2rem] bg-stone-50 p-5 text-sm leading-7 text-stone-800">
            {emailTemplate}
          </pre>
        </SectionCard>
        <SectionCard title="Text Message Template" eyebrow="Quick outreach">
          <pre className="whitespace-pre-wrap rounded-[1.2rem] bg-stone-50 p-5 text-sm leading-7 text-stone-800">
            {textTemplate}
          </pre>
        </SectionCard>
      </div>
    </div>
  );
}
