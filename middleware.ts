import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "kenz_admin_token";
const JWT_SECRET = process.env.JWT_SECRET || "fallback_default_jwt_secret_kenz_2026_key";
const encodedKey = new TextEncoder().encode(JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  const isLoginPage = pathname === "/admin/login";
  const isAdminPage =
    (pathname === "/admin" || pathname.startsWith("/admin/")) && !isLoginPage;
  const isAdminApi = pathname.startsWith("/api/admin");

  const session = token ? await verifyToken(token) : null;

  // 1. If user is logged in and visits /admin/login, redirect to /admin dashboard
  if (isLoginPage && session) {
    const dashboardUrl = new URL("/admin", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 2. Protect Admin UI routes
  if (isAdminPage && !session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Protect Admin API routes
  if (isAdminApi && !session) {
    return NextResponse.json(
      {
        success: false,
        error: "Authentication required to access admin API",
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
