import { redirect } from "next/navigation";
import { FormSubmitButton } from "@/components/form-submit-button";
import { SectionCard } from "@/components/section-card";
import { StudentStatusBadge, TaskStatusBadge } from "@/components/status-badge";
import { getStudentPortalData } from "@/lib/student-portal";
import { currency, formatDate } from "@/lib/utils";
import {
  submitSchoolDecisionAction,
  submitSemesterUpdateAction,
  submitSupportRequestAction,
  updateStudentContactAction,
  uploadStudentDocumentAction
} from "@/app/(dashboard)/student-connection-point/actions";

export default async function StudentConnectionPointPage({
  searchParams
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const portal = await getStudentPortalData();
  const resolvedSearchParams = await searchParams;

  if (!portal) {
    redirect("/login");
  }

  const { student, mentor, decision, tasks, documents, updates, liveMode } = portal;
  const notice = resolvedSearchParams.notice;

  return (
    <div className="space-y-6">
      <section className="border-b border-stone-200 pb-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b6a1c]">
              Student Connection Point
            </p>
            <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-stone-900">
              A simple place for scholars to stay connected, share updates, and ask for support.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">
              Review your contact information, submit school plans, upload proof of enrollment,
              and send semester updates without feeling like you left the committee website.
            </p>
          </div>
          <div className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6a1c]">
              {liveMode ? "Student Portal View" : "Demo Student View"}
            </p>
            <div className="mt-4 space-y-3">
              <p className="font-serif text-3xl text-stone-900">{student.first_name} {student.last_name}</p>
              <StudentStatusBadge status={student.status} />
              <p className="text-sm text-stone-600">
                Assigned mentor: {mentor?.full_name ?? "Not assigned"}
              </p>
              <p className="text-sm text-stone-600">
                Scholarship award: {currency(student.scholarship_amount)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {notice ? (
        <div className="rounded-[1.2rem] border border-[#be9b35] bg-[#f7edd0] px-5 py-4 text-sm font-semibold text-stone-900">
          {notice}
        </div>
      ) : null}

      {!liveMode ? (
        <div className="rounded-[1.2rem] border border-dashed border-stone-400 bg-stone-50 px-5 py-4 text-sm text-stone-700">
          Demo mode is active. The page layout is live, but form submissions will stay read-only until Supabase environment variables are configured.
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="My Profile and Contact Information" eyebrow="Student self-service">
          <form action={updateStudentContactAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="studentId" value={student.id} />
            <label className="block">
              <span className="label-base">Student email</span>
              <input name="email" defaultValue={student.email} className="input-base mt-2" />
            </label>
            <label className="block">
              <span className="label-base">Student phone</span>
              <input name="phone" defaultValue={student.phone} className="input-base mt-2" />
            </label>
            <label className="block">
              <span className="label-base">Address</span>
              <input name="address" defaultValue={student.address} className="input-base mt-2" />
            </label>
            <label className="block">
              <span className="label-base">City</span>
              <input name="city" defaultValue={student.city} className="input-base mt-2" />
            </label>
            <label className="block">
              <span className="label-base">State</span>
              <input name="state" defaultValue={student.state} className="input-base mt-2" maxLength={2} />
            </label>
            <label className="block">
              <span className="label-base">ZIP code</span>
              <input name="zip" defaultValue={student.zip} className="input-base mt-2" />
            </label>
            <div className="rounded-[1.2rem] bg-stone-50 p-5 text-sm text-stone-600 md:col-span-2">
              Committee note: students can update contact information here, while scholarship status and protected identifiers remain staff-managed.
            </div>
            <FormSubmitButton
              label="Save Contact Updates"
              pendingLabel="Saving..."
              className="md:col-span-2 md:justify-self-start"
            />
          </form>
        </SectionCard>

        <SectionCard title="My Next Steps" eyebrow="What to do now">
          <div className="space-y-4">
            {[
              "Review contact details and keep them current.",
              "Submit school decision details if you have chosen a college, trade school, military path, or workforce option.",
              "Upload proof of enrollment or your acceptance letter when available.",
              "Send semester updates so the committee can continue supporting your journey."
            ].map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-stone-50 p-5 text-sm leading-7 text-stone-800">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Submit School Decision" eyebrow="May follow-up">
          <form action={submitSchoolDecisionAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="studentId" value={student.id} />
            <label className="block">
              <span className="label-base">School selected</span>
              <select
                name="schoolSelected"
                className="input-base mt-2"
                defaultValue={decision?.school_selected ? "Yes" : "No"}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
            <label className="block">
              <span className="label-base">School type</span>
              <select name="schoolType" className="input-base mt-2" defaultValue={decision?.school_type ?? "Undecided"}>
                <option>College</option>
                <option>University</option>
                <option>Trade School</option>
                <option>Military</option>
                <option>Workforce</option>
                <option>Undecided</option>
                <option>Other</option>
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="label-base">School name</span>
              <input name="schoolName" defaultValue={decision?.school_name ?? ""} className="input-base mt-2" />
            </label>
            <label className="block md:col-span-2">
              <span className="label-base">School address</span>
              <input name="schoolAddress" defaultValue={decision?.school_address ?? ""} className="input-base mt-2" />
            </label>
            <label className="block">
              <span className="label-base">Intended major or program</span>
              <input name="intendedMajor" defaultValue={decision?.intended_major ?? ""} className="input-base mt-2" />
            </label>
            <label className="block">
              <span className="label-base">Expected start date</span>
              <input
                name="expectedStartDate"
                type="date"
                defaultValue={decision?.expected_start_date ?? ""}
                className="input-base mt-2"
              />
            </label>
            <FormSubmitButton
              label="Submit School Decision"
              pendingLabel="Submitting..."
              className="md:col-span-2 md:justify-self-start"
            />
          </form>
        </SectionCard>

        <SectionCard title="Upload Enrollment Proof" eyebrow="Secure document upload">
          <div className="space-y-4">
            <form action={uploadStudentDocumentAction} className="space-y-4">
              <input type="hidden" name="studentId" value={student.id} />
              <label className="block">
                <span className="label-base">Document type</span>
                <select name="documentType" className="input-base mt-2" defaultValue="Proof of enrollment">
                  <option>Proof of enrollment</option>
                  <option>Acceptance letter</option>
                  <option>Semester update attachment</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="label-base">Proof of enrollment or acceptance letter</span>
                <input
                  name="documentFile"
                  type="file"
                  className="input-base mt-2 file:mr-4 file:rounded-full file:border-0 file:bg-royal-100 file:px-4 file:py-2 file:font-semibold file:text-royal-700"
                />
              </label>
              <FormSubmitButton label="Upload File" pendingLabel="Uploading..." />
            </form>
            <div className="rounded-[1.2rem] bg-stone-50 p-5 text-sm text-stone-600">
              Files should be stored in the private `scholar-documents` bucket and never exposed publicly.
            </div>
            <div className="space-y-3">
              {documents.length === 0 ? (
                <p className="text-sm text-stone-600">No student-uploaded documents yet.</p>
              ) : (
                documents.map((document) => (
                  <div key={document.id} className="rounded-[1.2rem] border border-stone-200 bg-white p-4">
                    <p className="font-semibold text-stone-900">{document.document_type}</p>
                    <p className="mt-1 text-sm text-stone-600">{document.file_name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Semester Update" eyebrow="Stay connected each term">
          <form action={submitSemesterUpdateAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="studentId" value={student.id} />
            <label className="block">
              <span className="label-base">Term</span>
              <input name="termLabel" placeholder="Fall 2026" className="input-base mt-2" />
            </label>
            <label className="block">
              <span className="label-base">Enrollment status</span>
              <input name="enrollmentStatus" placeholder="Full-time" className="input-base mt-2" />
            </label>
            <label className="block">
              <span className="label-base">GPA</span>
              <input name="gpa" placeholder="3.6" className="input-base mt-2" />
            </label>
            <label className="block">
              <span className="label-base">Credits completed</span>
              <input name="creditsCompleted" type="number" placeholder="30" className="input-base mt-2" />
            </label>
            <label className="block md:col-span-2">
              <span className="label-base">Accomplishments</span>
              <textarea
                name="accomplishments"
                className="input-base mt-2 min-h-28"
                placeholder="Share achievements, campus involvement, or milestones."
              />
            </label>
            <label className="block md:col-span-2">
              <span className="label-base">Support requested</span>
              <textarea
                name="supportRequested"
                className="input-base mt-2 min-h-28"
                placeholder="Let the committee know if you need academic, financial, housing, or personal support."
              />
            </label>
            <FormSubmitButton
              label="Submit Semester Update"
              pendingLabel="Submitting..."
              className="md:col-span-2 md:justify-self-start"
            />
          </form>
        </SectionCard>

        <SectionCard title="Recent Semester Updates" eyebrow="Submitted history">
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className="rounded-[1.2rem] bg-stone-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-stone-900">{update.term_label}</p>
                  <p className="text-sm text-stone-600">{formatDate(update.update_date)}</p>
                </div>
                <p className="mt-2 text-sm text-stone-600">
                  {update.enrollment_status} {update.gpa ? `• GPA ${update.gpa}` : ""}
                </p>
                <p className="mt-2 text-sm text-stone-800">{update.accomplishments ?? "No accomplishments entered."}</p>
                <p className="mt-2 text-sm text-stone-600">
                  Support requested: {update.support_requested ?? "None"}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Support Request" eyebrow="Ask for help">
          <form action={submitSupportRequestAction} className="grid gap-4">
            <input type="hidden" name="studentId" value={student.id} />
            <label className="block">
              <span className="label-base">Support type</span>
              <select name="supportType" className="input-base mt-2" defaultValue="Financial">
                <option>Financial</option>
                <option>Academic</option>
                <option>Housing</option>
                <option>Personal/Family</option>
                <option>Career/Internship</option>
                <option>Other</option>
              </select>
            </label>
            <label className="block">
              <span className="label-base">Tell us what you need</span>
              <textarea
                name="supportDetails"
                className="input-base mt-2 min-h-32"
                placeholder="Describe the support you would like from the committee or your mentor."
              />
            </label>
            <FormSubmitButton label="Send Support Request" pendingLabel="Sending..." className="justify-self-start" />
          </form>
        </SectionCard>

        <SectionCard title="My Tasks and Deadlines" eyebrow="Student-visible tasks">
          <div className="space-y-4">
            {tasks.map((task) => (
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
