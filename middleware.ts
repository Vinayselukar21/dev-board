// middleware.js (Next 13+ with app dir)
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: any) {
  const accessToken = req.cookies.get('access_token')?.value;

  try {
    if (!accessToken) throw new Error('No token');

    // ✅ Verify JWT (replace with your secret)
    await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET));

    return NextResponse.next(); // Allow through
  } catch (err) {
    // ⛔ Redirect if not valid
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/profile', '/settings', '/workspace/:workspaceId'], // protected routes
};
