import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="panel max-w-xl p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-royal-700">
          Scholar not found
        </p>
        <h1 className="mt-4 font-serif text-4xl text-navy-900">The requested record could not be located.</h1>
        <p className="mt-4 text-base leading-7 text-slate">
          Check the student directory filters or return to the dashboard to continue working.
        </p>
        <Link href="/dashboard" className="button-primary mt-6">
          Return to Dashboard
        </Link>
      </div>
    </main>
  );
}
