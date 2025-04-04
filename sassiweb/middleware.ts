// middleware.ts - Updated to handle resource pages authentication

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request });
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow access if user is an admin or super admin
    if (token.role !== "ADMIN" && !token.isSuperAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Check if the path starts with /resources
  if (request.nextUrl.pathname.startsWith('/resources')) {
    // If there's no token, redirect to sign in
    if (!token) {
      // Store the absolute URL they were trying to access
      const fullUrl = request.nextUrl.toString();
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', fullUrl);
      
      return NextResponse.redirect(url);
    }
  }

  // Add more secure Content-Security-Policy headers
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*; font-src 'self' data:; connect-src 'self' https://*;"
  );
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Run middleware on admin and resources paths
export const config = {
  matcher: ['/admin/:path*', '/resources/:path*']
};