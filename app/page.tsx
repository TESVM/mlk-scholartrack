import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/supabase/server";

export default function HomePage() {
  redirect(hasSupabaseEnv() ? "/login" : "/dashboard");
}
