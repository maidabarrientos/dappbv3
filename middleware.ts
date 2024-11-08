"use client";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if user is admin for admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const { data: adminData } = await supabase
      .from("admin_users")
      .select("role")
      .eq("id", session?.user?.id)
      .single();

    if (!adminData) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protected routes
  if (
    !session &&
    (req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/dapps"))
  ) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Redirect to dashboard if logged in and trying to access auth page
  if (session && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}