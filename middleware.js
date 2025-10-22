import { NextResponse } from 'next/server';

export function middleware(request) {
  const adminAuth = request.cookies.get('adminAuth')?.value;

  // ✅ Protect all /admin routes except /admin/login
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  if (isAdminRoute && !isLoginPage && !adminAuth) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If authenticated user tries to visit login page, redirect to dashboard
  if (isLoginPage && adminAuth) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware only to /admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
