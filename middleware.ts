// middleware.js (Next 13+ with app dir)
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ROUTES = ['/login', '/signup', '/forgot-password'];
const PROTECTED_ROUTES_PREFIXES = ['/main/:path*',
    '/dashboard',
    '/settings',
    '/workspace/:path*',
    '/org',
    '/calendar',
    '/calendar/:path*',
    '/projects',
    '/projects/:path*',
    '/org',
    '/org/:path*',
    '/team'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const accessToken = req.cookies.get('access_token')?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTES_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  try {
    if (!accessToken) throw new Error('No token');
    // ✅ Verify JWT (replace with your secret)
    const isAuthenticated = await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET));


    // 1️⃣ Home redirection
    if (pathname === '/') {
      return NextResponse.redirect(new URL(isAuthenticated ? '/main' : '/login', req.url));
    }

    // 2️⃣ Protect private routes
    if (isProtectedRoute && !isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // 3️⃣ Redirect authenticated users away from auth pages
    if (isAuthenticated && isPublicRoute) {
      return NextResponse.redirect(new URL('/main', req.url));
    }

    return NextResponse.next(); // Allow through
  } catch (err) {
    // ⛔ Redirect if not valid
    console.log(err)
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/',
    '/main/:path*',
    '/dashboard',
    '/settings',
    '/workspace/:path*',
    '/org',
    '/calendar',
    '/calendar/:path*',
    '/projects',
    '/projects/:path*',
    '/org',
    '/org/:path*',
    '/team'
  ], // protected routes
};
