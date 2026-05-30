import { SectionCard } from "@/components/section-card";
import { TaskTable } from "@/components/task-table";
import { demoStudents, demoTasks, demoUsers } from "@/lib/demo-data";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <section className="border-b border-stone-200 pb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b6a1c]">
              Committee Workflow
            </p>
            <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-stone-900">
              Keep May follow-up, enrollment, payment, and scholar support work moving in one place.
            </h2>
          </div>
          <button className="button-primary">Create Task</button>
        </div>
      </section>

      <SectionCard title="Tasks" eyebrow="Follow-up workflow" actions={<button className="button-primary">Create Task</button>}>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Task title", "May School Decision Follow-Up"],
            ["Task description", "Contact scholar and family to confirm school choice."],
            ["Task type", "May Follow-Up"],
            ["Priority", "High"],
            ["Status", "Open"],
            ["Assigned user", "Scholarship Committee or mentor"],
            ["Connected student", "Selected scholar record"],
            ["Due date", "May 1 of award year"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-[1.2rem] bg-stone-50 p-5">
              <p className="label-base">{label}</p>
              <p className="mt-3 text-sm text-stone-800">{value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Open and Recent Tasks" eyebrow="Task board">
        <TaskTable tasks={demoTasks} students={demoStudents} users={demoUsers} />
      </SectionCard>
    </div>
  );
}
