import { cn } from "@/lib/utils";
import type { StudentStatus, TaskPriority, TaskStatus } from "@/lib/types";

const studentStatusStyles: Record<StudentStatus, string> = {
  "Awarded — Awaiting School Decision": "bg-stone-100 text-stone-700",
  "School Decision Needed": "bg-[#f7edd0] text-[#8b6a1c]",
  "School Selected": "bg-stone-100 text-stone-900",
  "Proof of Enrollment Needed": "bg-[#f7edd0] text-[#8b6a1c]",
  "Enrollment Verified": "bg-emerald-50 text-emerald-700",
  "Scholarship Payment Ready": "bg-emerald-50 text-emerald-700",
  "Active Scholar": "bg-[#101828] text-white",
  "Needs Follow-Up": "bg-[#f7edd0] text-[#8b6a1c]",
  "Needs Support": "bg-rose-50 text-rose-700",
  Graduated: "bg-stone-100 text-stone-700",
  Alumni: "bg-stone-200 text-stone-800",
  "Inactive / Unable to Contact": "bg-stone-200 text-stone-700"
};

const taskPriorityStyles: Record<TaskPriority, string> = {
  Low: "bg-stone-100 text-stone-700",
  Medium: "bg-stone-200 text-stone-700",
  High: "bg-[#f7edd0] text-[#8b6a1c]"
};

const taskStatusStyles: Record<TaskStatus, string> = {
  Open: "bg-[#f7edd0] text-[#8b6a1c]",
  "In Progress": "bg-stone-200 text-stone-700",
  Completed: "bg-emerald-50 text-emerald-700"
};

export function StudentStatusBadge({ status }: { status: StudentStatus }) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-bold", studentStatusStyles[status])}>
      {status}
    </span>
  );
}

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-bold", taskPriorityStyles[priority])}>
      {priority}
    </span>
  );
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-bold", taskStatusStyles[status])}>
      {status}
    </span>
  );
}
