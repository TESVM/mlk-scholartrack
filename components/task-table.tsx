import { TaskPriorityBadge, TaskStatusBadge } from "@/components/status-badge";
import type { Student, Task, UserProfile } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function TaskTable({
  tasks,
  students,
  users
}: {
  tasks: Task[];
  students: Student[];
  users: UserProfile[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            <th className="px-3">Task</th>
            <th className="px-3">Student</th>
            <th className="px-3">Assigned To</th>
            <th className="px-3">Due Date</th>
            <th className="px-3">Priority</th>
            <th className="px-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const student = students.find((item) => item.id === task.student_id);
            const assignee = users.find((user) => user.id === task.assigned_to);

            return (
              <tr key={task.id} className="rounded-2xl bg-stone-50 text-sm text-stone-800">
                <td className="rounded-l-2xl px-3 py-4">
                  <p className="font-semibold text-stone-900">{task.task_title}</p>
                  <p className="mt-1 text-stone-600">{task.task_description}</p>
                </td>
                <td className="px-3 py-4">{student ? `${student.first_name} ${student.last_name}` : "None"}</td>
                <td className="px-3 py-4">{assignee?.full_name ?? "Unassigned"}</td>
                <td className="px-3 py-4">{formatDate(task.due_date)}</td>
                <td className="px-3 py-4">
                  <TaskPriorityBadge priority={task.priority} />
                </td>
                <td className="rounded-r-2xl px-3 py-4">
                  <TaskStatusBadge status={task.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
