import { DownloadCsvButton } from "@/components/download-csv-button";
import { SectionCard } from "@/components/section-card";
import { demoParents, demoStudents } from "@/lib/demo-data";
import { currency } from "@/lib/utils";

export default function ReportsPage() {
  const reportRows = demoStudents.map((student) => ({
    first_name: student.first_name,
    last_name: student.last_name,
    award_year: student.award_year,
    status: student.status,
    school_name: student.school_name ?? "",
    needs_support: student.needs_support ? "Yes" : "No",
    scholarship_amount: currency(student.scholarship_amount)
  }));

  const parentRows = demoParents.map((parent) => ({
    student_id: parent.student_id,
    parent_name: parent.full_name,
    relationship: parent.relationship,
    phone: parent.phone,
    email: parent.email
  }));

  return (
    <div className="space-y-6">
      <section className="border-b border-stone-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b6a1c]">
          Reporting
        </p>
        <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-stone-900">
          Export reports for board review, family outreach, scholarship accounting, and alumni follow-up.
        </h2>
      </section>

      <SectionCard
        title="Reports"
        eyebrow="Exportable CSV reports"
        actions={<DownloadCsvButton filename="mlk-scholartrack-students.csv" rows={reportRows} />}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            "Students by award year",
            "Students awaiting school decision",
            "Students missing proof of enrollment",
            "Students needing May follow-up",
            "Students by school attending",
            "Students needing support",
            "Graduated scholars",
            "Alumni list",
            "Scholarship funds awarded by year",
            "Parent/guardian contact list",
            "Full mailing list"
          ].map((report) => (
            <div key={report} className="rounded-[1.2rem] bg-stone-50 p-5">
              <p className="font-semibold text-stone-900">{report}</p>
              <p className="mt-2 text-sm text-stone-600">
                Export as CSV for board review, outreach, or scholarship administration.
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Parent/Guardian Contact Export"
        eyebrow="Family outreach"
        actions={<DownloadCsvButton filename="mlk-scholartrack-parents.csv" rows={parentRows} />}
      >
        <p className="text-sm text-stone-600">
          Parent and guardian contact exports should be limited to authorized staff and handled as private records.
        </p>
      </SectionCard>
    </div>
  );
}
