import { SectionCard } from "@/components/section-card";
import { demoAuditLogs, demoUsers } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

const consentLanguage = `By submitting this form, I give the MLK Advocacy for Justice Committee permission to collect and maintain my contact information, parent/guardian information, school enrollment information, scholarship information, and progress updates for the purpose of scholarship administration, student support, follow-up communication, reporting, and alumni engagement.

I understand that this information will not be made public and will only be shared with authorized committee members, mentors, or administrators who are assisting with scholarship tracking and student support.

As the parent or legal guardian, I give permission for the MLK Advocacy for Justice Committee to collect and maintain this student’s information for scholarship tracking, student support, follow-up communication, and alumni engagement.`;

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="border-b border-stone-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b6a1c]">
          Administration
        </p>
        <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-stone-900">
          Manage privacy, language, and committee settings without breaking the look of the main website.
        </h2>
      </section>

      <SectionCard title="Settings" eyebrow="Administration">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.2rem] bg-stone-50 p-5">
            <p className="label-base">Committee users</p>
            <div className="mt-4 space-y-3">
              {demoUsers.map((user) => (
                <div key={user.id} className="rounded-[1.05rem] border border-stone-200 bg-white p-4">
                  <p className="font-semibold text-stone-900">{user.full_name}</p>
                  <p className="text-sm text-stone-600">{user.email}</p>
                  <p className="text-sm text-stone-600">{user.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.2rem] bg-stone-50 p-5">
            <p className="label-base">Scholarship years and templates</p>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <p>Manage scholarship years, status options, and outreach message templates here.</p>
              <p>Store privacy notice and consent language in a single location for consistency across forms.</p>
              <p>Use role assignment changes carefully. They affect data access through row-level security.</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Privacy Notice and Consent Language" eyebrow="Required copy">
        <pre className="whitespace-pre-wrap rounded-[1.2rem] bg-stone-50 p-5 text-sm leading-7 text-stone-800">
          {consentLanguage}
        </pre>
      </SectionCard>

      <SectionCard title="Audit Logs" eyebrow="Security and accountability">
        <div className="space-y-3">
          {demoAuditLogs.map((log) => (
            <div key={log.id} className="rounded-[1.2rem] bg-stone-50 p-5">
              <p className="font-semibold text-stone-900">
                {log.action} • {log.table_name}
              </p>
              <p className="mt-1 text-sm text-stone-600">{log.details}</p>
              <p className="mt-1 text-sm text-stone-600">{formatDate(log.created_at)}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
