import { SectionCard } from "@/components/section-card";

function FormField({
  label,
  placeholder,
  type = "text"
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="label-base">{label}</span>
      <input type={type} placeholder={placeholder} className="input-base mt-2" />
    </label>
  );
}

export default function AddStudentPage() {
  return (
    <div className="space-y-6">
      <section className="border-b border-stone-200 pb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b6a1c]">
              January Award Intake
            </p>
            <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-stone-900">
              Add a new scholar in the same clear, welcoming style as the public committee website.
            </h2>
          </div>
          <button className="button-primary">Save Student Record</button>
        </div>
      </section>

      <SectionCard
        title="Add Student"
        eyebrow="January award intake"
        actions={<button className="button-primary">Save Student Record</button>}
      >
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-2xl text-stone-900">Student Information</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FormField label="First name" placeholder="Ariana" />
              <FormField label="Last name" placeholder="Fields" />
              <FormField label="Date of birth" placeholder="MM/DD/YYYY" type="date" />
              <FormField label="Email" placeholder="student@example.org" type="email" />
              <FormField label="Phone number" placeholder="(217) 555-0123" />
              <FormField label="Address" placeholder="1204 East Washington St" />
              <FormField label="City" placeholder="Champaign" />
              <FormField label="State" placeholder="IL" />
              <FormField label="ZIP code" placeholder="61820" />
              <FormField label="High school" placeholder="Central High School" />
              <FormField label="High school graduation year" placeholder="2026" type="number" />
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-stone-900">Scholarship Information</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FormField label="Award year" placeholder="2026" type="number" />
              <FormField label="Award event date" placeholder="January 15, 2026" type="date" />
              <FormField label="Scholarship amount" placeholder="2500" type="number" />
              <FormField label="Scholarship type" placeholder="Academic Excellence" />
              <label className="block">
                <span className="label-base">Thank-you letter received</span>
                <select className="input-base mt-2">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </label>
              <label className="block">
                <span className="label-base">Award photo upload</span>
                <input type="file" className="input-base mt-2 file:mr-4 file:rounded-full file:border-0 file:bg-[#f7edd0] file:px-4 file:py-2 file:font-semibold file:text-[#8b6a1c]" />
              </label>
              <label className="block md:col-span-2 xl:col-span-3">
                <span className="label-base">Notes</span>
                <textarea className="input-base mt-2 min-h-32" placeholder="Add January event notes or special considerations." />
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-stone-900">Parent/Guardian Information</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FormField label="Parent/guardian full name" placeholder="Renee Fields" />
              <FormField label="Relationship to student" placeholder="Mother" />
              <FormField label="Parent phone number" placeholder="(217) 555-0177" />
              <FormField label="Parent email" placeholder="parent@example.org" type="email" />
              <FormField label="Parent address" placeholder="1204 East Washington St" />
              <label className="block">
                <span className="label-base">Consent signed</span>
                <select className="input-base mt-2">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </label>
              <FormField label="Consent date" placeholder="January 15, 2026" type="date" />
              <label className="block">
                <span className="label-base">Consent form upload</span>
                <input type="file" className="input-base mt-2 file:mr-4 file:rounded-full file:border-0 file:bg-[#f7edd0] file:px-4 file:py-2 file:font-semibold file:text-[#8b6a1c]" />
              </label>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Automation" eyebrow="Built-in workflow">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.2rem] bg-stone-50 p-5 text-sm text-stone-600">
            New students are automatically set to <span className="font-semibold text-stone-900">Awarded — Awaiting School Decision</span>.
          </div>
          <div className="rounded-[1.2rem] bg-stone-50 p-5 text-sm text-stone-600">
            A high-priority <span className="font-semibold text-stone-900">May School Decision Follow-Up</span> task is created for May 1 of the award year.
          </div>
          <div className="rounded-[1.2rem] bg-stone-50 p-5 text-sm text-stone-600">
            The task can be assigned to a committee member or the student&apos;s mentor when that relationship exists.
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
