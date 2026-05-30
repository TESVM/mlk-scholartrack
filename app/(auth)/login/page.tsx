import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="site-shell min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="border-b border-stone-200 pb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b6a1c]">
            MLK ScholarTrack
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-5xl leading-tight text-stone-900">
            A scholar support portal that feels like part of the MLK Committee website.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600">
            Sign in to manage awards, May follow-up, enrollment verification, student support,
            and alumni connection in one place.
          </p>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="panel p-8 lg:p-10">
            <div className="flex items-center gap-3 text-stone-900">
              <ShieldCheck className="h-6 w-6 text-[#8b6a1c]" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Secure login</p>
            </div>

            <h2 className="mt-5 font-serif text-3xl text-stone-900">Welcome back</h2>
            <p className="mt-3 text-base leading-7 text-stone-600">
              Sign in with your committee, mentor, student, or parent account to continue.
            </p>

            <form className="mt-8 space-y-5">
              <label className="block">
                <span className="label-base">Email address</span>
                <input type="email" placeholder="name@example.org" className="input-base mt-2" />
              </label>
              <label className="block">
                <span className="label-base">Password</span>
                <input type="password" placeholder="Enter your password" className="input-base mt-2" />
              </label>

              <button type="submit" className="button-primary w-full">
                Sign In
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between gap-4 text-sm">
              <button type="button" className="font-semibold text-[#8b6a1c]">
                Forgot password?
              </button>
              <Link href="/dashboard" className="text-stone-500">
                View demo workspace
              </Link>
            </div>
          </section>

          <section className="grid gap-4 content-start sm:grid-cols-2">
            {[
              {
                title: "Community",
                body: "Keep scholarship records close to the committee and connected to the students you serve."
              },
              {
                title: "Amazing Students",
                body: "Track each scholar from the January celebration through college, training, service, or work."
              },
              {
                title: "Simple To Use",
                body: "Large text, clear sections, and easy forms help students, parents, and committee members move quickly."
              },
              {
                title: "Protected Records",
                body: "Supabase authentication, private file storage, and row-level access keep student information secure."
              }
            ].map((item) => (
              <div key={item.title} className="panel p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8b6a1c]">{item.title}</p>
                <p className="mt-4 font-serif text-2xl text-stone-900">{item.title === "Amazing Students" ? "Supporting the next generation" : item.title === "Community" ? "Built for beloved community" : item.title === "Simple To Use" ? "Made for real people" : "Handled with care"}</p>
                <p className="mt-3 text-sm leading-7 text-stone-600">{item.body}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
