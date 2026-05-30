import { cache } from "react";
import { demoViewer } from "@/lib/demo-data";
import type { UserProfile, UserRole } from "@/lib/types";
import { createServerSupabaseClient, hasSupabaseEnv } from "@/supabase/server";

export const getCurrentProfile = cache(async (): Promise<UserProfile | null> => {
  if (!hasSupabaseEnv()) {
    return demoViewer;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("users_profile")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  return profile ?? null;
});

export function roleLabel(role: UserRole) {
  switch (role) {
    case "super_admin":
      return "Super Admin";
    case "committee_member":
      return "Scholarship Committee Member";
    case "mentor":
      return "Mentor";
    case "student":
      return "Student";
    case "parent_guardian":
      return "Parent/Guardian";
  }
}

export function canManageUsers(role: UserRole) {
  return role === "super_admin";
}

export function canExportReports(role: UserRole) {
  return role === "super_admin" || role === "committee_member";
}
