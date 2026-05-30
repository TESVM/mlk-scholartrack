"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  FolderKanban,
  Home,
  Menu,
  Settings,
  Users,
  UserRoundPlus,
  FileSpreadsheet
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/students", label: "Students", icon: Users },
  { href: "/students/new", label: "Add Student", icon: UserRoundPlus },
  { href: "/may-follow-up", label: "May Follow-Up", icon: ClipboardList },
  { href: "/student-connection-point", label: "Student Connection Point", icon: Home },
  { href: "/tasks", label: "Tasks", icon: FolderKanban },
  { href: "/reports", label: "Reports", icon: FileSpreadsheet },
  { href: "/settings", label: "Settings", icon: Settings }
] satisfies Array<{ href: Route; label: string; icon: typeof Home }>;

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden lg:block">
        <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50/85 p-2">
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const active =
                pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("app-tab", active && "app-tab-active")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-3 py-2 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-3xl grid-cols-4 gap-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold",
                  active ? "bg-stone-900 text-white" : "text-stone-500"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold text-stone-500"
            aria-label="More navigation items are available on larger screens"
          >
            <Menu className="h-4 w-4" />
            More
          </button>
        </div>
      </nav>
    </>
  );
}
