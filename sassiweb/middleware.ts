// middleware.ts - Updated to handle resource pages authentication

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request });
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isJoinTeamRoute = request.nextUrl.pathname === "/join/team";
  const isDevelopment = process.env.NODE_ENV === "development";

  // Handle admin routes
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow access if user is an admin or super admin
    if (token.role !== "ADMIN" && !token.isSuperAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Handle team join route - authenticate users
  if (isJoinTeamRoute) {
    if (!token) {
      // Store the URL they were trying to access
      const fullUrl = request.nextUrl.toString();
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', fullUrl);
      
      return NextResponse.redirect(url);
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
  
  // Add security headers with different CSP for development and production
  if (isDevelopment) {
    // More permissive CSP for development
    response.headers.set(
      'Content-Security-Policy',
      `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ucarecdn.com https://*.uploadcare.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: blob: https://*.uploadcare.com https://*.cloudinary.com https://ucarecdn.com;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://*.uploadcare.com wss://*.uploadcare.com wss://ws.pusherapp.com;
        frame-src 'self' https://*.uploadcare.com;
      `.replace(/\s+/g, ' ').trim()
    );
  } else {
    // Strict CSP for production
    response.headers.set(
      'Content-Security-Policy',
      `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ucarecdn.com https://*.uploadcare.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: blob: https://*.uploadcare.com https://*.cloudinary.com https://ucarecdn.com;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://*.uploadcare.com wss://*.uploadcare.com wss://ws.pusherapp.com;
        frame-src 'self' https://*.uploadcare.com;
      `.replace(/\s+/g, ' ').trim()
    );
  }
  
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Run middleware on admin, resources, and join/team paths and stripe webhook (pay attention, if webhooks dont work check here once, might be middle ware is causing issues)
export const config = {
  matcher: [
    '/admin/:path*', 
    '/resources/:path*', 
    '/join/team', 
    '/((?!api/webhooks/stripe).*)' // More specific exclusion
  ]
};