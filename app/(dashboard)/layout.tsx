import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentProfile, roleLabel } from "@/lib/auth";
import { Navigation } from "@/components/navigation";
import { hasSupabaseEnv } from "@/supabase/server";
import Link from "next/link";

const siteLinks = [
  { href: "https://www.mlkcu.com/", label: "Home" },
  { href: "https://www.mlkcu.com/committee", label: "Committee" },
  { href: "https://www.mlkcu.com/recipients", label: "Recipients" },
  { href: "https://www.mlkcu.com/alumni", label: "Alumni" },
  { href: "https://www.mlkcu.com/events", label: "Events" },
  { href: "https://www.mlkcu.com/contact-us", label: "Contact Us" },
  { href: "https://www.mlkcu.com/give", label: "Give" }
];

const footerLinks = [
  { href: "https://www.mlkcu.com/", label: "Website Home" },
  { href: "https://www.mlkcu.com/contact-us", label: "Contact" },
  { href: "https://www.mlkcu.com/give", label: "Donate" },
  { href: "/student-connection-point", label: "Student Connection Point" }
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const viewer = await getCurrentProfile();

  if (hasSupabaseEnv() && !viewer) {
    redirect("/login");
  }

  const activeViewer = viewer!;

  return (
    <div className="site-shell">
      <header className="border-b border-stone-200 bg-white/96 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8b6a1c]">
                  The Dr. Martin Luther King Jr. Advocacy for Justice Committee
                </p>
                <h1 className="mt-2 font-serif text-3xl text-stone-900">MLK ScholarTrack</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
                  Tracking Scholars. Supporting Dreams. Building Legacy.
                </p>
              </div>
              <div className="rounded-[1rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm">
                <p className="font-semibold text-stone-900">{activeViewer.full_name}</p>
                <p className="text-stone-500">{roleLabel(activeViewer.role)}</p>
              </div>
            </div>

            <nav className="hidden flex-wrap gap-x-6 gap-y-2 lg:flex">
              {siteLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="site-header-link"
                  target={item.href.startsWith("https://www.mlkcu.com/") ? undefined : "_blank"}
                  rel={item.href.startsWith("https://www.mlkcu.com/") ? undefined : "noreferrer"}
                >
                  {item.label}
                </a>
              ))}
              <Link href="/dashboard" className="site-header-link font-semibold text-[#8b6a1c]">
                ScholarTrack
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="min-w-0 pb-24 lg:pb-10">
          <Navigation />
          <div className="mt-6">{children}</div>
        </div>
      </div>

      <footer className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b6a1c]">
                The Dr. Martin Luther King Jr. Advocacy for Justice Committee
              </p>
              <h2 className="mt-4 font-serif text-3xl text-stone-900">
                Supporting scholars in a way that still feels rooted in the committee’s public mission.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
                ScholarTrack extends the committee website with a secure workspace for scholarship follow-up,
                enrollment verification, student support, graduation tracking, and alumni connection.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {footerLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-[1rem] border border-stone-200 bg-white px-4 py-4 text-sm font-medium text-stone-700 transition hover:border-[#be9b35] hover:text-[#6d5520]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
