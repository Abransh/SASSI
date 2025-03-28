// middleware.ts - Updated to handle resource pages authentication

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path starts with /admin
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // If there's no token or the user is not an admin
    if (!token || token.role !== 'ADMIN') {
      // Store the original URL they were trying to access
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', request.url);
      
      return NextResponse.redirect(url);
    }
  }
  
  // Check if the path starts with /resources
  if (pathname.startsWith('/resources')) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
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