"use client";

import { useState } from "react";
import { SectionCard } from "@/components/section-card";
import { StudentStatusBadge } from "@/components/status-badge";
import type {
  CheckIn,
  DocumentRecord,
  ParentGuardian,
  SchoolDecision,
  Student,
  Task,
  UserProfile
} from "@/lib/types";
import { currency, formatDate } from "@/lib/utils";

const tabs = ["Overview", "May School Decision Follow-Up", "Matriculation Timeline", "Check-Ins", "Documents", "Tasks"] as const;

export function ProfileTabs({
  student,
  parent,
  decision,
  mentor,
  checkins,
  documents,
  tasks
}: {
  student: Student;
  parent?: ParentGuardian;
  decision?: SchoolDecision;
  mentor?: UserProfile;
  checkins: CheckIn[];
  documents: DocumentRecord[];
  tasks: Task[];
}) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={
              activeTab === tab
                ? "rounded-full bg-stone-900 px-4 py-2 text-sm font-bold text-white"
                : "rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600"
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" ? (
        <SectionCard
          title={`${student.first_name} ${student.last_name}`}
          eyebrow="Scholar profile"
          actions={
            <>
              <button className="button-secondary">Assign Mentor</button>
              <button className="button-secondary">Record Check-In</button>
              <button className="button-primary">Upload Document</button>
            </>
          }
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.2rem] bg-stone-50 p-5">
              <p className="label-base">Current status</p>
              <div className="mt-4">
                <StudentStatusBadge status={student.status} />
              </div>
              <div className="mt-4 space-y-2 text-sm text-stone-600">
                <p>
                  <span className="font-semibold text-stone-900">Assigned mentor:</span> {mentor?.full_name ?? "Unassigned"}
                </p>
                <p>
                  <span className="font-semibold text-stone-900">Scholarship amount:</span> {currency(student.scholarship_amount)}
                </p>
                <p>
                  <span className="font-semibold text-stone-900">Award event date:</span> {formatDate(student.award_event_date)}
                </p>
              </div>
            </div>

            <div className="rounded-[1.2rem] bg-stone-50 p-5">
              <p className="label-base">Student contact</p>
              <div className="mt-4 space-y-2 text-sm text-stone-600">
                <p>{student.email}</p>
                <p>{student.phone}</p>
                <p>
                  {student.address}, {student.city}, {student.state} {student.zip}
                </p>
                <p>
                  <span className="font-semibold text-stone-900">High school:</span> {student.high_school}
                </p>
              </div>
            </div>

            <div className="rounded-[1.2rem] bg-stone-50 p-5">
              <p className="label-base">Parent/guardian</p>
              <div className="mt-4 space-y-2 text-sm text-stone-600">
                <p>{parent?.full_name ?? "Not linked"}</p>
                <p>{parent?.phone ?? "No phone on file"}</p>
                <p>{parent?.email ?? "No email on file"}</p>
                <p>
                  <span className="font-semibold text-stone-900">Consent signed:</span> {parent?.consent_signed ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "May School Decision Follow-Up" ? (
        <SectionCard
          title="May School Decision Follow-Up"
          eyebrow="Required annual follow-up"
          actions={<button className="button-primary">Mark School Decision Completed</button>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["School selected", decision?.school_selected ? "Yes" : "No"],
              ["School name", decision?.school_name ?? "Pending"],
              ["School type", decision?.school_type ?? "Undecided"],
              ["School address", decision?.school_address ?? "Pending"],
              ["Admissions confirmed", decision?.admissions_confirmed ? "Yes" : "No"],
              ["Intended major/program", decision?.intended_major ?? "Pending"],
              ["Expected start date", formatDate(decision?.expected_start_date)],
              ["Proof of enrollment uploaded", decision?.proof_of_enrollment_uploaded ? "Yes" : "No"],
              [
                "Scholarship payment instructions received",
                decision?.scholarship_payment_instructions_received ? "Yes" : "No"
              ],
              ["Needs support", decision?.needs_support ? "Yes" : "No"],
              ["Support notes", decision?.support_notes ?? "No support notes recorded"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.2rem] bg-stone-50 p-5">
                <p className="label-base">{label}</p>
                <p className="mt-3 text-base text-stone-800">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[1.2rem] border border-dashed border-[#be9b35] bg-[#f7edd0] p-5 text-sm text-stone-800">
            Protected student ID numbers should be read through an admin-only RPC and never displayed in parent or student views.
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "Matriculation Timeline" ? (
        <SectionCard title="Matriculation Timeline" eyebrow="Scholar journey">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              "Awarded",
              "Awaiting School Decision",
              "School Decision Needed",
              "School Selected",
              "Proof of Enrollment Needed",
              "Enrollment Verified",
              "Scholarship Payment Ready",
              "Active Scholar",
              "Semester Check-In",
              "Graduated",
              "Alumni"
            ].map((stage) => (
              <div
                key={stage}
                className={`rounded-[1.5rem] border p-4 ${
                  student.status.includes(stage) || stage === "Awarded"
                    ? "border-[#be9b35] bg-[#f7edd0]"
                    : "border-stone-200 bg-white"
                }`}
              >
                <p className="font-semibold text-stone-900">{stage}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "Check-Ins" ? (
        <SectionCard title="Check-Ins" eyebrow="Mentor and committee notes" actions={<button className="button-primary">Record Check-In</button>}>
          <div className="space-y-4">
            {checkins.length === 0 ? (
              <p className="text-sm text-stone-600">No check-ins recorded yet.</p>
            ) : (
              checkins.map((checkin) => (
                <div key={checkin.id} className="rounded-[1.2rem] bg-stone-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-stone-900">
                      {formatDate(checkin.checkin_date)} • {checkin.contact_method}
                    </p>
                    <p className="text-sm text-stone-600">By {checkin.contacted_by}</p>
                  </div>
                  <p className="mt-3 text-sm text-stone-800">{checkin.student_response}</p>
                  <p className="mt-2 text-sm text-stone-600">
                    <span className="font-semibold text-stone-900">Support needed:</span>{" "}
                    {checkin.support_needed ?? "None recorded"}
                  </p>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "Documents" ? (
        <SectionCard title="Documents" eyebrow="Secure uploads" actions={<button className="button-primary">Upload Secure File</button>}>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Consent form",
              "Scholarship acceptance form",
              "Thank-you letter",
              "Award photo",
              "Proof of enrollment",
              "Acceptance letter",
              "Graduation confirmation",
              "Other documents"
            ].map((documentType) => {
              const found = documents.find(
                (document) => document.document_type.toLowerCase() === documentType.toLowerCase()
              );

              return (
                <div key={documentType} className="rounded-[1.2rem] border border-stone-200 bg-white p-5">
                  <p className="font-semibold text-stone-900">{documentType}</p>
                  <p className="mt-2 text-sm text-stone-600">
                    {found ? `${found.file_name} uploaded ${formatDate(found.uploaded_at)}` : "No file uploaded yet"}
                  </p>
                </div>
              );
            })}
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "Tasks" ? (
        <SectionCard title="Tasks" eyebrow="Scholar workflow" actions={<button className="button-primary">Create Task</button>}>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-[1.2rem] bg-stone-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-stone-900">{task.task_title}</p>
                  <p className="text-sm text-stone-600">
                    {task.priority} priority • due {formatDate(task.due_date)}
                  </p>
                </div>
                <p className="mt-2 text-sm text-stone-600">{task.task_description}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}
