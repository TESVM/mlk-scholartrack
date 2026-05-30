"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { StudentStatusBadge } from "@/components/status-badge";
import type { Student, UserProfile } from "@/lib/types";
import { currency, formatDate } from "@/lib/utils";

export function StudentDirectory({
  students,
  mentors
}: {
  students: Student[];
  mentors: UserProfile[];
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [awardYear, setAwardYear] = useState("all");
  const [needsSupport, setNeedsSupport] = useState("all");

  const filtered = useMemo(() => {
    return students.filter((student) => {
      const haystack =
        `${student.first_name} ${student.last_name} ${student.high_school} ${student.school_name ?? ""}`.toLowerCase();
      const mentor = mentors.find((person) => person.id === student.assigned_mentor_id);

      return (
        haystack.includes(search.toLowerCase()) &&
        (status === "all" || student.status === status) &&
        (awardYear === "all" || String(student.award_year) === awardYear) &&
        (needsSupport === "all" ||
          String(student.needs_support) === needsSupport ||
          (needsSupport === "true" && student.needs_support)) &&
        (search.length === 0 ||
          mentor?.full_name.toLowerCase().includes(search.toLowerCase()) ||
          haystack.includes(search.toLowerCase()))
      );
    });
  }, [awardYear, mentors, needsSupport, search, status, students]);

  const years = Array.from(new Set(students.map((student) => student.award_year))).sort().reverse();

  return (
    <div className="space-y-5">
      <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
        <div className="grid gap-4 lg:grid-cols-[2fr_repeat(3,1fr)]">
          <label className="relative block">
            <span className="label-base">Search scholars</span>
            <Search className="pointer-events-none absolute left-4 top-[3.35rem] h-5 w-5 text-stone-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, high school, school, or mentor"
              className="input-base pl-11"
            />
          </label>

          <label>
            <span className="label-base">Award year</span>
            <select className="input-base" value={awardYear} onChange={(event) => setAwardYear(event.target.value)}>
              <option value="all">All years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="label-base">Status</span>
            <select className="input-base" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">All statuses</option>
              {Array.from(new Set(students.map((student) => student.status))).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="label-base">Needs support</span>
            <select
              className="input-base"
              value={needsSupport}
              onChange={(event) => setNeedsSupport(event.target.value)}
            >
              <option value="all">All students</option>
              <option value="true">Needs support</option>
              <option value="false">No support requested</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="panel border-dashed p-10 text-center">
          <h3 className="font-serif text-2xl text-stone-900">No scholars match these filters</h3>
          <p className="mt-3 text-base text-stone-600">
            Try removing one of the filters or search by high school, school, or mentor name.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((student) => {
            const mentor = mentors.find((person) => person.id === student.assigned_mentor_id);

            return (
              <Link
                key={student.id}
                href={`/students/${student.id}`}
                className="panel block p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(17,24,39,0.08)]"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="font-serif text-2xl text-stone-900">
                        {student.first_name} {student.last_name}
                      </h3>
                      <p className="mt-1 text-sm text-stone-600">
                        {student.email} • {student.phone}
                      </p>
                    </div>
                    <StudentStatusBadge status={student.status} />
                  </div>

                  <div className="grid gap-3 text-sm text-stone-600 sm:grid-cols-2">
                    <p>
                      <span className="font-semibold text-stone-900">High school:</span> {student.high_school}
                    </p>
                    <p>
                      <span className="font-semibold text-stone-900">Award year:</span> {student.award_year}
                    </p>
                    <p>
                      <span className="font-semibold text-stone-900">Scholarship:</span> {currency(student.scholarship_amount)}
                    </p>
                    <p>
                      <span className="font-semibold text-stone-900">School selected:</span>{" "}
                      {student.school_name ?? "Not yet reported"}
                    </p>
                    <p>
                      <span className="font-semibold text-stone-900">Assigned mentor:</span>{" "}
                      {mentor?.full_name ?? "Unassigned"}
                    </p>
                    <p>
                      <span className="font-semibold text-stone-900">Last check-in:</span>{" "}
                      {formatDate(student.last_checkin_date)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
