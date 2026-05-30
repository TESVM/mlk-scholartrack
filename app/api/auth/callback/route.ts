import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("next") || "/dashboard";

  // This callback route is the landing point for Supabase magic-link or OAuth flows.
  return NextResponse.redirect(new URL(redirectTo, url.origin));
}
