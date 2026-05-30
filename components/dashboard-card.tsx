import type { ReactNode } from "react";

export function DashboardCard({
  label,
  value,
  detail,
  icon
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{label}</p>
          <p className="mt-3 text-4xl font-bold text-stone-900">{value}</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">{detail}</p>
        </div>
        <div className="rounded-2xl bg-[#f5ecd0] p-3 text-[#8b6a1c]">{icon}</div>
      </div>
    </div>
  );
}
