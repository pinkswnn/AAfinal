import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Baseline protection.
 * In production, integrate Supabase SSR auth to read the session and role
 * from cookies and protect routes accordingly.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    // Simple guard: require a token cookie for now (replace with Supabase SSR session).
    const token = req.cookies.get("aa_admin")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
