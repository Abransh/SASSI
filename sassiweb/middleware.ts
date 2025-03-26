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

  // Add a more secure Content-Security-Policy header to all responses
  const response = NextResponse.next();
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;"
  );
  
  // Add additional security headers
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Only run middleware on admin paths
export const config = {
  matcher: ['/admin/:path*']
};